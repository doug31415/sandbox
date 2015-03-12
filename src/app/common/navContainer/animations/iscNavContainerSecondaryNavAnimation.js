/**
 * Created by douglas goodman on 2/2/15.
 */

(function(){
  'use strict';

  iscNavContainerSecondaryNavAnimation.$inject = ['$log', 'iscAnimationService', 'TweenMax', 'EASE_DUR'];

  function iscNavContainerSecondaryNavAnimation( $log, iscAnimationService, TweenMax, EASE_DUR ){

  // --------------------
  // vars
  // --------------------

    // the side nav slide-in menu was moved from within the navContainer to within each page
    // so the offset is to compensate
    var Y_OFFSET = 140;

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
      //$log.debug( 'iscNavContainerSecondaryNavAnimation.beforeAddClass' );

      if( className === 'secondary-nav' ){

        var width = iscAnimationService.getNavWidth();
        var height = iscAnimationService.getSecondaryNavHeight( element.height() );

        // set the w and h now, since the other calcs are dependent on that
        TweenMax.set( element, {autoAlpha:1, width: width, height: height});

        // when its inside the nav container
        //var xPos = iscAnimationService.isPhone() ? -10 : iscAnimationService.getElementCenterXpos( width );
        //var yPos = -height - 50; // -50 ensures its offstage
        //var yPosEnd = iscAnimationService.isPhone() ? -5 : iscAnimationService.getElementCenterYpos( height );

        // when its inside the page
        var xPos = iscAnimationService.isPhone() ? -20 : iscAnimationService.getElementCenterXpos( width ) - 25;
        var yPos = -height - 50; // -50 ensures its offstage
        var yPosEnd = iscAnimationService.isPhone() ? -85 : iscAnimationService.getElementYPos( height, Y_OFFSET );

        //$log.debug( '...element.height()',element.height() );
        //$log.debug( '...height',height );
        //$log.debug( '...yPos',yPos );

        TweenMax.set( element, {x:xPos, y: yPos});
        TweenMax.to( element, EASE_DUR, { ease: Power2.easeOut, y: yPosEnd, onComplete: done });
      }
      else {
        done();
      }
    }

    function beforeRemoveClass( element, className, done ){
      //$log.debug( 'iscNavContainerSecondaryNavAnimation.beforeRemoveClass' );
      if( className === 'secondary-nav' ){
        var yPos = -element.height() - Y_OFFSET;
        TweenMax.to( element, EASE_DUR, { ease: Power2.easeOut, y: yPos, onComplete: onRemoveComplete, onCompleteParams:[element, done] });
      }
      else {
        done();
      }
    }

    function onRemoveComplete( elem, done ){
      TweenMax.set( elem, {autoAlpha:0});
      done();
    }

  }// END CLASS

  // --------------------
  // inject
  // --------------------

  angular.module( 'iscNavContainer' )
    .animation( '.secondary-nav', iscNavContainerSecondaryNavAnimation );

})();


