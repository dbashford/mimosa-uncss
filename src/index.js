"use strict";

var uncss  = require( "uncss" )
  , moduleConfig = require( "./config" );

var _process = function ( mimosaConfig, options, next ) {
  var un = mimosaConfig.uncss;
  if ( un.files && un.files.length ) {
    var done = function( i ) {
      if ( ++i === un.files.length ) {
        next();
      }
    };
    un.files.forEach( function( file, i ) {
      uncss( file.html, un.options, function ( error, output, report ) {
        if ( error ) {
          mimosaConfig.log.error( "Error running uncss on [[ " + file.html + "]] ", error );
          done( i );
        } else {
          mimosaConfig.helpers.file.write(file.out, output, function( error ) {
            if ( error ) {
              mimosaConfig.log.error( "Error writing output file [[ " + file.out + " ]], ", error );
            } else {

              var sizeDiff = report.original.length - output.length;
              if ( sizeDiff ) {
                var pcnt = Math.round( ( sizeDiff / report.original.length ) * 100 );
                mimosaConfig.log.info( "uncss saved [[ " + sizeDiff + " (" + pcnt + "%) ]] characters for files [[ " + file.html.join(", ") + " ]]");
              }
            }
            done( i );
          });
        }
      });
    });
  } else {
    next();
  }
};

var registration = function (config, register) {
  register( [ "postBuild" ], "beforePackage", _process );
};

module.exports = {
  registration: registration,
  defaults: moduleConfig.defaults,
  placeholder: moduleConfig.placeholder,
  validate: moduleConfig.validate
};
