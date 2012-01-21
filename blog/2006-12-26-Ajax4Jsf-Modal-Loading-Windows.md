---
layout: blog
title: Ajax4Jsf Modal Loading Windows
tags: [Java]
---

<p>Ajax4Jsf's status tag (<a href="https://ajax4jsf.dev.java.net/nonav/documentation/ajax-documentation/ch06s11.html">a4j:status</a>) has alot of potential, but currently it's functionality is limited. With the combination of <a href="http://www.huddletogether.com/projects/lightbox2/">Lightbox 2.0</a>, or basically any javascript developed to build the dom, you can achieve the look of any modal "Loading..." window.</p> 

<p>Since the status tag does not include capability to fire javascript events(<a href="https://ajax4jsf.dev.java.net/servlets/ReadMsg?list=users&msgNo=1893">as of yet</a>), we will use the modified lightbox script to go ahead and write everything to the dom, then let the a4j:status tag to hide it until we make an Ajax call.</p> 

<p>*Update - I recently created a <a href="http://code.google.com/p/seam-2-sandbox/">working demo application</a> for this modal. Read the updated blog entry <a href=" http://www.jroller.com/wesleyhales/entry/richfaces_loading_modal_with_a4j">here</a>.</p>

<p class="pTitle">Facelet Source</p> 
<p>This just shows basic usage with the A4J framework</p> 
<pre> 
<code> 

</a><a name="l26"> <span class="s1">&lt;</span><span class="s5">script </span><span class="s2">type=</span><span class="s4">"text/javascript" </span><span class="s2">src=</span><span class="s4">"/facelet-sandbox/js/scriptaculous-js-1.6.5/lib/prototype.js"</span><span class="s1">&gt;&lt;/</span><span class="s5">script</span><span class="s1">&gt;</span><span class="s3"> 

</span></a><a name="l27"> <span class="s1">&lt;</span><span class="s5">script </span><span class="s2">type=</span><span class="s4">"text/javascript" </span><span class="s2">src=</span><span class="s4">"/facelet-sandbox/js/scriptaculous-js-1.6.5/src/scriptaculous.js?load=effects"</span><span class="s1">&gt;&lt;/</span><span class="s5">script</span><span class="s1">&gt;</span><span class="s3"> 
</span></a><a name="l28"> <span class="s1">&lt;</span><span class="s5">script </span><span class="s2">type=</span><span class="s4">"text/javascript" </span><span class="s2">src=</span><span class="s4">"/facelet-sandbox/js/modal.js"</span><span class="s1">&gt;&lt;/</span><span class="s5">script</span><span class="s1">&gt;</span><span class="s3"> 

</span></a><a name="l29"> 
</a><a name="l30"> 
</a><a name="l31"> <span class="s1">&lt;</span><span class="s5">style </span><span class="s2">type=</span><span class="s4">"text/css"</span><span class="s1">&gt;</span><span class="s3"> 
</span></a><a name="l32"> 
</a><a name="l33"> <span class="s6">@import </span><span class="s7">"/facelet-sandbox/css/modal.css"</span><span class="s3">; 
</span></a><a name="l34"> 
</a><a name="l35"> <span class="s1">&lt;/</span><span class="s5">style</span><span class="s1">&gt;</span><span class="s3"> 

</span></a><a name="l36"> 
</a><a name="l37"> 
</a><a name="l38"> <span class="s1">&lt;</span><span class="s5">a4j:region </span><span class="s2">id=</span><span class="s4">"stat1"</span><span class="s1">&gt;</span><span class="s3"> 
</span></a><a name="l39"> 
</a><a name="l40"> <span class="s1">&lt;</span><span class="s5">a4j:outputPanel </span><span class="s2">id=</span><span class="s4">"list-body"</span><span class="s1">&gt;</span><span class="s3"> 
</span></a><a name="l41"> 
</a><a name="l42"> <span class="s1">&lt;</span><span class="s5">t:dataTable </span><span class="s2">id=</span><span class="s4">"carIndex"</span><span class="s1"> 

</span></a><a name="l43"> <span class="s8">...</span><span class="s3"> 
</span></a><a name="l44"> <span class="s1">&lt;/</span><span class="s5">t:dataTable</span><span class="s1">&gt;</span><span class="s3"> 
</span></a><a name="l45"> 
</a><a name="l46"> <span class="s1">&lt;/</span><span class="s5">a4j:outputPanel</span><span class="s1">&gt;</span><span class="s3"> 
</span></a><a name="l47"> 
</a><a name="l48"> <span class="s1">&lt;</span><span class="s5">ac:ajaxDataScroller </span><span class="s2">id=</span><span class="s4">"scroll_1"</span><span class="s1"> 

</span></a><a name="l49"> <span class="s2">for=</span><span class="s4">"carList"</span><span class="s1"> 
</span></a><a name="l50"> <span class="s2">maxPages=</span><span class="s4">"9"</span><span class="s1">&gt;</span><span class="s3"> 
</span></a><a name="l51"> <span class="s1">&lt;/</span><span class="s5">ac:ajaxDataScroller</span><span class="s1">&gt;</span><span class="s3"> 
</span></a><a name="l52"> 
</a><a name="l53"> <span class="s1">&lt;</span><span class="s5">a4j:status </span><span class="s2">for=</span><span class="s4">"stat1" </span><span class="s2">forceId=</span><span class="s4">"true" </span><span class="s2">id=</span><span class="s4">"ajaxStatus"</span><span class="s1">&gt;</span><span class="s3"> 

