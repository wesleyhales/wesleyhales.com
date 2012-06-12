---
layout: blog
title: Pushing CDI Events to the Browser with WebSockets
tags: [html5, websocket, jboss, jetty, cdi]
preview: In this post, I give a basic demo on how to embed Jetty to add Web Socket support to and Java based server. I also how to send JavaScript events to the browser via a socket connection.
previewimage:
---

<div class="notes" >
Disclaimer: Minimal load testing was performed with 10000 concurrent WebSocket connections. You can see some true performance numbers <a href="http://webtide.intalio.com/2011/09/cometd-2-4-0-websocket-benchmarks/">here</a>.
</div>
<div class="download">
  <a href="https://github.com/wesleyhales/HTML5-Mobile-WebSocket" title="Fork me on github"><img src="/images/icons/github-icon.jpg" width="48" height="48" alt="Github Icon"></a>
  <a href="https://github.com/wesleyhales/HTML5-Mobile-WebSocket/raw/master/jboss-as-html5-mobile.war" title="download the .war"><img src="/images/icons/download.png" width="48" height="48" alt="Download"></a>
</div>
<div style="clear:both;"></div>
<p>
  
<p>Here is the demo in action. As you can see on the right, I have 2 chat windows open and on the left we have a member registration. Users are chatting across a raw WebSocket connection and when another user registers, the CDI event is fired all the way through to the browser as a JavaScript alert via the connected WebSocket clients.</p>
<iframe src="http://player.vimeo.com/video/35433707?title=0&amp;byline=0&amp;portrait=0" width="400" height="300" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>

<p>  
With WebSockets, we have a new development model for server side applications; event based programming. There are 3 out-of-box events associated with WebSockets: onopen, onmessage, and onclose. For starters, we must wire up these three listeners to utilize the core functionality that the WebSocket specification gives us. The open event is fired when the WebSocket connection is opened successfully. The message event is fired when the server sends data. The close event is fired when the WebSocket connection is closed.
</p>

<script src="https://gist.github.com/1651079.js?file=websocketBasic.js"></script>

<p>
But sending messages in the form of strings over raw WebSockets isn't very appealing when we're wanting to develop advanced web applications. Obviously, we're going to be using JSON to transfer data to and from the server. But how do we propagate our CDI events which are fired on the server and have them bubble up on the client?
</p>
<p>
First, we'll start with the server. I'm using the <a href="http://www.jboss.org/jbossas/downloads/">JBoss AS7 application server</a> and embedding <a href="http://eclipse.org/jetty/">Jetty</a> within my web application. Thanks to <a href="http://angelozerr.wordpress.com/2011/07/26/websockets_jetty_step4/">this article</a>, I was able to easily add the latest Jetty server to my maven project (dependencies below) to get everything up and running in a few minutes.
</p>
<p>
A few things worth noting:
</p>
<ul>
<li>Security: Since our WebSocket server is running on a different port (8081) than our AS7 server (8080), we must account for not having the ability to share cookies, etc...</li>
<li>Proxies: As if proxy servers weren't already a huge problem for running WebSockets and HTTP over the same port, we are now running the separately (but I have a semi-solution for this below)</li>
<li>Threading: Since we're observing/listening for CDI events, we must perform some thread same operations and connection sharing.</li>
</ul>
<p>
So, if you're still reading ;) let's get on with the code.
</p>
<p>
Download the latest <a href="http://www.jboss.org/jbossas/downloads/">JBoss AS7 (7.1.0.CR1b as of this writing)</a>
</p>
<p>
Add the Jetty maven dependencies to your project. This demo is based off of the <a href="https://github.com/jbossas/quickstart/tree/master/html5-mobile">original html5-mobile quickstart for JBoss AS7</a>.
</p>
<script src="https://gist.github.com/1651079.js?file=pom.xml"></script>

<p>
Next we setup the WebSocket server using Jetty's WebSocketHandler and embedding it inside a ServletContextListener.
Here we're sharing a synchronized set of WebSocket connections across threads. Using the synchronized keyword, we ensure that only a single thread can execute a method or block at one time. The ChatWebSocketHandler contains a global Set of webSocket connections and adds each new connection as it's made within the Jetty server
<a href="https://github.com/wesleyhales/HTML5-Mobile-WebSocket/tree/master/src/main/java/org/jboss/as/quickstarts/html5_mobile/websockets">View complete source here.</a>
</p>
<script src="https://gist.github.com/1651079.js?file=ChatWebSocketHandler.java"></script>
<script src="https://gist.github.com/1651079.js?file=ChatServerServletContextListener.java"></script>

<p>
Now we'll create a method to observe CDI events and send the fired "Member" events to all active connections.
</p>
<script src="https://gist.github.com/1651079.js?file=ChatWebSocketHandler-observer.java"></script>

<p>
The above code will observe the following event when a new Member is registered through the web interface.
</p>
<script src="https://gist.github.com/1651079.js?file=MemberService.java"></script>

<p>
Finally, we setup our WebSocket JavaScript client and safely avoid using the eval() method to execute the received JavaScript.
</p>
<script src="https://gist.github.com/1651079.js?file=websocketclient.js"></script>

<p>
Here is the JavaScript code which listens for our CDI event, and executes the necessary client side code. (This is the alert popup seen in the video above.)
</p>
<script src="https://gist.github.com/1651079.js?file=cdiJavascriptListener.js"></script> 

<p>One additional piece I added to this approach is the use of HAProxy. This gives us a reverse-proxy on the WebSocket port (8081), in the end allowing all traffic (HTTP and ws/wss) to be sent across a central port - 8080 in this case. </p>
<script src="https://gist.github.com/1651079.js?file=haproxy.config"></script>

<p>
As you can see, this is a very prototyped approach to achieve $SUBJECT, but it's a step forward in adding a usable programming layer on top of the WebSocket protocol. There's probably a few framework out there which try to provide a programming model on top of WebSockets, so leave comments if you know of any.
</p>





