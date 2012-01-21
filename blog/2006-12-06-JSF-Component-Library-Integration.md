---
layout: blog
title: JSF Component Library Integration
tags: [Java]
---


<p>
Integrating multiple component libraries can provide a project many advantages but can also be a challenge to make all components live and work in harmony. This article explains how to integrate many popular component libraries into one app. Combining libraries gives developers an array of components to pick and choose from. But, knowing which components play well together and which ones don?t, will save you time and I will explain the pros and cons of each here. The following component libraries were used:
</p>
<br/>
<p class="listTitle">Libs</p>
<ul>
<li>Myfaces 1.1.4</li>
<li>Tomahawk 1.1.4</li>
<li>Ajax4JSF 1.0.3</li>
<li>Trinidad m1 Nightly Build</li>
<li>IceFaces 1.0.1</li>
<li>Facelets 1.0.11</li>
</ul>

<p class="listTitle">Environment</p>
<ul>
<li>JDK 1.5 +</li>
<li>Jboss 4.0.4 (or Tomcat is better/lighter)</li>
<li>IntelliJ Idea</li>
</ul>

<p class="listTitle">Software Needed</p>
<ul>
<li>Subversion</li>
<li>CVS</li>
<li>Maven 2</li>
</ul>



<p>
It's worth the effort to go ahead and get yourself acquainted with downloading the source for most of your component libraries, starting with Myfaces. I use Tortoise SVN or you can download the binaries using the command line. Once you have Subversion setup, checkout Myfaces <a href="http://svn.apache.org/repos/asf/myfaces">here</a>. After that, this guide <a href="http://wiki.apache.org/myfaces/Building_With_Maven">This</a> will give you a quick how to on compiling the libraries with Maven 2. If you use IntelliJ Idea you can get a plugin that will generate your project files. This will allow you to edit the source and change things around if needed, it also helps when you are trying to follow <a href="http://wiki.apache.org/myfaces/StudyGuide">this guide</a>.
</p>

<p class="pTitle">For the impatient, the short and sweet steps are:</p>
<ol>
<li>Download Maven 2 and add bin dir to path</li>
<li>checkout code for project</li>
<li>navigate to root dir (or dir with pom.xml file)</li>
<li>run <code>mvn install</code></li>
<li>This will build the target directory for the project which will contain compiled jars, examples wars, etc.</li>
</ol>


<p class="pTitle">Myfaces</p>
<p>Checkout: <code>http://svn.apache.org/repos/asf/myfaces</p>
<p>Each servlet container has its own configuration in which details can be found <a href="http://wiki.apache.org/myfaces/Installation_and_Configuration">here</a>. Overall the latest version of Tomcat and Jboss had no major issues with the out-of-box Myfaces configuration. If you are integrating Myfaces with an existing JSF RI, there are steps with the ExtensionsFilter that must be taken located on the Myfaces wiki.</p>

<p>Viewing this up to date <a href="http://wiki.apache.org/myfaces/CompatibilityMatrix">compatibility matrix</a>, will ensure you are working with compatible libraries.</p>
<p>There are a number of performance settings you can make with Myfaces, but with integration of components being the focus for this article, performance tuning will be discussed in part 2 of this series.</p>

<p class="pTitle">Tomahawk</p>
<p>Checkout: <code>Checkout: http://svn.apache.org/repos/asf/myfaces/tomahawk</code></p>
<p>Once you have the latest Tomahawk build checked out, you can find almost all of the Myfaces and Tomahawk configuration and performance settings in the sandbox/examples/src/main/webapp/WEB-INF/web.xml file. All of the settings are applicable to this article, and it is a great starting point that is well commented.</p>

<p>When using Facelets, each project requires its own tag library. Unfortunately Tomahawk does not include Facelet integration built into their jar(as of 1.1.4). This requires you to put together <a href="http://wiki.apache.org/myfaces/Use_Facelets_with_Tomahawk">tomahawk.taglib.xml</a> and point to it from settings in your web.xml.</p>

<pre>
&lt;context-param&gt;
&lt;param-name&gt;facelets.LIBRARIES&lt;/param-name&gt;
&lt;param-value&gt;/WEB-INF/tomahawk.taglib.xml&lt;/param-value&gt;
&lt;/context-param&gt;
</pre>

<p>
This provides pass-through getters and setters to the tomahawk library.
You can write a *.taglib.xml for any library, but you may need to write a Facelets TagHandler.
</p>

