/**
 * Created by douglas goodman on 2/2/15.
 */

(function(){
  'use strict';

  angular.module( 'isc.animation' )
    .animation( '.scroll-stick', iscScrollStickAnimation );

  /* @ngInject */
  /**
   * @memberof core-ui-animation
   * @ngdoc animation
   * @name iscScrollStickAnimation
   * @param devlog
   * @param $window
   * @param TweenMax
   * @param EASE_DUR
   * @returns {{beforeAddClass: beforeAddClass, beforeRemoveClass: beforeRemoveClass}}
     */
  function iscScrollStickAnimation( devlog, $window,  TweenMax, EASE_DUR ){

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

    /**
     * @memberof iscScrollStickAnimation
     * @param element
     * @param className
     * @param done
       */
    function beforeAddClass( element, className, done ){
      devlog.channel('iscScrollStickAnimation').debug( 'iscScrollStickAnimation.beforeAddClass' );

      if( className === 'scroll-stick' ){

        var params = getParams();

        var css = {
          position: 'fixed',
          top: params.top,
          border: '1px solid rgba(0,0,0,.35)',
          backgroundColor: 'rgba(255,255,255,1)',
          boxShadow: '7px 7px 20px 0px rgba(0,0,0,0.25)',
          padding: '10px',
          width: params.width,
          left: params.margin
        };

        var options = {
          css: css,
          ease: Power2.easeOut,//jshint ignore:line
          onComplete: done
        };

        TweenMax.to( element, EASE_DUR, options );
      }
      else {
        done();
      }
    }

    /**
     * @memberof iscScrollStickAnimation
     * @param element
     * @param className
     * @param done
       */
    function beforeRemoveClass( element, className, done ){
      devlog.channel('iscScrollStickAnimation').debug( 'iscScrollStickAnimation.beforeRemoveClass' );

      if( className === 'scroll-stick' ){

        var css = {
          position: 'relative',
          top:'0px',
          left: 0,
          width:'100%',
          paddingLeft: '0px',
          paddingBottom: '5px',
          backgroundColor: 'rgba(255,255,255,0)',
          border: '1px solid rgba(0,0,0,0)',
          boxShadow: '0px 0px 0px 0px rgba(0,0,0,0)'
        };

        var options = {
          css: css,
          ease: Power2.easeOut,//jshint ignore:line
          onComplete: onRemoveComplete,
          onCompleteParams:[element, done]

        };

        TweenMax.to( element, EASE_DUR, options );
      }
      else {
        done();
      }
    }

    /**
     * @memberof iscScrollStickAnimation
     * @param elem
     * @param done
       */
    function onRemoveComplete( elem, done ){
      //TweenMax.set( elem, {autoAlpha:0});
      done();
    }

    /**
     * @memberof iscScrollStickAnimation
     * @param elem
     * @returns {{width: number, margin: number, top: number}}
       */
    function getParams( elem ){//jshint ignore:line
      var winW = $window.innerWidth;
      var tabletOrlarger = winW >= 960;
      var margin = tabletOrlarger? 50 : 20;
      var top = tabletOrlarger ? 5 : 20;
      var scrollbarWidth = 20; // we can assume that if this gets triggered, there's a scrollbar

      return {
        width: winW - (margin * 2) - scrollbarWidth,
        margin: margin,
        top: top
      };
    }

  }// END CLASS


})();
