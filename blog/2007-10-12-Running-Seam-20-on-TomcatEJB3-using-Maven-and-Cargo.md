---
layout: blog
title: Running Seam 2.0 on Tomcat(EJB3) using Maven and Cargo
tags: [Java, cargo, maven, seam, tomcat]
preview:
previewimage:
---

<p>In this article I review a simple Seam 2.0.0.CR2 app that deploys to Tomcat 6.0.13 with JBoss Embedded Beta2. </p> 

<p>It's great to see Seam move to Maven because tracking and installing all those dependencies in a local repository was a pain in the ass! This project is moving fast, and if you wanted to keep up with the latest version, it was a lot of work. So now that my life is easier, I thought I would make the Seam+EJB+Tomcat user's life a little easier also.</p> 

<p class="listTitle">The following is included in this sample app:</p> 
<ul> 
<li>Trinidad 1.0.2</li> 
<li>JBoss RichFaces</li> 
<li>JAAS</li> 
<li>Drools</li> 
<li>JBPM</li> 
<li>And everything else that seam and Embedded/EJB3 provides out of box.</li> 
</ul> 


<p>All you need to have is Maven 2.0.x installed. The rest is cake. During the installation Cargo will download a zip file from the JBoss Maven repository. This is the Tomcat 6.0.13 distro with Embedded already installed and setup. Nothing else has been added to it.</p> 

<h2>Directions</h2> 
<ol> 
<li>Checkout the project and getting started directions <a href="http://code.google.com/p/seam-2-sandbox/">Here</a></li> 
</ol> 
<p>*Note - I used a stub for the datasource in TOMCAT_HOME/lib/deploy. Don't forget that this deploy directory is supposed to be the same as JBoss AS deploy directory.</p> 
<p class="listTitle">I used a few cool things in the maven pom setup:</p> 
<ul> 
<li>It seems you can trick cargo into using the latest version of tomcat. The documentation says Tomcat5x is only supported for the container, but I didn't have any problems using 6.0.x with the Tomcat5x containerId</li> 
<li>The <code>cargo.container.url</code> can be local, there is an example in the web/pom.xml (at the bottom)...So once you have this downloaded in you target dir, I would copy it somewhere outside of target and change the <code>cargo.container.url</code> to point to it. It will save time from downloading and bandwidth. It would be cool to add it as a dependency and then unzip from your local maven repo, but I haven't tried it yet.</li> 
<li>Like I mentioned earlier, if you want to disable auto start of the Tomcat server you should disable this section of the cargo plugin in web/pom.xml 
<code> 
<pre> 
<a name="l510"> <span class="s0">&lt;</span><span class="s4">executions</span><span class="s0">&gt;</span><span class="s3"> 
</span></a><a name="l511"> <span class="s0">&lt;</span><span class="s4">execution</span><span class="s0">&gt;</span><span class="s3"> 
</span></a><a name="l512"> <span class="s0">&lt;</span><span class="s4">id</span><span class="s0">&gt;</span><span class="s5">start</span><span class="s0">&lt;/</span><span class="s4">id</span><span class="s0">&gt;</span><span class="s3"> 
</span></a><a name="l513"> <span class="s0">&lt;</span><span class="s4">phase</span><span class="s0">&gt;</span><span class="s5">install</span><span class="s0">&lt;/</span><span class="s4">phase</span><span class="s0">&gt;</span><span class="s3"> 

</span></a><a name="l514"> <span class="s0">&lt;</span><span class="s4">goals</span><span class="s0">&gt;</span><span class="s3"> 
</span></a><a name="l515"> <span class="s0">&lt;</span><span class="s4">goal</span><span class="s0">&gt;</span><span class="s5">start</span><span class="s0">&lt;/</span><span class="s4">goal</span><span class="s0">&gt;</span><span class="s3"> 
</span></a><a name="l516"> <span class="s0">&lt;/</span><span class="s4">goals</span><span class="s0">&gt;</span><span class="s3"> 
</span></a><a name="l517"> <span class="s0">&lt;/</span><span class="s4">execution</span><span class="s0">&gt;</span><span class="s3"> 

</span></a><a name="l518"> <span class="s0">&lt;</span><span class="s4">execution</span><span class="s0">&gt;</span><span class="s3"> 
</span></a><a name="l519"> <span class="s0">&lt;</span><span class="s4">id</span><span class="s0">&gt;</span><span class="s5">deploy-app</span><span class="s0">&lt;/</span><span class="s4">id</span><span class="s0">&gt;</span><span class="s3"> 
</span></a><a name="l520"> <span class="s0">&lt;</span><span class="s4">phase</span><span class="s0">&gt;</span><span class="s5">install</span><span class="s0">&lt;/</span><span class="s4">phase</span><span class="s0">&gt;</span><span class="s3"> 
</span></a><a name="l521"> <span class="s0">&lt;</span><span class="s4">goals</span><span class="s0">&gt;</span><span class="s3"> 

</span></a><a name="l522"> <span class="s0">&lt;</span><span class="s4">goal</span><span class="s0">&gt;</span><span class="s5">deployer-deploy</span><span class="s0">&lt;/</span><span class="s4">goal</span><span class="s0">&gt;</span><span class="s3"> 
</span></a><a name="l523"> <span class="s0">&lt;/</span><span class="s4">goals</span><span class="s0">&gt;</span><span class="s3"> 
</span></a><a name="l524"> <span class="s0">&lt;/</span><span class="s4">execution</span><span class="s0">&gt;</span><span class="s3"> 
</span></a><a name="l525"> <span class="s0">&lt;/</span><span class="s4">executions</span><span class="s0">&gt;</span> 
</a> 
</pre> 
</code></li> 
<li>I have another version of this sample app that uses profiles to build either an EAR for JBoss or a WAR for Tomcat+Embedded. Michael Yuan recently touched on <a href="http://www.michaelyuan.com/blog/2007/10/09/jboss-seam-project-setup-with-maven-%e2%80%94-part-2-ear-deployment/">this subject</a> about the EAR+Seam maven impl and did a great job breaking it down. I will try to post the sample app that lets you build a war for Tomcat or an EAR for JBoss all based on the maven profile i.e... 
<code>mvn install -Ptomcat</code> 
or 
<code>mvn install -Pjboss</code> 
This is the power of Maven2 and there is soo much more you can do with it.</li> 
</ul> 

<p>btw, I haven't blogged since I've become an employee for JBoss, a division of Red Hat. I'm working on the <a href="http://jbossportal.blogspot.com/">JBoss Portal Team</a> and I must say that the company is awesome, my team is awesome, and everyone I have met and talked to have been, you guessed it, AWESOME!</p>
