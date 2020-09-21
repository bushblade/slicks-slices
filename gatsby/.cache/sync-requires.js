const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("/home/will/Dropbox/wesbos/slickslices/gatsby/.cache/dev-404-page.js"))),
  "component---src-pages-404-js": hot(preferDefault(require("/home/will/Dropbox/wesbos/slickslices/gatsby/src/pages/404.js"))),
  "component---src-pages-beers-js": hot(preferDefault(require("/home/will/Dropbox/wesbos/slickslices/gatsby/src/pages/beers.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("/home/will/Dropbox/wesbos/slickslices/gatsby/src/pages/index.js"))),
  "component---src-pages-order-js": hot(preferDefault(require("/home/will/Dropbox/wesbos/slickslices/gatsby/src/pages/order.js"))),
  "component---src-pages-pizza-js": hot(preferDefault(require("/home/will/Dropbox/wesbos/slickslices/gatsby/src/pages/pizza.js"))),
  "component---src-pages-slicemasters-js": hot(preferDefault(require("/home/will/Dropbox/wesbos/slickslices/gatsby/src/pages/slicemasters.js")))
}
