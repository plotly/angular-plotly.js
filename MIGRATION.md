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
| `5.x` | 13 | Use this line for Angular 13 |
| `6.x` | 16 | Angular 16 release |

The package version does not increase for every Angular major. Check the
package peer dependencies before upgrading across an Angular major, and use
the package line that declares support for the Angular version in the
application.

### Angular 13 follow-up notes

Version 5.0.0 migrated the library to the Ivy engine and removed Protractor
and Codelyzer from the library development setup. Review application code and
CI configuration for those Angular ecosystem changes as part of the Angular
13 migration. The Plotly component API is otherwise unchanged in the release
notes for 5.0.0.