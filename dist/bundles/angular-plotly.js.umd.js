(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('plotly.js/dist/plotly.js'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define('angular-plotly.js', ['exports', '@angular/core', 'plotly.js/dist/plotly.js', '@angular/common'], factory) :
	(factory((global['angular-plotly'] = global['angular-plotly'] || {}, global['angular-plotly'].js = {}),global.ng.core,global.Plotlyjs,global.ng.common));
}(this, (function (exports,core,Plotlyjs,common) { 'use strict';

var Plotly;
(function (Plotly) {
    function Figure() { }
    Plotly.Figure = Figure;
    function PlotlyHTMLElement() { }
    Plotly.PlotlyHTMLElement = PlotlyHTMLElement;
})(Plotly || (Plotly = {}));
var PlotlyService = /** @class */ (function () {
    function PlotlyService() {
        this.plotly = Plotlyjs;
        if (typeof this.plotly === 'undefined') {
            throw new Error("Peer dependency plotly.js isn't installed");
        }
    }
    PlotlyService.prototype.newPlot = function (div, data, layout, config) {
        return this.plotly.newPlot(div, data, layout);
    };
    PlotlyService.prototype.plot = function (div, data, layout, config) {
        return this.plotly.plot(div, data, layout);
    };
    PlotlyService.prototype.update = function (div, data, layout, config) {
        return this.plotly.update(div, data, layout);
    };
    PlotlyService.prototype.resize = function (div) {
        return this.plotly.Plots.resize(div);
    };
    return PlotlyService;
}());
PlotlyService.decorators = [
    { type: core.Injectable },
];
PlotlyService.ctorParameters = function () { return []; };
var PlotComponent = /** @class */ (function () {
    function PlotComponent(plotly, iterableDiffers, keyValueDiffers) {
        this.plotly = plotly;
        this.iterableDiffers = iterableDiffers;
        this.keyValueDiffers = keyValueDiffers;
        this.defaultClassName = 'js-plotly-plot';
        this.revision = 0;
        this.debug = false;
        this.useResizeHandler = false;
        this.initialized = new core.EventEmitter();
        this.update = new core.EventEmitter();
        this.purge = new core.EventEmitter();
        this.error = new core.EventEmitter();
        this.afterExport = new core.EventEmitter();
        this.afterPlot = new core.EventEmitter();
        this.animated = new core.EventEmitter();
        this.animatingFrame = new core.EventEmitter();
        this.animationInterrupted = new core.EventEmitter();
        this.autoSize = new core.EventEmitter();
        this.beforeExport = new core.EventEmitter();
        this.buttonClicked = new core.EventEmitter();
        this.click = new core.EventEmitter();
        this.clickAnnotation = new core.EventEmitter();
        this.deselect = new core.EventEmitter();
        this.doubleClick = new core.EventEmitter();
        this.framework = new core.EventEmitter();
        this.hover = new core.EventEmitter();
        this.legendClick = new core.EventEmitter();
        this.legendDoubleClick = new core.EventEmitter();
        this.relayout = new core.EventEmitter();
        this.restyle = new core.EventEmitter();
        this.redraw = new core.EventEmitter();
        this.selected = new core.EventEmitter();
        this.selecting = new core.EventEmitter();
        this.sliderChange = new core.EventEmitter();
        this.sliderEnd = new core.EventEmitter();
        this.sliderStart = new core.EventEmitter();
        this.transitioning = new core.EventEmitter();
        this.transitionInterrupted = new core.EventEmitter();
        this.unhover = new core.EventEmitter();
        this.eventNames = ['afterExport', 'afterPlot', 'animated', 'animatingFrame', 'animationInterrupted', 'autoSize',
            'beforeExport', 'buttonClicked', 'click', 'clickAnnotation', 'deselect', 'doubleClick', 'framework', 'hover',
            'legendClick', 'legendDoubleClick', 'relayout', 'restyle', 'redraw', 'selected', 'selecting', 'sliderChange',
            'sliderEnd', 'sliderStart', 'transitioning', 'transitionInterrupted', 'unhover'];
    }
    PlotComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.createPlot().then(function () {
            var figure = _this.createFigure();
            _this.initialized.emit(figure);
        });
    };
    PlotComponent.prototype.ngOnDestroy = function () {
        if (typeof this.resizeHandler === 'function') {
            this.getWindow().removeEventListener('resize', (this.resizeHandler));
            this.resizeHandler = undefined;
        }
        var figure = this.createFigure();
        this.purge.emit(figure);
    };
    PlotComponent.prototype.ngOnChanges = function (changes) {
        var shouldUpdate = false;
        var revision = changes["revision"];
        if (revision && !revision.isFirstChange()) {
            shouldUpdate = true;
        }
        var debug = changes["debug"];
        if (debug && !debug.isFirstChange()) {
            shouldUpdate = true;
        }
        if (shouldUpdate) {
            this.updatePlot();
        }
        this.updateWindowResizeHandler();
    };
    PlotComponent.prototype.ngDoCheck = function () {
        var shouldUpdate = false;
        if (this.layoutDiffer) {
            var layoutHasDiff = this.layoutDiffer.diff(this.layout);
            if (layoutHasDiff) {
                shouldUpdate = true;
            }
        }
        else if (this.layout) {
            this.layoutDiffer = this.keyValueDiffers.find(this.layout).create();
        }
        else {
            this.layoutDiffer = undefined;
        }
        if (this.dataDiffer) {
            var dataHasDiff = this.dataDiffer.diff(this.data);
            if (dataHasDiff) {
                shouldUpdate = true;
            }
        }
        else if (Array.isArray(this.data)) {
            this.dataDiffer = this.iterableDiffers.find(this.data).create(this.dataDifferTrackBy);
        }
        else {
            this.dataDiffer = undefined;
        }
        if (shouldUpdate && this.plotlyInstance) {
            this.updatePlot();
        }
    };
    PlotComponent.prototype.getWindow = function () {
        return window;
    };
    PlotComponent.prototype.getClassName = function () {
        var classes = [this.defaultClassName];
        if (Array.isArray(this.className)) {
            classes = classes.concat(this.className);
        }
        else if (this.className) {
            classes.push(this.className);
        }
        return classes.join(' ');
    };
    PlotComponent.prototype.createPlot = function () {
        var _this = this;
        return this.plotly.newPlot(this.plotEl.nativeElement, this.data, this.layout, this.config).then(function (plotlyInstance) {
            _this.plotlyInstance = plotlyInstance;
            _this.getWindow().gd = _this.debug ? plotlyInstance : undefined;
            _this.eventNames.forEach(function (name) {
                var eventName = "plotly_" + name.toLowerCase();
                plotlyInstance.on(eventName, function (data) { return ((_this[name])).emit(data); });
            });
            _this.updateWindowResizeHandler();
        }, function (err) {
            console.error('Error while plotting:', err);
            _this.error.emit(err);
        });
    };
    PlotComponent.prototype.createFigure = function () {
        var p = this.plotlyInstance;
        var figure = {
            data: p.data,
            layout: p.layout,
            frames: p._transitionData ? p._transitionData._frames : null
        };
        return figure;
    };
    PlotComponent.prototype.updatePlot = function () {
        var _this = this;
        if (!this.plotlyInstance) {
            var error = new Error("Plotly component wasn't initialized");
            this.error.emit(error);
            throw error;
        }
        return this.createPlot().then(function () {
            var figure = _this.createFigure();
            _this.update.emit(figure);
        });
    };
    PlotComponent.prototype.updateWindowResizeHandler = function () {
        var _this = this;
        if (this.useResizeHandler) {
            if (this.resizeHandler === undefined) {
                this.resizeHandler = function () { return _this.plotly.resize(_this.plotlyInstance); };
                this.getWindow().addEventListener('resize', (this.resizeHandler));
            }
        }
        else {
            if (typeof this.resizeHandler === 'function') {
                this.getWindow().removeEventListener('resize', (this.resizeHandler));
                this.resizeHandler = undefined;
            }
        }
    };
    PlotComponent.prototype.dataDifferTrackBy = function (index, item) {
        var obj = Object.assign({}, item, { uid: '' });
        return JSON.stringify(obj);
    };
    return PlotComponent;
}());
PlotComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'plotly-plot',
                template: "<div #plot [attr.id]=\"divId\" [className]=\"getClassName()\" [ngStyle]=\"style\"></div>",
                providers: [PlotlyService],
            },] },
];
PlotComponent.ctorParameters = function () { return [
    { type: PlotlyService, },
    { type: core.IterableDiffers, },
    { type: core.KeyValueDiffers, },
]; };
PlotComponent.propDecorators = {
    "plotEl": [{ type: core.ViewChild, args: ['plot',] },],
    "data": [{ type: core.Input },],
    "layout": [{ type: core.Input },],
    "config": [{ type: core.Input },],
    "style": [{ type: core.Input },],
    "divId": [{ type: core.Input },],
    "revision": [{ type: core.Input },],
    "className": [{ type: core.Input },],
    "debug": [{ type: core.Input },],
    "useResizeHandler": [{ type: core.Input },],
    "initialized": [{ type: core.Output },],
    "update": [{ type: core.Output },],
    "purge": [{ type: core.Output },],
    "error": [{ type: core.Output },],
    "afterExport": [{ type: core.Output },],
    "afterPlot": [{ type: core.Output },],
    "animated": [{ type: core.Output },],
    "animatingFrame": [{ type: core.Output },],
    "animationInterrupted": [{ type: core.Output },],
    "autoSize": [{ type: core.Output },],
    "beforeExport": [{ type: core.Output },],
    "buttonClicked": [{ type: core.Output },],
    "click": [{ type: core.Output },],
    "clickAnnotation": [{ type: core.Output },],
    "deselect": [{ type: core.Output },],
    "doubleClick": [{ type: core.Output },],
    "framework": [{ type: core.Output },],
    "hover": [{ type: core.Output },],
    "legendClick": [{ type: core.Output },],
    "legendDoubleClick": [{ type: core.Output },],
    "relayout": [{ type: core.Output },],
    "restyle": [{ type: core.Output },],
    "redraw": [{ type: core.Output },],
    "selected": [{ type: core.Output },],
    "selecting": [{ type: core.Output },],
    "sliderChange": [{ type: core.Output },],
    "sliderEnd": [{ type: core.Output },],
    "sliderStart": [{ type: core.Output },],
    "transitioning": [{ type: core.Output },],
    "transitionInterrupted": [{ type: core.Output },],
    "unhover": [{ type: core.Output },],
};
var PlotlyModule = /** @class */ (function () {
    function PlotlyModule() {
    }
    return PlotlyModule;
}());
PlotlyModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [common.CommonModule],
                declarations: [PlotComponent],
                exports: [PlotComponent],
            },] },
];

exports.PlotlyModule = PlotlyModule;
exports.PlotComponent = PlotComponent;
exports.PlotlyService = PlotlyService;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angular-plotly.js.umd.js.map
