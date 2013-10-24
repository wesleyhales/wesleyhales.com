---
layout: blog
title: Basic Screen Updates with Angular and requestAnimationFrame
tags: [rAF,requestAnimationFrame,angular,angularjs,setinterval,settimeout,jank]
preview: This post shows how to deliver a more performant UI replacing setInterval with requestAnimationFrame for 1 second screen updates.
previewimage: /images/icons/angular-small.PNG
---
<br/>
## Overview
Some of the best known approaches for running a countdown or count-up timer in AngularJS are shown on JSFiddle using [setInterval](http://jsfiddle.net/IgorMinar/ZSBhg/2/) and
Angular's builtin [$timeout](http://jsfiddle.net/ganarajpr/LQGE2/).

<iframe width="100%" height="300" src="http://jsfiddle.net/IgorMinar/ZSBhg/2/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

Both approaches require the use of $scope.$apply, which is completely normal. It forces the page/bindings to update when a change
is made outside of the AngularJS lifecycle (like inside a setInterval or setTimeout).
If you want to read more about $scope.$apply check out [this article](http://jimhoskins.com/2012/12/17/angularjs-and-apply.html).

For this particular case, I need a countdown timer on the page. Basically it sits in the upper right hand corner of the page and lets
the user know when it's about to refresh the data.

[<img src="/images/posts/2013-10-23/dashboard.PNG" alt="apigee app services dashboard" class="marginTop10 max-width-100">](https://apigee.com/usergrid/dash/app/index-ma.html)

I finally got a chance to analyze the performance of updating the page every second with a simple timer and couldn't believe how much jank it was causing.
There are a lot of good articles and videos explaining jank and how to debug, but Paul Irish made a really good short video and I advise you
 check it out [here](http://www.youtube.com/watch?v=mSK70FwUz2A).

If we look at the frame rate on the recommended way of using setInterval, we see horrible performance:
[<img src="/images/posts/2013-10-23/bad-fps.PNG" alt="bad fps jank" class="marginTop10 max-width-100">](/images/posts/2013-10-23/bad-fps.PNG)
Yep, That's 1 FPS spikes with a continuous stream of 9 frames per second. Ouch.

Also, if you look at the memory being consumed, we're taking quite a hit for this little counter.
[<img src="/images/posts/2013-10-23/bad-memory.PNG" alt="bad fps jank" class="marginTop10 max-width-100">](/images/posts/2013-10-23/bad-memory.PNG)
We maintain around 25MB and then shoot up to 34 when the page does its refresh.
<br/>
<br/>
## rAF to the rescue!
I'm still trying to bring requestAnimationFrame into my dev thought process, and this was a fine chance to see if it could save the day.
Here's the code I put together:
<iframe width="100%" height="300" src="http://jsfiddle.net/wesleyhales/59SeE/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

And now, when we look at our frame rate in Chrome dev tools we get a fairly consistent 60 FPS:
[<img src="/images/posts/2013-10-23/good-fps.PNG" alt="good fps" class="marginTop10 max-width-100">](/images/posts/2013-10-23/good-fps.PNG)

Also the memory footprint is greatly reduced:
[<img src="/images/posts/2013-10-23/good-memory.PNG" alt="good fps" class="marginTop10 max-width-100">](/images/posts/2013-10-23/good-memory.PNG)
Cruising at 9.3MB instead of the 25MB we were getting before bringing in rAF.

A lot of the performance overhead is based on the AngularJS framework itself. It could be stuff I need to refactor and make better or it might just be the
framework lifecycle. I need to get a baseline on the AngularJS runtime before I can make any assumptions (or point fingers).
This is my first perf analysis of the framework and I plan on doing much more in the coming months.
<br/>
<br/>