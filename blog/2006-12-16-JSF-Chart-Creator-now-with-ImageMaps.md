---
layout: blog
title: JSF Chart Creator - now with ImageMaps!
tags: [Java]
---


<p>I recently updated the <a href="http://jsf-comp.sourceforge.net">JSF-Comp</a> Chart Creator component to include image map support. All charts now have capabilties for custom links on each section of the chart. All customization can be handled through the tag atributes.</p>

<p>New attributes:<p>
<ul>
<li>action</li>
<li>series</li>
<li>section</li>
</ul>

<p>The usemap attribute must start with a # (i.e. usemap="#myMap"). For action, just input the page to link to, section and series are just parameters that are built into jfreeChart. I am currently working on drill downs, along with a few other attributes (like the abiltiy to set the range), for next release.<p>

<p class="pTitle">Usage<p>
<p>Besides the new attributes and an h:output tag for your imagemap string, there is nothing else you need to know apart from <a href="http://jsf-comp.sourceforge.net/components/chartcreator/index.html">this documentation</a>

</p>

<p>Download the jar <a href="src="http://www.wesleyhales.com/jroller/resource/chartcreator-1.2.0-RC1-imagemap.jar">here</a></p>

<pre><code>
</span></a><a name="l43">        <span class="s1">&lt;</span><span class="s5">ad:chart </span><span class="s2">id=</span><span class="s4">"chart2"</span><span class="s1"> 
</span></a><a name="l44">                  <span class="s2">datasource=</span><span class="s4">"&#35;{chartCreator.cellBar}"</span><span class="s1"> 
</span></a><a name="l45">                  <span class="s2">type=</span><span class="s4">"bar"</span><span class="s1"> 
</span></a><a name="l46">                  <span class="s2">height=</span><span class="s4">"100"</span><span class="s1"> 

</span></a><a name="l47">                  <span class="s2">is3d=</span><span class="s4">"false"</span><span class="s1"> 
</span></a><a name="l48">                  <span class="s2">orientation=</span><span class="s4">"horizontal"</span><span class="s1"> 
</span></a><a name="l49">                  <span class="s2">width=</span><span class="s4">"300"</span><span class="s1"> 
</span></a><a name="l50">                  <span class="s2">antialias=</span><span class="s4">"true"</span><span class="s1"> 
</span></a><a name="l51">                  <span class="s2">title=</span><span class="s4">""</span><span class="s1"> 

</span></a><a name="l52">                  <span class="s2">xlabel=</span><span class="s4">""</span><span class="s1"> 
</span></a><a name="l53">                  <span class="s2">ylabel=</span><span class="s4">""</span><span class="s1"> 
</span></a><a name="l54">                  <span class="s2">legend=</span><span class="s4">"false"</span><span class="s1"> 
</span></a><a name="l55">                  <span class="s2">usemap=</span><span class="s4">"#chart2_map"</span><span class="s1"> 
</span></a><a name="l56">                  <span class="s2">action=</span><span class="s4">"this.jsf"</span><span class="s1"> 

</span></a><a name="l57">                  <span class="s2">series=</span><span class="s4">"wes1"</span><span class="s1"> 
</span></a><a name="l58">                  <span class="s2">section=</span><span class="s4">"wes2"</span><span class="s1"> 
</span></a><a name="l59">                  <span class="s2">styleClass=</span><span class="s4">"wesChart"</span><span class="s1">&gt;&lt;/</span><span class="s5">ad:chart</span><span class="s1">&gt;</span><span class="s3"> 
</span></a><a name="l60">        <span class="s1">&lt;</span><span class="s5">h:outputText </span><span class="s2">escape=</span><span class="s4">"false" </span><span class="s2">value=</span><span class="s4">"&#35;{chart1_map}"</span><span class="s1">/&gt;</span><span class="s3"> 



</code></pre>    

