/* Facebook Event implementation main scripting file *
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

/*jslint devel: true, nomen: true, unparam: true, sloppy: true, indent: 4, newcap:true */

/*global FB:false, jQuery, window*/

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
			/**
			* Object of the current object
			*/
			var _this = this;
			/**
			* Store whether user has granted rsvp_event permission
			*/
			this.hasUserGrantedRSVPPermission = false;
			/*
			* Store user's decision for the event (i.e. whether user is attending, declined or unsure)
			*/
			this.eventAction = '';
			/**
			* Init call
			* Call various methods require by pages after load
			*/
			this.init = function () {
				_this.FBInit();
				_this.showCountdown();
				_this.fbPublish();
				_this.attachEvents();
                return this;
            };
			/*
			* Start countdown
			*/
			this.showCountdown = function () {
				$(FBDemo.config.completeInfoMessage).hide();
				$(FBDemo.config.countdownDashboard).countDown({
					targetDate: FBDemo.config.countDownTargetDate,
					omitWeeks: true,
					onComplete: function () {
						$(FBDemo.config.completeInfoMessage).slideDown();
					}
				});
			};
			/*
			* Attach events on various buttons
			*/
			this.attachEvents = function () {
				$(FBDemo.config.rsvpAttending).on("click", function () {
					_this.removeHighlight($(this));
					_this.rsvpattending();
				});
				$(FBDemo.config.rsvpUnsure).on("click", function () {
					_this.removeHighlight($(this));
					_this.rsvpunsure();
				});
				$(FBDemo.config.rsvpDeclined).on("click", function () {
					_this.removeHighlight($(this));
					_this.rsvpdeclined();
				});
				$(FBDemo.config.peopleAttendingEvent).on("click", function () {
					_this.peopleAttendingEvent();
				});
			};
			/*
			* Remove class highlight from the buttons
			*/
			this.removeHighlight = function (elm) {
				$(FBDemo.config.rsvpAttending + ", " + FBDemo.config.rsvpUnsure + ", " + FBDemo.config.rsvpDeclined).removeClass("highlight");
				elm.addClass("highlight");
			};
			/*
			* Initialize Facebook
			*/
			this.FBInit = function () {
				FB.init({
					appId: FBDemo.config.appId,
					status: true,
					cookie: true,
					xfbml: true,
					oauth: true
				});
				/*
				* All the events registered
				*/
				FB.Event.subscribe('auth.login', function () {
					/*
					* Do something when user logs in
					*/
					_this.login();
				});
				FB.Event.subscribe('auth.logout', function () {
					/*
					* Do something when user logs out.
					*/
					_this.logout();
				});
				/*
				* If the user is already has a Facebook session before he visits our page, check if this person has the
				* required permission.
				*/
				FB.getLoginStatus(function (response) {
					if (response.status === "connected") {
						_this.hasUserGrantedRSVPPermission = true;
					}
				});
			};
			/*
			* Hide login element when user logout from Facebook
			*/
			this.logout = function () {
				$(FBDemo.config.loginElm).css("display", "none");
			};
			/*
			* This method perform two tasks
			*		- If user has already granted rsvp permission, directly post his response
			*		- If user has not granted rsvp permission or if the user is not currently logged in then log him in first
			*/
			this.rsvpattending = function () {
				if (_this.hasUserGrantedRSVPPermission === true) {
					_this.myEventDecision('attending');
				} else {
					_this.loginToFacebook('attending');
				}
			};
			/*
			* This method perform two tasks
			*		- If user has already granted rsvp permission, directly post his response
			*		- If user has not granted rsvp permission or if the user is not currently logged in then log him first.
			*/
			this.rsvpdeclined = function () {
				if (_this.hasUserGrantedRSVPPermission === true) {
					_this.myEventDecision('declined');
				} else {
					_this.loginToFacebook('declined');
				}
			};
			/*
			* This method perform two tasks
			*		- If user has already granted rsvp permission, directly post his response
			*		- If user has not granted rsvp permission or if the user is not currently logged in then log him first.
			*/
			this.rsvpunsure = function () {
				if (_this.hasUserGrantedRSVPPermission === true) {
					_this.myEventDecision('maybe');
				} else {
					_this.loginToFacebook('maybe');
				}
			};
			/*
			* This function will log the user in to Facebook.
			* As soon as the user is logged in, the login event handler will trigger and users rsvp will be posted automatically, see function login () for details
			*/
			this.loginToFacebook = function (action) {
				_this.eventAction = action;
				FB.login(function (response) {
					if (response.authResponse) {
						if (response.scope) {
							/* 
							* User is logged in and granted some permission.
							* Scope is a comma separated list of granted permissions
							*/
							if (response.status.toString() === "connected") {
								_this.hasUserGrantedRSVPPermission = true;
							}
						} else {
							/*
							* User is logged in, but did not grant any permissions
							*/
							_this.hasUserGrantedRSVPPermission = false;
						}
					} else {
						/*
						* User is not logged in
						*/
						_this.hasUserGrantedRSVPPermission = false;
					}
				}, {
					scope: 'read_stream,publish_stream,offline_access,rsvp_event'
				});
			};
			/* 
			* This is the login event-handler.  As soon as the user logs in, this event handler is triggered.
			*/
			this.login = function () {
				/*
				* This is simply setting up the label
				*/
				FB.api('/me', function (response) {
					$(FBDemo.config.loginElm).css("display", "block").html(response.name + " succsessfully logged in!");
					$.log("login response.authResponse: " + response.authResponse);
				});
				/*
				* Depending on user's decision, update user's rsvp decision.
				*/
				_this.myEventDecision(_this.eventAction);
			};
			/*
			* This method makes a post request for rsvp.
			*/
			this.myEventDecision = function (action) {
				if (_this.hasUserGrantedRSVPPermission === true &&  action !== '') {
					var msg = 'testeventattending';
					FB.api('/' + FBDemo.config.eventId + '/' + action, 'post', {
						message: msg
					}, function (response) {
						if (!response || response.error) {
							$.log('Error occured: ' + response.error);
						} else {
							$.log("myEventDecision call success: " + response);
						}
					});
				}
			};
			/*
			* Here you can parse the response and get all the people that are attending and display their profile pic on the ui.
			*/
			this.peopleAttendingEvent = function () {
				$(FBDemo.config.avatars).html('');
				FB.api({
					method: 'fql.query',
					query: 'SELECT uid, rsvp_status FROM event_member WHERE eid in "' + FBDemo.config.eventId + '"'
				}, function (response) {
                    var i,
                        imgSrc;
					$(FBDemo.config.pplCount).html(response.length);
					for (i = 0; i < response.length; i += 1) {
						imgSrc = "http://graph.facebook.com/" + response[i].uid + "/picture";
						$(FBDemo.config.avatars).append("<div><img src='" + imgSrc + "' width='38' height='38' /></div>");
					}
					$(FBDemo.config.peopleAttending).show();
				});
			};
			/*
			* FB share UI
			*/
			this.fbPublish = function () {
				$(".post-to-fb").on("click", function () {
					var shareInfo = FBDemo.config.fbPosts.eventShare;
					shareInfo.method = 'feed';
					shareInfo.link = shareInfo.link + FBDemo.config.eventId;
					FB.ui(shareInfo, function (response) {
						if (response && response.post_id) {
							$.log('Post was published.');
						} else {
							$.log('Post was not published.');
						}
					});
				});
			};
            return this.init();
        }

        return new _facebook();
    }());

/**
* Check to evaluate whether 'FBDemo' exists in the global namespace - if not, assign window.FBDemo an object literal
*/
}(window.FBDemo = window.FBDemo || {}, jQuery));