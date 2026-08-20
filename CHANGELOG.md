# Changelog

## [22.0.1] - 2026-08-20
### Fixed
- Added `[innerStyle]` as the preferred plot container styling input while
  retaining `[style]` as a deprecated compatibility alias.


## [22.0.0] - 2026-08-20
### Changed
- Added Angular 22 support using the official Angular 21→22 migrations.
- Updated Angular to 22.1.3, CLI/build to 22.1.5, ng-packagr to 22.1.1,
  Angular ESLint to 22.1, ESLint to 10, and TypeScript to 6.0.3.
- Changed the Angular peer range and safe publish tag for the active `main` line.


## [21.0.0] - 2026-08-20
### Changed
- Added Angular 21 support using the official Angular 20→21 migrations.
- Updated Angular, CLI, and build tooling to 21.2.21, ng-packagr to 21.2.7,
  and Angular ESLint to 21.4.
- Changed the Angular peer range and safe publish tag for the `v21` line.


## [20.0.1] - 2026-08-20
### Fixed
- Exported the documented CDN/window modules and Plotly public types.
- Made Plotly initialization, destruction, debugging, and CDN failures deterministic.
- Made browser-global integrations safe to instantiate during server rendering.
- Made the demo consume the built package instead of library source files.

### Changed
- Updated the Angular 20 line to supported Angular 20.3 tooling and Plotly 2.35.
- Added reproducible package assets, package verification, and branch-aware CI.


## [20.0.0] - 2025-06-07
### Changed
- Updated to Angular 20


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
