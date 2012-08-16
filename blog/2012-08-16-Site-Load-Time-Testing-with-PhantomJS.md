---
layout: blog
title: Web Performance Testing With PhantomJS
tags: [phantomjs, web performance, testing]
preview: This post talks about advanced usages of phantomjs and how to use it to test the performance of your user interface.
previewimage: /images/icons/phantomjs.png
---
<img src="/images/icons/phantomjs.png" alt="phantomjs" align="left" class="max-width-100 margin10">

HTTP requests, heavy/unminified resources, and UI thread blocking should be on the mind of every front-end developer. These
are just a few issues that can cause serious bottlenecks in page load times. Having a faster load time equals better search engine
rankings, higher conversion rates, and an overall reduction in bandwidth costs.

I recently took on the task of coming up with an accurate way to measure all the aforementioned things, in an effort to understand
which performance tweaks improved page load times and which ones didn't. But first, we needed a baseline to test how fast the page loads with both a clear-cache and primed-cache state; Enter PhantomJS.
PhantomJS gives us a way to headlessly test page performance, and also gives us the automation we need for integration with any build system.
For this article, I will explain the reporting tool I used and try to give you a starting point for testing your own site(s).

First off, I started with James Pierce's [confess.js](https://github.com/jamesgpearce/confess/) which gives us the elapsed load
time of a web page, the slowest and fastest resources, along with many other cool things like automatic generation of an appcache manifest. However, it did not give us
the document.readyState=interactive/complete or window.onload times. Another thing I wanted to measure was before and after cache. So If at first,
we have resources which are not far-future cached, what happens after we future cache these things? Also, how fast does our page load after
 being cached?

With a few performance focused modifications to confess.js, we are able to gather the following results:
<ul>
<li>document.readyState</li>
<li>image filmstrip (how the page looks over load time)</li>
<li>page and resource load times after the user has a primed cache.</li>
<li>pretty effin cool charts with sparklines fed by knockout.js</li>
</ul>

This script is running live at [loadreport.wesleyhales.com/report.html](http://loadreport.wesleyhales.com/report.html)
<img src="/images/loadreport.js.png" alt="loadreport.js" align="left" class="max-width-100">

We're running the test 5 times in a row, to give an average of your best load times and to see where spikes occur. Also, [@ryanbridges](http://twitter.com/ryanbridges) put together
some awesome sparkline charts backed by knockout.js. Just click on the "Show Me Some Charts!" button to see 'em.
<img src="/images/loadreport-charts.png" alt="loadreport-charts" align="left" class="max-width-100 margin10">

Regarding cache performance, phantomjs has a --disk-cahe=yes switch which is supposed to enable caching, but the results on the number
of resources loaded and their size seem to be reversed. For example, if we run this script against cnn.com with --disk-cahe=yes, phantom returns
over 2MB of resources, but if we run it with the same switch set to "no", we get 858KB of resources - and both modes report the same number
of resources being loaded (around 150).
To bypass this bug, I've created my own caching mechanism which basically loads the same page twice (in the same phantom instance)
 and returns more accurate results when compared with Chrome's developer tools.

Install [phantomjs](http://phantomjs.org/) 1.6+, [Get the script here](https://github.com/wesleyhales/loadreport) and run this on your own build servers to make sure your UI screams.






[@wesleyhales](http://twitter.com/wesleyhales)
<br/>
<br/>