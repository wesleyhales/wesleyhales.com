---
layout: blog
title: Adventures with the Skia Debugger
tags: [frontend, html, css, graphics, debug]
preview: This post talks about my personal experiences in 2012. It was a year filled with fun, stress and craziness all to better understand the movement towards HTML5.
previewimage: /images/icons/skia.PNG
---
<br/>
<h3>Debugging jank, reflows, etc...</h3>
The [Skia debugger](https://sites.google.com/site/skiadocs/developer-documentation/skia-debugger) was mentioned a few weeks ago at EdgeConf as a way to examine how the DOM is loaded and processed in the Chromium web browser. Skia is the open source C++ graphics library backing Chromium/Chrome. It comes with a graphical tool used to step through and analyze the contents of the skia picture format.

If you haven’t watched [this video](http://www.youtube.com/watch?v=3-WYu_p5rdU), I recommend you take a few minutes and watch the first part to understand the context of why the Skia debugger was mentioned and where it might be useful. For the impatient, there was a lot of talk around image decoding and scrolling. This morphed into a discussion about bounce rates and how scrolling really matters from an experience standpoint. Basically, if you’re scrolling sucks, users do a lot less and bounce quicker.

Overall, it sparked my curiosity to see if I could get a visual understanding of reflow happening on web sites/apps... much like this FF3 reflow video from a few years ago.

<iframe width="420" height="315" src="http://www.youtube.com/embed/ZTnIxIA5KGw" frameborder="0" allowfullscreen></iframe>
Although the Skia debugger doesn't give us a nice video with animations (like shown above), it does give some really good info on how graphics are drawn into the browser.
This [blog post](http://blog.mozilla.org/gen/2009/04/09/how-to-make-your-own-gecko-reflow-video/) explains how the above video was created with FF 3.1, but I’m not sure if anyone has attempted it with the latest Firefox build... and there is no visual debugger afaik. I did hear one of the panel members mention a Firefox “jank mode” but a short Google search turned up little results that don’t work on the latest version.

<br/>
<h3>Building the debugger from source</h3>
I will state upfront that there was a lot of pain that went into building both the debugger and chromium from source, but as you will see, it was worth it.

Here are my build notes for OSX 10.7.5:
<script src="https://gist.github.com/wesleyhales/4980385.js"></script>

<br/>
<h3>Using the Debugger</h3>
The debugger is fairly straightforward to use once a picture is loaded in. You can step through different commands via the up and down keys and clicking on the command in the list. You can also pause execution of commands with the pause button in order to inspect the details of the command in the inspector tabs down below.
<img src="/images/posts/2013-02-18/skia-ss.PNG" alt="skia" class="margin10 max-width-100">
Here are the available keyboard shortcuts for the debugger:
<img src="/images/posts/2013-02-18/skia-commands.PNG" alt="skia" class="margin10 max-width-100">

After playing around with the debugger, it’s nice to get a very low level snapshot of how long it takes a specific browser to draw the pictures necessary to present a web page.

P.S. I plan on uploading my produced binaries (somewhere), so if you're on a Mac around version 10.7.5, hit me up @wesleyhales. Hopefully I can save a few pour souls a weekend full of building from sources ;)
Happy debugging!