---
layout: blog
title: JSF AjaxSlider Component
tags: [Java]
---

<p>This is the first release of my AjaxSlider component. This version works with JSP and Facelets and also extends FacesEvent to provide it's own event/listener. Many thanks to Jonas Jacobi and John Fallows for putting together a great book (<a href="http://apress.com/book/bookDisplay.html?bID=10044">Pro JSF and Ajax</a>).</p> 
<p>I'm also using the <a href="http://wiki.script.aculo.us/scriptaculous/show/SliderDemo">slider functions</a> from the Script.aculo.us library</p> 

<p style="overflow:auto;"> 
<object width="425" height="350"><param name="movie" value="http://www.youtube.com/v/Uy26gDkC3CQ"></param><embed src="http://www.youtube.com/v/Uy26gDkC3CQ" type="application/x-shockwave-flash" width="425" height="350"></embed></object></p> 
<br/> 
<p>This component in hardly complete and bug free, so any help in debugging is appreciated</p> 
<p>Download the component source, examples, and all necessary resources <a href="http://sourceforge.net/project/showfiles.php?group_id=137466">here</a>(I also included my Idea project file in the download). I will be adding this code to JSF-Comp repository hopefully within the next day or two.</p> 

<p class="pTitle">Usage Option 1<p> 
<p>You can use AjaxSlider with the following options. This will only use listeners or submit the SliderEvent to a backing bean. It will give you more control in case you do not want to store the list, used in your datatable, in the session (described in option 2). Both listeners are not required, I just added them here to show examples on usage.</p> 

