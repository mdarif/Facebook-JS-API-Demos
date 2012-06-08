/* Author: SapientNitro (2011) (http://www.sapient.com)
 * @version 1.0
 */
 
/*jshint forin:true, noarg:true, eqeqeq:true, bitwise:true, undef:true, curly:true, browser:true, devel:true, indent:4, maxerr:50, jquery:true */

/*jslint devel: true, nomen: true, unparam: true, sloppy: true, indent: 4 */


(function (FBDemo, undefined) {
	
	FBDemo.config = {
        debug : true,
		appId : '150464368418193',
		eventId : '425572280800968',
		fbPosts					:	{
			eventShare	:	{
				method: 'feed',
				name: 'Dummy Event',
				link: 'http://www.facebook.com/event.php?eid=' + this.eventId,
				picture: 'http://1.gravatar.com/avatar/397d5a93a65be47799e6145b05551c89?s=70&d=http%3A%2F%2F1.gravatar.com%2Favatar%2Fad516503a11cd5ca435acc9bb6523536%3Fs%3D70&r=G',
				caption: 'Dummy event for testing',
				description: 'This is the dummy event. Please join this event its compulsory for all.',
				message: 'Please join this event its compulsory for all.'
			}
		},
		countDownTargetDate		: {
			'day' : 31,
			'month' : 12,
			'year' : 2020,
			'hour' : 12,
			'min' : 0,
			'sec' : 0
		},
		completeInfoMessage : "#complete_info_message",
		countdownDashboard : "#countdown_dashboard",
		rsvpAttending : "#rsvpattending",
		rsvpUnsure : "#rsvpunsure",
		rsvpDeclined : "#rsvpdeclined",
		peopleAttendingEvent :	"#peopleAttendingEvent",
		loginElm :	"#login",
		peopleAttending :	"#people_attending",
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
})(window.FBDemo = window.FBDemo || {}, jQuery);