---
layout: blog
title: XHTML to PDF with a Seam filter
tags: [Java, pdf, seam]
preview: After reading this article showing how to create a servlet filter that will render XHTML to a PDF, image, or SVG, I was inspired to...
previewimage:
---

<p>After reading <a href="http://today.java.net/pub/a/today/2006/10/31/combine-facelets-and-flying-saucer-renderer.html">this article</a> showing how to create a servlet filter that will render XHTML to a PDF, image, or SVG, I was inspired to try it out as a filter in Seam using the @Filter annotation. The filter installation went smoothly but getting Flying Saucer to parse the generated JSF and css background images was not so easy.</p> 
<p>First off, generated markup from any given JSF component is not guaranteed to be good markup. So I had to make use of cyberneko html parser. The servlet filter parses the generated response and then neko cleans up any non standard xhtml elements.</p> 
<p>One huge css tip is make sure you declare <code>media="print"</code> or <code>media="screen,print"</code> on your xhmtl css reference. Naturally it would be good to split the 2 style sheets but laziness forced me to use one for both.</p> 

<p class="pTitle">An Example Application</p> 
<p><a href="http://www.littlebear-canton.com"><img src="/images/jroller/Picture-1.jpg" align="right"/></a>A few months ago, I wrote a simple website for the neighborhood I live in using Seam. I tried to start out writing this site using Ruby on Rails but I just wasn't impressed compared to what Seam offers. (Even for a small one-off website)</p> 
<p>So below are 2 live links that show the code in action and parsing a real world example. Enjoy...</p> 
<p> 
<ul> 
<li><a href="http://www.littlebear-canton.com/littlebear/index.seam?RenderOutputType=pdf">View the front page as PDF</a></li> 
<li><a href="http://www.littlebear-canton.com/littlebear/index.seam?RenderOutputType=image&height=900&width=800">View the front page as PNG</a></li> 
</ul> 
</p> 
<br/> 
<p class="pTitle">The Code</p> 
<p>It's pretty cool not having to define a servlet filter in your web.xml. Just add the @Filter annotation to the top of the class and wala. I had to add the <code>within="org.jboss.seam.web.ajax4jsfFilter"</code> attribute to the annotation so FS could render the RichFaces images/resources. 
<ul> 
<li><a href="/wesleyhales/resource/xhtml2pdf.zip.jar">Flying Saucer Seam component (source)</a></li> 
<li>Dependencies 
<ul> 
<li>nekohtml</li> 
<li>All flying saucer jars</li></ul> 
</li> 
</ul> 
</p>
