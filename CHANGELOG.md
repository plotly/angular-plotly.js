# Changelog


## [6.0.0] - 2024-08-30
### Changed
- Updated to Angular 16

## [5.2.2] - 2023-08-25
### Fixed
- Added null definition to setPlotlyBundle method parameter (see https://github.com/plotly/angular-plotly.js/pull/249)

## [5.2.1] - 2023-08-19
### Fixed
- Rolling back the themes support

## [5.2.0] - 2023-06-19
### Addded
- Adding support to themes (see https://github.com/plotly/angular-plotly.js/issues/152)

## [5.1.1] - 2023-06-15
### Changed
- Adding support to strict version of bundle plotly (see https://github.com/plotly/angular-plotly.js/issues/237)

## [5.1.0] - 2023-04-10
### Changed
- Updated to Angular 15

## [5.0.0] - 2023-03-29
### Changed
- Updated to Angular 13
- The library now uses the Ivy engine
- Migrated to use ESLint from the deprecated TSLint
- Removed protractor and codelyzer
### Fixed
- Fixed vulnerabilities reported by NPM

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
