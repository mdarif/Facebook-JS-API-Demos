# [Facebook-JS-API-Demos](https://github.com/mdarif/Facebook-JS-API-Demos)

The Facebook Platform allows anyone to build social applications on Facebook and the Web. To enable you to build such applications, Facebook offers an extensive collection of core and advanced APIs and SDKs. 

We have tried to develop some working examples of core features provided by Facebook API. Many times when we search on internet for a particular solution we found very complex example which is very difficult to understand so our purpose is to provide working example at a very basic level so that anyone can understand the implementation of Facebook API easily

## Facebook APIs

### Login
Facebook Login makes it easy to connect with users on your app or website. You can use several methods in the JavaScript or mobile SDKs to speed up the registration process and build a functional system in minutes.

### Graph API
The Graph API presents a simple, consistent view of the Facebook social graph, uniformly representing objects in the graph and the connections between them.

### FQL
Facebook Query Language, or FQL, enables you to use a SQL-style interface to query the data exposed by the Graph API. It provides for some advanced features not available in the Graph API such as using the results of one query in another.

## Prerequisites
* Local Server
* Facebook JS API Demos package
* Facebook App ID (http://www.hyperarts.com/blog/how-to-create-facebook-application-to-get-an-app-id-for-your-website/)

## Demos

### Main Demos
* Event
* Like
* Login
* Open Graph

### Settings

fb.config.js file contains configuration information related to this project. When the program is executed, it consults the configuration file to see what parameters are in effect. Some important parameters are highlighted below.

- ####appId
Contain Facebook app id used throughout project. Create your own app and change it here. See this [tutorial](http://stackoverflow.com/questions/3203649/where-can-i-find-my-facebook-application-id-and-secret-key) on how to create app using Facebook.

- ####eventId
Contain Facebook event id. A Facebook event is a calendar-based resource which can be used to notify users of upcoming occasions. Events can be created by anyone, and can be open to anyone or private. The creator can invite his friends, members of a group, or fans of a page. Learn more about Facebook [event](https://www.facebook.com/help/events) here.

- ####fbPosts.eventShare
Contain information related to the Facebook event. This information will be share on user wall after accepting the event request. Shared information contains name, link, picture, caption, description, message for event.

- ####countDownTargetDate
Contain event date. Used to show graphical representation of time remaining in event on event page.


## Quick start
- Clone the git repo - `git clone git://github.com/mdarif/Facebook-JS-API-Demos.git` - or [download it](https://github.com/mdarif/Facebook-JS-API-Demos/zipball/master)
- Download and install local server on your machine
- Put the FB demo packages in the root folder of localhost server
- Change the FB app id or event id in js/fb.config.js file
- Open http://localhost on any browser on your machine

## Contributing

Anyone and everyone is welcome to [contribute](#).


## Project information

* Source: https://github.com/mdarif/Facebook-JS-API-Demos


## License

* MIT/GPL license


## Author

* Mohammed Arif [@arif_iq](http://twitter.com/arif_iq), [github](https://github.com/mdarif)