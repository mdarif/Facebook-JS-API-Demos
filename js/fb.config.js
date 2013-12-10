/* JavaScript Boilerplate configuration file *
 * @version 1.0
 */
 /* Why do we need config?
  * All URLs needed by the JavaScript
  * Any strings that are displayed to the user
  * Any HTML that needs to be created from JavaScript
  * Settings (i.e., items per page)
  * Repeated unique values
  * Any value that may change in the future
 */
/*jshint forin:true, noarg:true, eqeqeq:true, bitwise:true, undef:true, curly:true, browser:true, devel:true, indent:4, maxerr:50, jquery:true */

/*jslint devel: true, nomen: true, unparam: true, sloppy: true, indent: 4 */

/*global jQuery, window*/

(function (FBDemo, undefined) {
	FBDemo.config = {
        debug : true,
		appId : '150352665021939',
		eventId : '365493146839588',
        fbPosts					:	{
			eventShare	:	{
				name: 'Facebook JS API Event',
				link: 'http://www.facebook.com/event.php?eid=',
				picture: 'http://1.gravatar.com/avatar/397d5a93a65be47799e6145b05551c89?s=70&d=http%3A%2F%2F1.gravatar.com%2Favatar%2Fad516503a11cd5ca435acc9bb6523536%3Fs%3D70&r=G',
				caption: 'Caption - Facebook JS API',
				description: 'Facebook JS API Event. Kindly join this event its compulsory for all.',
				message: 'Kindly join this event its compulsory for all.'
			}
		},
		countDownTargetDate : {
			'day' : 31,
			'month' : 12,
			'year' : 2020,
			'hour' : 12,
			'min' : 0,
			'sec' : 0
		},
		completeInfoMessage : "#complete-info-message",
		countdownDashboard : "#countdown-dashboard",
		rsvpAttending : "#rsvpattending",
		rsvpUnsure : "#rsvpunsure",
		rsvpDeclined : "#rsvpdeclined",
		peopleAttendingEvent :	"#peopleAttendingEvent",
		loginElm :	"#login",
		peopleAttending :	"#people-attending",
		pplCount :	"#pplCount",
		avatars :	"#avatars",
		logoutElm :	"#logout",
		name :	"#name",
		FBLogin :	"#login1",
		FriendsListContainer :	"#friends-list-container",
		FBLoginButton :	"#fb-login-button-div"
	};
/**
* Check to evaluate whether 'FBDemo' exists in the global namespace - if not, assign window.FBDemo an object literal
*/
}(window.FBDemo = window.FBDemo || {}, jQuery));