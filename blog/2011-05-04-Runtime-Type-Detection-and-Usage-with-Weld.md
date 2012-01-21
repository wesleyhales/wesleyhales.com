---
layout: blog
title: Runtime Type Detection and Usage with Weld
tags: [Java, cdi, hornetq, infinispan, jms, jsf, richfaces, seam, weld]
---

<p><p><p class="pTitle">About TweetStream</p><br /> 
<img alt="tweetstream" align="right" width="200px" src="/images/jroller/tweetstream-phone.png"/>In developing the <a href="https://github.com/richfaces/tweetstream">TweetStream</a> demo for the JBoss World keynote and <span class="caps">JUD</span>Con presentation, I wanted to use <span class="caps">CDI</span> in a way that would choose the implementation of a given type at runtime. With Qualifiers and Producers, <span class="caps">CDI</span> gives you the power to do this.<br /> 
A little bit about the usecase: The <a href="https://github.com/richfaces/tweetstream">TweetStream</a> application is an app that Jay Balunas and I developed over the past few months for our presentation at <span class="caps">JUD</span>Con and JBoss World 2011. It was purposely developed with a myriad of JBoss community projects to showcase how you can build a mobile <span class="caps">HTML5</span> web application (which runs on Android and iOS devices) with things like scalable data grid, <span class="caps">JMS</span>, JSF2, <span class="caps">HTML5</span>/CSS3 and other middleware technologies. This application (TweetStream) was also chosen to be part of the literally incredible JBoss World 2011 keynote.<br /> 
So, we had 2 scenarios &#8211; 1) for our presentation we needed a mobile app that could run solely on it’s own so that users could pull the <a href="https://github.com/richfaces/tweetstream">source code</a>, see how we did things, and run it. 2) For the keynote, we had to make our app integrate with the Infinispan datagrid that was already setup as part of the keynote demo. The data stored on this grid utilized Drools and complex event processing as part of the keynote, so our app had to consume that data for that environment.<br /> 
So we got our tweet data from the true source (twitter4j) during our <span class="caps">JUD</span>Con presentation, and then from the data grid during the keynote. We could have used <span class="caps">CDI</span> alternatives, but I wanted a true solution with no <span class="caps">XML</span> configuration and runtime detection.<br /> 
</p><br /> 
<p><p class="pTitle">The Code...</p><br /> 
So we have 2 Qualifier Types:<br /> 
@TwitterLocal for the <span class="caps">JUD</span>Con demo impl<br /> 
@TwitterServer for the keynote impl</p> 

<p>We used infinispan in both instances, but our @TwitterLocal is a single node caching a direct twitter stream from Twitter4J.</p> 

<p>Now that we have our types defined as follows&#8230;</p> 

<p><div class="java" style="font-family:monospace;color: #006; border: 1px solid #d0d0d0; background-color: #f0f0f0;">@Qualifier<br /> 
<br /> 
@Retention<span style="color: #009900;">&#40;</span>RetentionPolicy.<span style="color: #006633;">RUNTIME</span><span style="color: #009900;">&#41;</span><br /> 
<br /> 
@Target<span style="color: #009900;">&#40;</span><span style="color: #009900;">&#123;</span>ElementType.<span style="color: #006633;">TYPE</span>, ElementType.<span style="color: #006633;">METHOD</span>, ElementType.<span style="color: #006633;">FIELD</span>, ElementType.<span style="color: #006633;">PARAMETER</span><span style="color: #009900;">&#125;</span><span style="color: #009900;">&#41;</span><br /> 
<br /> 
<span style="color: #000000; font-weight: bold;">public</span> @<span style="color: #000000; font-weight: bold;">interface</span> TwitterServer<br /> 
<br /> 
<span style="color: #009900;">&#123;</span><br /> 
<br /> 
<span style="color: #009900;">&#125;</span><br /> 
<br /> 
<br /> 
<br /> 
@Qualifier<br /> 
<br /> 
@Retention<span style="color: #009900;">&#40;</span>RetentionPolicy.<span style="color: #006633;">RUNTIME</span><span style="color: #009900;">&#41;</span><br /> 
<br /> 
@Target<span style="color: #009900;">&#40;</span><span style="color: #009900;">&#123;</span>ElementType.<span style="color: #006633;">TYPE</span>, ElementType.<span style="color: #006633;">METHOD</span>, ElementType.<span style="color: #006633;">FIELD</span>, ElementType.<span style="color: #006633;">PARAMETER</span><span style="color: #009900;">&#125;</span><span style="color: #009900;">&#41;</span><br /> 
<br /> 
<span style="color: #000000; font-weight: bold;">public</span> @<span style="color: #000000; font-weight: bold;">interface</span> TwitterLocal<br /> 
<br /> 
<span style="color: #009900;">&#123;</span><br /> 
<br /> 
<span style="color: #009900;">&#125;</span></div></p> 

