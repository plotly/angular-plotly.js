# 0.1

* [x] Create the initial component wrapper
* [x] Add the `data`, `layout`, `config` and `style` properties with typings
* [x] Create the watcher to update the component once one of these properties change
* [x] Create an initial demo with a simple plot

# 0.2

* [x] Add the missing properties (e.g.: `revision`, `frames`, `divId`, `className`, `debug`, `useResizeHandler`)
* [ ] Add the events watchers in the component
* [ ] Setup the plotly folder (module) as the app for publishing
* [ ] Write tests which guaranties the `npm link` and `import { PlotlyModule } from 'angular-plotly.js'`
* [ ] Create the initial documentation (with the properties and link to demo)

# 0.3

* [ ] Create the script to publish ( npm publish )
* [ ] Improve documentation with all properties and events
* [ ] Try to create a good state management in Angular style
* [ ] Create the "Quick start" and "development" guide in the Docs
* [ ] Create more examples in the demo

# 0.4

* [ ] Create a better `plotly.js.d.ts` file
* [ ] Customizing the plotly.js bundle
* [ ] Loading from a `<script>` tag (Make it possible to load in [codepen.io](https://codepen.io/), [jsfiddle](https://jsfiddle.net/))
* [ ] Create a Demo similar to an editor, where it's possible to change the value and see the