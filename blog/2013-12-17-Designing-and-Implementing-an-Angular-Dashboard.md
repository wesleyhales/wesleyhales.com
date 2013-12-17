---
layout: blog
title: From Startup to Enterprise
tags: [design, develop, angularjs]
preview: For the past year I have been completely heads down, working on a new dashboard/portal for Apigee. This is the story behind it.
previewimage: /images/icons/apigee.png
---
<br/>
## Overview
At the beginning of 2013 I was given the incredible opportunity to start with an empty canvas and come up with a completely new web application for Apigee.
For the past year I've been heads down on merging Apigee's Usergrid and Mobile Analytics products using AngularJS.

For those interested: Usergrid, a
Backend as a Service, was acquired by Apigee in early 2012 and has served as the core tool of all Apigee trainings and developer outreach efforts.
Developers use it to create a backend for their mobile apps amongst many other things like managing users, roles and permissions.
The Mobile Analytics product is something I was partial to since I created the original UI - before it was acquired by Apigee. I wanted to carry it past
the acquisition and endure the process of turning it into a full fledged enterprise offering.

This is a retrospective - carrying an idea from startup to enterprise product.

<br/>
## Let's start with the design

We started brainstorming for the new UI on February 1st. Originally we set out to only deliver a new analytics dashboard, but were soon asked to merge
the existing UserGrid project into the fold.

Here are the first designs and wireframes we came up with. I purposely left everything greyscale to allow for a pure focus on the page data and layout.

[<img src="/images/posts/2013-12-17/first-design-a.png" class="margin10 max-width-100 float-left">](/images/posts/2013-12-17/first-design-a-large.png)
[<img src="/images/posts/2013-12-17/first-design-b.png" class="margin10 max-width-100 float-left">](/images/posts/2013-12-17/first-design-b-large.png)
[<img src="/images/posts/2013-12-17/first-design-c.png" class="margin10 max-width-100 float-left">](/images/posts/2013-12-17/first-design-c-large.png)
<br class="clear-left"/>
The layouts above took around 1 month to deliver, and many of the UI elements were reworked from the old UI. Most of the work went into the new look and feel and
reformatting the data to appear more readable.

After the team was in agreement on how the pages should be structured, we then went into the finer design details. It's kind of weird (and welcomed) being the designer
AND developer for a given project. I mean, that's what startups are all about - doing everything and playing all the roles - but when you get into larger
companies and work with larger teams, people start to look at you a little funny and the criticism is a little heavier. And that's totally expected and
understandable, because as companies grow it only makes sense to hire these things out to design firms that are doing this stuff day in and day out.

So navigation design is always a fun topic amongst developers and designers. Especially when some products use a horizontal design and others choose vertical.
It really depends on the usecase on which way you should go. We went with the vertical menu in this case because the end user (developers) would be
building an app with our UI. It only made sense to see and understand each tool we were providing on a visual level, and not hidden away in a horizontal menu with
drop downs.

This is the evolution of our menu design in chronological order from left to right. Design is an iterative process for me and
I never get it right on the first go. And it really helps to have good feedback from other "design minded" folks.

[<img src="/images/posts/2013-12-17/menus-large.png" class="margin10 max-width-100">](/images/posts/2013-12-17/menus-large.png)


I wanted to leave a lot of the original grey design from the mockups and not get too heavy handed with the colors. After all, we were
building an analytics dashboard that needed to put heavy emphasis on errors, warnings, and other alerts.

[<img src="/images/posts/2013-12-17/app-erros.png" class="margin10 max-width-100">](/images/posts/2013-12-17/app-erros.png)

The style guide is still in the works. Luckily Apigee already had one, so I leveraged all the existing colors and fonts.

<br/>
## The Code

By mid-April, we had most of the feedback implemented into the wireframes and were ready to move forward with development. During
this month and in between feedback rounds, I was evaluating both Ember and AngularJS. I'm not going to turn this into
a discussion of which framework I think is better - they both have their strengths and weaknesses - but I will tell you why I
went with Angular.

* Community - When I opt for a framework, it has to be strongly backed by the community.
* Components - I like the web components approach that Angular has going with directives. And putting heavy emphasis on this from the start was a good move by the
Angular team. Directives, love or hate, are a huge win for gaining community support and contributions. I've also recently seen a few conference speakers focus their entire
session on directives. Sure, there's a bit of a learning curve, but the concept is well received by most front-end devs.
* Productivity - I liked being productive. This post is a testament to being productive, seeing that two developers could stand up an entire analytics and BaaS dashboard within 6 months.
* Architecture - Angular sets forth the idea of a loosely coupled architecture for building large apps. The mechanisms for dependency injection and scope management were attractive to me.


On May 1st I had the markup and a beginning on the Angular architecture all pushed to github. From May into the late summer months we were
busting ass trying to get this dashboard completed. I was mainly working on the global parts of the app along with the monitoring dashboard, and we had
one other developer focusing on rewriting the existing Usergrid Backbone application into Angular.

[<img src="/images/posts/2013-12-17/github.png" style="width: 500px">](/images/posts/2013-12-17/github.png)

On August 9th we had our first C-Level review of the beta version of the product. This is pretty significant seeing that two developers were
able to produce a massive SPA in a little over 3 months. Not to mention managing vacation schedules and other things that arose. Of course,
We still had a ways to go in polishing the application and not to mention testing, but overall we were able to get a lot done in a short
amount of time.

Here are a couple of projects and articles that resulted from this work:
<li>[Angular Charts](https://github.com/wesleyhales/angular-charts)</li>
<li>[Basic Screen Updates with Angular and requestAnimationFrame](http://wesleyhales.com/blog/2013/10/23/Basic-Screen-Updates-with-Angular-and-requestAnimationFrame/)</li>

##Conclusion


There are many reasons I like Angular for 2013, 2014, and maybe even 2015. But another framework will come in <= 3 years time, and it will be even more productive and we'll
 be rewriting a new product all over again. That's the nature of the beast and it's very similar to many other 3 year life cycles we see in the tech industry. Bottom line: Don't religiously buy into
 any web framework. Use it at face value and always be prepared for the next one.

Along the way, I had brilliant input and help from many awesome folks. The product manager for this effort was [Alan Ho](https://twitter.com/karlunho), and I would not
have been able to forge a usable product without his vision of how things should come together. [Ed Anuff](https://twitter.com/edanuff), the founder of Usergrid, was truly a pleasure
to work with/for and receive guidance from during many frustrating times. [Prabhat Jha](https://twitter.com/prabhatjha), my long time pal worked tirelessly to setup the RESTful
endpoints I needed to get the job done (along with countless other backend pieces). And last but not least, [Rod Simpson](https://twitter.com/rockerston) who stepped in to help with the
Backbone-to-Angular rewrite of the existing UserGrid product. Rod also has an impressive design background and helped/pushed me to design a better product
when I hit blocks.

You can try the dashboard out for yourself [here](https://apigee.com/usergrid). Lemme know what you think!
<br/>
<br/>