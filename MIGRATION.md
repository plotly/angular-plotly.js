# Migration guide

## Angular 12 to Angular 13

Use `angular-plotly.js` 5.x with Angular 13. In particular, version
`5.0.0` is the release that added Angular 13 support.

`angular-plotly.js` 2.0.0 targets Angular 9 and declares the following peer
dependency:

```text
@angular/core: ^9.0.0
```

That is why Angular CLI stops with an incompatible peer dependency when it
tries to update an application using `angular-plotly.js` 2.0.0 to Angular 13.
The `--force` option only suppresses the warning; it does not make the old
package compatible.

### Recommended order

1. Remove the incompatible package temporarily:

   ```bash
   npm uninstall angular-plotly.js
   ```

2. Update the application and Angular CLI to Angular 13:

   ```bash
   ng update @angular/core@13 @angular/cli@13
   ```

3. Install the Angular 13-compatible Plotly package:

   ```bash
   npm install angular-plotly.js@5.0.0
   ```

   If the application uses the minified Plotly bundle, keep its existing
   `plotly.js-dist-min` and `@types/plotly.js-dist-min` dependencies.

4. Reinstall dependencies if the update left a stale lockfile or
   `node_modules` tree, then build and test the application:

   ```bash
   npm install
   ng build
   ng test --watch=false
   ```

### Compatibility reference

| `angular-plotly.js` | Angular | Notes |
| --- | --- | --- |
| `2.x` | 9 | Not compatible with Angular 13 |
| `3.x` | 10 | Angular 10 library-format release |
| `4.x` | 11–12 | Declares Angular greater than 10.0.9 |
| `5.x` | 13–15 | Angular 13 compatibility line |
| `6.x` | 16–19 | Declares Angular 16 or newer; validate your application before a major Angular upgrade |
| `20.x` | 20 | Angular 20 compatibility line |
| `21.x` | 21 | Peer dependencies are capped below Angular 22 |
| `22.x` | 22 | Current compatibility line; peer dependencies are capped below Angular 23 |

The package version does not increase for every Angular major. Check the
package peer dependencies before upgrading across an Angular major, and use
the package line that declares support for the Angular version in the
application.

### Plotly.js bundles and Angular 19

`angular-plotly.js` does not install a Plotly.js bundle for an application.
The bundle is selected by the application and passed to `PlotlyModule.forRoot`
or `PlotlyService.setPlotly`. The library's own tested baseline is currently
`plotly.js-dist` 2.35.3.

If an Angular 19 test build fails to resolve the `d3-*` modules from
`plotly.js-dist-min` 3.x, pin the bundle to the known-good 2.x line while
investigating the application build configuration:

```bash
npm install plotly.js-dist-min@^2.35.3
```

The wrapper only requires a Plotly object with `newPlot`/`react`; the missing
module errors occur while Angular bundles Plotly.js, before the wrapper runs.
Use a small production build and a test build to validate a move to Plotly.js
3.x before changing the pin.

### Angular 13 follow-up notes

Version 5.0.0 migrated the library to the Ivy engine and removed Protractor
and Codelyzer from the library development setup. Review application code and
CI configuration for those Angular ecosystem changes as part of the Angular
13 migration. The Plotly component API is otherwise unchanged in the release
notes for 5.0.0.
