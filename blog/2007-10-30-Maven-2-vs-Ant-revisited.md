---
layout: blog
title: Maven 2 vs. Ant (revisited)
tags: [Java, ant, lrd, maven]
preview:
previewimage:
---

<p>Almost a year since I made <a href="http://www.jroller.com/wesleyhales/entry/maven_2_vs_ant_which">this entry</a> and I think Maven is great for open source and commercial apps. Sure, there may be <a href="http://blog.thomas.heute.name/2007/10/ant-vs-maven-round-2.html">a few things</a> you want to do that don't fit into the "Maven way" but for the most part, it is a great build system. 
Also, any one that uses IntelliJ Idea will fall in love with Maven on first use (I guess it handles Eclipse project files just as well).</p> 
</p> 
<p>I recently worked on converting a JBoss Portal module from Ant to Maven and you can <a href="http://jbossportal.blogspot.com/search/label/maven">read about</a> a few generic problems that I ran into and how to overcome them. 
</p> 
<p>Also, one very powerful feature of Maven that I am messing around with right now is filtering and profile "mashups".
Lets say, I want LRD (local rapid development ;-) on my workstation using Tomcat. Usually I would use the Jetty plugin because it is the ultimate for Maven LRD, but the majority of the time and to match what is in production, developers use Tomcat at a minimum. Here is a quick tip for creating a shared distributable app using the aforementioned. 
</p> 
<p><h3>In a existing Maven app, create the following structure:</h3> 
<code><pre> 
src 
|-main 
|-filters 
|-tomcat.properties 
|-resources 
|-context.xml 
</pre></code> 
</p> 
<p><h3>In your pom.xml we have something like</h3>: 
<code><pre> 
<a name="l1"><span class="s0">&lt;</span><span class="s1">profile</span><span class="s0">&gt;</span><span class="s2"> 
<a name="l2"> </span><span class="s0">&lt;</span><span class="s1">id</span><span class="s0">&gt;</span><span class="s3">tomcat</span><span class="s0">&lt;/</span><span class="s1">id</span><span class="s0">&gt;</span><span class="s2"> 
<a name="l3"> </span><span class="s0">&lt;</span><span class="s1">activation</span><span class="s0">&gt;</span><span class="s2"> 
<a name="l4"> </span><span class="s0">&lt;</span><span class="s1">activeByDefault</span><span class="s0">&gt;</span><span class="s3">false</span><span class="s0">&lt;/</span><span class="s1">activeByDefault</span><span class="s0">&gt;</span><span class="s2"> 

<a name="l5"> </span><span class="s0">&lt;/</span><span class="s1">activation</span><span class="s0">&gt;</span><span class="s2"> 
<a name="l6"> 
<a name="l7"> </span><span class="s0">&lt;</span><span class="s1">build</span><span class="s0">&gt;</span><span class="s2"> 
<a name="l8"> 
<a name="l9"> </span><span class="s0">&lt;</span><span class="s1">filters</span><span class="s0">&gt;</span><span class="s2"> 
<a name="l10"> </span><span class="s0">&lt;</span><span class="s1">filter</span><span class="s0">&gt;</span><span class="s3">src/main/filters/tomcat.properties</span><span class="s0">&lt;/</span><span class="s1">filter</span><span class="s0">&gt;</span><span class="s2"> 

<a name="l11"> </span><span class="s0">&lt;/</span><span class="s1">filters</span><span class="s0">&gt;</span><span class="s2"> 
<a name="l12"> 
<a name="l13"> </span><span class="s0">&lt;</span><span class="s1">resources</span><span class="s0">&gt;</span><span class="s2"> 
<a name="l14"> </span><span class="s0">&lt;</span><span class="s1">resource</span><span class="s0">&gt;</span><span class="s2"> 
<a name="l15"> </span><span class="s0">&lt;</span><span class="s1">directory</span><span class="s0">&gt;</span><span class="s3">${basedir}/src/main/resources</span><span class="s0">&lt;/</span><span class="s1">directory</span><span class="s0">&gt;</span><span class="s2"> 

<a name="l16"> </span><span class="s0">&lt;</span><span class="s1">filtering</span><span class="s0">&gt;</span><span class="s3">true</span><span class="s0">&lt;/</span><span class="s1">filtering</span><span class="s0">&gt;</span><span class="s2"> 
<a name="l17"> </span><span class="s0">&lt;</span><span class="s1">targetPath</span><span class="s0">&gt;</span><span class="s3">../${build.finalName}/META-INF</span><span class="s0">&lt;/</span><span class="s1">targetPath</span><span class="s0">&gt;</span><span class="s2"> 
<a name="l18"> </span><span class="s0">&lt;</span><span class="s1">includes</span><span class="s0">&gt;</span><span class="s2"> 
<a name="l19"> </span><span class="s0">&lt;</span><span class="s1">include</span><span class="s0">&gt;</span><span class="s3">context.xml</span><span class="s0">&lt;/</span><span class="s1">include</span><span class="s0">&gt;</span><span class="s2"> 

<a name="l20"> </span><span class="s0">&lt;/</span><span class="s1">includes</span><span class="s0">&gt;</span><span class="s2"> 
<a name="l21"> </span><span class="s0">&lt;/</span><span class="s1">resource</span><span class="s0">&gt;</span><span class="s2"> 
<a name="l22"> </span><span class="s0">&lt;/</span><span class="s1">resources</span><span class="s0">&gt;</span></a> 
</pre></code> 
</p> 
<p><h3>in tomcat.properties</h3> 
<code><pre> 
context.docBase=${basedir}/target/${project.build.finalName} 
context.path=/${project.build.finalName} 
</pre></code> 
</p> 
<p><h3>and in context.xml</h3> 
<code><pre> 
&lt;Context path="${context.path}" docBase="${context.docBase}" reloadable="true"/&gt; 
</pre></code> 
</p> 
<p>Once you have all of this in place (along with a good cargo config found <a href="http://www.jroller.com/wesleyhales/entry/running_seam_2_0_on">in this post</a>) you will be on your way to a enjoyable, easy development setup.</p> 
<p> 
<p> 
So now, all you have to do to hot deploy your maven app to a running instance of Tomcat is type the following: 
<code>mvn install -Ptomcat</code><br/> 
This will compile and deploy your changes quickly. You can also set your IDE to copy jsp/xhtml files over using a keyboard shortcut mapping (easy to do with Idea) so for UI changes you don't have to hot deploy every time. 
</p> 
This example just scratches the surface of what mixing profiles with filtering can do. You could have a filtering/profile mechanism for every possible scenario. 
</p>
