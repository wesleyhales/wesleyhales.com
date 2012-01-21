---
layout: blog
title: Contextual PortletMode changes using the JBoss Portlet Bridge
tags: [Java, portal, portlets, seam]
---

<p>By default, the JSR-301/329 portlet bridge manages your navigation history during PortletMode changes. Meaning that, if the user is clicking around in the portlet "view" mode and decides to click the help icon (help mode), the user should be directed to the place where he left off in help mode - and vice versa. Of course, if the user has never been in help mode during the current session, he will go to the default help viewId.</p> 
<p class="pTitle">Why use portlet modes instead of javascript widgets?</p> 
<p>First I would like to give you a little justification of the beauty of this feature. Some people will argue the point of "Why do you need different modes like, Help and Edit?", when you could add some cool "javascript of the week" that would dynamically display what you intended to present in one of the given modes. Well, you could develop your interactions either way but it really isn't a question of why. It's a question of "How?". How do you want users to interact with your applications? And since you have already made the decision to invest in a portal solution, why not use the features that are built in and that stay consistent across the entire UI? Any UI Developer or Interaction Designer will tell you that adding cool javascript widgets adds another layer of complexity and maintenance, thus adding to developer time and bottom line ROI. In addition, when you develop any servlet based application to work within a portal environment, you are properly separating your concerns when you use these modes (without even realizing it in most cases). You are presenting distinguished flows for different trains of thought and making it easier for users to accomplish the task at hand.</p> 
<p class="pTitle">The Usecase</p> 
<p>Ok, off the soap box and onto the use case. Let's say your user is filling out a beloved expense report. It's probably one of his top 5 things that he loves most about his job <img src="http://www.jroller.com/images/smileys/wink.gif" class="smiley" alt=";)" title=";)" /> Seriously, his IT department just launched a new intranet portal using the latest and greatest <a href="http://jboss.org/gatein">GateIn</a> platform and they completely revamped their old Seam application that was used for expense report submissions to run as a portlet.</p> 
<p> 
So, Joe User starts to fill out his expense report in a 6 step wizard. He gets through the first few steps and arrives at a screen asking for his cost center and other details that he has no idea about. Behold the beautiful question mark(help mode) in the top right hand corner of his portlet window! Joe clicks the button and sees exactly the information he needs, and he also sees a link at the bottom of the screen that says &#8220;add this to the form&#8221;. Joe clicks it, and is returned to his expense report with all of the details pre-populated in his form. Not only was the help screen easy to understand, but it was just a basic .xhtml page that can be templated and maintained by any UI developer without any special javascript kung fu. 
</p> 
<p>The next screen (in view mode), asks him to itemize each receipt and expense. Since he took a trip to Euro-land, all of his receipts are in Euros. And since he recently just got his internet privileges suspended (and no, he won't tell us why) he has no idea what the current conversion rates are. Once again, Joe clicks the help button and is presented with a clickable table of currency options. Not only that, but the finance department has placed some important notifications on this page via CMS. Joe reads the notifications and clicks on "Euros" and is taken back to a modified input table that auto converts his itemized euro(€) values to USD($).</p> 
<p>As you can see, these are just random examples of possibilities of detecting PortletMode changes with GateIn, Seam, and RichFaces. The real beauty of this code is detecting the actual mode change and providing contextual help. This is not currently provided by the bridge as a default behavior, so here is the code to do it:</p> 
<p class="pTitle">The Code</p> 
<p>First create a simple session bean with the following code. This will allow us to get a handle on the current mode.</p> 
<code><pre> 

<a name="l46"> <span class="s2">private </span><span class="s1">String mode; 
</span></a><a name="l47"> 
</a><a name="l48"> <span class="s2">public </span><span class="s1">String getMode() 
</span></a><a name="l49"> { 
</a><a name="l50"> Object responseObject = FacesContext.getCurrentInstance().getExternalContext().getRequest();
</a><a name="l51"> <span class="s2">if </span><span class="s1">(responseObject </span><span class="s2">instanceof </span><span class="s1">RenderRequest) { 

</span></a><a name="l52"> RenderRequest renderRequest = (RenderRequest)responseObject; 
</a><a name="l53"> <span class="s2">if</span><span class="s1">(renderRequest.getPortletMode().toString().equals(mode)){ 
</span></a><a name="l54"> mode = <span class="s2">null</span><span class="s1">; 
</span></a><a name="l55"> }<span class="s2">else</span><span class="s1">{ 
</span></a><a name="l56"> mode = renderRequest.getPortletMode().toString(); 
</a><a name="l57"> } 

</a><a name="l58"> } 
</a><a name="l59"> <span class="s2">return </span><span class="s1">mode; 
</span></a><a name="l60"> } 
</a><a name="l61"> 
</a><a name="l62"> <span class="s2">public </span><span class="s1">String getFromView() { 
</span></a><a name="l63"> PortletSession portletSession = (PortletSession)FacesContext.getCurrentInstance().getExternalContext().getSession(<span class="s2">false</span><span class="s1">); 
</span></a><a name="l64"> String viewId = (String)portletSession.getAttribute(<span class="s4">"javax.portlet.faces.viewIdHistory.view"</span><span class="s1">); 

</span></a><a name="l65"> viewId = viewId.substring(<span class="s5">0</span><span class="s1">,viewId.indexOf(</span><span class="s4">"?"</span><span class="s1">)); 
</span></a><a name="l66"> <span class="s2">return </span><span class="s1">viewId; 
</span></a><a name="l67"> } 
</a><a name="l68"> 
</a><a name="l69"> <span class="s2">public void </span><span class="s1">setMode(String mode) 
</span></a><a name="l70"> { 

</a><a name="l71"> <span class="s2">this</span><span class="s1">.mode = mode; 
</span></a><a name="l72"> } 
</a> 

</pre></code> 
<p class="pTitle">Next add something similar to this in pages.xml</p> 
<pre><code> 
<a name="l8"> <span class="s2"><</span><span class="s5">page </span><span class="s1">view-id=</span><span class="s3">"/expenseWizard/*" </span><span class="s1">action=</span><span class="s3">"&#35;{mode.getMode()}"</span><span class="s2">></span><span class="s4"> 
</span></a><a name="l9"> <span class="s2"><</span><span class="s5">navigation</span><span class="s2">></span><span class="s4"> 
</span></a><a name="l10"> <span class="s2"><</span><span class="s5">rule </span><span class="s1">if-outcome=</span><span class="s3">"help" </span><span class="s1">if=</span><span class="s3">"&#35;{mode.getFromView() == '/expenseWizard/step3.xhtml'}"</span><span class="s2">></span><span class="s4"> 
</span></a><a name="l11"> <span class="s2"><</span><span class="s5">render </span><span class="s1">view-id=</span><span class="s3">"/helpPages/step3help.xhtml"</span><span class="s2">/></span><span class="s4"> 
</span></a><a name="l12"> <span class="s2"></</span><span class="s5">rule</span><span class="s2">></span><span class="s4"> 
</span></a><a name="l13"> <span class="s2"><</span><span class="s5">rule </span><span class="s1">if-outcome=</span><span class="s3">"help" </span><span class="s1">if=</span><span class="s3">"&#35;{mode.getFromView() == '/expenseWizard/step4.xhtml'}"</span><span class="s2">></span><span class="s4"> 
</span></a><a name="l14"> <span class="s2"><</span><span class="s5">render </span><span class="s1">view-id=</span><span class="s3">"/helpPages/step4help.xhtml"</span><span class="s2">/></span><span class="s4"> 
</span></a><a name="l15"> <span class="s2"></</span><span class="s5">rule</span><span class="s2">></span><span class="s4"> 
</span></a><a name="l16"> <span class="s2"></</span><span class="s5">navigation</span><span class="s2">></span><span class="s4"> 
</span></a><a name="l17"> <span class="s2"></</span><span class="s5">page</span><span class="s2">></span><span class="s4"> 
</span></a> 
</code></pre>
