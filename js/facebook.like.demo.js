/* Facebook implementation main scripting file *
 * Author: SapientNitro (2011) (http://www.sapient.com)
 * @version 1.0
*/

/* FBDemo (our namespace name) and undefined are passed here 
 * To ensure 1. Namespace can be modified locally and isn't 
 * overwritten outside of our function context
 * 2. The value of undefined is guaranteed as being truly 
 * Undefined. This is to avoid issues with undefined being 
 * Mutable pre-ES5.
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
        } /*else {
            alert(message);
        }*/
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
				_this.fbAsyncInit();
                return this;
            };
			/*
			* Initialize Facebook
			*/
			this.fbAsyncInit = function () {
				FB.init({
					appId: FBDemo.config.appId,
					status: true,
					cookie: true,
					xfbml: true
				});
				FB.Event.subscribe('auth.login', function () {
					_this.login();
				});
				FB.Event.subscribe('auth.logout', function () {
					_this.logout();
				});
				/*
				* If the user is already has a Facebook session before he visits our page, check if this person has the
				* required permission.
				*/
				FB.getLoginStatus(function (response) {
					$.log(response);
					if (response.session) {
						$.log("response.perms: " + response.perms);
					}
				});
			};
			/*
			* Callback for FB login
			*/
			this.login = function () {
				$.log("Login!!!");
			};
			/*
			* Callback for FB logout
			*/
			this.logout = function () {
				$.log("Logout!!!");
			};
			return this.init();
        }

        return new _facebook();
    }());

	/**
	* Check to evaluate whether 'FBDemo' exists in the global namespace - if not, assign window.FBDemo an object literal
	*/
})(window.FBDemo = window.FBDemo || {}, jQuery);