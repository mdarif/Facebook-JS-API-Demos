/* Facebook JS API Demo main scripting file *
 * Author: Mohammed Arif
 * @version 1.0
*/

var FBDemo = FBDemo || {};

(function(window, FBDemo,$){

    /**
     * Logging function, for debugging mode
     */
    jQuery.log = function(message) {
        if( debug && (typeof window.console != 'undefined' && typeof window.console.log != 'undefined') && console.debug ) {
            console.debug(message);
        } else {
            //alert(message);
        }
    };

    FBDemo.module = (function () {
        function _playDemo() {
            /**
             * Init call
             */
            var _this = this;

            this.callParams = {};
            this.objMsgDetail = {
                    message: FBDemo.config.postMessage,
                    picture:FBDemo.config.fbMessage.picture,
                    link:FBDemo.config.fbMessage.link,
                    name:FBDemo.config.fbMessage.name,
                    caption:FBDemo.config.fbMessage.caption,
                    description:FBDemo.config.fbMessage.description
                };
			
           /**
            * Feed Dialog prompts the user to publish an individual story to a profile's feed. This does not require any extended permissions.
            */
            this.postToFeed = function() {
                FB.ui(_this.objMsgDetail, _this.postToFeedCallback);
            }

            this.postToFeedCallback = function (response) {
                if ( response !== null ){
                    $.log("Post ID: " + response['post_id']);
                }
            }

           /**
            * Post message on to user's wall without dialog box
            */
            this.silentPostMessageFBProfile = function(){
                FB.api('/me/feed', 'post', _this.objMsgDetail, function(response) {
                    if (!response || response.error) {
                        $.log('Error occured');
                    } else {
                        $.log('Post ID: ' + response.id + " posted!!!");
                    }
                });
            }

           /**
            * Invite Friends while sending the notification to their notification boxes
            */
            this.sendRequestViaMultiFriendSelector = function () {
                FB.ui({
                    method: 'apprequests',
                    message:FBDemo.config.fbMessage.notificationBoxMsg
                }, _this.requestCallback);

            };

            /**
            * Callback - to fetch out the FB Friends name using graph api and put their names to the user's wall
            */
            this.requestCallback = function(response) {
                var arrFriendsName = [];
                if ( (response !== 'undefined') && (response !== null) && (response.request && response.to) ) {
                    var request_ids = [];
                    var noOfFriends = response.to.length;
                    for(i=0; i<noOfFriends; i++) {
                        var temp = response.request + '_' + response.to[i];
                        var friend_id = response.to[i];
                        $.log("friend_id: " + friend_id)
                        FB.api('/'+friend_id+'', function(response) {
                            arrFriendsName.push(response.name);
                            if (arrFriendsName.length === noOfFriends) {
                                postMessageFBProfile(VW.config.fbMessage.invitePostMsg, noOfFriends, arrFriendsName);
                            }
                        });
                        request_ids.push(temp);
                    }
                }
            };

            this.fbReady = function(){
                /**
                 * This code loads the SDK asynchronously so it does not block loading other elements of your page. This is particularly important to ensure fast page loads for users and SEO robots.
                 */
                window.fbAsyncInit = function() {
                    FB.init({
                        appId: '150352665021939',
                        status: true,
                        cookie: true,
                        xfbml: true
                    });

                    /**
                     * The FB.Event.subscribe is used to subscribe to login events
                     */
                    FB.Event.subscribe('auth.login', function() {
                        // do something when user logs in
                        //_this.login();
                    });

                    /**
                     * The FB.Event.subscribe is used to subscribe to logout events
                     */
                    FB.Event.subscribe('auth.logout', function() {
                        // do something when user logs out.
                        //_this.logout();
                    });

                    /**
                     * To determine if a user is connected to your app
                     */
                    FB.getLoginStatus(function(response) {
                        if (response.status === 'connected') {
                            // the user is logged in and connected to your
                            // app, and response.authResponse supplies
                            // the user's ID, a valid access token, a signed
                            // request, and the time the access token
                            // and signed request each expire
                            var uid = response.authResponse.userID;
                            var accessToken = response.authResponse.accessToken;
                            $.log("uid: "+uid + "\nAccess Token: " + accessToken);
                        //isLikeUrl ();
                        } else if (response.status === 'not_authorized') {
                            $.log("The user is logged in to Facebook but not connected to the app");
                        }
                    });
                };

                /**
                 * Load the SDK Asynchronously
                 */
                (function(d){
                    var js, id = 'facebook-jssdk';
                    if (d.getElementById(id)) {
                        return;
                    }
                    js = d.createElement('script');
                    js.id = id;
                    js.async = true;
                    js.src = "//connect.facebook.net/en_US/all.js";
                    d.getElementsByTagName('head')[0].appendChild(js);
                }(document));
            }

            /**
             * facebookLogin - FB.login prompts the user to authorize your application
             */
            this.facebookLogin = function () {
                FB.login(function(response) {
                    if (response.status === "connected") {
                        $.log("User is logged in and granted some permissions.");
                    } else if ( (response.status === 'not_authorized')  || response.authResponse === null) {
                        $.log("User has not granted permissions!");
                    }
                }, {
                    scope:'publish_stream'
                });
            }

            this.init = function () {
                _this.fbReady();
                return this;
            };

            return this.init();
        }

        return new _playDemo();
    }());
})(window, FBDemo, jQuery)