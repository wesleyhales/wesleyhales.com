---
layout: blog
title: Ajax4Jsf vs AjaxAnywhere&#58; The t&#58;dataTable and t&#58;dataScroller
tags: [Java]
---


<p class="pTitle">Submitting with Ajax4Jsf</p>

<p>On Dec 6, Ajax4Jsf released a maintenance release (ajax4jsf-1.0.4MR1.jar which fixed an IE javascript problem not in this post) - But the framework is still a little buggy dealing with the datascroller components. On a good note, Adrian Mitev gave his custom <a href="https://ajax4jsf.dev.java.net/servlets/ProjectDocumentList?folderID=6510&expandFolder=6510&folderID=5320">ajaxDataScroller </a> to the A4J project and will hopefully get everything working in both browsers. ***UPDATE - Here is the <a href="http://www.jroller.comsrc="http://www.wesleyhales.com/jroller/resource/datascroller.jar">latest version</a> of the datascroller from Adrian. I had to rename the extension to .jar instead of .zip for upload reasons. If you have trouble extracting, just rename the file to .zip. Adrian says <quote>"Actually the attributes of ac:ajaxDataScroller tag differs from the attributes of t:dataScroller. You don't have paginatorMaxPages="9", the attribute is maxPages."</quote></p> 
<pre>
<span class="s1">&lt;</span><span class="s5">a4j:form </span><span class="s2">ajaxSubmit=</span><span class="s4">"true" </span><span class="s2">reRender=</span><span class="s4">"carList,carIndex,scroll_1"</span><span class="s1">&gt;</span><span class="s3"> 
</span></a><a name="l41"> 
</a><a name="l42">            <span class="s1">&lt;</span><span class="s5">a4j:region </span><span class="s2">id=</span><span class="s4">"stat1"</span><span class="s1">&gt;</span><span class="s3"> 
</span></a><a name="l43"> 
</a><a name="l44">                <span class="s1">&lt;</span><span class="s5">a4j:outputPanel </span><span class="s2">id=</span><span class="s4">"list-body"</span><span class="s1">&gt;</span><span class="s3"> 
</span></a><a name="l45"> 
</a><a name="l46">                    <span class="s1">&lt;</span><span class="s5">t:dataTable </span><span class="s2">id=</span><span class="s4">"carIndex"</span><span class="s10">...&gt;</span><span class="s3"> 
</span></a><a name="l47"> 
</a><a name="l48">                    <span class="s1">&lt;</span><span class="s5">t:dataTable </span><span class="s2">id=</span><span class="s4">"carList"</span><span class="s10">...&gt;</span><span class="s3"> 
</span></a><a name="l49"> 
</a><a name="l50">                <span class="s1">&lt;/</span><span class="s5">a4j:outputPanel</span><span class="s1">&gt;</span><span class="s3"> 
</span></a><a name="l51"> 
</a><a name="l52">                <span class="s1">&lt;</span><span class="s5">t:dataScroller </span><span class="s2">id=</span><span class="s4">"scroll_1"</span><span class="s1"> 
</span></a><a name="l53">                        <span class="s2">for=</span><span class="s4">"carList"</span><span class="s1"> 
</span></a><a name="l54">                        <span class="s2">fastStep=</span><span class="s4">"10"</span><span class="s1"> 
</span></a><a name="l55">                        <span class="s2">pageCountVar=</span><span class="s4">"pageCount"</span><span class="s1"> 
</span></a><a name="l56">                        <span class="s2">pageIndexVar=</span><span class="s4">"pageIndex"</span><span class="s1"> 
</span></a><a name="l57">                        <span class="s2">styleClass=</span><span class="s4">"scroller"</span><span class="s1"> 
</span></a><a name="l58">                        <span class="s2">paginator=</span><span class="s4">"true"</span><span class="s1"> 
</span></a><a name="l59">                        <span class="s2">paginatorMaxPages=</span><span class="s4">"9"</span><span class="s1"> 
</span></a><a name="l60">                        <span class="s2">paginatorTableClass=</span><span class="s4">"paginator"</span><span class="s1"> 
</span></a><a name="l61">                        <span class="s2">paginatorActiveColumnStyle=</span><span class="s4">"font-weight:bold;"</span><span class="s1"> 
</span></a><a name="l62">                        <span class="s2">actionListener=</span><span class="s4">"&#35;{inventoryList.scrollerAction}"</span><span class="s1"> 
</span></a><a name="l63">                        &gt;<span class="s3"> 
</span></a><a name="l64">                <span class="s1">&lt;/</span><span class="s5">t:dataScroller</span><span class="s1">&gt;</span><span class="s3"> 
</span></a><a name="l65"> 
</a><a name="l66">                <span class="s1">&lt;</span><span class="s5">a4j:status </span><span class="s2">for=</span><span class="s4">"stat1" </span><span class="s2">forceId=</span><span class="s4">"true" </span><span class="s2">id=</span><span class="s4">"ajaxStatus"</span><span class="s10">...&gt;</span><span class="s3"> 
</span></a><a name="l67"> 
</a><a name="l68">             <span class="s1">&lt;/</span><span class="s5">a4j:region</span><span class="s1">&gt;</span><span class="s3"> 
</span></a><a name="l69"> 
</a><a name="l70"> 
</a><a name="l71">        <span class="s1">&lt;/</span><span class="s5">a4j:form</span><span class="s1">&gt;</span><span class="s3"> </a>
</pre>