<p>We need not only an implementation of each, but also a deciding bean that tells us which type to use.</p> 

<p>First, our implementation of each Type implements an interface:</p> 

<p><div class="java" style="font-family:monospace;color: #006; border: 1px solid #d0d0d0; background-color: #f0f0f0;"><span style="color: #000000; font-weight: bold;">public</span> <span style="color: #000000; font-weight: bold;">interface</span> TwitterSource <span style="color: #009900;">&#123;</span><br /> 
<br /> 
&nbsp; <span style="color: #000000; font-weight: bold;">public</span> <span style="color: #000066; font-weight: bold;">void</span> init<span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span><br /> 
<br /> 
…</div></p> 

<p>And our implementations have a different usage of the init method. <code>TwitterLocal starts the stream coming from twitter and updates the infinispan cache. </code>TwitterServer starts a method which allows us to start receiving data from the keynote which uses complex event processing and a datagrid with 6&#8211;8 nodes.</p> 

<p>So now, how do we decide which Type to use? There are a few different ways to do it, but in the case of this being a demo and not a lot of time on my part. I used this approach:</p>

<p><div class="java" style="font-family:monospace;color: #006; border: 1px solid #d0d0d0; background-color: #f0f0f0;"><span style="color: #000000; font-weight: bold;">public</span> <span style="color: #000000; font-weight: bold;">class</span> TweetStream <span style="color: #009900;">&#123;</span><br /> 
<br /> 
<br /> 
<br /> 
&nbsp; @Inject<br /> 
<br /> 
&nbsp; @<a style="color: #000060;" href="http://www.google.com/search?hl=en&q=allinurl%3Aany+java.sun.com&btnI=I%27m%20Feeling%20Lucky"><span style="color: #003399;">Any</span></a><br />
<br /> 
&nbsp; Instance<span style="color: #339933;"><</span>TwitterSource<span style="color: #339933;">></span> twitterSource<span style="color: #339933;">;</span><br /> 
<br /> 
<br /> 
<br /> 
&nbsp; <span style="color: #000000; font-weight: bold;">class</span> TwitterLocalQualifier <span style="color: #000000; font-weight: bold;">extends</span> AnnotationLiteral<span style="color: #339933;"><</span>TwitterLocal<span style="color: #339933;">></span> <span style="color: #000000; font-weight: bold;">implements</span> TwitterLocal<br /> 
<br /> 
&nbsp; <span style="color: #009900;">&#123;</span><br /> 
<br /> 
&nbsp; <span style="color: #009900;">&#125;</span><br /> 
<br /> 
<br /> 
<br /> 
&nbsp; <span style="color: #000000; font-weight: bold;">class</span> TwitterServerQualifier <span style="color: #000000; font-weight: bold;">extends</span> AnnotationLiteral<span style="color: #339933;"><</span>TwitterServer<span style="color: #339933;">></span> <span style="color: #000000; font-weight: bold;">implements</span> TwitterServer<br /> 
<br /> 
&nbsp; <span style="color: #009900;">&#123;</span><br /> 
<br /> 
&nbsp; <span style="color: #009900;">&#125;</span><br /> 
<br /> 
<br /> 
<br /> 
&nbsp; <span style="color: #000066; font-weight: bold;">boolean</span> initialCheck <span style="color: #339933;">=</span> <span style="color: #000066; font-weight: bold;">true</span><span style="color: #339933;">;</span><br /> 
<br /> 
&nbsp; <span style="color: #000066; font-weight: bold;">boolean</span> demoexists <span style="color: #339933;">=</span> <span style="color: #000066; font-weight: bold;">false</span><span style="color: #339933;">;</span><br /> 
<br /> 
<br /> 
<br /> 
&nbsp; @PostConstruct<br /> 
<br /> 
&nbsp; <span style="color: #000000; font-weight: bold;">private</span> <span style="color: #000066; font-weight: bold;">void</span> init<span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span><br /> 
<br /> 
&nbsp; <span style="color: #009900;">&#123;</span><br /> 
<br /> 
&nbsp; &nbsp; &nbsp;getTwitterSource<span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span>.<span style="color: #006633;">init</span><span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span><br /> 
<br /> 
&nbsp; <span style="color: #009900;">&#125;</span><br /> 
<br /> 
<br /> 
<br /> 
<br /> 
<br /> 
&nbsp; @Produces<br /> 
<br /> 
&nbsp; <span style="color: #000000; font-weight: bold;">public</span> TwitterSource getTwitterSource<span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span><br /> 
<br /> 
&nbsp; <span style="color: #009900;">&#123;</span><br /> 
<br /> 
&nbsp; &nbsp; &nbsp;<span style="color: #000000; font-weight: bold;">if</span> <span style="color: #009900;">&#40;</span>initialCheck<span style="color: #009900;">&#41;</span><br /> 
<br /> 
&nbsp; &nbsp; &nbsp;<span style="color: #009900;">&#123;</span><br /> 
<br /> 
&nbsp; &nbsp; &nbsp; &nbsp; <span style="color: #000000; font-weight: bold;">try</span><br /> 
<br /> 
&nbsp; &nbsp; &nbsp; &nbsp; <span style="color: #009900;">&#123;</span><br /> 
<br /> 
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span style="color: #000000; font-weight: bold;">Class</span>.<span style="color: #006633;">forName</span><span style="color: #009900;">&#40;</span><span style="color: #0000ff;">&quot;org.jboss.jbw2011.keynote.demo.model.TweetAggregate&quot;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span><br /> 
<br /> 
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;log.<span style="color: #006633;">info</span><span style="color: #009900;">&#40;</span><span style="color: #0000ff;">&quot;Running in JBW2011 Demo Mode.&quot;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span><br /> 
<br /> 
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;demoexists <span style="color: #339933;">=</span> <span style="color: #000066; font-weight: bold;">true</span><span style="color: #339933;">;</span><br /> 
<br /> 
&nbsp; &nbsp; &nbsp; &nbsp; <span style="color: #009900;">&#125;</span><br /> 
<br /> 
&nbsp; &nbsp; &nbsp; &nbsp; <span style="color: #000000; font-weight: bold;">catch</span> <span style="color: #009900;">&#40;</span><a style="color: #000060;" href="http://www.google.com/search?hl=en&q=allinurl%3Aclassnotfoundexception+java.sun.com&btnI=I%27m%20Feeling%20Lucky"><span style="color: #003399;">ClassNotFoundException</span></a> ex<span style="color: #009900;">&#41;</span><br /> 
<br /> 
&nbsp; &nbsp; &nbsp; &nbsp; <span style="color: #009900;">&#123;</span><br /> 
<br /> 
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;log.<span style="color: #006633;">info</span><span style="color: #009900;">&#40;</span><span style="color: #0000ff;">&quot;Running in local JUDCon2011 Demo Mode.&quot;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span><br /> 
<br /> 
&nbsp; &nbsp; &nbsp; &nbsp; <span style="color: #009900;">&#125;</span><br /> 
<br /> 
&nbsp; &nbsp; &nbsp; &nbsp; initialCheck <span style="color: #339933;">=</span> <span style="color: #000066; font-weight: bold;">false</span><span style="color: #339933;">;</span><br /> 
<br /> 
&nbsp; &nbsp; &nbsp;<span style="color: #009900;">&#125;</span><br /> 
<br /> 
<br /> 
<br /> 
&nbsp; &nbsp; &nbsp;<a style="color: #000060;" href="http://www.google.com/search?hl=en&q=allinurl%3Aannotation+java.sun.com&btnI=I%27m%20Feeling%20Lucky"><span style="color: #003399;">Annotation</span></a> qualifier <span style="color: #339933;">=</span> demoexists <span style="color: #339933;">?</span><br /> 
<br /> 
&nbsp; &nbsp; &nbsp; &nbsp; <span style="color: #000000; font-weight: bold;">new</span> TwitterServerQualifier<span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span> <span style="color: #339933;">:</span> <span style="color: #000000; font-weight: bold;">new</span> TwitterLocalQualifier<span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span><br /> 
<br /> 
&nbsp; &nbsp; &nbsp;<span style="color: #000000; font-weight: bold;">return</span> twitterSource.<span style="color: #006633;">select</span><span style="color: #009900;">&#40;</span>qualifier<span style="color: #009900;">&#41;</span>.<span style="color: #006633;">get</span><span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span><br /> 
<br /> 
&nbsp; <span style="color: #009900;">&#125;</span></div></p> 

<p>This is all in the <a href="https://github.com/richfaces/tweetstream">source code</a>. Feel free to pull it and make improvements or run it to see it in action. There are many more blog posts to come from this demo, so stay tuned&#8230;<br /> 
</p></p>
