---
layout: blog
title: Going Mobile With RichFaces! Design Proposals - Day2
tags: [Java, jsf, mobile, richfaces, web]
preview: Day 2 of RichFaces mobile design madness.
previewimage:
---

<p><p>Day 2 of the RichFaces skinning and we have the first approach for tablet devices. Tablets are a little harder to design for because of a few reasons:</p> 

<p>1) Your design sits on the fine line between desktop and mobile. You are designing your app for a max 1024 pixel resolution (in landscape mode) but you must also take advantage of mobile usability (which you will see in page2)</p> 

<p>2) Similar to the iPad Mail.app, it&#8216;s almost like you are designing 2 different UI&#8216;s for landscape and portrait modes. For portrait you need more drop down menus, and for landscape you can try to fit everything on one page without the drop downs.</p><br /> 
<p><a href="/images/jroller/rf.tablet.day2.page1.jpg"><img alt="RichFace Mobile Skin1" align="right" width="225px" src="/images/jroller/rf.tablet.day2.page1-small.JPG"/></a><br /> 
<p class="pTitle">Day 2: About The Design</p><br /> 
Here we have the interaction broken out into 2 pages. The first page shows the primary menu and isn&#8216;t all that exciting.</p> 

<p>Notice how, unlike the <a href="http://www.wesleyhales.com/entry/going_mobile_with_richfaces_we">iphone design from Day 1</a>, I left the browser button overrides within the app itself. Tablet web apps are completely use case driven so this will vary. But since we have so much more real estate, we can play around with standard navigation options that keep the user's attention focused on the app itself.</p><br /> 
<p><br /> 
<a href="/images/jroller/rf.tablet.day2.page2.jpg"><img style="margin:0 7px 0 0;" alt="RichFace Mobile Skin1" align="left" width="225px" src="/images/jroller/rf.tablet.day2.page2-small.JPG"/></a></p> 

<p><br/><br/><br/><br /> 
The second page is what you see after selecting a menu item from page 1 (click to enlarge). Here we have the title bar at the top left with a built in back button which takes the user back to the first screen.</p> 

<p>To the right of the title you see the secondary menu represented by rounded rectangles. Next is the main content of the page broken out into content and actionable panels.</p>

<p>And finally you have the big arrows to the right and left. These arrows are &#8220;thumb reachable&#8221; which is a common usability pattern in portrait mode tablets. It provides an easy page flip access to all of the RichFaces components within the top level category.<br /> 
</p><br /> 
<p>The great thing about CSS3 transitions is that you can really make a UI like this scream and flow seamlessly. So you can imagine how tapping an arrow with your thumb will slide in a new component demo and gracefully highlight the secondary menu option at the top.</p><br /> 
<p>So this concludes our design for Day 2. As I said earlier, this is more of a use case driven design. WE could spawn a very minimalistic skin and component look and feel from this. However, It would be more to display the power behind RichFaces ajax and templating features as the user moves through the app.</p></p>
