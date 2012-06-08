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
			this.init = function () {
				_this.FBInit();
				_this.FBLogin();
				
                return this;
            };
			
			/*
			* Click event for Fb logout
			*/
			this.FBLogin = function () {
				$(function () {
					$(FBDemo.config.FBLogin).click(function () {
						FB.getLoginStatus(function (response) {
							if (response.status === "unknown") {
								_this.facebookLogin();
							}
							else {
								FB.logout();
							}
						});
					});
				});
			};
			
			
			/*
			* Initilize Facebook
			*/
			this.FBInit = function () {
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
				
				/**
				* To determine if a user is connected to your app
				*/
				FB.getLoginStatus(function (response) {
					if (response.status === 'connected') {
						/* the user is logged in and connected to your
						* app, and response.authResponse supplies
						* the user's ID, a valid access token, a signed
						* request, and the time the access token
						* and signed request each expire
						*/
						var uid = response.authResponse.userID;
						var accessToken = response.authResponse.accessToken;
						_this.login();
					} else if (response.status === 'not_authorized') {
						_this.logout();
					}
				});
			};
			
			/*
			* Facebook login
			*/
			this.facebookLogin = function () {
				FB.login(function (response) {
					if (response.status === "connected") {
						$.log("User is logged in and granted some permissions.");
						_this.login();
					} else if ((response.status === 'not_authorized') || response.authResponse === null) {
						$.log("User has not granted permissions!");
					}
				});
			};
			
			/*
			* FB login callback
			*/
			this.login = function () {
				$(FBDemo.config.FBLogin).html("FB Logout");
				FB.api('/me', function (response) {
					$(FBDemo.config.name).show().find("p").html("Welcome " + response.name);
				});
			};
			
			/*
			* Callback for FB logout
			*/
			this.logout = function () {
				$(FBDemo.config.FBLogin).html("FB Login");
				$(FBDemo.config.name).hide().find("p").html("");
			};
			
			return this.init();
        }

        return new _facebook();
    }());

	/**
	* Check to evaluate whether 'FBDemo' exists in the global namespace - if not, assign window.FBDemo an object literal
	*/
})(window.FBDemo = window.FBDemo || {}, jQuery);