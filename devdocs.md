## How to publish on npm

* Update the version in package.json
* Update the version in projects/plotly/package.json
* Update the CHANGELOG.md
* `ng test --codeCoverage=true --progress=true --watch=false`
* `cp README.md angular-plotly.png projects/plotly`
* `ng build plotly --configuration production`
* `git commit -am "<version>"`
* `git tag -a <version> -m <version>`
* `git push --tags`
* `git push`
* `cd dist/plotly`
* `npm publish`
