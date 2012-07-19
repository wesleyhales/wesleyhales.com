---
layout: blog
title: Sniffing IE9 features while in compatibility mode
tags: [ie, features, sniffing]
preview: When you need to detect the true version of IE, even when compatibility mode is forced, this is a solution.
previewimage: /images/icons/64-ie.png
---
Getting the browser version from the User Agent string is one thing. But, when you
force compatibility mode in IE, you get whatever version you're forcing to. e.g...
<code><pre>&lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=EmulateIE8&quot;/&gt;</pre><code>

in IE9 will cause jQuery's 

<code><pre>($.browser.version, 10)</pre></code> 

to return "8" :(

I started digging through some [msdn docs](http://blogs.msdn.com/b/ie/archive/2011/03/24/ie9-s-document-modes-and-javascript.aspx) to find various
ways of sniffing the actual browser we're using, even when compatibility mode is forced. This led me to [this doc](http://msdn.microsoft.com/en-us/library/ie/gg622938.aspx)
Which talks about how IE9's Chakra JavaScript engine processes math precision differently (and faster) than the old IE8 JScript engine.

So using the following bit of code, we are able to detect the true browser version no matter what compatibility mode it's in.
<code><pre>
if ($.browser.msie &amp;&amp; parseInt($.browser.version, 10) &lt;= 8) {
var x = 6.28318530717958620000;
var val = Math.sin(x);
  if(Math.abs(val) === 2.4492127076447545e-16){
  //do your IE6,7,8 shit here
  }
</pre></code>

Easier/better way?