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
//
//  ANGULAR: Angular App
//= require angular/angular_app
//= require angular/routes
//
//  ANGULAR: Angular App - Services
//= require angular/services/httpService
//
//  ANGULAR: Angular App - Controllers
//= require angular/controllers/sampleController
//
//  ANGULAR: Angular App - Directives
//= require angular/directives/sampleDirective
//
//  SHELL: Core Shell Files
//= require main
//
//= require_tree ./components






$(document).ready(function() {

  // This code controls the nav when it is a mobile view.
  $("#ns-slide-controls").click(function() {
    $("body").toggleClass("ns-slider-expanded");
  });
  $("nav.ns-section-main ol#ns-navigation > li > a").click(function() {
    $("body").removeClass("ns-slider-expanded");
  });

  // Make sure that if the user resizes, the dynamic states are also reset.
  $(window).resize(function() {
    $("body").removeClass("ns-slider-expanded");
  });

  $(window).scroll(function() {

    // Show or hide the top bar background.
    // if ( $(window).scrollTop() > 0 ) {
    //   $("nav.ns-section-main").addClass("ns-nav-shadow-state");
    // }
    // else if ( $(window).scrollTop() <= 0 ) {
    //   $("nav.ns-section-main").removeClass("ns-nav-shadow-state");
    // }

  });

});














