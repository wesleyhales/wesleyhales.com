---
layout: blog
title: Going Mobile With RichFaces 4 - Part 1&#58; Drag and Drop
tags: [Java, jquery, jsf, richfaces]
---

<p><p><a href="http://www.jboss.org/richfaces/">Richfaces 4</a> just reached Milestone 6 and now would be a great time for the community to step up and check how the components run on mobile platforms.<br /> 
First off, Richfaces 4 currently does not offer mobile support but it is definitely the direction they are heading. And the RF team has taken all the necessary steps to allow the client side code to be extended and improved by way of jQuery.</p></p> 

<p><p>Today I am going to add touch support to the RF drag and drop component. We all know that touch events and gestures are not the same as a mouse click. So one must consider a couple of different approaches before implementing a final solution:</p></p> 

<p><p>1) Override the default touch events with their mouse counterparts.<br /> 
This is easy since you are basically overriding the default functionality of touch and gesture events. There are 3 mouse events to replace to get this component working:<br /> 
touchstart,touchmove,touchend</p></p> 

<p><p>2) Extend jQuery core components and add the “drag” functionality alongside “touch”<br /> 
A little more difficult and fortunately the jQuery team is working on the mobile upgrade to ui.draggable &#8211; so this should be available in the next few weeks/months.</p></p> 

<p><object width="480" height="390"><param name="movie" value="http://www.youtube.com/v/Exs1jumZ4yk?fs=1&hl=en_US"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/Exs1jumZ4yk?fs=1&hl=en_US" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="480" height="390"></embed></object>(tested on live iPhone4 and iOS simulator iPad)</p> 

<p><p>I originally started out using the touch and gesture events to do the drag and drop. This allowed for a smoother UX but unfortunately, the internal plumbing of Richfaces required a complex extension/wrap of rf.ui.draggable (to add the new touch functions) and some custom bindings like rf.Event.bind(this.dragElement, &#8216;touchstart&#8216;+this.namespace&#8230;.) in dnd-draggable.js.<br /> 
In the end, it was just easier for me to use <a href="https://github.com/furf/jquery-ui-touch-punch/blob/master/jquery.ui.touch-punch.js">this script</a> and re-map the 3 main touch events.</p></p> 

<p><p>I looked at many different approaches starting with SenchaTouch which btw is pointless if you are going to leverage existing jQuery, then moving to a few different jQuery utilities.<br /> 
The basic question here, which can be applied to any component framework, is “What’s the best mobile approach for supporting product xyz?” Every product out there that touches the UI has to cross this gap. Touch interfaces today&#8230; tangible UI’s tomorrow&#8230; and the vicious cycle continues. And majority of the time, the best way to get started is to build an emulator so that your product can work today. This will buy you the time to build the native functionality that takes full advantage of the target platform.<br /> 
Unfortunately the script I used here doesn’t always work and there are still a few more components in Richfaces that do not work with this duck punch approach. So I will try to make this a series and blog about &#38; fix the other components on mobile platforms.</p></p> 

<p><p>The old days of drag and drop are not as simple as they used to be. With multi touch surfaces you have the ability to accelerate your drag and throw it across the page, rotate it, and auto scrolling when you drag the object off the page, etc... Just something to think about when designing a similar component.</p></p>