<pre> 
<code> 
<a name="l10"> <span class="s2">xmlns:hc=</span><span class="s3">"http://www.halesconsulting.com/jsf"</span><span class="s0"> 
</span></a><a name="l11"> <span class="s2">xmlns:ac=</span><span class="s3">"http://ac"</span><span class="s0">&gt;</span><span class="s4"> 
</span></a><a name="l12"> 
</a><a name="l13"> <span class="s0">&lt;</span><span class="s1">style</span><span class="s0">&gt;</span><span class="s4"> 
</span></a><a name="l14"> .<span class="s5">range</span><span class="s4">{ 
</span></a><a name="l15"> <span class="s6">width</span><span class="s4">: </span><span class="s7">200</span><span class="s8">px</span><span class="s4">; 
</span></a><a name="l16"> <span class="s6">background</span><span class="s4">: </span><span class="s8">transparent </span><span class="s5">url</span><span class="s4">(</span><span class="s8">"/facelet-sandbox/images/demo_bg.gif"</span><span class="s4">) </span><span class="s8">no-repeat </span><span class="s5">center</span><span class="s4">; 
</span></a><a name="l17"> <span class="s6">height</span><span class="s4">: </span><span class="s7">20</span><span class="s8">px</span><span class="s4">; 
</span></a><a name="l18"> } 
</a><a name="l19"> 
</a><a name="l20"> .<span class="s5">Mytest</span><span class="s4">{ 
</span></a><a name="l21"> <span class="s6">background-color</span><span class="s4">:</span><span class="s8">transparent</span><span class="s4">; 
</span></a><a name="l22"> } 
</a><a name="l23"> 
</a><a name="l24"> .<span class="s5">trailer</span><span class="s4">{ 
</span></a><a name="l25"> <span class="s6">background</span><span class="s4">: </span><span class="s8">transparent </span><span class="s5">url</span><span class="s4">(</span><span class="s8">"/facelet-sandbox/images/demo_bg_over.gif"</span><span class="s4">) </span><span class="s8">no-repeat </span><span class="s7">0 7</span><span class="s8">px</span><span class="s4">; 
</span></a><a name="l26"> <span class="s6">height</span><span class="s4">: </span><span class="s7">20</span><span class="s8">px</span><span class="s4">; 
</span></a><a name="l27"> <span class="s6">width</span><span class="s4">: </span><span class="s7">114</span><span class="s8">px</span><span class="s4">; 
</span></a><a name="l28"> } 
</a><a name="l29"> 
</a><a name="l30"> .<span class="s5">track</span><span class="s4">{ 
</span></a><a name="l31"> <span class="s6">width</span><span class="s4">: </span><span class="s7">200</span><span class="s8">px</span><span class="s4">; 
</span></a><a name="l32"> <span class="s6">height</span><span class="s4">: </span><span class="s7">20</span><span class="s8">px</span><span class="s4">; 
</span></a><a name="l33"> <span class="s6">position</span><span class="s4">: </span><span class="s8">absolute</span><span class="s4">; 
</span></a><a name="l34"> } 
</a><a name="l35"> 
</a><a name="l36"> .<span class="s5">handle</span><span class="s4">{ 
</span></a><a name="l37"> <span class="s6">position</span><span class="s4">: </span><span class="s8">absolute</span><span class="s4">; 
</span></a><a name="l38"> <span class="s6">width</span><span class="s4">: </span><span class="s7">10</span><span class="s8">px</span><span class="s4">; 
</span></a><a name="l39"> <span class="s6">height</span><span class="s4">: </span><span class="s7">25</span><span class="s8">px</span><span class="s4">; 
</span></a><a name="l40"> <span class="s6">background</span><span class="s4">:</span><span class="s5">url</span><span class="s4">(</span><span class="s8">"/facelet-sandbox/images/demo_arrow.gif"</span><span class="s4">) </span><span class="s8">no-repeat </span><span class="s5">center</span><span class="s4">; 
</span></a><a name="l41"> <span class="s6">cursor</span><span class="s4">: </span><span class="s5">col-resize</span><span class="s4">; 
</span></a><a name="l42"> <span class="s6">left</span><span class="s4">: </span><span class="s7">114</span><span class="s8">px</span><span class="s4">; 
</span></a><a name="l43"> } 
</a><a name="l44"> 
</a><a name="l45"> <span class="s0">&lt;/</span><span class="s1">style</span><span class="s0">&gt;</span><span class="s4"> 
</span></a><a name="l46"> 
</a><a name="l47"> <span class="s0">&lt;</span><span class="s1">a4j:form </span><span class="s2">id=</span><span class="s3">"form1" </span><span class="s0">&gt;</span><span class="s4"> 
</span></a><a name="l48"> 
</a><a name="l49"> <span class="s0">&lt;</span><span class="s1">hc:ajaxSlider </span><span class="s2">sliderListener=</span><span class="s3">"&#35;{sliderBean.doShow}"</span><span class="s0"> 
</span></a><a name="l50"> <span class="s2">onSlide=</span><span class="s3">"</span><span class="s5">true</span><span class="s3">"</span><span class="s0"> 
</span></a><a name="l51"> <span class="s2">onChange=</span><span class="s3">"</span><span class="s5">true</span><span class="s3">"</span><span class="s0"> 
</span></a><a name="l52"> <span class="s2">storeResults=</span><span class="s3">"false"</span><span class="s0"> 
</span></a><a name="l53"> <span class="s2">trackStyleClass=</span><span class="s3">"track"</span><span class="s0"> 
</span></a><a name="l54"> <span class="s2">styleClass=</span><span class="s3">"Mytest"</span><span class="s0"> 
</span></a><a name="l55"> <span class="s2">startRange=</span><span class="s3">"0"</span><span class="s0"> 
</span></a><a name="l56"> <span class="s2">endRange=</span><span class="s3">"50000"</span><span class="s0"> 
</span></a><a name="l57"> <span class="s2">increment=</span><span class="s3">"10000"</span><span class="s0"> 
</span></a><a name="l58"> <span class="s2">rangeStyleClass=</span><span class="s3">"range"</span><span class="s0"> 
</span></a><a name="l59"> <span class="s2">trailer=</span><span class="s3">"true"</span><span class="s0"> 
</span></a><a name="l60"> <span class="s2">trailerStyleClass=</span><span class="s3">"trailer"</span><span class="s0"> 
</span></a><a name="l61"> <span class="s2">handleStyleClass=</span><span class="s3">"handle"</span><span class="s0"> 
</span></a><a name="l62"> <span class="s2">handleValue=</span><span class="s3">"1"</span><span class="s0"> 
</span></a><a name="l63"> <span class="s2">id=</span><span class="s3">"slider_1" </span><span class="s0">&gt;&lt;</span><span class="s1">hc:sliderListener </span><span class="s2">type=</span><span class="s3">"com.halesconsulting.web.action.MySliderListener" </span><span class="s0">/&gt;&lt;/</span><span class="s1">hc:ajaxSlider</span><span class="s0">&gt;</span><span class="s4"> 
</span></a><a name="l64"> 
</a><a name="l65"> <span class="s0">&lt;/</span><span class="s1">a4j:form</span><span class="s0">&gt;</span> 
</span></a> 
</code> 
</pre> 

