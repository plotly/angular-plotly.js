import { TestBed, inject } from '@angular/core/testing';
import { PlotlyThemeLoaderService } from './plotly.theme-loader.service';


xdescribe('PlotlyThemeLoaderService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PlotlyThemeLoaderService]
        });
    });

    it("should load the ggplot2 theme", inject([PlotlyThemeLoaderService], async (service: PlotlyThemeLoaderService) => {
        var json: any = await service.load('ggplot2');
        expect(json.geo.lakecolor).toBe("white");
    }));

    it("should load the gridon theme", inject([PlotlyThemeLoaderService], async (service: PlotlyThemeLoaderService) => {
        var json: any = await service.load('gridon');
        expect(json.xaxis.title.standoff).toBe(15);
    }));

    it("should load the plotly_dark theme", inject([PlotlyThemeLoaderService], async (service: PlotlyThemeLoaderService) => {
        var json: any = await service.load('plotly_dark');
        expect(json.mapbox.style).toBe("dark");
    }));

    it("should load the plotly_white theme", inject([PlotlyThemeLoaderService], async (service: PlotlyThemeLoaderService) => {
        var json: any = await service.load('plotly_white');
        expect(json.mapbox.style).toBe("light");
    }));

    it("should load the plotly theme", inject([PlotlyThemeLoaderService], async (service: PlotlyThemeLoaderService) => {
        var json: any = await service.load('plotly');
        expect(json.mapbox.style).toBe("light");
    }));

    it("should load the presentation theme", inject([PlotlyThemeLoaderService], async (service: PlotlyThemeLoaderService) => {
        var json: any = await service.load('presentation');
        expect(json.xaxis.title.standoff).toBe(15);
    }));

    it("should load the seaborn theme", inject([PlotlyThemeLoaderService], async (service: PlotlyThemeLoaderService) => {
        var json: any = await service.load('seaborn');
        expect(json.colorway[2]).toBe('rgb(85,168,104)');
    }));

    it("should load the simple_white theme", inject([PlotlyThemeLoaderService], async (service: PlotlyThemeLoaderService) => {
        var json: any = await service.load('simple_white');
        expect(json.colorway[1]).toBe("#FF7F0E");
    }));

    it("should load the xgridoff theme", inject([PlotlyThemeLoaderService], async (service: PlotlyThemeLoaderService) => {
        var json: any = await service.load('xgridoff');
        expect(json.xaxis.title.standoff).toBe(15);
    }));

    it("should load the ygridoff theme", inject([PlotlyThemeLoaderService], async (service: PlotlyThemeLoaderService) => {
        var json: any = await service.load('ygridoff');
        expect(json.yaxis.showgrid).toBe(false);
    }));
});