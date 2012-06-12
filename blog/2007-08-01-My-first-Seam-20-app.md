---
layout: blog
title: My first Seam 2.0 app
tags: [Java, flying, hibernate, jsf, saucer, seam, trinidad]
preview:
previewimage:
---

<p>Before I begin, let me say thank you! thank you! thank you! for the extended EL in Seam. On a previous project, I was using straight JSF 1.1/1.2(Myfaces) and the extended EL alone, makes Seam a worthwhile choice.</p> 

<p>This article is about an application that is relatively simple (to start). A report with customer information that has pretty charts and graphs and is printable to PDF. Since I didn't have any requirements to start, I thought I would list a few of my own here ;)</p> 
<ul> 
<li>JSF &amp; Seam 
<ul> 
<li>RESTful URL's</li> 
<li>EJB3/Hibernate</li> 
<li>Local, rapid, development</li> 
</ul> 
</li> 
<li>Maven 2</li> 
<li>Charts</li> 
<li>Html 2 PDF functionality</li> 
</ul> 

<h2>JSF &amp; Seam </h2> 
<p>When I started development, Seam was at v.1.2, Embedded EJB (aka Embedded Jboss) was at RC9, and Jetty was being used for local dev and testing. I was able to get a jump start from the guys over at <a href="http://software.softeu.cz/archetypes/seam/">http://softeu.cz</a> for the jetty/ejb/war deployment and I found a rouge project on the seam boards called JBossSeamDVDStore that gave me the ejb Maven archetype ideas/best practice. </p> 

<p>I went through some good (and bad) code getting the embedded RC9 stuff working with Jetty. It boiled down to <a href="http://www.jboss.com/index.html?module=bb&op=viewtopic&t=110555">this post</a> showing why and what I did.</p> 

<p>The good and bad news now is that Embedded EJB3 is now Embedded Jboss and Embedded Jboss only works with Tomcat (for now) and here is <a href="http://wiki.jboss.org/wiki/Wiki.jsp?page=WhatRefactoringsWereDoneToEnableEmbeddedJBoss">a post explaining</a> why it's this way. But this could also be a blueprint for creating the same thing for Jetty, I just don't have the time to do it right now.</p> 

<p><a href="http://www.google.com/notebook/public/09243180899526162200/BDRKQSgoQ77rF_7Yi">Here is a list</a> of resources I found useful while researching.<p> 

<h2>RESTful URL's</h2> 
<p>The #1 biggest complaint using JSF is no RESTful urls, and Seam does a great job of solving it. The only problem I have now is double execution when the user does a postback to a page that has a action mapped in pages.xml. The form I'm submitting calls the same action as the url I have mapped for REST support. I haven't spent alot of time with it and it may be total user error, but it would be nice if double action execution did NOT happen naturally.</p> 

<h2>EJB3/Hibernate</h2> 
<p>Using seam-gen, in Oracle, a few tables had null id fields and no primary key - The generated entity bean was genned as a object with one member (an ID) and I guess it was considering the entire record (all columns) as a unique. Being new to EntityBean/Generated hibernate code, it took us a few hours to figure this out, but once we saw that the data model was screwed up and how seam-gen handled it, the fix was easy.</p> 

<h2>Local, rapid, development</h2> 
<p>This was mentioned a little in the first paragraph. I wanted a faster, local build environment than what was currently offered by the company I'm working for. They are heavily tied to ant and there were 0 projects using Maven. So, being the completely crazy person that I am, I introduced a new build method with Maven 2, a new Framework wrapper (Seam), and a local build on the developers laptop with hot deploy. I know Jboss AS offers hot deploy, but I really wanted to use Jetty with Embedded Jboss. Since, that isn't currently implemented, I went with the next best thing and used Tomcat. My current company gives every developer a Solaris box to build on, all builds/projects are tied to building on Solaris. When one tries to use IntelliJ Idea over a Samba mount, you will quickly see how much it brings down overall performance and speed. There are other pluses that I could go into on local dev opposed to a remote *nix box, but I will stop here.</p> 

<h2>Maven 2</h2> 
<p>When you have 100's of projects on Ant and everyone in the company is pro Ant because so much time has been invested into the current build environment, you really feel like your going against the grain. However, most of us in the open source world, that are consultants, have seen the light on other projects and we bring new things into whoever we are working for. This is what I did. I eventually gained a few supporters, because everyone knows what happens when you are close minded to innovation.</p> 

<h2>Charts</h2> 
<p>I think using the Trinidad Charts are what WOW'd the upper management the most. Since this company has a distributed computing environment with no admin rights, we had to get the security/network folks on board with the Adobe SVG plugin. I heard the Renesis viewer is pretty good also and we will probably move to it later since Adobe is killing support on their plugin.</p> 

<h2>Html 2 PDF functionality</h2> 
<p> 
PD4ML: I started with this HTML2PDF renderer. It was super easy to get hooked up to the app. I structured my xhtml and css for both screen and print media types, but due to lack of CSS 2.1 support and very limited subset of css and html support, the output was terrible and required alot of rework just for this PDF to render half way decent. And it costs money :( 
</p> 
<p> With the output coming out horrible in PD4ML, I took a look at <a href="https://xhtmlrenderer.dev.java.net/r7/feature-list.html">a pure xhtml renderer, Flying Saucer. </a></p> 
<p>FS Almost instantly rendered all of my XHTML correctly on the first render. I had to make a few adjustments for things like CSS page-break properties and border-collapse. And, before I could even get the page to render I had to clean up the legacy HTML that some <a href="https://issues.apache.org/jira/browse/TRINIDAD-111">JSF renderers output</a> (I ran tests with both Jtidy and NekoHTML) - both did the trick and I couldn't tell a difference. All the JSF folks that I have talked to welcome feature requests for XHTML compliance. 
</p> 
<p> 
<a href="http://www.pdoubleya.com/projects/flyingsaucer/demo/r7/browser/browser_demo.jnlp">This demo</a> shows some pretty cool stuff from Flying Saucer and what it can do. It is basically the same concept of iTunes web browser/desktop app. PDF isn't the end of the road either - they have examples on rendering the exact same XHTML content to PNG, SVG, and Excel - I'm sure there will be more. 
</p> 
<p>There are probably a million more things in Seam that I could talk about here, that I completely can't live without. This article just touches on the real world stuff that I encountered while developing. </p>