<p class="pTitle">Ajax4jsf</p>
<p>Checkout (use cvs):<code> cvs -d :pserver:yourName@cvs.dev.java.net:/cvs checkout ajax4jsf</code></p>
One of the largest hurdles with this library was integration with Trinidad. Trinidad and Ajax4JSF use their own ViewHandler with Facelets and both are very picky about how and where they are loaded.</p>

<code>Web.xml</code>
<pre>
&lt;filter&gt;
&lt;display-name&gt;Ajax4jsf Filter&lt;/display-name&gt;
&lt;filter-name&gt;ajax4jsf&lt;/filter-name&gt;
&lt;filter-class&gt;org.ajax4jsf.Filter&lt;/filter-class&gt;
&lt;/filter&gt;

&lt;filter-mapping&gt;
&lt;filter-name&gt;ajax4jsf&lt;/filter-name&gt;
&lt;servlet-name&gt;FacesServlet&lt;/servlet-name&gt;
&lt;/filter-mapping&gt;
</pre>

<code>faces-config.xml</code>
<pre>
&lt;application&gt;
&lt;default-render-kit-id&gt;org.apache.myfaces.trinidad.core&lt;/default-render-kit-id&gt;
&lt;view-handler&gt;org.ajax4jsf.framework.ajax.AjaxViewHandler&lt;/view-handler&gt;
&lt;/application&gt;
</pre>

<p>Initially I tried to use Neko HTML for the component XML rendering and had to abandon it because of one extra </span> tag at the end of the response. Neko is known for not trying to "over" correct the code, but in this case it did not work. With the default Ajax4Jsf filter, you get Tidy cleaning up the response and that seemed to work just fine. Tidy is also configurable through a .properties file with various parser settings.</p>

<p>As of version 1.0.3, there have been many improvements and I was able to get everything working together from the settings above. This version also includes the integration jar for working with Trininad released after September 29, 2006.</p>

<p>One very nice debugging helper for this library is the logConsole div:</p>

<pre>
&lt;div style="padding: 5px; overflow: auto; font-size: 9px; height: 150px; width: 100%;" id="logConsole"&gt;&lt;/div&gt;
</pre>

<p>This allows you to see the entire Ajax request/response going and coming back from the server. One thing you may want to create is a Facelets debugging template and add this along with the facelets debugging options into it.</p>

<p class="pTitle">Trinidad</p>
<p>Checkout: <code>http://svn.apache.org/repos/asf/incubator/adffaces</code></p>

<p>Here we have the basic settings for Trinidad to integrate with your application. Because we are integrating with Ajax4Jsf, Trinidad is the only ViewHandler defined in the web.xml. In the a4j example above you see how the ViewHandler for Ajax4Jsf is defined in the faces-config.xml. Again, if you are not using these two libraries together then you need to follow the documentation from the libraries corresponding websites.</p>

<code>Web.xml</code>
<pre>
&lt;context-param&gt;
&lt;param-name&gt;org.apache.myfaces.trinidad.ALTERNATE_VIEW_HANDLER&lt;/param-name&gt;
&lt;param-value&gt;com.sun.facelets.FaceletViewHandler&lt;/param-value&gt;
&lt;/context-param&gt;

&lt;filter&gt;
&lt;filter-name&gt;trinidad&lt;/filter-name&gt;
&lt;filter-class&gt;org.apache.myfaces.trinidad.webapp.TrinidadFilter&lt;/filter-class&gt;
&lt;/filter&gt;

&lt;filter-mapping&gt;
&lt;filter-name&gt;trinidad&lt;/filter-name&gt;
&lt;servlet-name&gt;FacesServlet&lt;/servlet-name&gt;
&lt;dispatcher&gt;REQUEST&lt;/dispatcher&gt;
&lt;dispatcher&gt;FORWARD&lt;/dispatcher&gt;
&lt;dispatcher&gt;INCLUDE&lt;/dispatcher&gt;
&lt;/filter-mapping&gt;
</pre>

<p>
One important topic I would like to touch on is client-side state saving vs. server-side.
Trinidad offers a unique strategy for JSF state saving which will allow tokens to be sent to the client allowing minimal performance drag. The default client-side state saving only saves a token to the client, and saves the real state in the HttpSession. MyFaces tells users to use server-side and Trinidad prefers client-side, but they are basically the same thing in terms of HttpSession. Also, failover is supported with the Trinidad state saving method.
</p>

