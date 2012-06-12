---
layout: blog
title: iPhone Web Development
tags: [Java]
preview:
previewimage:
---

<div> 
I broke down and got my 8gig iPhone on Tuesday. I have been using it pretty heavily and in just a sec, I will start with my list o' let downs. But first, I gotta say that whoever designed the <a href="http://developer.apple.com/iphone/designingcontent.html">Optimizing Web Applications and Content for iPhone</a> page from Apple has obviously not done a lot of open-source or ANY development for that matter. Yes, it is good content, BUT This may or may not be one of the weak links for apple because there is really no organization to the content, important bits of information are scattered here an there, and frankly for something "so revolutionary" - they are not supporting the people who will make or break this thing (us - the developer) with good documentation very well. It honestly looks like they threw this together in a few hours/days. OK, on to the list....</div><img src="http://www.jroller.comsrc="/images/jroller/DSC_2051-2.JPG" alt="" style="float:right"/> 
<dl> 
<dt style="font-weight:bold;color:#383838;padding:3px 0 3px 0">Safari keeps crashing</dt> 
<dd>I have been trying to use google pretty heavily for Analytics, Adwords, Reader, etc... Although you can't view any Flash through the iPhone's Safari web browser, you can view all graphs in Google Analytics by exporting to pdf. So a few clicks into my Google apps usually leads to Safari blowing up and taking me back to the main iPhone screen.</dd> 
<dt style="font-weight:bold;color:#383838;padding:3px 0 3px 0">No Flash, SVG, Java applets or anything other than Quicktime supported media (listed below...)</dt> 
<dd> 
<table> 
<tr> 
<th style="color:#888888">MIME type</th> 
<th style="color:#888888">Description</th> 
<th style="color:#888888">Extensions</th> 
</tr> 
<tr> 
<td>audio/aiff</td> 
<td>AIFF audio</td> 
<td>aiff, aif, aifc, cdda</td> 
</tr> 
<tr class="dark"> 
<td>audio/x-mp3</td> 
<td>MP3 audio</td> 
<td>mp3, swa</td> 
</tr> 
<tr> 
<td>audio/x-m4a</td> 
<td>AAC audio</td> 
<td>m4a</td> 
</tr> 
<tr class="dark"> 
<td>video/x-m4v</td> 
<td>Video</td> 
<td>m4v</td> 
</tr> 
<tr> 
<td>video/3gpp</td> 
<td>3GPP media</td> 
<td>3gp, 3gpp</td> 
</tr> 
<tr class="dark"> 
<td>audio/x-m4b</td> 
<td>AAC audio book</td> 
<td>m4b</td> 
</tr> 
<tr> 
<td>audio/mpeg</td> 
<td>MPEG audio</td> 
<td>mpeg, mpg, mp3, swa</td> 
</tr> 
<tr class="dark"> 
<td>audio/x-mpeg</td> 
<td>MPEG audio</td> 
<td>mpeg, mpg, mp3, swa</td> 
</tr> 
<tr> 
<td>audio/x-wav</td> 
<td>WAVE audio</td> 
<td>wav, bwf</td> 
</tr> 
<tr class="dark"> 
<td>audio/amr</td> 
<td>AMR audio</td> 
<td>amr</td> 
</tr> 
<tr> 
<td>audio/3gpp</td> 
<td>3GPP media</td> 
<td>3gp, 3gpp</td> 
</tr> 
<tr class="dark"> 
<td>audio/x-m4p</td> 
<td>AAC audio (protected)</td> 
<td>m4p</td> 
</tr> 
<tr> 
<td>audio/x-aiff</td> 
<td>AIFF audio</td> 
<td>aiff, aif, aifc, cdda</td> 
</tr> 
<tr class="dark"> 
<td>audio/mpeg3</td> 
<td>MP3 audio</td> 
<td>mp3, swa</td> 
</tr> 
<tr> 
<td>audio/mp3</td> 
<td>MP3 audio</td> 
<td>mp3, swa</td> 
</tr> 
<tr class="dark"> 
<td>video/quicktime</td> 
<td>QuickTime Movie</td> 
<td>mov, qt, mov, qt, mqv</td> 
</tr> 
<tr> 
<td>audio/x-mpeg3</td> 
<td>MP3 audio</td> 
<td>mp3, swa</td> 
</tr> 
<tr class="dark"> 
<td>video/3gpp2</td> 
<td>3GPP2 media</td> 
<td>3g2, 3gp2</td> 
</tr> 
<tr> 
<td>video/mp4</td> 
<td>MPEG-4 media</td> 
<td>mp4</td> 
</tr> 
<tr class="dark"> 
<td>audio/mp4</td> 
<td>MPEG-4 media</td> 
<td>mp4</td> 
</tr> 
<tr> 
<td>audio/wav</td> 
<td>WAVE audio</td> 
<td>wav, bwf</td> 
</tr> 
<tr class="dark"> 
<td>audio/3gpp2</td> 
<td>3GPP2 media</td> 
<td>3g2, 3gp2</td> 
</tr> 
</table>	
</dd> 
<dt style="font-weight:bold;color:#383838;padding:3px 0 3px 0"><quote>JavaScript execution is limited to 5 seconds for each top-level entry point. If your script executes longer than 5 seconds, an exception is raised.</quote></dt> 
<dd>I don't see this as being a huge issue, but I guess it depends on how complicated your .js is. Anything longer than a 5 sec. javascript animation is pretty bad IMO. I'm not sure what else in the confines of an iPhone app would take longer than the alotted 5 seconds.</dd>	
</dl> 
<dt style="font-weight:bold;color:#383838;padding:3px 0 3px 0">If you're serving up video, you better make it clear for the ones who are on EDGE opposed to WI-FI. </dt><dd>Almost like the old days of a split screen website with a "Flash" or "HTML" version of the site. Although this won't be as bad because it is just video, not the entire layout of your site.</dd> 
<p> 
Other than a few bugs, and I would be stupid not to expect any, I love the iPhone and the concept of a standardized web browser! yeah! It has alot of cool stuff and has TONS of potential. So, here are the main things you can do in a web page to interact with the iPhone: (hold your oh's and ah's for the end please ;)</p> 
<p> 
Call a number: 
<quote><code> 
<a href="tel:1-408-555-5555">1-408-555-5555</a> 
</code></quote> 
</p> 
<p> 
Send a email: 
<quote><code> 
<a href="mailto:frank@wwdcdemo.example.com">John Frank</a> 
</code></quote> 
</p> 
<p> 
A location on the embedded Google maps app: 
<quote><code> 
<a href="http://maps.google.com/maps?q=cupertino">Cupertino</a> 
</code></quote> 
</p> 
<p> 
Or driving directions: 
<quote><code> 
<a href="http://maps.google.com/maps?daddr=San+Francisco,+CA&saddr=cupertino">Directions</a>
</code></quote> 
</p> 
<p>I know, I know, so much to choose from right? Don't get to crazy all at once and right a mailto app ;). But seriously, I guess there are some cool things one can do to make full use of the integration features. I have been trying to think of a cool mash-up and I'm thinking maybe something with IPTV and quicktime conversion, or using slimserver to serve up what you can't store on the 8gig limit. Maybe startup a slimserver directory using google maps??? Yeah - maybe I should think on this one a little longer.</p>
