'use strict';

PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST

jQuery.cachedScript = function( url, options ) {

  // Allow user to set any option except for dataType, cache, and url
  options = $.extend( options || {}, {
    dataType: "script",
    cache: true,
    url: url
  });

  // Use $.ajax() since it is more flexible than $.getScript
  // Return the jqXHR object so we can chain callbacks
  return jQuery.ajax( options );
};

$(function()
{
	$.ajaxSetup({
	  cache: true
	});
	$.getScript('scripts/engine.js' )
	$.getScript('scripts/entity.js' )
	$.getScript('scripts/environment.js' )
	$.getScript( "scripts/asset.js" ).done(function( script, textStatus ) {
	  	console.log( "YOOLOO" );
		$.getScript('assets/dwarves.js').done(function () {
			Micro.Asset.onLoad('dwarves', function () {
				Micro.stage.addChild(Micro.Sprites['dwarves'][1]);
			})
		})
		$.getScript('assets/PrtWeed.js').done(function () {Micro.Asset.onLoad('PrtWeed')})
		animate()
	});
});
