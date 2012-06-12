---
layout: blog
title: Fixing Ajax on Mobile Devices (with HTML5)
tags: [Java, ajax, html5, innerhtml]
preview: Use the new HTML5 iframe sandbox attribute to parse sanitize a dynamically loaded DOM. I also talk about how innerHTML randomly breaks on iOS devices.
previewimage:
---
<p><strong>Update: <a href="https://twitter.com/#!/_boye/">@_boye</a> has created <a href="http://jsperf.com/ajax-response-handling-innerhtml-vs-sandboxed-iframe">a perf test which shows the performance of this solution</a>. Remarkably, This iFrame solution outperforms innerHTML on Firefox 7 and maintains the same speed on Chrome 16.</strong></p>
<p>The most common approach for receiving markup from an Ajax request is to use innerHTML for placement of the responseText. This method has been widely used (and argued) since the inception of XHR, but it surprises me that it's still being recommended and used not only on desktop browsers but mobile ones as well.</p>
<p>3 or 4 years have passed since many folks raised their concerns with innerHTML:</p>
<p>From Javascript The Good Parts:</p>
<p>&ldquo;If the HTML text contains a &lt;script&gt; tag or its equivalent, then an evil script will run. .. This danger is a direct consequence of JavaScript&rsquo;s global object which is far and away the worst part of JavaScript&rsquo;s many bad parts.&rdquo;</p>
<p>Not only is innerHTML bad, it is the root cause of many problems... from <a href="http://www.julienlecomte.net/blog/2007/12/38/">browser memory leaks</a> (it destroys/replaces existing elements that may have event handlers attached) to <a href="http://martinkou.blogspot.com/2011/05/alternative-workaround-for-mobile.html">failing completely</a> on iOS&rsquo;s Mobile Safari. Yes, that's right, it just flakes out.</p>
<p>So even if you use <a href="http://javascript.crockford.com/memory/leak.html">Crockford&rsquo;s purge</a> method to fix the memory leaks and sanitize your response string returned from the server, you still have a showstopping flaw when running any mobile web solution that uses innerHTML on iOS devices </p>

<p>Just to name a few mobile frameworks that use this flawed innerHTML approach:</p>
<p><a href="http://api.jquery.com/html/">JQuery Mobile</a> (uses jQuery&rsquo;s .html() wich is a wrapper for innerHTML)</p>
<p><a class="active_link" href="http://wiki.phonegap.com/w/page/42450600/PhoneGap%20Ajax%20Sample">Phone Gap</a></p>
<p><a href="http://www.sencha.com/forum/showthread.php?122591-List-rendering-race-condition">Sencha</a></p>

<p><strong>A possible solution:</strong></p>
<p>We all know that innerHTML is a favorite for it&rsquo;s speed and ease of use but speed doesn&rsquo;t really matter when it doesn&rsquo;t work at all. So one solution is through use of some new features in HTML5 and the DOM api:</p>

<p>Let's start with the scenario that you've made your XHR and received the responseText. </p>
<p>First thing we'll do is create a temporary iFrame element. This isn't any ordinary iframe, it received a major security enhancement with HTML5 and we have some new sanitizing features with the "sandbox" attribute. </p>

<p>From the <a href="http://dev.w3.org/html5/spec-author-view/the-iframe-element.html#attr-iframe-sandbox">spec</a>:</p>
<p><span style="color: #808080;">The sandbox attribute, when specified, enables a set of extra restrictions on any content hosted by the iframe. Its value must be an unordered set of unique space-separated tokens that are ASCII case-insensitive. The allowed values are allow-forms, allow-same-origin, allow-scripts, and allow-top-navigation. When the attribute is set, the content is treated as being from a unique origin, forms and scripts are disabled, links are prevented from targeting other browsing contexts, and plugins are disabled. </span></p>
<p><span style="color: #ff0000;">To limit the damage that can be caused by hostile HTML content, it should be served using the <strong>text/html-sandboxed</strong> MIME type.</span></p>


<pre class="jive_text_macro jive_macro_code" jivemacro="code" ___default_attr="java"><p>function getFrame() {</p><p>    var frame = document.getElementById("temp-frame");</p><p>    if (!frame) {</p><p>        // create frame</p><p>        frame = document.createElement("iframe");</p><p>        frame.setAttribute("id", "temp-frame");</p><p>        frame.setAttribute("name", "temp-frame");</p><p>        frame.setAttribute("seamless", "");</p><p>        frame.setAttribute("sandbox", "");</p><p>        frame.style.display = 'none';</p><p>        document.documentElement.appendChild(frame);</p><p>    }</p><p>    return frame.contentDocument;</p><p>}</p></pre>

<p>Now, we get our ajax response and write it to the iframe:</p>

<pre class="jive_text_macro jive_macro_code" jivemacro="code" ___default_attr="java"><p>var frame = getFrame();</p><p>frame.write(responseText);</p></pre>

<p>The beauty of this solution is the fact that we don't have to deal with a <a href="http://ejohn.org/blog/pure-javascript-html-parser">javascript text to DOM parser</a>. We're allowing the browser to do what it does best... parse the HTML and build a DOM. And we don't have to worry about parsing the response and removing a blacklist of prohibited security risk elements and other XSS hacking pitas.</p>

<p>After writing the response to the iframe, you now have a ready to use sanitized DOM. Next you can use the DOM API to grab any part of the new document.</p>

<pre class="jive_text_macro jive_macro_code" jivemacro="code" ___default_attr="java"><p> var incomingElements = frame.getElementsByClassName('elementClassName');</p></pre>

<p>Safari correctly refuses to implicitly move a node from one document to another. An error is raised if the new child node was created in a different document. So here we use adoptNode to add the incomingElements to our existing page.</p>

<pre class="jive_text_macro jive_macro_code" jivemacro="code" ___default_attr="java"><p> document.getElementById(elementId).appendChild(document.adoptNode(incomingElements));</p></pre>

<p>The only thing left to do now is benchmarking. As I said earlier, working with the DOM has been notably slower than using innerHTML in the past. So there may be a derivative of this proposed solution that is faster? or there may not be a huge difference in execution time? Let me know....</p>