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
				_this.FBInit();
				_this.FBLogout();
				$.log($(FBDemo.config.logoutElm).html());
                return this;
            };
			/*
			* Click event for FB logout
			*/
			this.FBLogout = function () {
				$(FBDemo.config.logoutElm).on("click", function () {
					FB.getLoginStatus(function (response) {
						if (response.status === "unknown") {
							FB.login();
						} else {
							FB.logout();
						}
					});
				});
			};
			/*
			* Initialize Facebook
			*/
			this.FBInit = function () {
				FB.init({
					appId: FBDemo.config.appId,
					status: true,
					cookie: true,
					xfbml: true
				});
				FB.Event.subscribe('auth.login', function () {
					_this.logout();
				});
				FB.Event.subscribe('auth.logout', function () {
					_this.login();
				});
				FB.getLoginStatus(function (response) {
					if (response.status === "unknown") {
						_this.login();
					} else {
						_this.logout();
					}
				});
			};
			/*
			* If we don't have a session (which means the user has been logged out, redirect the user)
			* If we do have a non-null response.session, call FB.logout(),
			* The JS method will log the user out of Facebook and remove any authorization cookies
			*/
			this.handleSessionResponse = function (response) {
				if (!response.session) {
					return;
				}
				FB.logout(_this.handleSessionResponse);
			};
			/*
			* Callback for FB login
			*/
			this.login = function () {
				$(FBDemo.config.logoutElm).html("FB Login");
				$(FBDemo.config.name).hide().find("p").html("");
			};
			/*
			* Callback for FB logout
			*/
			this.logout = function () {
				$(FBDemo.config.logoutElm).html("FB Logout");
				FB.api('/me', function (response) {
					$(FBDemo.config.name).show().find("p").html("Welcome " + response.name);
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