<p>The above code is functional in Firefox 1.5+ but not in IE 6+. The only bug in Firefox (that I've seen so far) is that a selected status/style on the page number link, once it has been clicked, does not appear. It looks like the component itself is not being reRendered, although it is specified in the a4j:form tag. Other than that, Sergey, Alex, and crew have been doing an awesome job answering posts and getting the maintenance releases out... keep em' coming guys!</p> 

<p>The paging doesn't work at all in IE - it has to be something small...</p>

<p class="pTitle">Submitting with AjaxAnywhere</p>

<p>
As much as I would love to stick with one ajax framework across the entire app, we have to have a fallback plan. AjaxAnywhere has been a life saver getting the Tomahawk components submitting. The only downfall with this framework is that you are limited no partial page updates, and nowhere near the capabilities/enhancements that A4J has...
</p>
<p>
The following code does the Ajax submit in both browser with all components working like they should. Using the A4J:status together with a custom "loading..." window with aa took some hackery, but I was able to get both working (in next post I will explain) 
</p>
<pre>
<span class="s1">&lt;</span><span class="s5">h:form </span><span class="s2">id=</span><span class="s4">"mainForm"</span><span class="s1">&gt;</span><span class="s3"> 
</span></a><a name="l42"> 
</a><a name="l43">                <span class="s1">&lt;</span><span class="s5">aa:zoneJSF </span><span class="s2">id=</span><span class="s4">"dataTableZone"</span><span class="s1">&gt;</span><span class="s3"> 

</span></a><a name="l44">                         
</a><a name="l45">                <span class="s1">&lt;</span><span class="s5">a4j:region </span><span class="s2">id=</span><span class="s4">"stat1"</span><span class="s1">&gt;</span><span class="s3"> 
</span></a><a name="l46">     
</a><a name="l47">                <span class="s1">&lt;</span><span class="s5">a4j:outputPanel </span><span class="s2">id=</span><span class="s4">"list-body"</span><span class="s1">&gt;</span><span class="s3"> 
</span></a><a name="l48">                <span class="s1">&lt;</span><span class="s5">t:dataTable...</span><span class="s1">&gt;</span><span class="s3"> 
</span></a><a name="l49">                <span class="s1">&lt;/</span><span class="s5">a4j:outputPanel</span><span class="s1">&gt;</span><span class="s3"> 

</span></a><a name="l50">     
</a><a name="l51">                        <span class="s1">&lt;</span><span class="s5">a4j:status </span><span class="s2">for=</span><span class="s4">"stat1" </span><span class="s2">forceId=</span><span class="s4">"true" </span><span class="s2">id=</span><span class="s4">"ajaxStatus"</span><span class="s10">...&gt;</span><span class="s3"> 
</span></a><a name="l52">     
</a><a name="l53">                 <span class="s1">&lt;/</span><span class="s5">a4j:region</span><span class="s1">&gt;</span><span class="s3"> 
</span></a><a name="l54">     

</a><a name="l55">                <span class="s1">&lt;</span><span class="s5">t:dataScroller </span><span class="s2">id=</span><span class="s4">"scroll_1"</span><span class="s10">...&gt;</span><span class="s3"> 
</span></a><a name="l56"> 
</a><a name="l57">            <span class="s1">&lt;/</span><span class="s5">aa:zoneJSF</span><span class="s1">&gt;</span><span class="s3"> 
</span></a><a name="l58"> 
</a><a name="l59">        <span class="s1">&lt;/</span><span class="s5">h:form</span><span class="s1">&gt;</span><span class="s3"> 
</span></a><a name="l60"> 

</a><a name="l61">        <span class="s1">&lt;</span><span class="s5">script </span><span class="s2">type=</span><span class="s4">"text/JavaScript" </span><span class="s2">src=</span><span class="s4">"/facelet-sandbox/aa.js"</span><span class="s1">/&gt;</span><span class="s3"> 
</span></a><a name="l62"> 
</a><a name="l63">         <span class="s1">&lt;</span><span class="s5">script </span><span class="s2">type=</span><span class="s4">"text/JavaScript"</span><span class="s1">&gt;</span><span class="s3"> 
</span></a><a name="l64"> 
</a><a name="l65">            ajaxAnywhere.getZonesToReload = <span class="s6">function</span><span class="s3">(url, submitButton) { 

</span></a><a name="l66">                <span class="s6">return </span><span class="s9">'dataTableZone'</span><span class="s3">; 
</span></a><a name="l67">            } 
</a><a name="l68"> 
</a><a name="l69">            ajaxAnywhere.formName = <span class="s9">'mainForm'</span><span class="s3">; 
</span></a><a name="l70">            ajaxAnywhere.substituteFormSubmitFunction(); 
</a><a name="l71">            ajaxAnywhere.substituteSubmitButtonsBehavior(<span class="s6">true</span><span class="s3">); 

</span></a><a name="l72">           
</a><a name="l73">        <span class="s1">&lt;/</span><span class="s5">script</span><span class="s1">&gt;</span><span class="s3"></a> 
</pre>

<p>One more thing, the reason I am nesting an a4j:outputPanel in the above code is for a4j:commandLinks inside the form. So far I haven't had any problems with both frameworks playing nicely together</p>    

