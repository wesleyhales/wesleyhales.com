---
layout: blog
title: Replacing FacesMessages with Growl alerts
tags: [Java, 2.0, growl, jsf, richfaces]
---

<p>I saw a tweet from(<a href="http://twitter.com/maxandersen">@maxandersen</a>) the other day and decided to try adding Growl like messages in a standard JSF/Richfaces application using jGrowl. It is quite simple and my approach could definitely be improved upon.</p> 
<p>This is really just javascript on the front end and can be used with any backend message generating system.</p> 

<p class="pTitle">Code Used:</p> 
<p> 
<ul> 
<li><a href="http://jboss.org/jbossrichfaces/">RichFaces 3.3.1.GA</a></li> 
<li><a href="http://stanlemon.net/projects/jgrowl.html">jGrowl (latest)</a></li> 
</ul> 
</p> 

<p class="pTitle">Include the scripts in the head:</p> 
<p> 
Note the loading of jquery in the Richfaces page... 
<code><pre> 
<a name="l1"><span class="s0"> 
<a name="l5"> </span><span class="s1">&lt;</span><span class="s2">a4j:loadScript </span><span class="s3">src=</span><span class="s4">&quot;resource://jquery.js&quot;</span><span class="s1">/&gt;</span> 
</span><span class="s1">&lt;</span><span class="s2">link </span><span class="s3">rel=</span><span class="s4">&quot;stylesheet&quot; </span><span class="s3">href=</span><span class="s4">&quot;/css/jquery-plugins/jquery.jgrowl.css&quot; </span><span class="s3">type=</span><span class="s4">&quot;text/css&quot;</span><span class="s1">/&gt;</span><span class="s0"> 
<a name="l4"> </span><span class="s1">&lt;</span><span class="s2">script </span><span class="s3">type=</span><span class="s4">&quot;text/javascript&quot; </span><span class="s3">src=</span><span class="s4">&quot;/js/jquery-plugins/jquery.jgrowl.js&quot;</span><span class="s1">&gt;&lt;/</span><span class="s2">script</span><span class="s1">&gt;</span><span class="s0"> 
<span class="s0"> 
</span> </span></a> 
</pre></code> 
</p> 

<p class="pTitle">Write a simple script to extract the message:</p> 
<p> 
... and add any customizations you may need to jGrowl. One thing to take note of here is that you cannot use the $ sign for jQuery in a Richfaces app. This is because of the RF framework using prototype.js by default and it too uses the $ sign. So every 3rd party jQuery script that you use, you must s/$/jQuery/g (find and replace all usages of '$' with 'jQuery') 
<code><pre> 
function showError() 
{ 
jQuery.jGrowl.defaults.position = 'center'; 
if (document.getElementById('errorMessage') != null) 
{ 
jQuery.jGrowl(jQuery('#errorMessage').html(), { 
sticky: false, 
life: 10000 
}) 
} 
} 
</pre></code> 
</p> 

<p class="pTitle">And tell the script to run after page load:</p> 
<p> 
jQuery has a simple statement that checks the document and waits until it's ready to be manipulated, known as the ready event: 
<code><pre> 
$(document).ready(function(){ 
showError(); 
}); 

</pre></code> 
</p> 

<p>Here is a live screen shot of the script in action using a generate h:message. 
<img src="/images/jroller/jgrowl.gif" align="center"/></p>
