---
layout: blog
title: JSF, Ajax, and the Back Button
tags: [Java]
preview:
previewimage:
---

<p>For the last few weeks I have been trying to integrate back button support into a JSF/Ajax app as an "Undo" feature. I have been using 2 approaches, 1) <A href="">g4jsf</a> (a subproject of Ajax4JSF) to enable use of GWT, and 2) <a href="http://manual.dojotoolkit.org/WikiHome/DojoDotBook/Book0">dojo.undo.browser</a>.</p>
<p>Currently, any engineer interacting with the back button through javascript only has access to a few methods. <code>window.history.current</code>, <code>window.history.next</code>, <code>window.history.previous</code>, and an array of history items with <code>window.history[]</code>. Gwt and dojo give us a much more accessible way to deal with these same methods through Java and javascript .(along with a few other features) </p> 
<p>My largest existing hurdle is getting the history or state of each view to be stored in some kind of *history cache*. And when the back button is clicked, each of those view should be able to work as first rendered. Or, you could save the POST string somehow and just re-POST that string when the back button is clicked. I was chatting with my buddy Mert �aliskan, and he suggested that a custom ViewHandler may work or to use client side state saving, but I have not gotten around to testing those theories.</p> 
<p class="pTitle"> 
The g4jsf (Java) approach 
</p> 
<p> 
G4jsf basically wraps GWT and makes it complementary to JSF. My only use for it as of now is back button support. 
</p> 
<p>Currently, I have a standard facelets page with a datatable nested in the a4j:form which is nested in a gwt:page. All I did was run through this <a href="http://www.theserverside.com/tt/articles/article.tss?l=GWTandJSF">tutorial</a>, created a basic widget that calls <code>History.newItem('my history item string')</code> during <code>...new AsyncCallback(){...</code>, and now I have a history widget that writes to the browser's back button. My main question now is, what do I store as 'my history item string'? Should it be (as mentioned above) a POST string that I can call later, or do I store my rendered view somewhere?</p> 

<p class="pTitle"> 
The dojo.undo.browser (Javascript) approach 
</p> 
<p> 
The dojo stuff is pretty straight forward. It obviously works in conjunction with dojo.io.bind, so my hopes were not very high when I started researching this. The results were suprising and gave me almost the same functionality as GWT. Another reason for going with this JSF/dojo approach is that g4jsf is not backwards compatible with JSF 1.1/Myfaces current version. 
</p> 
<p> 
So, I am basically calling <code>dojo.undo.browser.addToHistory(state);</code> during my a4j:form onsubmit. 
</p> 
<p>Just as in the examples <a href="http://manual.dojotoolkit.org/WikiHome/DojoDotBook/Book0">here</a>, I am using a state object that gets called and then queues/calls another function when the back button is clicked. I'm still stuck with the same scenario of how to store the rendered JSF view, but now atleast I have started the ball rolling, and have 2 totally different aproaches doing the same thing. 
</p> 
<p>If anyone has done something similar, please chime in :)</p>
