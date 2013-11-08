file-explorer-simple
====================
Inspired by https://github.com/zcbenz/nw-sample-apps/tree/master/file-explorer

I'm making use of Handlebars instead of Jade, Stylus and making an attempt to never have to scrape data from the DOM :)

To compile your zip file, in the root directory of the project, execute
```
zip -r app.nw . -x ".*" "node_modules/*"
```
