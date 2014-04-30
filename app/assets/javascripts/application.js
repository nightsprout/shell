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
//
//  ANGULAR: Angular App - Directives
//= require angular/directives/sampleDirective
//
//  SHELL: Core Shell Files
//= require main
//= require_tree ./components


// To make this work, pass in the array that can be found at "spells" on the champion JSON.
// It expects an array, not an object.
function parseTooltips( tooltip_array ){

  return $.map(tooltip_array, function(element, index){
    var var_template = {
      "e1": ( typeof element["effect"][0] != "undefined" ? element["effect"][0].join("/") : "" ),
      "e2": ( typeof element["effect"][1] != "undefined" ? element["effect"][1].join("/") : "" ),
      "e3": ( typeof element["effect"][2] != "undefined" ? element["effect"][2].join("/") : "" ),
      "e4": ( typeof element["effect"][3] != "undefined" ? element["effect"][3].join("/") : "" ),
      "e5": ( typeof element["effect"][4] != "undefined" ? element["effect"][4].join("/") : "" ),
      "e6": ( typeof element["effect"][5] != "undefined" ? element["effect"][5].join("/") : "" ),
      "e7": ( typeof element["effect"][6] != "undefined" ? element["effect"][6].join("/") : "" ),
      "a1": ( typeof element["vars"][0] != "undefined" ? element["vars"][0]["coeff"].join("/") : "" ),
      "a2": ( typeof element["vars"][1] != "undefined" ? element["vars"][1]["coeff"].join("/") : "" ),
      "a3": ( typeof element["vars"][2] != "undefined" ? element["vars"][2]["coeff"].join("/") : "" ),
      "a4": ( typeof element["vars"][3] != "undefined" ? element["vars"][3]["coeff"].join("/") : "" )
    }

    return {
      "cost":             Handlebars.compile( element["resource"] )({cost: element["costBurn"]}),
      "tooltip":          Handlebars.compile( element["tooltip"] )( var_template ),
      "sanitizedTooltip": Handlebars.compile( element["sanitizedTooltip"] )( var_template )
    }
  });

}















