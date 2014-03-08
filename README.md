mimosa-eslint
===========

## Overview

This is a [uncss](https://github.com/giakki/uncss) module for the Mimosa build tool. It will remove unused CSS from your projects.

For more information regarding Mimosa, see http://mimosa.io

This module requires Mimosa `v2.1.17`+.

## Usage

Add `'uncss'` to your list of modules.  That's all!  Mimosa will install the module for you when you start `mimosa watch` or `mimosa build`.

## Functionality

This module will run the [uncss](https://github.com/giakki/uncss) against configured `.html` pages and output a file that contains all of the CSS the the those pages actually use.  Any styles not used on the page are left out.

uncss has plenty of options to tweak the optimization, like an `ignore` option in case some styles have to be forcibly retained.  Check the [uncss config](https://github.com/giakki/uncss#from-the-command-line) for more info.

## Default Config

This module will not do anything by default.  It must be pointed at `.html` files to process.

## Example Config

```javascript
uncss: {
  files: [{
    html:["index.html"],
    out:"stylesheets/uncss-ed.css"
  }],
  options: {}
}
```

* `files`: an array of objects
* `files[].html`: an array of paths to html files containing CSS to optimize.  Path must be relative to `watch.compiledDir`.
* `files[].out`: the CSS file to place the output CSS. Path must be relative to `watch.compiledDir`.
* `options`: All of the [uncss config](https://github.com/giakki/uncss#from-the-command-line) can be provided via this object.
