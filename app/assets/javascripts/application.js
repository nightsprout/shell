// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//  RAILS: Core Rails Files
//= require jquery
//= require jquery_ujs
//
//  ANGULAR: Core Angular Files
//= require angular
//= require angular-route
//= require angular-animate
//= require angular-sanitize
//
//  ANGULAR: Angular App
//= require angular/angular_app
//= require angular/routes
//
//  ANGULAR: Angular App - Services
//= require angular/services/httpService
//
//  ANGULAR: Angular App - Controllers
//= require angular/controllers/indexController
//= require angular/controllers/masteriesController
//
//  ANGULAR: Angular App - Directives
//= require angular/directives/rightClickDirective
//
//  SHELL: Core Shell Files
//= require main
//= require_tree ./components


// To make this work, pass in the array that can be found at "spells" on the champion JSON.
// It expects an array, not an object.
function parseTooltips( tooltip_array ){

  return $.map(tooltip_array, function(element, index){
    var var_template = {};

    if( typeof element["costBurn"] != "undefined" ){
      var_template["cost"] = element["costBurn"];  
    }
    
    if( typeof element["effect"] != "undefined" ){
      var_template["e1"] = ( typeof element["effect"][0] != "undefined" ? element["effect"][0].join("/") : "" );
      var_template["e2"] = ( typeof element["effect"][1] != "undefined" ? element["effect"][1].join("/") : "" );
      var_template["e3"] = ( typeof element["effect"][2] != "undefined" ? element["effect"][2].join("/") : "" );
      var_template["e4"] = ( typeof element["effect"][3] != "undefined" ? element["effect"][3].join("/") : "" );
      var_template["e5"] = ( typeof element["effect"][4] != "undefined" ? element["effect"][4].join("/") : "" );
      var_template["e6"] = ( typeof element["effect"][5] != "undefined" ? element["effect"][5].join("/") : "" );
      var_template["e7"] = ( typeof element["effect"][6] != "undefined" ? element["effect"][6].join("/") : "" );
    }
    if( typeof element["vars"] != "undefined" ){
      var_template["a1"] = ( typeof element["vars"][0] != "undefined" ? element["vars"][0]["coeff"].join("/") : "" );
      var_template["a2"] = ( typeof element["vars"][1] != "undefined" ? element["vars"][1]["coeff"].join("/") : "" );
      var_template["a3"] = ( typeof element["vars"][2] != "undefined" ? element["vars"][2]["coeff"].join("/") : "" );
      var_template["a4"] = ( typeof element["vars"][3] != "undefined" ? element["vars"][3]["coeff"].join("/") : "" );
    }


    var retval = {}
    if( typeof element["resource"] != "undefined" ){
      retval["cost"] = Handlebars.compile( element["resource"] )(var_template);
    }
    if( typeof element["tooltip"] != "undefined" ){
      retval["tooltip"] = Handlebars.compile( element["tooltip"] )(var_template);
    }
    if( typeof element["sanitizedTooltip"] != "undefined" ){
      retval["sanitizedTooltip"] = Handlebars.compile( element["sanitizedTooltip"] )(var_template);
    }

    return retval;
  });

}















