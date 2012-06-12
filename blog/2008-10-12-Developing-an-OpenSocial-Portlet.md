---
layout: blog
title: Developing an OpenSocial Portlet
tags: [Java, opensocial, portal, portlets]
preview: I dedicated some time this weekend to creating a fully functional demo with OpenSocial, Shindig and JBoss Portal...
previewimage:
---

<a href="/images/jroller/Picture-6.jpg"><img src="/images/jroller/Picture-6-small.jpg" style="margin:5px;" align="right"/></a><p>I dedicated some time this weekend to creating a fully functional demo with OpenSocial, Shindig and JBoss Portal. It seems like OpenSocial has a lot of new supported platforms coming out in 0.8 and the future is looking promising. Here is a bullet list to summarize what I found:</p> 
<ul> 
<li>Documentation is scarce when you want to roll you own OS container via Shindig</li> 
<li>Luckily <a href="http://chrisschalk.com/shindig_docs/io/shindig-io.html">Chris Schalk</a> did a good job providing some documentation on getting persistence setup on a mysql db</li> 
<li>Unfortunately, due to the bleeding edge of this technology, some of (the few) demos that exist don't work with today's Shindig trunk</li> 
<li>I was able to quickly learn Google widgeting and am on my way to being a "widget master"</li> 
<li>Next on the list is to mess around with <a href="http://code.google.com/apis/opensocial/articles/authsub.html">Google Data APIs in OpenSocial Apps</a></li> 
<li>The transition/integration of Shindig into a standard webapp/portlet was a huge pita. Too many hard coded servlet context in .js files.</li> 
<li>It seems like (for now) you really need to be into the Orkut scene to leverage current social users. Myspace is something I try to stay away from, and I was really hoping to see some LinkedIn stuff but was let down.</li> 
</ul> 
<p>This is definitely the way portals are headed and I guess I will try to muster up the energy to write an article once the kinks are worked out of my demo. I would also like to do something cool with the collected social data inside of a portal environment (like notifications of other user activities, posts, changes, etc...). I used the <a href="http://www.infoq.com/articles/jsf-ajax-seam-portlets-pt-2">JBoss Portlet Bridge Richfaces</a> project/archetype to create the demo. The bridge makes it incredibly easy to do stuff like this because of having things working on both the servlet and portlet side.</p>
