# Changelog

## [4.0.4] - 2021-08-15
### Fixed
- Several tests which were named as specs instead of spec
- Fixing `PlotlyViaCDNModule.setPlotlyBundle` method to accept `null`

## [4.0.3] - 2021-08-15
### Fixed
- Removing declaration for `plotly.js-dist-min`. We can use the `@types/plotly.js-dist-min` npm package now
- Updating README.md about the installation using `plotly.js-dist-min` and `@types/plotly.js-dist-min`

## [4.0.2] - 2021-08-12
### Fixed
- declaration for `plotly.js-dist-min`

## [4.0.1] - 2021-08-12
### Fixed
- PlotlyModule.isValid now checks the plotly 2.x interface

## [4.0.0] - 2021-05-03
### Changed
- PlotlyService.getPlotly now returns a Promise

## [3.1.0] - 2021-03-17
### Changed
- Updated peerDependency to angular >10.0 (see https://github.com/plotly/angular-plotly.js/issues/154)
- Enhanced integration with Angular CSS classes handling (See https://github.com/plotly/angular-plotly.js/pull/147)
- Allow user content inside plotly plot *div* element (See https://github.com/plotly/angular-plotly.js/pull/147)

## [3.0.0] - 2020-08-27
### Changed
- Upgraded to angular 10.0
- Moving to angular library format
- Changing `plotly_click` event to `plotlyClick` for consistence among other event names


## [2.0.0] - 2020-02-28
### Changed
- Upgraded to angular 9.0 (See https://github.com/plotly/angular-plotly.js/issues/101)
- Adding `@angular/core^9.0.0` as a peer dependency
- Adding `treemapclick` and `sunburstclick` events (See https://github.com/plotly/angular-plotly.js/issues/105)
