/* Author: SapientNitro (2011) (http://www.sapient.com)
 * @version 1.0
*/

/* FBDemo (our namespace name) and undefined are passed here 
 * to ensure 1. namespace can be modified locally and isn't 
 * overwritten outside of our function context
 * 2. the value of undefined is guaranteed as being truly 
 * undefined. This is to avoid issues with undefined being 
 * mutable pre-ES5.
*/
/*jshint forin:true, noarg:true, eqeqeq:true, bitwise:true, undef:true, curly:true, browser:true, devel:true, indent:4, maxerr:50, jquery:true */

/*jslint devel: true, nomen: true, unparam: true, sloppy: true, indent: 4 */

/*global FB:false*/

(function (FBDemo, $, undefined) {
	
	/**
     * Logging function, for debugging mode
     */
	jQuery.log = function (message) {
        if (FBDemo.config.debug && (typeof window.console !== 'undefined' && typeof window.console.log !== 'undefined') && console.debug) {
            console.debug(message);
        } else {
            //alert(message);
        }
    };

    FBDemo.facebook = (function () {
        function _facebook() {
            
			/*
			* Object of the current object
			*/
			var _this = this;
			
			/**
			* Init call
			* Call various methods require by pages after load
			*/
			this.init = function (eParam) {
				_this.FBInit();
                return this;
            };
			
			/*
			* Initilize Facebook
			*/
			this.FBInit = function () {
				FB.Event.subscribe('auth.statusChange', _this.onFacebookStatusChange);
				FB.init({
					appId  : FBDemo.config.appId,
					status : true,
					cookie : true,
					xfbml  : true
				});
			};
			
			return this.init();
        }

        return new _facebook();
    }());

	/**
	* Check to evaluate whether 'FBDemo' exists in the global namespace - if not, assign window.FBDemo an object literal
	*/
})(window.FBDemo = window.FBDemo || {}, jQuery);