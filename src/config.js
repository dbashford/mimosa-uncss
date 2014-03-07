"use strict";

var path = require( "path" );

exports.defaults = function() {
  return {
    uncss: {
      files: [],
      options: {
        report: true
      }
    }
  };
};

exports.placeholder = function() {
  var ph = "  uncss:          # settings for uncss module\n" +
     "    files:[]      # an array of objects, files[].html is an an array of paths to html files\n" +
     "                  # containing CSS to optimize. files[].out is the CSS file to place the output CSS\n" +
     "    options: {}   # All of the uncss config, https://github.com/giakki/uncss#from-the-command-line,\n" +
     "                  # can be provided via this object.\n";

  return ph;
};

exports.validate = function ( config, validators ) {
  var errors = []
    , un = config.uncss;

  if ( validators.ifExistsIsObject( errors, "uncss config", un ) ) {
    un.options = un.options || {};
    if ( validators.ifExistsIsObject( errors, "uncss.options", un.options ) ) {
      un.options.report = true;
    }

    if ( validators.ifExistsIsArrayOfObjects( errors, "uncss.files", un.files ) ) {
      un.files.forEach( function( file ) {
        if ( validators.ifExistsIsArrayOfStrings( errors, "uncss.files.html", file.html ) ) {
          file.html = file.html.map( function( f ) {
            return path.join( config.watch.compiledDir, f );
          });
        }
        if ( validators.ifExistsIsString( errors, "uncss.files.out", file.out ) ) {
          file.out = path.join( config.watch.compiledDir, file.out );
        }
      });
    }
  }

  return errors;
};
