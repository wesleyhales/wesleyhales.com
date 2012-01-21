---
layout: blog
title: Page and Component Modal with a4j&#58;status
tags: [Java, demo, jboss, modal, richfaces]
---

<p>I haven't really had a chance to look at RichFaces OOB modal, but I had written <a href="http://www.jroller.com/page/wesleyhales/?anchor=adding_lightbox_to_ajax4jsf_and">this one</a> over a year ago when Ajax4JSF was still on java.net</p> 

<a href="/images/jroller/page-modal.gif"><img src="/images/jroller/page-modal-small.gif" alt="" align="right"/></a> 

<p>Due to an overwhelming interest in the previous article I decided to spend some time developing this modal into a demo application and to add some new features. Modals are good to some and hated by others, they have their place and can certainly add some cleaner usability to any website. The cool thing about a modal window is that the user doesn't feel like they are being redirected to another page. They can still keep their focus on the content at hand while multitasking and spawning another workflow.</p> 

<p>So what about component based modals? We know good and well what a <a href="/images/jroller/page-modal.gif">page-locking modal</a> is, but has anyone tried to implement a modal that only covers the area of the active ajax component? 
</p> 

<p> 
This is a component based modal. It basically blocks out the activated component per ajax request.<br/> 
<a href="/images/jroller/component-modal.gif"><img src="/images/jroller/component-modal-small.gif" alt="" align="left"/></a><br/> 
This demo is already setup and ready to go, check it out <a href="http://code.google.com/p/seam-2-sandbox/">here</a> and the instructions on getting it running are in the home page description. This is the same demo I used in my previous <a href="http://www.jroller.com/wesleyhales/entry/running_seam_2_0_on">Running Seam on Tomcat...</a> article - now updated to the latest version of Seam and cleaned up a bit (and also put it under Google code vcs).</p> 

<p>And that's not all! To make life even easier I wrapped the modal(s) up in a nice and neat Facelets component. The modals also allow for unlimited modals-per-page. Meaning that you can have 10000 modals on one page without conflicts ;). Here's how you use it:</p> 

<pre> 
<a name="l65"> 
</a><a name="l66"><span class="s0">&lt;</span><span class="s1">hc:modal </span><span class="s2">modalId=</span><span class="s3">"loading-modal" </span><span class="s2">modalContainerId=</span><span class="s3">"loading-modal-msg" </span><span class="s2">hidden=</span><span class="s3">"true" </span><span class="s2">width=</span><span class="s3">"129px"</span><span class="s0">&gt;</span><span class="s4"> 

</span></a><a name="l67"> <span class="s9">Content that you want in the modal goes here...</span><span class="s4"> 
</span></a><a name="l68"><span class="s0">&lt;/</span><span class="s1">hc:modal</span><span class="s0">&gt;</span><span class="s4"> 
</span></a><a name="l69"> 
</a> 
</pre> 
<br/> 
<p>... then put the a4j:status tag inside of an a4j:region. Note the javascript methods being called. You could use these in any onclick event that needs to present a modal. 
</p> 
<br/> 

<code> 
<pre> 
<a name="l141"> <span class="s0">&lt;</span><span class="s1">a4j:status </span><span class="s2">for=</span><span class="s3">"stat1" </span><span class="s2">forceId=</span><span class="s3">"true" </span><span class="s2">id=</span><span class="s3">"ajaxStatus"</span><span class="s0"> 

</span></a><a name="l142"> <span class="s2">onstart=</span><span class="s3">"</span><span class="s4">alertModal(</span><span class="s8">'loading-modal'</span><span class="s4">,</span><span class="s8">'loading-modal-msg'</span><span class="s4">);</span><span class="s3">"</span><span class="s0"> 
</span></a><a name="l143"> <span class="s2">onstop=</span><span class="s3">"</span><span class="s4">hideContentModal(</span><span class="s8">'loading-modal'</span><span class="s4">,</span><span class="s8">'loading-modal-msg'</span><span class="s4">);</span><span class="s3">"</span><span class="s0">&gt;</span><span class="s4"> 

</span></a><a name="l144"> <span class="s0">&lt;</span><span class="s1">f:facet </span><span class="s2">name=</span><span class="s3">"start"</span><span class="s0">&gt;</span><span class="s4"> 
</span></a><a name="l145"> 
</a><a name="l146"> <span class="s0">&lt;/</span><span class="s1">f:facet</span><span class="s0">&gt;</span><span class="s4"> 
</span></a><a name="l147"> <span class="s0">&lt;/</span><span class="s1">a4j:status</span><span class="s0">&gt;</span><span class="s4"> 
</span></a> 
</pre> 
</code> 
<br/> 
<p>This is a work in progress and maybe some day I will cleanup my js, explain why I did things the way I did them, and package this up in a component jar. For now this is it.</p>
