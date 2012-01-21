---
layout: blog
title: JSF in a portlet has never been this easy!
tags: [Java, bridge, jsf, portlet]
---

<p>We just released JBoss Portlet Bridge Beta3 along with some good supporting documentation and example projects. <a href="http://www.jboss.org/files/portletbridge/docs/1.0.0.B3/en/html_single/index.html">See the documentation for full details</a>. 

<p>For those that want to jump right in, you can run the following archetype and have it deployed on JBoss AS + Portal in minutes: 
<br> 
<code><pre> 
mvn archetype:generate -DarchetypeGroupId=org.jboss.portletbridge.archetypes -DarchetypeArtifactId=1.2-basic -DarchetypeVersion=1.0.0.B3 -DgroupId=org.whatever.project -DartifactId=myprojectname -DarchetypeRepository=http://repository.jboss.org/maven2/ -Dversion=1.0.0.B3 
</pre></code> 
<br/> 
<code><pre> 
mvn install cargo:start -Premote-portal -Dpc20 
</pre></code> 
<br/> 
<code><pre> 
mvn cargo:deploy -Premote-portal -Dpc20 
</pre></code> 
<br/> 
Visit <a href="http://localhost:8080/simple-portal/demo/jsr-301.jsp">http://localhost:8080/simple-portal/demo/jsr-301.jsp</a> 
</p> 
<br/> 
<br/> 
The majority of the code written for this release is internal to the portlet bridge project (refactoring, 301 spec updates and enhancements, bug fixes...). The next release (Beta 4 - early Sept) will be huge for the portlet bridge for the following reasons: 
<ul><li>The EG is currently discussing a lot of significant clarifications and improvements. For example, working with the JSF 2.0 EG to allow certain needs and working on Portlet 2.0 areas of the spec. 
</li><li>There is currently a lot of discussion about navigation between portlet modes. Once this is nailed down in the spec, we will implement it. 
</li><li>The Portlet 1.0 version should be getting close to public review.</li></ul>Other than the spec related reasons for release schedule, we must work in unison with the latest Seam and RichFaces relases, make sure that we squash any bugs concerning the 3 integration points, handle features/improvements/refactorings, and try to test and give feedback to the 301 EG. And, of course we can't forget about JBoss Portal 2.7+! 

There are soo many cool things going on right now within the JBoss Portal project, I would like to tell you about all of them but then this post wouldn't be about JBPB anymore. Just stay tuned to this blog... 

With that said, here are a few tips for JSF portlet developers that concern this release: 
<ul><li><b id="lwur">Namespacing</b> 
In situations where you need to use the id of an element in your JSF/xhtml markup, you would normally see something like 'form1:myBtn' in the rendered markup. But now with the bridge namespacing you will see something similar to: <p id="d0j41">jbpns_2fdefault_2fNews_2fStories_2fStoryTemplateWindow12snpbj:_viewRoot:form1:myBtn</p><p id="mxo:1">To overcome this, you can use the following expression in your Facelets page to prepend the namespace to your javascript code: </p><p>document.getElementById('&#35;{facesContext.externalContext.response.namespace}the_rest_of_JSF_ID</p> since this uses the portletResponse, once you try to view this page on the servlet application side, you will get an exception. To avoid this, you need to check for the type of response in your backing bean and assign a new "safe" namespace variable for the UI. 

</li><li><b id="lwur1">Excluding Attributes from the Bridge Request Scope</b> 
When your application uses request attributes on a per request basis and you do not want that particular attribute to be managed in the extended bridge request scope, you must use the following configuration in your faces-config.xml. Below you will see that any attribute namespaced as foo.bar or any attribute beginning with foo.baz(wildcard) will be excluded from the bridge request scope and only be used per that application's request. 
<pre><code> 
&lt;application&gt; 
&lt;application-extension&gt; 
&lt;bridge:excluded-attributes&gt; 
&lt;bridge:excluded-attribute&gt;foo.bar&lt;/bridge:excluded-attribute&gt; 
&lt;bridge:excluded-attribute&gt;foo.baz.*&lt;/bridge:excluded-attribute&gt; 
&lt;/bridge:excluded-attributes&gt; 
&lt;/application-extension&gt; 
&lt;/application&gt;</code></pre></li></ul>For more information on this release or to find out more about the project, visit the <a href="http://www.jboss.org/portletbridge/">project page</a>.</p>