<p class="pTitle">Usage Option 2<p> 

<p>Here we store the list from the UIData object in the session by setting storeResults="true". Obviously, using this option will depend on your situation. But to get the best user experience out of the slider interaction, this was the only way.</p> 

<pre> 
<code><a name="l10"> <span class="s2">xmlns:hc=</span><span class="s3">"http://www.halesconsulting.com/jsf"</span><span class="s0"> 
</span></a><a name="l11"> <span class="s2">xmlns:ac=</span><span class="s3">"http://ac"</span><span class="s0">&gt;</span><span class="s4"> 
</span></a><a name="l12"> 
</a><a name="l13"> <span class="s0">&lt;</span><span class="s1">style</span><span class="s0">&gt;</span><span class="s4"> 
</span></a><a name="l14"> .<span class="s5">range</span><span class="s4">{ 
</span></a><a name="l15"> <span class="s6">width</span><span class="s4">: </span><span class="s7">200</span><span class="s8">px</span><span class="s4">; 
</span></a><a name="l16"> <span class="s6">background</span><span class="s4">: </span><span class="s8">transparent </span><span class="s5">url</span><span class="s4">(</span><span class="s8">"/facelet-sandbox/images/demo_bg.gif"</span><span class="s4">) </span><span class="s8">no-repeat </span><span class="s5">center</span><span class="s4">; 
</span></a><a name="l17"> <span class="s6">height</span><span class="s4">: </span><span class="s7">20</span><span class="s8">px</span><span class="s4">; 
</span></a><a name="l18"> } 
</a><a name="l19"> 
</a><a name="l20"> .<span class="s5">Mytest</span><span class="s4">{ 
</span></a><a name="l21"> <span class="s6">background-color</span><span class="s4">:</span><span class="s8">transparent</span><span class="s4">; 
</span></a><a name="l22"> } 
</a><a name="l23"> 
</a><a name="l24"> .<span class="s5">trailer</span><span class="s4">{ 
</span></a><a name="l25"> <span class="s6">background</span><span class="s4">: </span><span class="s8">transparent </span><span class="s5">url</span><span class="s4">(</span><span class="s8">"/facelet-sandbox/images/demo_bg_over.gif"</span><span class="s4">) </span><span class="s8">no-repeat </span><span class="s7">0 7</span><span class="s8">px</span><span class="s4">; 
</span></a><a name="l26"> <span class="s6">height</span><span class="s4">: </span><span class="s7">20</span><span class="s8">px</span><span class="s4">; 
</span></a><a name="l27"> <span class="s6">width</span><span class="s4">: </span><span class="s7">114</span><span class="s8">px</span><span class="s4">; 
</span></a><a name="l28"> } 
</a><a name="l29"> 
</a><a name="l30"> .<span class="s5">track</span><span class="s4">{ 
</span></a><a name="l31"> <span class="s6">width</span><span class="s4">: </span><span class="s7">200</span><span class="s8">px</span><span class="s4">; 
</span></a><a name="l32"> <span class="s6">height</span><span class="s4">: </span><span class="s7">20</span><span class="s8">px</span><span class="s4">; 
</span></a><a name="l33"> <span class="s6">position</span><span class="s4">: </span><span class="s8">absolute</span><span class="s4">; 
</span></a><a name="l34"> } 
</a><a name="l35"> 
</a><a name="l36"> .<span class="s5">handle</span><span class="s4">{ 
</span></a><a name="l37"> <span class="s6">position</span><span class="s4">: </span><span class="s8">absolute</span><span class="s4">; 
</span></a><a name="l38"> <span class="s6">width</span><span class="s4">: </span><span class="s7">10</span><span class="s8">px</span><span class="s4">; 
</span></a><a name="l39"> <span class="s6">height</span><span class="s4">: </span><span class="s7">25</span><span class="s8">px</span><span class="s4">; 
</span></a><a name="l40"> <span class="s6">background</span><span class="s4">:</span><span class="s5">url</span><span class="s4">(</span><span class="s8">"/facelet-sandbox/images/demo_arrow.gif"</span><span class="s4">) </span><span class="s8">no-repeat </span><span class="s5">center</span><span class="s4">; 
</span></a><a name="l41"> <span class="s6">cursor</span><span class="s4">: </span><span class="s5">col-resize</span><span class="s4">; 
</span></a><a name="l42"> <span class="s6">left</span><span class="s4">: </span><span class="s7">114</span><span class="s8">px</span><span class="s4">; 
</span></a><a name="l43"> } 
</a><a name="l44"> 
</a><a name="l45"> <span class="s0">&lt;/</span><span class="s1">style</span><span class="s0">&gt;</span><span class="s4"> 
</span></a><a name="l46"> 
</a><a name="l47"> 
</a><a name="l48"> <span class="s0">&lt;</span><span class="s1">a4j:form </span><span class="s2">id=</span><span class="s3">"form1" </span><span class="s2">reRender=</span><span class="s3">"list-body" </span><span class="s2">ajaxSubmit=</span><span class="s3">"true"</span><span class="s0">&gt;</span><span class="s4"> 
</span></a><a name="l49"> 
</a><a name="l50"> <span class="s0">&lt;</span><span class="s1">a4j:region </span><span class="s2">id=</span><span class="s3">"stat1"</span><span class="s0">&gt;</span><span class="s4"> 
</span></a><a name="l51"> 
</a><a name="l52"> <span class="s0">&lt;</span><span class="s1">a4j:outputPanel </span><span class="s2">id=</span><span class="s3">"slider-body"</span><span class="s0">&gt;</span><span class="s4"> 
</span></a><a name="l53"> 
</a><a name="l54"> <span class="s0">&lt;</span><span class="s1">hc:ajaxSlider </span><span class="s2">sliderListener=</span><span class="s3">"&#35;{sliderBean.doShow}"</span><span class="s0"> 
</span></a><a name="l55"> <span class="s2">for=</span><span class="s3">"carList"</span><span class="s0"> 
</span></a><a name="l56"> <span class="s2">forValRef=</span><span class="s3">"inventoryList.carInventory"</span><span class="s0"> 
</span></a><a name="l57"> <span class="s2">filterBy=</span><span class="s3">"getMileage"</span><span class="s0"> 
</span></a><a name="l58"> <span class="s2">onSlide=</span><span class="s3">"</span><span class="s5">true</span><span class="s3">"</span><span class="s0"> 
</span></a><a name="l59"> <span class="s2">onChange=</span><span class="s3">"</span><span class="s5">true</span><span class="s3">"</span><span class="s0"> 
</span></a><a name="l60"> <span class="s2">storeResults=</span><span class="s3">"true"</span><span class="s0"> 
</span></a><a name="l61"> <span class="s2">trackStyleClass=</span><span class="s3">"track"</span><span class="s0"> 
</span></a><a name="l62"> <span class="s2">styleClass=</span><span class="s3">"Mytest"</span><span class="s0"> 
</span></a><a name="l63"> <span class="s2">startRange=</span><span class="s3">"0"</span><span class="s0"> 
</span></a><a name="l64"> <span class="s2">endRange=</span><span class="s3">"50000"</span><span class="s0"> 
</span></a><a name="l65"> <span class="s2">increment=</span><span class="s3">"10000"</span><span class="s0"> 
</span></a><a name="l66"> <span class="s2">rangeStyleClass=</span><span class="s3">"range"</span><span class="s0"> 
</span></a><a name="l67"> <span class="s2">trailer=</span><span class="s3">"true"</span><span class="s0"> 
</span></a><a name="l68"> <span class="s2">trailerStyleClass=</span><span class="s3">"trailer"</span><span class="s0"> 
</span></a><a name="l69"> <span class="s2">handleStyleClass=</span><span class="s3">"handle"</span><span class="s0"> 
</span></a><a name="l70"> <span class="s2">handleValue=</span><span class="s3">"1"</span><span class="s0"> 
</span></a><a name="l71"> <span class="s2">id=</span><span class="s3">"slider_1" </span><span class="s0">&gt;&lt;</span><span class="s1">hc:sliderListener </span><span class="s2">type=</span><span class="s3">"com.halesconsulting.web.action.MySliderListener" </span><span class="s0">/&gt;&lt;/</span><span class="s1">hc:ajaxSlider</span><span class="s0">&gt;</span><span class="s4"> 
</span></a><a name="l72"> 
</a><a name="l73"> <span class="s0">&lt;/</span><span class="s1">a4j:outputPanel</span><span class="s0">&gt;</span><span class="s4"> 
</span></a><a name="l74"> 
</a><a name="l75"> <span class="s0">&lt;</span><span class="s1">a4j:outputPanel </span><span class="s2">id=</span><span class="s3">"list-body"</span><span class="s0">&gt;</span><span class="s4"> 
</span></a><a name="l76"> 
</a><a name="l77"> <span class="s0">&lt;</span><span class="s1">t:dataTable </span><span class="s2">id=</span><span class="s3">"carIndex"</span><span class="s0"> 
</span></a><a name="l94"> 
</a><a name="l95"> <span class="s0">&lt;/</span><span class="s1">t:dataTable</span><span class="s0">&gt;</span><span class="s4"> 
</span></a><a name="l96"> 
</a><a name="l97"> <span class="s0">&lt;</span><span class="s1">t:dataTable </span><span class="s2">id=</span><span class="s3">"carList"</span>&nbsp;<span class="s2">value=</span><span class="s3">&#35;{inventoryList.carInventory}</span><span class="s0"> 
</span></a><a name="l141"> 
</a><a name="l142"> <span class="s0">&lt;</span><span class="s1">ac:ajaxDataScroller </span><span class="s2">id=</span><span class="s3">"scroll_1"</span><span class="s0"> 
</span></a><a name="l146"> 
</a><a name="l147"> <span class="s0">&lt;/</span><span class="s1">a4j:outputPanel</span><span class="s0">&gt;</span><span class="s4"> 
</span></a><a name="l148"> 
</a><a name="l149"> <span class="s0">&lt;</span><span class="s1">a4j:status </span><span class="s2">for=</span><span class="s3">"stat1" </span><span class="s2">forceId=</span><span class="s3">"true" </span><span class="s2">id=</span><span class="s3">"ajaxStatus"</span><span class="s0">&gt;</span><span class="s4"> 
</span></a><a name="l150"> <span class="s0">&lt;</span><span class="s1">f:facet </span><span class="s2">name=</span><span class="s3">"start"</span><span class="s0">&gt;</span><span class="s4"> 
</span></a><a name="l151"> <span class="s0">&lt;</span><span class="s1">div </span><span class="s2">id=</span><span class="s3">"loading-modal"</span><span class="s0">&gt;&lt;/</span><span class="s1">div</span><span class="s0">&gt;</span><span class="s4"> 
</span></a><a name="l152"> <span class="s0">&lt;/</span><span class="s1">f:facet</span><span class="s0">&gt;</span><span class="s4"> 
</span></a><a name="l153"> <span class="s0">&lt;/</span><span class="s1">a4j:status</span><span class="s0">&gt;</span><span class="s4"> 
</span></a><a name="l154"> 
</a><a name="l155"> <span class="s0">&lt;/</span><span class="s1">a4j:region</span><span class="s0">&gt;</span><span class="s4"> 
</span></a><a name="l156"> 
</a><a name="l157"> <span class="s0">&lt;/</span><span class="s1">a4j:form</span><span class="s0">&gt;</span> 
</code> 
</pre> 

<p>All of the attribute descriptions are available in the faces-config.xml file if you have any questions. Feedback is more than welcomed and appreciated.</p>
