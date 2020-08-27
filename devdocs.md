## How to publish on npm

* Update the version on projects/plotly/package.json
* `ng test --codeCoverage=true --progress=true --watch=false`
* `ng build plotly --prod`
* `cp README.md angular-plotly.png dist/plotly`
* `npm publish dist/plotly`
* `git tag -a <version> -m <version>`