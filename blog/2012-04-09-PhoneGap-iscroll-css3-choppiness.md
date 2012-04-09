---
layout: blog
title: Choppy scrolling on iOS with iscroll and PhoneGap
tags: [phonegap, css3, iscroll]
---
I ran into a situation this weekend where certain pages of a PhoneGap application were incredibly choppy on iOS versions pre 4.3.x.
Apparently, there is a problem with older browsers using CSS3 selectors like <code>div[style*='foo']</code> in combination with other DOM elements.
<a href="http://wesleyhales.com/iscroll"><img src="/images/iscroll.PNG" width=150 alt="iscroll" align="left" style="margin:20px"></a>

The [test case](http://wesleyhales.com/iscroll) was a little tricky to create, seeing that pinpointing this problem required mucho testing.
However, I minimized the markup and CSS to only a few classes and DOM elements. The choppy scrolling is caused by a combination of inline
styles, an ordered list, a table with a lot of rows, and the use of the specific CSS3 <code>[style*='foo']</code> selector.
You must run the [test](http://wesleyhales.com/iscroll) on an older iPhone to see the choppiness of the scroll. This happens on both Mobile Safari and within PhoneGap's webview.
<br class="clear"/>