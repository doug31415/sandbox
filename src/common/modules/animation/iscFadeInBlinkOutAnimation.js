/**
 * Created by douglas goodman on 3/10/15.
 */

(function(){
  'use strict';

  /* @ngInject */
  function iscFadeInBlinkOutAnimation( $log, $window, TweenMax, EASE_DUR ){

  // --------------------
  // vars
  // --------------------

  // --------------------
  // init
  // --------------------

  // --------------------
  // class factory
  // --------------------

  var animations = {
    beforeAddClass: beforeAddClass,
    beforeRemoveClass: beforeRemoveClass
  };

  return animations;

  // --------------------
  // functions
  // --------------------

    function beforeAddClass( element, className, done ){
      //$log.debug( 'iscFadeInBlinkOutAnimation.beforeRemoveClass' );
      if( className === 'fade-in-blink-out' ){
        TweenMax.set( element, {autoAlpha: 0, display: 'block'});//jshint ignore:line
        TweenMax.to( element, EASE_DUR, {autoAlpha: 1, onComplete: done})//jshint ignore:line
      }
      else {
        done();
      }
    }

    function beforeRemoveClass( element, className, done ){
      //$log.debug( 'iscFadeInBlinkOutAnimation.beforeAddClass' );
      if( className === 'fade-in-blink-out' ){
        TweenMax.set( element, {autoAlpha: 0, display: 'none'});
        done();
      }
      else {
        done();
      }
    }



  }// END CLASS

  // --------------------
  // inject
  // --------------------

  angular.module( 'isc.animation' )
    .animation( '.fade-in-blink-out', iscFadeInBlinkOutAnimation );

})();


