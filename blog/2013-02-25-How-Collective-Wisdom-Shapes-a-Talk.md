---
layout: blog
title: How Collective Wisdom Shapes a Talk
tags: [websockets, speaking, audience engagement]
preview: This post explains the ideas behind onslyde, an open source tool used to gain audience participation and fine grained analytics on presentations. It also explains the steps to getting setup.
previewimage: /images/icons/onslyde.png
---
<br/>
## Overview
Exactly one year ago, I started working on a WebSocket prototype that would give audiences the power to control
my talks. I [used it for the first time](http://wesleyhales.com/images/posts/2012-11-01/c70jx.jpg) at DevNexus 2012 in Atlanta, GA and it produced great engagement results. At that time,
 the only analytics I had built into the server were through logging, and the results were motivating enough to continue using the prototype.<br/>
Over the span of 2012, I spent many late nights in hotel rooms preparing my slides for talks and working out bugs of
this tool which I named "onslyde". The following video is a talk I gave on February 18th, 2013 at the same conference one year later.
Analytics were added and many bugs were fixed. I also integrated the tool with the reveal.js presentation framework. I had originally
 built a simple HTML+CSS slide deck, and by integrating with reveal.js, I was able to see that my code would integrate nicely with other
  presentation frameworks.<br/><br/>
<iframe width="560" height="315" src="http://www.youtube.com/embed/n-7Xu75T2bU" frameborder="0" allowfullscreen></iframe>
<br/><br/>
*Points in the talk where the audience voted:*

<li>[Vote 1](http://www.youtube.com/watch?feature=player_detailpage&v=n-7Xu75T2bU#t=101s)</li>
<li>[Vote 2](http://www.youtube.com/watch?feature=player_detailpage&v=n-7Xu75T2bU#t=583s)</li>
<li>[Vote 3](http://www.youtube.com/watch?feature=player_detailpage&v=n-7Xu75T2bU#t=1571s)</li>
<li>[Vote 4](http://www.youtube.com/watch?feature=player_detailpage&v=n-7Xu75T2bU#t=1762s)</li>
<li>[Vote 5](http://www.youtube.com/watch?feature=player_detailpage&v=n-7Xu75T2bU#t=3451s)</li>


## Details of onslyde
[<img src="/images/posts/2013-02-25/onslyde.arch.png" alt="onslyde architecture" class="margin10" width="200px" align="left">](/images/posts/2013-02-25/onslyde.arch.png)
At its core, the concept is simple. Attendees connect to a WebSocket server, the presenter sends them vote options at certain points during her
 presentation and whoever decides to connect can have anonymous interactions with the presenter. Participants may also give a
"thumb up" or "thumb down" during any slide to show that they approve or disapprove of the content on a given slide. This allows for a
very fine grained level of anonymous interaction.

Beyond the simplistic parts of interacting with the slide deck, I wanted the presenter to actually have the ability of tailoring their
talk to the "collective wisdom" of the audience. So, the presenter has the ability of forking their slides and providing 2 tracks of
content based on the audience vote. The poll and tracks are setup declaratively as follows:
<br/><br style="clear:left"/>
<script src="https://gist.github.com/wesleyhales/5014482.js"></script>
<br/>
* *data-option="master"* : denotes a master slide where the bar graph will be displayed
* *data-option="Blue"* : is one of the 2 polling options
* *data-option="Red"* : is one of the 2 polling options, also notice that we have multiple "Red" sections. These slides will be presented
in order if "Red" wins the audience vote.
* *class="send"* : specifies that we want to send this content to each connected remote

So, the above markup sets up the following slide deck and remote control options:
[<img src="/images/posts/2013-02-25/onslyde-1.PNG" alt="onslyde architecture" class="margin10" width="500px">](/images/posts/2013-02-25/onslyde-1.PNG)

After all the votes are placed, the winning track is chosen based on the majority vote:
[<img src="/images/posts/2013-02-25/onslyde-2.PNG" alt="onslyde architecture" class="margin10" width="500px">](/images/posts/2013-02-25/onslyde-2.PNG)

After the fork occurs, the presenter can choose to present slides in linear fashion, or ask another poll question. The framework is
limited by only allowing for 2 options to be given and slides can only be forked once per question.

As stated earlier, everything is declarative and setup through HTML markup. So there's no need for the presenter to setup a server or mess
with JavaScript. The deck can work without an internet connection as a fallback, or you could run the server on your laptop and bring
a router/hotspot for the audience to connect to.
<br/>
## Analytics

Mid last year, I started capturing audience data into a database. I also added Google analytics (with custom events) to the remotes so I could get a
good understaning on audience devices and usage. The following data is from the video above.
<br/>
### From MySQL
Here, we're capturing votes on the options and how many times the "Nice" and "WTF" buttons were pressed during this track. One thing that
Google Analytics does not give us are timestamps, or when events occured at a fine grained level. By capturing the time when each "Nice"
 or "WTF" button is pressed, I can see exactly which slide was being shown and when the button was pressed. There is a bit of a latency
 issue from the time the button is pressed until the time it actually shows up on the presenters screen, so capturing the TS at the server
 level gives a more accurate picture of how you performed on each slide, if the content made sense, etc.
[<img src="/images/posts/2013-02-25/hypevreality.PNG" alt="onslyde architecture" class="margin10 max-width-100">](/images/posts/2013-02-25/hypevreality.PNG)

### From GA and Custom Events
This is an overview of the device analytics. I didn't want to reinvent the wheel on User Agent detection and keeping track of sessions, so I leveraged GA.
The following data is from my talk, in the video above, given on February 18th.
[<img src="/images/posts/2013-02-25/feb18Devnexus.PNG" alt="onslyde architecture" class="margin10 max-width-100">](/images/posts/2013-02-25/feb18Devnexus.PNG)

## Conclusion

*Become a better speaker* <br/>
I know that I'm not a "great" public speaker. Sure I can hold my own, but I still have a lot to learn. And every person who gives a presentation
is different. We all have different personalities, views, and ways of moving about the stage - we all have an idea of what we think the audience wants
 to know. But allowing the audience to guide the speaker and to anonymously give their input is huge. You won't get that kind of feedback verbally or
 by asking the audience to raise their hand for a given question. Nor will you get this type of fine grained feedback in a survey form at the end of your talk.<br/>
You might not be able to tell it, but in the video above, every time I ask the audience to vote on something and I look up at the
responses coming in, it gives me a huge boost of confidence. Not just because the tool is actually being used, but I feel like I'm
about to go down a road that is actually useful to them. At that point I adjust and tailor everything I say from the results that
came in.

*Make the conversation go both ways* <br/>
When an individual feels that they can control the presentation's future, it's a powerful thing. It's one thing just to poll the audience
and get feedback, but to have a number of slides prepared for the results of that poll is another thing.
Also, with the capabilities of mobile browsers today, we can make the presentation experience much richer. With this tool,
I can send each person the notes and other information which relates to the slide I'm currently on. I can also send the ones who voted but didn't win the track selection, the slides or
notes that I didn't show. So many possibilities to this...

[<img src="http://farm9.staticflickr.com/8348/8190387932_37343f3e53_n.jpg" alt="onslyde architecture" target="_blank" class="margin10 max-width-100" align="left">](http://www.flickr.com/photos/bejug/8190387932/sizes/l/in/set-72157632019400699/)
Fortunately, I've had the chance to test this code/concept out in many different talks over the past year. From 10 people in a room to 100's,
 the feeling of having everyone dialed into what you're saying is invaluable.

*Crowdsourcing and forming some kind of collective wisdom* <br/>
Using this tool at a conference allows for a limited number of attendees to participate, but taken to a larger scale (webinar), the combined thoughts
of the audience on a given topic can be surprising. Not just to the presenter for tailoring his next steps, but to the data collected behind
 the scenes. Because my interests lie in the mobile web and HTML5, I get really interesting stats for devices and browsers with each talk I give.
 But, if I were a presenter introducing a new product (outside of the tech realm) and trying to sell it to the audience, I would have
 a huge advantage by allowing for impulse buys and fine grained sales throughout my talk. Basically, content would be spoon fed and the
 chance of missed opportunities would be slim.
<br/><br/>
## Open Source
This presentation tool is open source. If you'd like to signup for the beta and give it a spin, I would greatly appreciate your feedback.
This blog post is serving as the documentation for the project until I get some time to improve.

<ul>
<li><a href="http://onslyde.com" target="_blank">Signup here</a> and get a session ID. Make a note of your assigned "session ID". The UI sucks right now, so after you hit the submit button it will show up in a barely visible green box above the name input.</li>
<li>Follow the directions <a href="http://onslyde.com/example-deck.html" target="_blank">mentioned in this slide deck</a>. Basically just save the HTML to disk somewhere.</li>
<li>Go to line 317 in the HTML file you just saved and replace the current sessionID value (103) with the one from your signup.</li>
<li>You now have a private session for your presentation.</li>
<li><a href="https://github.com/wesleyhales/onslyde">Come help out with the project</a></li>
</ul>

If you run into bugs, report them <a href="https://github.com/wesleyhales/onslyde/issues">here</a> please.

Thanks!!


<br style="clear:left"/>
<br/><br/>





