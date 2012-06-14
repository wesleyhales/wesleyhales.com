---
layout: blog
title: Writing a FaceBook app
tags: [Java, facebook, seam]
preview: I just recently setup a Facebook profile in an effort to network with other like minded professionals and because I haven't really...
previewimage:
---

<p>I just recently setup a Facebook profile in an effort to network with other like minded professionals and because I haven't really had a reason to do so until I joined JBoss. It is astonishing how many people have accounts and are using Facebook on a daily basis. I really haven't followed the social networking fad/trend that has been going on for the past few years and I keep wondering what is going to be next. Linking people to each other in some way, shape, or form based on interests, work , hobbies, etc. has been going since modern civilization began and the social internet is just one of the many channels to do it.</p> 
<p>Now with the advent of <a href="http://code.google.com/apis/opensocial/">Open Social</a> I'm thinking that broadcasting to all of the different social networks is kind of riding the coat-tails of the fad, but is sure to bring out some interesting mutations in the social scene.</p> 
<p>Open Social is supporting quite a few different scenes (Engage.com, Friendster, hi5, Hyves, imeem, LinkedIn, MySpace, Ning, Oracle, orkut, Plaxo, Salesforce.com, Six Apart, Tianji, Viadeo, and XING) but not FaceBook. I wonder why this is?</p> 
<p>This is interesting stuff, but like I said, what is to come after "Social"? The basic concept won't change, people will always want to hook up and network. Anyway, the whole point of this article is just to explain how and why I wrote a FaceBook application.</p> 

<p class="pTitle">iProject</p> 
<p>As I browsed through the available apps on Facebook, there were few that actually did anything useful for the professional minded. There are some that let you manage contacts and business card type things, but nothing that really stood out. All I wanted to do is extend the built in Group application so that I could put a summary of my group or project on my profile page, but also add links to things that pertain to the product or service my project represents along with other custom features that a professional group would want.</p> 
<p>This led me to the iProject application(I'm still trying to think of a better name). It basically uses the Facebook api to gather information on a group, then it let's you extend the group by adding members, blog feeds, etc. It currently supports Jroller, Blogger(atom/feedburner), and Wordpress blogs. It "will" also be capable of adding members as "core members" of the project along with other features.</p> 
<p>So basically, if you are a member of an existing group on Facebook, you can extend it and make it better on your profile page. You can preview the beta on <a href="http://www.facebook.com/profile.php?id=534666343">my profile</a><p> 
<p>I used Seam and the Facebook java api along with commons httpclient to get the blog feeds. For the ui, I had to use a provided FBML (facebook markup language) dtd that's buried on Facebook's wiki so that I could use Facelets for the view. It was easy for me to use Seam just because I'm so used to getting things done quickly with it. Furthermore, these types of extensions to the framework could bring in some interesting new advantages.</p><img align="center" src="/images/jroller/Picture4.jpg" alt=""/>
