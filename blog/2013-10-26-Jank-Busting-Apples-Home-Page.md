---
layout: blog
title: Jank Busting Apple's Home Page
tags: [jank]
preview: In this article I review how easy it is to bust jank on Apple.com's home page.
previewimage: /images/icons/apple.logo.PNG
---
<br/>
## Overview
Watching frame rates on CSS and/or JavaScript animation is pretty addictive. I wrote [this article](/blog/2013/10/23/Basic-Screen-Updates-with-Angular-and-requestAnimationFrame/) the other day which examines the
performance of a simple countdown timer within the Angular lifecycle. I then spent countless minutes playing
Jake Archibald's [Jank Invaders](http://jakearchibald.github.io/jank-invaders/) to hone my skills and save the universe from jank :)

So, I was on [Apple's home page](http://apple.com) the other day and noticed some jank in their main carousel animation.
[<img src="/images/posts/2013-10-26/apple.home.PNG" alt="apple home page" style="width:50%" class="margin10">](/images/posts/2013-10-26/apple.home.PNG)
It wasn't anything huge, but the
animation seemed to stagger a bit as the transitions were beginning and ending. There are five transitions that occur to display different
Apple products. You can see this in the Frame analysis below. Each green line shooting to 0 FPS is a [paint](https://developers.google.com/chrome-developer-tools/docs/timeline#painting_events) within chrome.
[<img src="/images/posts/2013-10-26/apple.com.jank.PNG" alt="bad fps jank" class="marginTop10 max-width-100">](/images/posts/2013-10-26/apple.com.jank.PNG)

Digging deeper, we can see that a large amount of time is being taken for the hardware compositing. This is where we force elements to be accelerated and
 handled by the GPU with translate3D(0,0,0) or translateZ(0) (aka [null transform hack](http://aerotwist.com/blog/on-translate3d-and-layer-creation-hacks/)).
 The problem with Apple's site and the reason why paints are spiking before each animation is because too many layers (or divs) have the null transform applied.
 <img src="/images/posts/2013-10-26/composite.PNG" alt="layer composite time" class="margin10 max-width-100"/>
 <br/>
 I wrote about this [a while ago](http://www.html5rocks.com/en/mobile/optimization-and-performance/), but the basic point is that too much of a good thing is often a bad thing. In this case, too many elements have translateZ(0)
 applied when only one or two applications are really needed. This is forcing a longer composite time and ultimately giving the animations some jank.

 The fix is easy. Start with the top level container for the animation and see which of the child elements have a null transform and figure out if they really need it.
 If we turn on "[Continuous Page Repainting](http://updates.html5rocks.com/2013/02/Profiling-Long-Paint-Times-with-DevTools-Continuous-Painting-Mode)" in dev tools, we can see how the page is being painted and how many composited layers we have.
 [<img src="/images/posts/2013-10-26/apple-paint.PNG" alt="bad fps jank" class="marginTop10 max-width-100">](/images/posts/2013-10-26/apple-paint.PNG)

 By viewing the source and running through each element of the carousel animation, we can see that the parent already has the proper layer compositing.
 From there, I just disabled all the null transform hacks that were applied to nested elements.
 [<img src="/images/posts/2013-10-26/apple.markup.PNG" alt="apple home page markup" class="marginTop10 max-width-100">](/images/posts/2013-10-26/apple.markup.PNG)

 After doing this and fixing one other tiny CSS bug of one element having two different backgrounds, we get much better performance as you can see in the
 below timeline.
 [<img src="/images/posts/2013-10-26/apple.com.no.jank.PNG" alt="apple home page markup" class="marginTop10 max-width-100">](/images/posts/2013-10-26/apple.com.no.jank.PNG)

 The yellow bars are the 7 second timer before each transition occurs, so this is expected.

 The animation on Apple.com isn't terrible as it stands in its current state, but as I stated at the beginning of this article, it's fun to fix jank :)

 <br/>
 <br/>







<br/>
<br/>