<p>As for components, Trinidad starts with more than 100 components which have already been documented and thoroughly tested. Now we have tags from 3-4 different libraries that overlap each other. We must decide which one to use where, why we are using them, and what is best for performance. Tag usage, along with state saving, will be discussed in part 2 of this series.</p>

<p class="pTitle">IceFaces</p>
<p>TODO - Update this section</p>
<p>**Note, since the writing of this article, Icefaces has been open sourced*** If you wish to make use of clustering and advanced asynchronous HTTP handling in a large-scale application, they want you to move up to the Enterprise Edition.</p>

<p>As of ICEfaces v1.0.1 release, they now have support for JSF integration. You can view  configuration instructions <a href="http://www.icesoft.com/developer_guides/icefaces/htmlguide/devguide/keyConcepts12.html#1043744">here</a>. In short, you can use the just-ice.jar, instead of the icefaces.jar, and use other JSF servlet mappings (ie. Faces Servlet) to handle non-ICEfaces pages. If you do this, you must use **only** standard JSF tags (f:) and ICEfaces tags (ice:) in you JSF pages.</p>

<p>ICEFaces doesn't have the same approach as ajax4jsf and DynaFaces have. You will have to follow their component-model to get the benefits of the Direct2Dom technology, so hooking up components of other libraries together with the ICEFaces components isn't possible (as of now), as they cannot re-render arbitrary components through their renderkit.</p>

<p>If you need to combine components from an open source library with IceFaces, one option is to use an iframe within an icefaces page. The iframe could point to the other JSF framework Servlet/ViewHandler. I haven't tried this yet myself, but according to the IceFaces support staff, it's worth a try.</p>

<p>For Facelets integration, along with the core jars, you will need icefaces-facelets.jar. There are minimal settings that take place for Facelet integration. The steps are located <a href="http://www.icesoft.com/developer_guides/icefaces/htmlguide/gettingstarted/TimezoneTutorial29.html">here</a></p>

<p class="pTitle">Facelets</p>
<p>The facelets ViewHandler configuration placement is critical to your application.
If you are ONLY integrating Ajax4Jsf with Facelets, you should have you settings in web.xml as follows:</p>

<pre>
&lt;context-param&gt;
&lt;param-name&gt;org.ajax4jsf.VIEW_HANDLERS&lt;/param-name&gt;
&lt;param-value&gt;com.sun.facelets.FaceletViewHandler&lt;/param-value&gt;
&lt;/context-param&gt;
</pre>


<p>You need the above defined only if using Ajax4Jsf along with all other libraries besides Trinidad. If using Trinidad along with Ajax4Jsf and Facelets then follow the steps from the Trinidad section above.</p>

<p>One quick performance tip that will impact the foundational templating is the StreamingAddResource.</p>

<p>By adding:</p>

<pre>
&lt;context-param&gt;
&lt;param-name&gt;org.apache.myfaces.ADD_RESOURCE_CLASS&lt;/param-name&gt;
&lt;param-value&gt;org.apache.myfaces.component.html.util.StreamingAddResource&lt;/param-value&gt;
&lt;/context-param&gt;
</pre>

<p>...to the web.xml and using...</p>

<ul>
<li>t:document as replacement for html</li>
<li>t:documentHead as replacement for head</li>
<li>t:documentBody as replacement for body</li>
</ul>

<p>...this will allow the pages to be streamed which will result in faster page delivery.</p>

<p>For debugging Facelets, add the following to your web.xml:</p>

<pre><samp>

&lt;context-param&gt;
&lt;param-name&gt;facelets.DEVELOPMENT&lt;/param-name&gt;
&lt;param-value&gt;true&lt;/param-value&gt;
&lt;/context-param&gt;

</samp></pre>

<p>
Setting this to true will cause the FaceletViewHandler to print out debug information in an easy to use screen when an error occurs during the rendering process.
Probably one of the coolest features for debugging is the <ui:debug> tag. Of course you can?t have ?cool? without an expense, so be careful when using this option because of overhead. You can use the UIComponent rendered property to turn debugging on or off based on some expression. In this example, debugging is backed by an entry in the web.xml.
</p>

<pre>
&lt;ui:debug hotkey="d" rendered="&#35;{initParam.debugMode}"/&gt;
</pre>

<p>The debug tag will capture the component tree and variables when it is encoded, storing the data for retrieval later. You may launch the debug window at any time from your browser by pressing 'CTRL' + 'SHIFT' + 'D' (by default).  Like I said earlier the best place to put this tag is in your site's main template, or in some kind of debugging template, where it can be enabled/disabled across your whole application.</p>


