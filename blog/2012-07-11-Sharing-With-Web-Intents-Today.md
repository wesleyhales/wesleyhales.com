---
layout: blog
title: Sharing Content with Web Intents
tags: [web intents, html5, share, stats]
preview: In 2012 the Share Button scene is seriously messed up. But not to worry, Web Intents are on the rise. This article gives you need-to-know info about the current state of Web Intents and how to use them today.
previewimage: /images/design/webintent-logo.jpg
---
<br/>
<h3>The Intent of Sharing</h3>
If you employ share buttons on your site, then you might already be aware of the increased load that comes with trying
to make your content social. Allowing users to take action on your specific content and "share" it is a common task.
Much like linking HTML documents together, we are now linking apps together that are capable of
 pushing content to a receiving service via the user. This action or intent of "sharing" content across different apps
 has recently been identified in a [W3C Editors Draft called Web Intents](http://dvcs.w3.org/hg/web-intents/raw-file/tip/spec/Overview.html).

I recently took a job working on [CNN.com](http://cnn.com) and I'm sure you can imagine that the weight and performance of social sharing is pretty serious 'round these parts.
So I will break down the current state of sharing as it exists today, then jump into an examination of Web Intents.
<br/>
<h3>Why do we need Web Intents? </h3>
In today's world of sharing we have limited options.
(Note that the "share" intent is one of many. You can also edit, save, etc... but this article is focused on sharing)
We are forced to pull a JavaScript file and load a share button dynamically for the user, or we can encode a query string that will
be the input on a GET request to the provided share service.

For this example, I've taken the most widely used social networks as an example. Each is linked to a simple HTML page that only contains
their specific resources to display a share button for the given service:
<ul>
<li><a href="/_examples/shares/twitter/">Twitter</a></li>
<li><a href="/_examples/shares/google/">Google+</a></li>
<li><a href="/_examples/shares/fb/">Facebook</a></li>
<li><a href="/_examples/shares/linkedin/">LinkedIn</a></li>
</ul>

First, I wanted a true measurement on all the resources and page load times without anything in the cache.
So I cleared the browser cache and loaded a single test page (from the list above) for each share service provider. Here are the results:
<div id="container" class="max-width-100"></div>
I know... seems pretty crazy that Facebook would have 11 HTTP requests and a 135KB payload (after compress/GZIP) for a share/like button.
<img src="/images/design/share-buttons/facebook.PNG" alt="Facebook resources" class="max-width-100 margin10">
LinkedIn is delivering 80KB of stuff, Twitter comes in right at 40KB, and although Google only serves up 2KB of resources, the data is broken up over 10 HTTP requests.

Keep in mind that we are on a desktop browser, so worrying about all the HTTP requests may be a little nonsensical. But, on a mobile
browser this is definitely something you should be concerned about.
The previous no-cache scenario is a unique, one time case for our users. And chances are, your user's browser may have already
cached this content from another site using the same button resources.

So, after we load all the resources for the first time, surely those will be better cached via local/sessionStorage and
optimized for fast load times and modern browsers, right? WRONG!

On page refresh we get the following results:
<div id="container2" class="max-width-100"></div>
Here we see that there are no files being cached outside of the browsers default capabilities. Render times are still staying fairly consistent with the previous times, with the exception of Twitter, which
was cut down to more than half of it's no-cache onload time.
HTTP requests remain mostly the same, and sizes are a little better, but LinkedIn is still chiming in at 45KB... on each page load/refresh.

Lastly, when we click the share button for each provider, we get the following:
<div id="container3" class="max-width-100"></div>
Ok, so we see something interesting here. Google is the only one who did lazy loading! \o/ Thanks Google! The additional 2KB
of downloaded content creates the Google+ UI on the fly, but at a cost of 29 HTTP requests. Yes, that's right, 29.
I didn't look very closely as to why LinkedIn updates the parent DOM, but your page has been abused pretty badly at
this point so it probably doesn't matter too much :)

So with all of this data, we can clearly see that today's DIY sharing intents are raping our applications pretty hard. We have no idea what
those resources are doing and they come at a high cost. Aside from the issues of resource weight, back doors, and inefficient architecture of sharing services, there are many other issues
 with the current ways we handle the sharing of data.
<br/>
<h3>Alternatives</h3>
The best alternative that works across browsers today is a simple share URL. Throw in some kick ass, responsive [font icons](http://gregoryloucas.github.com/Font-Awesome-More/#all-icons)
 and we have a performant way to share content. But there are still a few problems with this approach:
<ol>
<li>We are faced with a potential list of
social networks and options that our users may not even use or care about. We've all seen it before, it's the typical "share bar" found on most major
news sites and blogs.</li>
<li>We don't have any way of receiving a callback on whether the post/share was successful or not. The only way to get this data is through async analytics
by emedding a unique identifier in the URL. Then hope the referrer surfaces in next months usage reports.</li>
</ol>
Here are the corresponding share URLs from the providers analyzed above.
<ul>
<li><a href="https://developer.linkedin.com/documents/share-linkedin">LinkedIn:</a> http://www.linkedin.com/shareArticle?mini=true&url={articleUrl}&title={articleTitle}&summary={articleSummary}&source={articleSource}</li>
<li><a href="https://dev.twitter.com/docs/intents">Twitter:</a> https://twitter.com/intent/tweet?url={articleURL} <-- Notice the "/intent/"? We'll get to that in a bit.</li>
<li><a href="https://dev.twitter.com/docs/intents">Facebook:</a> http://www.facebook.com/sharer.php?u={url to share}&t={title of content}</li>
<li><a href="https://dev.twitter.com/docs/intents">Google+:</a> https://plus.google.com/share?url={articleURL}</li>
</ul>
<br/>
<h3>Web Intents</h3>
If you're still struggling to wrap your head around Web Intents, you're not alone. I had to sit down and run through the latest [Google IO 2012 code exercises](http://intentlab-io12.appspot.com/), [videos](http://www.youtube.com/watch?v=O1YjdKh-rPg&feature=player_embedded#!), and [articles](http://www.smartjava.org/content/html5-web-intents-share-information-between-web-apps) on Web Intents to really see how it is currently implemented and what it takes to make it work. As of this writing, the only
browser supporting the <code>WebKitIntent</code> api is, you guessed it, WebKit. This includes Chrome versions >= 19. But, even though the tag is supported, you must install
a Chrome extension to actually fulfill the intent.

Here we see what happens when I click a Web Intent enabled button for sharing an image. You can try it out [here](/_examples/shares/intent/).
<img src="/images/design/webintent-pick.PNG" alt="web intent pick" class="max-width-100 margin10">

At this point you are probably wondering: How do we get the dialogue to show up in teh browser? How can we register an application to handle this request?
The plan is to allow web applications to register themselves through a provided JavaScript api or HTML tag when the specification is
final. For now, we must use a Chrome extension.

This is a section pulled from the manifest file in the extension I'm using.
<div class="full-width clear">
<code>
<pre>
"intents": {
      "http://webintents.org/save" : {
      "type": ["image/jpg", "image/jpeg", "image/png", "image/gif"],
      "title": "PicStore",
      "path": "save.html",
      "disposition": "inline"
    },
</pre>
</code>
</div>
To put it simply, this is how you register an application (Chrome extension) to be used as a Web Intent today. By using the namespace
defined on the first line "http://webintents.org/save", we can assign our intent to be handled by any app who has this namespace and accepts the supplied "type".
The "path" is just another HTML file which is included in my extension and the code on that page will handle the intent.

In our client application, where the intent originates from, we call the following code onclick to allow the user to choose an application
to fulfill this intent.
<div class="full-width clear">
<code><pre>
function invoke() {
    var intent = new WebKitIntent({
        "action":"http://webintents.org/save",
        "type":"image/*",
        "suggestions":["http://webintents.org/save","http://webintents.org/pick"],
        "data":location.href});

    var onSuccess = function(data) { alert(data) };
    var onError = function(data) { alert(data) };

    window.navigator.webkitStartActivity(intent, onSuccess, onError);
}
</pre></code>
</div>
Web Intents are a really good solution to the problems I mentioned in the first part of this article. I'm sure there are many kinks
which will be ironed out in upcoming revisions to the spec, but overall it seems like a nice fit as we transition to the "browser as a platform"
and find new ways of linking data and applications.
As I said earlier, the plan is to allow any web application to register itself in the browser/UserAgent and I'm assuming some kind of user approval will go along with that.
The proposed way of registering an application is with the <code>&lt;intent&gt;</code> tag:
<code><pre>
&lt;intent
  action="http://webintents.org/share"
  type="image/*"
  href="share.html"
  disposition="window|inline"
 /&gt;
</pre></code>
Until this is implemented across browsers, all we have is the Chrome Web Store and extensions to take advantage of this technology.
Read more about the details of Web Intents <a href="http://webintents.org">here</a>.

*Note - Twitter has made the best attempt at an early implementation of Web Intents. The best thing service providers can do today, is follow [Twitter's implementation](https://dev.twitter.com/docs/intents).

For a full example on how to create a Web Intent Chrome extension, run through the examples in <a href="http://intentlab-io12.appspot.com/">this Google IO lab at #IO12</a>.
Or you can try it out with Chrome 19+ and the simple demo I wrote [here](/_examples/shares/intent/).
<br/>
<br/>
<h3>Other references and good reads:</h3>
<a href="http://benlog.com/articles/2012/02/09/a-simpler-webbier-approach-to-web-intents-or-activities/">Web Activities</a>

<a href="http://tantek.com/2011/220/b1/web-actions-a-new-building-block">Web Actions</a>

<a href="http://www.smartjava.org/content/html5-web-intents-share-information-between-web-apps">Dev article</a>

<a href="https://plus.google.com/116171619992010691739/posts">+WebIntents</a>

<a href="http://www.youtube.com/watch?v=O1YjdKh-rPg&feature=player_embedded#!">Intro video from Google IO 2012</a>
<br/>
<br/>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js" type="text/javascript" defer></script>
<script src="http://code.highcharts.com/highcharts.js" defer></script>
<script src="http://code.highcharts.com/modules/exporting.js" defer></script>
<script src="/js/sharing-web-intents-charts.js" defer></script>