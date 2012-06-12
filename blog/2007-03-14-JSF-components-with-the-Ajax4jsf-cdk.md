---
layout: blog
title: JSF components with the Ajax4jsf cdk
tags: [Java]
preview:
previewimage:
---

<p>The <a href="http://labs.jboss.com/portal/jbossrichfaces">Ajax4jsf cdk</a> (component development kit) from the Richfaces/Ajax4jsf development team makes the monotonous coding 
and complexities of developing JSF components for both JSP and Facelets almost non-existent. With a small 
amount of setup and a little framework knowledge (covered below), you can generate a complete JSF component 
that allows the developer to focus on what is most important to them.</p> 

<h2>Getting Started</h2> 

<p> 
Make sure you are using the latest version of Maven (I'm on 2.0.5) 
<br/> 
If you don't have Maven... 
<ul> 
<li>Download <a href="http://maven.apache.org/download.html">here</a> and install on your machine.</li> 
<li>Add Maven bin folder to your PATH</li> 
</ul> 
</p> 

<p> 
Add the following to your <code><span class="s0">&lt;</span><span class="s1">profile</span><span class="s0">&gt;</span></code> 
section in [your maven directory]/conf/settings.xml 

</p> 
<code> 
<pre> 
<span class="s0">&lt;</span><span class="s1">profile</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s0">&lt;</span><span class="s1">id</span><span class="s0">&gt;</span><span class="s3">ajax4jsf</span><span class="s0">&lt;/</span><span class="s1">id</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s0">&lt;</span><span class="s1">repositories</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s0">&lt;</span><span class="s1">repository</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s0">&lt;</span><span class="s1">releases</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s0">&lt;</span><span class="s1">enabled</span><span class="s0">&gt;</span><span class="s3">true</span><span class="s0">&lt;/</span><span class="s1">enabled</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s0">&lt;/</span><span class="s1">releases</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s0">&lt;</span><span class="s1">snapshots</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s0">&lt;</span><span class="s1">enabled</span><span class="s0">&gt;</span><span class="s3">false</span><span class="s0">&lt;/</span><span class="s1">enabled</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s0">&lt;</span><span class="s1">updatePolicy</span><span class="s0">&gt;</span><span class="s3">never</span><span class="s0">&lt;/</span><span class="s1">updatePolicy</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s0">&lt;/</span><span class="s1">snapshots</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s0">&lt;</span><span class="s1">id</span><span class="s0">&gt;</span><span class="s3">repository.jboss.com</span><span class="s0">&lt;/</span><span class="s1">id</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s0">&lt;</span><span class="s1">name</span><span class="s0">&gt;</span><span class="s3">Jboss Repository for Maven</span><span class="s0">&lt;/</span><span class="s1">name</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s0">&lt;</span><span class="s1">url</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s3">http://repository.jboss.com/maven2/</span><span class="s2"> 
</span><span class="s0">&lt;/</span><span class="s1">url</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s0">&lt;</span><span class="s1">layout</span><span class="s0">&gt;</span><span class="s3">default</span><span class="s0">&lt;/</span><span class="s1">layout</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s0">&lt;/</span><span class="s1">repository</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s0">&lt;</span><span class="s1">repository</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s0">&lt;</span><span class="s1">releases</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s0">&lt;</span><span class="s1">enabled</span><span class="s0">&gt;</span><span class="s3">false</span><span class="s0">&lt;/</span><span class="s1">enabled</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s0">&lt;/</span><span class="s1">releases</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s0">&lt;</span><span class="s1">snapshots</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s0">&lt;</span><span class="s1">enabled</span><span class="s0">&gt;</span><span class="s3">true</span><span class="s0">&lt;/</span><span class="s1">enabled</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s0">&lt;</span><span class="s1">updatePolicy</span><span class="s0">&gt;</span><span class="s3">always</span><span class="s0">&lt;/</span><span class="s1">updatePolicy</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s0">&lt;/</span><span class="s1">snapshots</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s0">&lt;</span><span class="s1">id</span><span class="s0">&gt;</span><span class="s3">maven2-snapshots.jboss.com</span><span class="s0">&lt;/</span><span class="s1">id</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s0">&lt;</span><span class="s1">name</span><span class="s0">&gt;</span><span class="s3">Jboss Repository for Maven Snapshots</span><span class="s0">&lt;/</span><span class="s1">name</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s0">&lt;</span><span class="s1">url</span><span class="s0">&gt;</span><span class="s3">http://snapshots.jboss.com/</span><span class="s0">&lt;/</span><span class="s1">url</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s0">&lt;</span><span class="s1">layout</span><span class="s0">&gt;</span><span class="s3">default</span><span class="s0">&lt;/</span><span class="s1">layout</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s0">&lt;/</span><span class="s1">repository</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s0">&lt;/</span><span class="s1">repositories</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s0">&lt;</span><span class="s1">pluginRepositories</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s0">&lt;</span><span class="s1">pluginRepository</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s0">&lt;</span><span class="s1">id</span><span class="s0">&gt;</span><span class="s3">maven2-snapshots.jboss.com</span><span class="s0">&lt;/</span><span class="s1">id</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s0">&lt;</span><span class="s1">name</span><span class="s0">&gt;</span><span class="s3">Jboss Repository for Maven Snapshots</span><span class="s0">&lt;/</span><span class="s1">name</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s0">&lt;</span><span class="s1">url</span><span class="s0">&gt;</span><span class="s3">http://snapshots.jboss.com/</span><span class="s0">&lt;/</span><span class="s1">url</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s0">&lt;</span><span class="s1">releases</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s0">&lt;</span><span class="s1">enabled</span><span class="s0">&gt;</span><span class="s3">false</span><span class="s0">&lt;/</span><span class="s1">enabled</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s0">&lt;/</span><span class="s1">releases</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s0">&lt;</span><span class="s1">snapshots</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s0">&lt;</span><span class="s1">enabled</span><span class="s0">&gt;</span><span class="s3">true</span><span class="s0">&lt;/</span><span class="s1">enabled</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s0">&lt;</span><span class="s1">updatePolicy</span><span class="s0">&gt;</span><span class="s3">always</span><span class="s0">&lt;/</span><span class="s1">updatePolicy</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s0">&lt;/</span><span class="s1">snapshots</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s0">&lt;/</span><span class="s1">pluginRepository</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s0">&lt;</span><span class="s1">pluginRepository</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s0">&lt;</span><span class="s1">releases</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s0">&lt;</span><span class="s1">enabled</span><span class="s0">&gt;</span><span class="s3">true</span><span class="s0">&lt;/</span><span class="s1">enabled</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s0">&lt;/</span><span class="s1">releases</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s0">&lt;</span><span class="s1">snapshots</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s0">&lt;</span><span class="s1">enabled</span><span class="s0">&gt;</span><span class="s3">false</span><span class="s0">&lt;/</span><span class="s1">enabled</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s0">&lt;</span><span class="s1">updatePolicy</span><span class="s0">&gt;</span><span class="s3">never</span><span class="s0">&lt;/</span><span class="s1">updatePolicy</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s0">&lt;/</span><span class="s1">snapshots</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s0">&lt;</span><span class="s1">id</span><span class="s0">&gt;</span><span class="s3">repository.jboss.com</span><span class="s0">&lt;/</span><span class="s1">id</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s0">&lt;</span><span class="s1">name</span><span class="s0">&gt;</span><span class="s3">Jboss Repository for Maven</span><span class="s0">&lt;/</span><span class="s1">name</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s0">&lt;</span><span class="s1">url</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s3">http://repository.jboss.com/maven2/</span><span class="s2"> 
</span><span class="s0">&lt;/</span><span class="s1">url</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s0">&lt;</span><span class="s1">layout</span><span class="s0">&gt;</span><span class="s3">default</span><span class="s0">&lt;/</span><span class="s1">layout</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s0">&lt;/</span><span class="s1">pluginRepository</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s0">&lt;/</span><span class="s1">pluginRepositories</span><span class="s0">&gt;</span><span class="s2"> 
</span><span class="s0">&lt;/</span><span class="s1">profile</span><span class="s0">&gt;</span> 
</pre> 
</code> 



<p> 
...Just after the closing <span class="s0">&lt;/</span><span class="s1">profile</span><span 
class="s0">&gt;</span> add the following: </p>
<pre> 
<code> 
<a name="l53"/> <span class="s0">&lt;</span><span class="s1">activeProfiles</span><span class="s0">&gt;</span><span 
class="s2"> 
<a name="l54"/> </span><span class="s0">&lt;</span><span class="s1">activeProfile</span><span 
class="s0">&gt;</span><span class="s3">ajax4jsf</span><span class="s0">&lt;/</span><span class="s1">activeProfile</span><span 
class="s0">&gt;</span><span class="s2"> 
<a name="l55"/> </span><span class="s0">&lt;/</span><span class="s1">activeProfiles</span><span 
class="s0">&gt;</span> 
</code> 
</pre> 
</p> 


<a name="setup"><h2>Project Setup and Installation</h2></a> 

<p style="margin:0 0 10px 0">You will need to checkout the RichFaces project before you begin development. 

<div class="dotted-grey-underline"></div> 
<h3>RichFaces</h3> 
<ul> 
<li>Use Subversion and checkout the trunk from RichFaces(https://svn.jboss.org/repos/richfaces/trunk)</li>
<li>Run <code>mvn install</code> in the root richfaces project, also navigate to the richfaces/assembly 
directory and run <code>mvn install</code> again. 
</li> 
</ul> 
</p> 
<div class="dotted-grey-underline"></div> 
<p>To start the initial component development, in [richfaces project root]/richfaces, run create.bat (or create.sh on 
*nix) "and the name of your component" - i.e. <code>create.bat MyComponentName</code>. This command creates an empty 
project and now you need to add at least one component to it.</p> 

<p><a name="bug1"/>First thing is to compile your project by navigating to its root directory and running <code>mvn install</code>. 
*Note - I had to remove 2 dependencies from the pom.xml file that were generated (This should be fixed soon)... 
<pre> 
<code> 
<a name="l56"/><span class="s0">&lt;</span><span class="s1">dependency</span><span 
class="s0">&gt;</span><span class="s2"> 
<a name="l57"/> </span><span class="s0">&lt;</span><span class="s1">groupId</span><span class="s0">&gt;</span><span 
class="s3">javax.servlet</span><span class="s0">&lt;/</span><span class="s1">groupId</span><span 
class="s0">&gt;</span><span class="s2"> 
<a name="l58"/> </span><span class="s0">&lt;</span><span class="s1">artifactId</span><span 
class="s0">&gt;</span><span class="s3">jsp-api</span><span class="s0">&lt;/</span><span class="s1">artifactId</span><span 
class="s0">&gt;</span><span class="s2"> 
<a name="l59"/> </span><span class="s0">&lt;</span><span class="s1">version</span><span class="s0">&gt;</span><span 
class="s3">2.0</span><span class="s0">&lt;/</span><span class="s1">version</span><span 
class="s0">&gt;</span><span class="s2"> 
<a name="l60"/></span><span class="s0">&lt;/</span><span class="s1">dependency</span><span class="s0">&gt;</span><span 
class="s2"> 
<a name="l61"/></span><span class="s0">&lt;</span><span class="s1">dependency</span><span 
class="s0">&gt;</span><span class="s2"> 
<a name="l62"/> </span><span class="s0">&lt;</span><span class="s1">groupId</span><span class="s0">&gt;</span><span 
class="s3">javax.faces</span><span class="s0">&lt;/</span><span class="s1">groupId</span><span 
class="s0">&gt;</span><span class="s2"> 
<a name="l63"/> </span><span class="s0">&lt;</span><span class="s1">artifactId</span><span 
class="s0">&gt;</span><span class="s3">jsf-api</span><span class="s0">&lt;/</span><span class="s1">artifactId</span><span 
class="s0">&gt;</span><span class="s2"> 
<a name="l64"/> </span><span class="s0">&lt;</span><span class="s1">version</span><span class="s0">&gt;</span><span 
class="s3">1.1_02</span><span class="s0">&lt;/</span><span class="s1">version</span><span class="s0">&gt;</span><span 
class="s2"> 
<a name="l65"/></span><span class="s0">&lt;/</span><span class="s1">dependency</span><span class="s0">&gt;</span> 
</code> 
</pre> 
<br/> 
</p> 
<a name="project-setup"/> 
<p>Once you are able to install/compile your new project you are almost done with the setup. 
**This would be a great time to install the maven <a 
href="http://maven.apache.org/plugins/maven-idea-plugin/source-repository.html">Idea</a> or <a 
href="http://maven.apache.org/eclipse-plugin.html">Eclipse</a> plugin to generate your project files if you 
haven't already done so, trust me... this is one of the best things about Maven. 
</p> 



<p>Now lets add a component to your new project:</p> 
<ul> 
<li>Navigate to [richfaces project root]/richfaces/MyComponentName and run <code>mvn cdk:create -U -cpu -Dname=&lt;MyComponentName&gt;</code></li> 
<li>*Note - This command creates a component based on UIComponentBase. To use another base class, you can add the 
additional parameter to the command:<br/> 
<code>DbaseClass=&lt;baseClass&gt;</code> 
<br/> 
<i>Where &lt;baseClass&gt; is a full class name, for example:</i> 
<br/> 
-DbaseClass=org.richfaces.MyComponentName 
</li> 
</ul> 

<p> 
Again, lets compile to make sure everything went as planned...navigate to the component project home directory, and 
perform: <code>mvn install -e</code>. 
<br/> 
If the job is done you should see "BUILD SUCCESSFUL" on the console. The "MyComponentName"/target folder appears and 
it should contain MyComponentName-1.0-SNAPSHOT.jar file. If so, the component is created and you can now get "down 
and dirty" developing it. 
</p> 

<p>**One quick developer note: After this little setup is done, you will see the major benefits of developing components 
with this cdk. It really is better/faster IMO than doing things from scratch. For instance, the xhtml 
for your renderer is in a template file! You won't have to build your tags and attributes in a java file, the cdk 
allows you to have a seperate template to make things a little more comfortable on the UI side. And you can mix the 
two, some conditional code that is better left in the renderer class can stay there, and the UI tags/markup can go 
in the template.</p> 

<h2>Component Development Overview</h2> 

<p> 
Okay, so now we get to the "fun" stuff. First thing is the design of your component, so you need to answer/do the following: 
</p> 
<ul> 
<li>Design a XHTML mockup of your component. Create all the necessary functional html,css and javascript. Don't 
worry about form submits or ajax yet (if possible). Just play the role of someone who only knows HTML and Javascript for this part.</li> 
<li>What attributes is your component going to have? All of the basic passthrough attributes are automatically provided, so just 
decide what functionally you want the end user to be able to control through the use of component attributes. This <a href="https://ezfaces.dev.java.net/factoryDocs/entityTable.rtf"> entity table</a> is your reference for attributes that are accessible through the RichFaces cdk.</li> 
<li>Do you want your component to fire custom events?</li> 
</ul> 
<h3>Project Structure</h3> 
<p>Next, you need to understand the project structure and what is editable and what isn't. Following is the structure of your project: 

<pre> 
<code> 
pom.xml - component project Maven configuration 
velocity.log - log file from velocity engine (must be ignored, will be removed) 
src/main/config/component/&lt;components&gt;.xml - your component descriptor file 
src/main/java/* - java sources for your component classes, by default the only abstract component class is generated 
src/main/resources - your resources (images, css, java script) must be there. 
src/main/template - your rendering templates must be there. By default <component>.jspx is generated. 
</code> 
</pre> 

</p> 

<h3>Templates</h3> 
<p>This is what I was talking about earlier, instead of writing all the code for your HTML in a renderer class, you can 
develop it in a .jsp and the cdk will convert it into the renderer for you. Here a few features:</p> 
<ul> 
<li><code>&lt;h:styles&gt;css/MyComponent.xcss&lt;/h:styles&gt;</code>
<br/> 
This is the method of declaring your css resource. It is relative to the actual rendering class, it will be taken from 
<code>renderkit/html/css/MyComponent.xcss</code>. 
</li> 
<li> 
As you can see in your generated template file, most of the namespace declarations are not like a normal JSF page. 
These are cdk/framework dependent tags. 
<pre> 
xmlns:f="http://ajax4jsf.org/cdk/template" 
xmlns:c=" http://java.sun.com/jsf/core" 
xmlns:ui=" http://ajax4jsf.org/cdk/ui" 
xmlns:u=" http://ajax4jsf.org/cdk/u" 
xmlns:x=" http://ajax4jsf.org/cdk/x" 
xmlns:h="http://jsf.exadel.com/header" 
</pre> 
</li> 
</ul> 

<h3>Resource Handling</h3> 
<div class="dotted-grey-underline"></div> 
<p><strong>Important!</strong> You must use org.ajax4jsf.framework.renderer.HeaderResourcesRendererBase as a base renderer class in order to use resources. 
<div style="overflow-x:auto; width:500px;"> 
<img src="http://www.jroller.comsrc="/images/jroller/HeaderRendererExample.Jpg" alt=""/> 
</div></p> 
<ul> 
<li>&lt;f:resource name="/org/richfaces/renderkit/html/images/your_image_file.gif" var="arrow" /&gt; allows your component to serve image resource direclty from the jar. 
This way all dependencies are located in one location.</li>
<li>To add javascript files to your template use: <br/>&lt;h:scripts&gt;new org.ajax4jsf.framework.resource.PrototypeScript(),"your_custom_script.js"&lt;/h:scripts&gt;
I am adding Prototype (which is managed by the RichFaces/A4J framework) and a custom script demo file name. **Note the format of this line, don't add line breaks or they won't be included, it must all be on one line.</li> 
</ul> 
<div class="dotted-grey-underline"></div> 
<p>To get a better understanding and more complete references, look at source for the <a href="http://livedemo.exadel.com/richfaces-demo/richfaces/panel.jsf?c=panel">Panel</a> or <a href="http://livedemo.exadel.com/richfaces-demo/richfaces/dataFilterSlider.jsf?c=dataFilterSlider">dataFilterSlider</a> component. Each component uses different techniques and features so if you are stuck, 
it is good to look at each component's source, or the one that is closest in features to what you are trying to accomplish.</p> 

<p>These are the basics of developing with the RichFaces cdk, now I will go over implementing the skeleton you created in the previous steps.</p> 
<br/> 


<h2>Developing a Richfaces Component</h2> 
<p>If you havent already done so, <a href="#setup">see setup</a>. Here we are going to develop a simple output component. 
If you followed along above and generated a different project, just use what you have and ignore steps 1-6 below. 
Most of the work will been done through the cdk generation, which leaves us with the following tasks:</p> 
<ol> 
<li>Navigate to [richfaces project root]/richfaces</li> 
<li>run <code>create.bat outputExample</code></li> 
<li>Navigate to [richfaces project root]/richfaces/outputExample</li> 
<li>run <code>mvn cdk:create -U -cpu -Dname=OutputExample</code></li> 
<li>**Optional I'm using Idea so I run <code>mvn idea:idea</code> at the project root to <a href="#project-setup">re-generate my project files.<a/></li> 
<li>Dont forget to remove the dependencies mentioned <a href="#bug1">here</a> from your pom.xml in your newly generated project.</li> 
<li>Add the component attributes to &lt;MyComponent&gt;.xml</li> 
<li>Take the html from our prototype and add to the renderer template/class.</li> 
</ol> 

<h3>Adding Attributes</h3> 
<p>Go ahead and open <code>config/component/OutputExample.xml</code>. Since this is a very basic component, I am going to add the following to : (Don't forget to reference the<a href="https://ezfaces.dev.java.net/factoryDocs/entityTable.rtf"> entity table</a> for other attributes)</p> 
<ul> 
<li>&amp;html_events;</li> 
<li>&amp;html_style_attributes;</li> 
</ul> 
<p>Let's also add a custom attribtue for the ouput value:</p> 
<ul> 
<li> 
<code> 
<pre> 
<a name="l1"/><span class="s0">&lt;</span><span class="s1">property</span><span class="s0">&gt;</span><span class="s2"> 
<a name="l2"/> </span><span class="s0">&lt;</span><span class="s1">name</span><span class="s0">&gt;</span><span class="s3">stringValue</span><span class="s0">&lt;/</span><span class="s1">name</span><span class="s0">&gt;</span><span class="s2"> 
<a name="l3"/> </span><span class="s0">&lt;</span><span class="s1">classname</span><span class="s0">&gt;</span><span class="s3">java.lang.String</span><span class="s0">&lt;/</span><span class="s1">classname</span><span class="s0">&gt;</span><span class="s2"> 
<a name="l4"/> </span><span class="s0">&lt;</span><span class="s1">description</span><span class="s0">&gt;</span><span class="s2"> 
<a name="l5"/> </span><span class="s3">The output value</span><span class="s2"> 
<a name="l6"/> </span><span class="s0">&lt;/</span><span class="s1">description</span><span class="s0">&gt;</span><span class="s2"> 
<a name="l7"/></span><span class="s0">&lt;/</span><span class="s1">property</span><span class="s0">&gt;</span> 
</pre> 
</code> 
</li> 
</ul> 
<p>Just add these lines under <code>&amp;ui_component_attributes;</code>. This will give you basic style passthrough attributes and html events like onclick handlers.</p> 
<p>Now lets do a build... run <code>mvn install -e</code>. If all is success ful, take a look at your OutputExampleRenderer in the target/generated-component folder. 
You should see the following generated code: <div style="padding:5px 0 0 0;overflow-x:auto;width:500px;"><img src="http://www.jroller.comsrc="/images/jroller/basicRenderer.Jpg" alt=""/></div> </p> 
<p>You should never change anything here. I just wanted you to see how these things are generated. Just by adding those few lines to your config, 
you automagically have a div with passthrough elements being generated as a component.</p> 


<h3>Creating a Sample Project</h3> 
<p>First, we need a sample project that we can test our 
component on. To create the outputExample-sample project that uses jetty for a testing server, navigate to the richfaces-samples directory 
and run <code>createProject.bat outputExample-sample</code>. From here, all we have to do is add our component as a dependency to this project's 
pom.xml file:</p> 

<ul> 
<li> 
First, replace everything in the dependencies section with: 
<code><pre> 

<a name="l1" /><span class="s0">&lt;</span><span class="s1">dependency</span><span class="s0">&gt;</span><span class="s2"> 
<a name="l2" /> </span><span class="s0">&lt;</span><span class="s1">groupId</span><span class="s0">&gt;</span><span class="s3">org.richfaces</span><span class="s0">&lt;/</span><span class="s1">groupId</span><span class="s0">&gt;</span><span class="s2"> 
<a name="l3" /> </span><span class="s0">&lt;</span><span class="s1">artifactId</span><span class="s0">&gt;</span><span class="s3">common</span><span class="s0">&lt;/</span><span class="s1">artifactId</span><span class="s0">&gt;</span><span class="s2"> 
<a name="l4" /> </span><span class="s0">&lt;</span><span class="s1">version</span><span class="s0">&gt;</span><span class="s3">${project.version}</span><span class="s0">&lt;/</span><span class="s1">version</span><span class="s0">&gt;</span><span class="s2"> 
<a name="l5" /></span><span class="s0">&lt;/</span><span class="s1">dependency</span><span class="s0">&gt;</span><span class="s2"> 
<a name="l6" /></span><span class="s0">&lt;</span><span class="s1">dependency</span><span class="s0">&gt;</span><span class="s2"> 
<a name="l7" /> </span><span class="s0">&lt;</span><span class="s1">groupId</span><span class="s0">&gt;</span><span class="s3">org.richfaces</span><span class="s0">&lt;/</span><span class="s1">groupId</span><span class="s0">&gt;</span><span class="s2"> 
<a name="l8" /> </span><span class="s0">&lt;</span><span class="s1">artifactId</span><span class="s0">&gt;</span><span class="s3">outputExample</span><span class="s0">&lt;/</span><span class="s1">artifactId</span><span class="s0">&gt;</span><span class="s2"> 
<a name="l9" /> </span><span class="s0">&lt;</span><span class="s1">version</span><span class="s0">&gt;</span><span class="s3">1.0-SNAPSHOT</span><span class="s0">&lt;/</span><span class="s1">version</span><span class="s0">&gt;</span><span class="s2"> 
<a name="l10" /></span><span class="s0">&lt;/</span><span class="s1">dependency</span><span class="s0">&gt;</span><span class="s2"> 
<a name="l11" /></span><span class="s0">&lt;</span><span class="s1">dependency</span><span class="s0">&gt;</span><span class="s2"> 
<a name="l12" /> </span><span class="s0">&lt;</span><span class="s1">groupId</span><span class="s0">&gt;</span><span class="s3">javax.servlet</span><span class="s0">&lt;/</span><span class="s1">groupId</span><span class="s0">&gt;</span><span class="s2"> 
<a name="l13" /> </span><span class="s0">&lt;</span><span class="s1">artifactId</span><span class="s0">&gt;</span><span class="s3">servlet-api</span><span class="s0">&lt;/</span><span class="s1">artifactId</span><span class="s0">&gt;</span><span class="s2"> 
<a name="l14" /> </span><span class="s0">&lt;</span><span class="s1">version</span><span class="s0">&gt;</span><span class="s3">2.4</span><span class="s0">&lt;/</span><span class="s1">version</span><span class="s0">&gt;</span><span class="s2"> 
<a name="l15" /></span><span class="s0">&lt;/</span><span class="s1">dependency</span><span class="s0">&gt;</span><span class="s2"> 
<a name="l16" /></span><span class="s0">&lt;</span><span class="s1">dependency</span><span class="s0">&gt;</span><span class="s2"> 
<a name="l17" /> </span><span class="s0">&lt;</span><span class="s1">groupId</span><span class="s0">&gt;</span><span class="s3">org.richfaces</span><span class="s0">&lt;/</span><span class="s1">groupId</span><span class="s0">&gt;</span><span class="s2"> 
<a name="l18" /> </span><span class="s0">&lt;</span><span class="s1">artifactId</span><span class="s0">&gt;</span><span class="s3">skins</span><span class="s0">&lt;/</span><span class="s1">artifactId</span><span class="s0">&gt;</span><span class="s2"> 
<a name="l19" /> </span><span class="s0">&lt;</span><span class="s1">version</span><span class="s0">&gt;</span><span class="s3">${project.version}</span><span class="s0">&lt;/</span><span class="s1">version</span><span class="s0">&gt;</span><span class="s2"> 
<a name="l20" /></span><span class="s0">&lt;/</span><span class="s1">dependency</span><span class="s0">&gt;</span> 
</pre></code> 
</li> 
<li> 
Next, remove this line near the top of the file. 
<code> 
<pre> 
<span class="s0">&lt;</span><span class="s1">version</span><span class="s0">&gt;</span><span class="s3">1.0-SNAPSHOT</span><span class="s0">&lt;/</span><span class="s1">version</span><span class="s0">&gt;</span> 
</pre> 
</code> 
</li> 
</ul> 

<h3>Implementing the Renderer</h3> 
<p>In templates/org/richfaces/htmlOuputExample.jspx you will see the xhtml code for your renderer. This is where we will 
add the html from our prototype to be rendered as a component. All I did is add one line to output the value of the attribute "stringValue"...</p> 
<code> 
<pre> 
<a name="l1" /><span class="s0">&lt;?</span><span class="s1">xml version=</span><span class="s3">&quot;1.0&quot; </span><span class="s1">encoding=</span><span class="s3">&quot;UTF-8&quot;</span><span class="s0">?&gt; 
<a name="l2" /></span><span class="s2">&lt;</span><span class="s4">f:root</span><span class="s2"> 
<a name="l3" /> </span><span class="s1">xmlns:f=</span><span class="s3">&quot;http://ajax4jsf.org/cdk/template&quot;</span><span class="s2"> 
<a name="l4" /> </span><span class="s1">xmlns:c=</span><span class="s3">&quot; http://java.sun.com/jsf/core&quot;</span><span class="s2"> 
<a name="l5" /> </span><span class="s1">xmlns:ui=</span><span class="s3">&quot; http://ajax4jsf.org/cdk/ui&quot;</span><span class="s2"> 
<a name="l6" /> </span><span class="s1">xmlns:u=</span><span class="s3">&quot; http://ajax4jsf.org/cdk/u&quot;</span><span class="s2"> 
<a name="l7" /> </span><span class="s1">xmlns:x=</span><span class="s3">&quot; http://ajax4jsf.org/cdk/x&quot;</span><span class="s2"> 
<a name="l8" /> </span><span class="s1">class=</span><span class="s3">&quot;org.richfaces.renderkit.html.OutputExampleRenderer&quot;</span><span class="s2"> 
<a name="l9" /> </span><span class="s1">baseclass=</span><span class="s3">&quot;org.ajax4jsf.framework.renderer.AjaxComponentRendererBase&quot;</span><span class="s2"> 
<a name="l10" /> </span><span class="s1">component=</span><span class="s3">&quot;org.richfaces.component.UIOutputExample&quot;</span><span class="s2"> 
<a name="l11" /> &gt;</span><span class="s0"> 
<a name="l12" /> </span><span class="s2">&lt;</span><span class="s4">f:clientid </span><span class="s1">var=</span><span class="s3">&quot;clientId&quot;</span><span class="s2">/&gt;</span><span class="s0"> 
<a name="l13" /> </span><span class="s2">&lt;</span><span class="s4">div </span><span class="s1">id=</span><span class="s3">&quot;</span><span class="s5">&#35;{</span><span class="s0">clientId</span><span class="s5">}</span><span class="s3">&quot;</span><span class="s2"> 
<a name="l14" /> </span><span class="s1">name=</span><span class="s3">&quot;</span><span class="s5">&#35;{</span><span class="s0">clientId</span><span class="s5">}</span><span class="s3">&quot;</span><span class="s2"> 
<a name="l15" /> </span><span class="s1">x:passThruWithExclusions=</span><span class="s3">&quot;value,name,type,id&quot;</span><span class="s2"> 
<a name="l16" /> &gt;</span><span class="s0"> 
<a name="l17" /> </span><span class="s2">&lt;</span><span class="s4">p</span><span class="s2">&gt;</span><span class="s5">&#35;{</span><span class="s0">component.attributes[</span><span class="s6">'stringValue'</span><span class="s0">]</span><span class="s5">}</span><span class="s2">&lt;/</span><span class="s4">p</span><span class="s2">&gt;</span><span class="s0"> 
<a name="l18" /> </span><span class="s2">&lt;/</span><span class="s4">div</span><span class="s2">&gt;</span><span class="s0"> 
<a name="l19" /></span><span class="s2">&lt;/</span><span class="s4">f:root</span><span class="s2">&gt;</span> 
</pre> 
</code> 

<p>Now we can write a simple Jsp or Facelets page that will render our component in our outputExample-sample app. I am using jsp because that 
is supported by default in the generated sample app's web.xml file. If you want both Facelets and JSP's to render, check out some of the other 
sample projects web.xml file.</p> 

<code> 
<pre> 
<a name="l1" /><span class="s0">&lt;%@ </span><span class="s1">taglib </span><span class="s2">uri</span><span class="s0">=&quot;</span><span class="s3">http://java.sun.com/jsf/html</span><span class="s0">&quot; </span><span class="s2">prefix</span><span class="s0">=&quot;</span><span class="s3">h</span><span class="s0">&quot; %&gt;</span><span class="s4"> 
<a name="l2" /></span><span class="s0">&lt;%@ </span><span class="s1">taglib </span><span class="s2">uri</span><span class="s0">=&quot;</span><span class="s3">http://java.sun.com/jsf/core</span><span class="s0">&quot; </span><span class="s2">prefix</span><span class="s0">=&quot;</span><span class="s3">f</span><span class="s0">&quot;%&gt;</span><span class="s4"> 
<a name="l3" /></span><span class="s0">&lt;%@ </span><span class="s1">taglib </span><span class="s2">uri</span><span class="s0">=&quot;</span><span class="s3">http://richfaces.ajax4jsf.org/outputExample</span><span class="s0">&quot; </span><span class="s2">prefix</span><span class="s0">=&quot;</span><span class="s3">output</span><span class="s0">&quot;%&gt;</span><span class="s4"> 
<a name="l4" /> 
<a name="l5" /></span><span class="s5">&lt;</span><span class="s6">html</span><span class="s5">&gt;</span><span class="s4"> 
<a name="l6" /> </span><span class="s5">&lt;</span><span class="s6">head</span><span class="s5">&gt;</span><span class="s4"> 
<a name="l7" /> </span><span class="s5">&lt;</span><span class="s6">title</span><span class="s5">&gt;&lt;/</span><span class="s6">title</span><span class="s5">&gt;</span><span class="s4"> 
<a name="l8" /> </span><span class="s5">&lt;/</span><span class="s6">head</span><span class="s5">&gt;</span><span class="s4"> 
<a name="l9" /> </span><span class="s5">&lt;</span><span class="s6">body</span><span class="s5">&gt;</span><span class="s4"> 
<a name="l10" /> </span><span class="s5">&lt;</span><span class="s6">f:view</span><span class="s5">&gt;</span><span class="s4"> 
<a name="l11" /> </span><span class="s5">&lt;</span><span class="s6">output:OutputExample </span><span class="s7">stringValue=</span><span class="s8">&quot;this is a test value&quot;</span><span class="s5">/&gt;</span><span class="s4"> 
<a name="l12" /> </span><span class="s5">&lt;/</span><span class="s6">f:view</span><span class="s5">&gt;</span><span class="s4"> 
<a name="l13" /> </span><span class="s5">&lt;/</span><span class="s6">body</span><span class="s5">&gt;</span><span class="s4"> 
<a name="l14" /></span><span class="s5">&lt;/</span><span class="s6">html</span><span class="s5">&gt;</span><span class="s4"> 
<a name="l15" /></span> 
</pre> 
</code> 

<p>That's It!!! Just run <code>mvn jetty:run</code> from your sample app root directory. You may want to clean things up in 
your component project and in your sample by running <code>mvn clean install</code> first.</p> 
<div class="dotted-grey-underline"></div> 
<p>So what's the eagsiest way to develop your component then test it out? I usually keep 2 terminal windows open, one at 
my component project root, and the other at the sample project root. This will allow you to run mvn install if you make 
changes to your component that can't be picked up by jetty. Also, one great thing about jetty is that it allows you 
to make changes to your project (xhtml and JSPs) and will automatically pick the changes up and deploy.</p> 
<p><strong>Don't forget - </strong> Look at other components if you need a reference. This guide is just to get you up and running.</p> 

<p>The following documents were used as references: <br/> 
<a href="http://labs.jboss.com/wiki/UsingCDKStartUp">Creating Components with Components Factory</a><br/> 
<a href="http://docs.google.com/View?docid=ddmtrs6k_21dccrvp">Component Factory RoadMap</a><br/></p> 
<div class="dotted-grey-underline"></div>
