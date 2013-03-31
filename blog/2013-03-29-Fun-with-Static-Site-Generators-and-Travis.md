---
layout: blog
title: Fun with Static Site Generators and Travis
tags: [preprocessor,travisci,awestruct,loadreportjs]
preview: Learn how to setup an automated, github hosted, static site with Awestruct, Travis CI, and Loadreport.js. This post reviews the basics of setting up your github OAuth token, encryption with travis, and finally pushing your website to github pages with an automated travisci build.
previewimage: /images/posts/2013-03-29/awestructlogo.PNG
---
<br/>
## Overview
If you use a static website generator, then you may be aware of the pain that goes into getting everything automated and pushed out to github pages on each commit.

The manual workflow goes something like this:

<ol>
<li>code your site using asciidoc/markdown/haml/sass/less/etc</li>
<li>preprocessor (or build) generates static site (locally on your machine)</li>
<li>copy static site to your local gh-pages or username.github.com repo/branch</li>
<li>git push new site</li>
<li>done</li>
</ol>

Now, with a little scripting we can have:

<ol>
<li>code your site using asciidoc/markdown/haml/sass/less/etc</li>
<li>git push to source repo</li>
<li>done (with so many other cool features at our fingertips)</li>
</ol>

Most preprocessor tools do have some kind of built in function for this workflow, but when you need to take it to a finer grained level and leverage services on the CI server, then this is what must be done.

With our new workflow, we let Travis CI do the work for us in a bash script. This opens the door to automation greatness for many other things like testing and asset uploads. As you will see at the end of this article, we add a simple PhantomJS script
to test how each new commit loads (over time) in a web browser - giving us a baseline for site performance.

This post is going to review the basics of setting up your github OAuth token, encryption with travis, and finally pushing your website to github pages with an automated travisci build.
We'll top it all off with running [loadreport.js](http://loadreport.wesleyhales.com) after each check in to understand how a single commit can affect site performance. So let's go...
<br/>
## Github hosting setup
If you're unfamiliar with github pages or how to host your own top-level domain (yourdomain.com) under your github account, then read [this](https://help.github.com/articles/what-are-github-pages), [then this](https://help.github.com/articles/creating-project-pages-manually) first.
<br/>
## Github, Travis, and OAuth
First off, you must login to [Travis CI](https://travis-ci.org) with your github username and enable the travis service hook on the repository you wish to automate.
For me, this is where my haml/sass/etc... source is located.
<img src="/images/posts/2013-03-29/travisci1.png" alt="travis" class="margin10"/>
Next, we'll create an OAuth token for your repository access :
<script src="https://gist.github.com/wesleyhales/5274538.js"></script>

Pluck the <b>"token":</b> string value from the generated json and encrypt it. Pro tip: this token is basically the same thing as your password. So don't push it out to a public repository.
<script src="https://gist.github.com/wesleyhales/5274559.js"></script>

To encrypt, we must install the travis gem and encrypt the token string from above with:
<script src="https://gist.github.com/wesleyhales/5274580.js"></script>
..this will create a string in your console and we'll paste it below, so keep it close by...

Now, we can create the gh-pages branch for this repository [following these instructions](https://help.github.com/articles/creating-project-pages-manually). This gh-pages branch can host your generated site or artifacts. Since I have a TLD mapped to my wesleyhales.github.com
repository, I'm using the gh-pages branch under my source account for load testing reports. For my blog, I'm mapping a domain name over by simply forwarding a TLD like wesleyhales.com, with an A record pointing to 204.232.175.78.
Then I added a [CNAME file](https://github.com/wesleyhales/wesleyhales.github.com/blob/master/CNAME) to the repo so github DNS knows where to forward to.

<br/>
## The Build Config
Finally, we're ready to update our .travis.yml.
<script src="https://gist.github.com/wesleyhales/5274500.js"></script>
[Awestruct](http://awestruct.org/getting_started/) is a ruby based preprocessor, so this project is setup with the travis ruby config (above).

Note the <b>before_script</b> and <b>script</b> configs:

<b>before_script</b> runs the awestruct build and then the post_build.sh script. post_build.sh pushes our newly generated public facing website to github pages. This is where github kindly serves up our static content at username.github.com (for free).

<script src="https://gist.github.com/wesleyhales/5274512.js"></script>

And finally, <b>script</b> will run gh-pages-report.sh. This allows us to run [loadreport.js](http://loadreport.wesleyhales.com) and send the generated report to our source gh-pages branch.
Travis CI provides an instance of phantomjs during our build, so all we have to do is call it. This is basically a build report (or artifact from the build). It measures how long
it takes our site to load after each commit is made. This gives us a baseline for measuring performance.
<script src="https://gist.github.com/wesleyhales/5274517.js"></script>

<br/>
##The Results

The source for this blog you are reading is stored on github [here](https://github.com/wesleyhales/wesleyhales.com). When I do
a git push, everything is automatically built with travis and pushed again to the [github repo](https://github.com/wesleyhales/wesleyhales.github.com) that is specially named to handle the
mapping of my TLD (wesleyhales.com) to my username on github.
<img src="/images/posts/2013-03-29/blog-ss.png" class="margin10" width="400px">

Since I have 2 repositories, one for the preprocessor source and the other for the TLD mapping, I'm using the gh-pages branch on my
 source repository for reporting. With PhantomJS and loadreport.js, I run a test on every commit to see how I affected my sites loading performance.
 The results of this test are automatically pushed and I can view them [here](http://wesleyhales.com/wesleyhales.com/).
 [<img src="/images/posts/2013-03-29/perf-test.png" class="margin10" width="400px">](http://wesleyhales.com/wesleyhales.com/)

 From a UI polish perspective, I have a ton left to do. But the concept stays the same for any build. Use it to build and push out project
 documentation along with other reports and assets. I'd eventually like to write a script to do a diff on only test the pages that were changed on the commit.

 <br/>
 <br/>
