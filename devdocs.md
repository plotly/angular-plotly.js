## How to publish on npm

* `ng test --codeCoverage=true --progress=true --watch=false`
* `ng build plotly --prod`
* `cp README.md dist/plotly`
* `npm publish dist/plotly`
* `git tag -a <version> -m <version>`