</span></a><a name="l54"> <span class="s1">&lt;</span><span class="s5">f:facet </span><span class="s2">name=</span><span class="s4">"start"</span><span class="s1">&gt;</span><span class="s3"> 
</span></a><a name="l55"> <span class="s1">&lt;</span><span class="s5">div </span><span class="s2">id=</span><span class="s4">"loading-modal"</span><span class="s1">&gt;&lt;/</span><span class="s5">div</span><span class="s1">&gt;</span><span class="s3"> 
</span></a><a name="l56"> <span class="s1">&lt;/</span><span class="s5">f:facet</span><span class="s1">&gt;</span><span class="s3"> 
</span></a><a name="l57"> <span class="s1">&lt;/</span><span class="s5">a4j:status</span><span class="s1">&gt;</span><span class="s3"> 

</span></a><a name="l58"> 
</a><a name="l59"> <span class="s1">&lt;/</span><span class="s5">a4j:region</span><span class="s1">&gt;</span><span class="s3"> 
</span></a><a name="l60"> 
</a><a name="l61"> 

</code> 
</pre> 

<p class="pTitle">Css Source</p> 
<p>Some generic css and important background styles at bottom:</p> 
<pre> 
<code> 

<a name="l1"><span class="s0"> 
<a name="l2"></span><span class="s1">/**************************************************************/</span><span class="s0"> 
<a name="l3"></span><span class="s1">/*Modal Window*/</span><span class="s0"> 
<a name="l4"> 
<a name="l5"></span><span class="s2">#modal </span><span class="s0">{ 
<a name="l6"> </span><span class="s3">background-color</span><span class="s0">: </span><span class="s2">#eee</span><span class="s0">; 
<a name="l7"> </span><span class="s3">padding</span><span class="s0">: </span><span class="s4">10</span><span class="s5">px</span><span class="s0">; 

<a name="l8"> </span><span class="s3">border-bottom</span><span class="s0">: </span><span class="s4">2</span><span class="s5">px solid </span><span class="s2">#666</span><span class="s0">; 
<a name="l9"> </span><span class="s3">border-right</span><span class="s0">: </span><span class="s4">2</span><span class="s5">px solid </span><span class="s2">#666</span><span class="s0">; 
<a name="l10"> } 
<a name="l11"> 

<a name="l12"></span><span class="s2">#modal-details </span><span class="s0">{ 
<a name="l13"> </span><span class="s3">font-size</span><span class="s0">: </span><span class="s4">8</span><span class="s5">px</span><span class="s0">; </span><span class="s1">/* originally 8px */</span><span class="s0"> 
<a name="l14"> </span><span class="s3">padding-top</span><span class="s0">: </span><span class="s4">4</span><span class="s5">px</span><span class="s0">; 
<a name="l15"> } 

<a name="l16"> 
<a name="l17"></span><span class="s2">#modal-caption </span><span class="s0">{ 
<a name="l18"> </span><span class="s3">float</span><span class="s0">: </span><span class="s3">left</span><span class="s0">; 
<a name="l19">} 
<a name="l20"> 
<a name="l21"></span><span class="s2">#loadingMsg </span><span class="s0">{ 
<a name="l22"> </span><span class="s3">float</span><span class="s0">: </span><span class="s3">right</span><span class="s0">; 

<a name="l23">} 
<a name="l24"> 
<a name="l25"></span><span class="s2">#modal img </span><span class="s0">{ 
<a name="l26"> </span><span class="s3">border</span><span class="s0">: </span><span class="s5">none</span><span class="s0">; 
<a name="l27"> </span><span class="s3">clear</span><span class="s0">: </span><span class="s5">both</span><span class="s0">; 
<a name="l28">} 
<a name="l29"> 
<a name="l30"></span><span class="s2">#overlay img </span><span class="s0">{ 

<a name="l31"> </span><span class="s3">border</span><span class="s0">: </span><span class="s5">none</span><span class="s0">; 
<a name="l32">} 
<a name="l33"> 
<a name="l34"></span><span class="s2">#overlay </span><span class="s0">{ 
<a name="l35"> </span><span class="s3">background-image</span><span class="s0">: </span><span class="s2">url</span><span class="s0">(</span><span class="s5">/facelet-sandbox/images/modal/overlay-black.png</span><span class="s0">); 
<a name="l36">} 

<a name="l37"> 
<a name="l38">* </span><span class="s2">html #overlay </span><span class="s0">{ 
<a name="l39"> </span><span class="s3">background-color</span><span class="s0">: </span><span class="s5">transparent</span><span class="s0">; 
<a name="l40"> </span><span class="s3">background-image</span><span class="s0">: </span><span class="s2">url</span><span class="s0">(</span><span class="s5">blank.gif</span><span class="s0">); 
<a name="l41"> </span><span class="s2">filter</span><span class="s0">: </span><span class="s2">progid</span><span class="s0">:</span><span class="s2">DXImageTransform</span><span class="s0">.</span><span class="s2">Microsoft</span><span class="s0">.</span><span class="s2">AlphaImageLoader</span><span class="s0">(</span><span class="s2">src</span><span class="s0">=</span><span class="s5">&quot;/facelet-sandbox/images/modal/overlay-black.png&quot;</span><span class="s0">, </span><span class="s2">sizingMethod</span><span class="s0">=</span><span class="s5">&quot;scale&quot;</span><span class="s0">); 

<a name="l42">} 
<a name="l43"> 
<a name="l44"></span><span class="s1">/**************************************************************/</span>

</code> 
</pre> 


<p>This is our end result when you rerender a component using A4J. Btw, (you can modify the AjaxAnywhere js to do the same thing)</p> 
<p> 
<a href="http://www.jroller.comsrc="/images/jroller/modal_large.gif"><img src="http://www.jroller.comsrc="/images/jroller/modal_small.gif"/></a></p>
