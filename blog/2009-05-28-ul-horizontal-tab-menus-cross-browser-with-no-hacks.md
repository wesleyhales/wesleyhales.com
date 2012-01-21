---
layout: blog
title: ul horizontal tab menus, cross browser, with no hacks
tags: [Java]
---

<p>There are too many times when I need a nice horizontal tab menu, using semantic html, and with cool graphics all at the same time. So this post is more for my personal reference and will shave a few hours off any ones html prototype. This is cross browser valid css 2.1 on IE6, IE7, FF3, Chrome and Safari without using any hacks.</p> 

<p>The end result: 
<img src="/images/jroller/tabs.jpg" alt=""/></p> 
<style type="text/css"> 
.ln { color: rgb(0,0,0); font-weight: normal; font-style: normal; } 
.s0 { color: rgb(0,0,128); font-weight: bold; } 
.s1 { } 
.s2 { color: rgb(0,0,255); font-weight: bold; } 
.s3 { color: rgb(0,0,255); } 
.s4 { color: #4c5d89; font-weight: bold; } 
.s5 { color: rgb(128,128,128); font-style: italic; } 
</style> 
<p>To start with, here is the css: 
<pre> 
<a name="l151"></span><span class="s5">/*----------------------Navigation*/</span><span class="s1"> 

<a name="l152"></span><span class="s0">div</span><span class="s1">.</span><span class="s0">nav-container ul</span><span class="s1">.</span><span class="s0">primary-nav </span><span class="s1">{ 
<a name="l153"> </span><span class="s2">margin</span><span class="s1">: </span><span class="s3">45</span><span class="s4">px </span><span class="s3">0 0 236</span><span class="s4">px</span><span class="s1">; 
<a name="l154"> </span><span class="s2">white-space</span><span class="s1">: </span><span class="s4">nowrap</span><span class="s1">; 
<a name="l155"> </span><span class="s2">display</span><span class="s1">: </span><span class="s4">inline</span><span class="s1">; 
<a name="l156"> </span><span class="s2">float</span><span class="s1">: </span><span class="s4">left</span><span class="s1">; 
<a name="l157">} 
<a name="l158"></span><span class="s0">div</span><span class="s1">.</span><span class="s0">nav-container ul</span><span class="s1">.</span><span class="s0">primary-nav li </span><span class="s1">{ 
<a name="l159"></span><span class="s5">/*setup the container for tab divs*/</span><span class="s1"> 
<a name="l160"> </span><span class="s2">list-style</span><span class="s1">: </span><span class="s4">none</span><span class="s1">; 
<a name="l161"> </span><span class="s2">height</span><span class="s1">: </span><span class="s3">28</span><span class="s4">px</span><span class="s1">; 
<a name="l162"> </span><span class="s2">display</span><span class="s1">: </span><span class="s4">inline</span><span class="s1">; 
<a name="l163"> </span><span class="s2">font-size</span><span class="s1">: </span><span class="s3">1.2</span><span class="s4">em</span><span class="s1">; 
<a name="l164"> </span><span class="s2">margin</span><span class="s1">: </span><span class="s3">0</span><span class="s1">; 
<a name="l165"> </span><span class="s2">position</span><span class="s1">: </span><span class="s4">relative</span><span class="s1">; 
<a name="l166">} 
<a name="l167"></span><span class="s0">div</span><span class="s1">.</span><span class="s0">nav-container ul</span><span class="s1">.</span><span class="s0">primary-nav li div </span><span class="s1">{ 
<a name="l168"></span><span class="s5">/*float all divs containing tab images left*/</span><span class="s1"> 
<a name="l169"> </span><span class="s2">float</span><span class="s1">: </span><span class="s4">left</span><span class="s1">; 
<a name="l170">} 
<a name="l171"></span><span class="s0">div</span><span class="s1">.</span><span class="s0">nav-container ul</span><span class="s1">.</span><span class="s0">primary-nav a </span><span class="s1">{
<a name="l172"> </span><span class="s2">color</span><span class="s1">: </span><span class="s0">#777</span><span class="s1">; 
<a name="l173"> </span><span class="s2">text-decoration</span><span class="s1">: </span><span class="s4">none</span><span class="s1">; 
<a name="l174"> </span><span class="s2">font-weight</span><span class="s1">: </span><span class="s3">700</span><span class="s1">; 
<a name="l175">} 
<a name="l176"></span><span class="s0">div</span><span class="s1">.</span><span class="s0">nav-container ul</span><span class="s1">.</span><span class="s0">primary-nav li</span><span class="s1">.</span><span class="s0">selected div</span><span class="s1">.</span><span class="s0">tab-main a </span><span class="s1">{ 
<a name="l177"> </span><span class="s2">color</span><span class="s1">: </span><span class="s0">#fff</span><span class="s1">; 
<a name="l178">} 
<a name="l179"></span><span class="s0">div</span><span class="s1">.</span><span class="s0">nav-container ul</span><span class="s1">.</span><span class="s0">primary-nav li div</span><span class="s1">.</span><span class="s0">tab </span><span class="s1">{ 
<a name="l180"> </span><span class="s2">height</span><span class="s1">: </span><span class="s3">28</span><span class="s4">px</span><span class="s1">; 
<a name="l181"> </span><span class="s5">/*-5 on margin will give us the overlap look*/</span><span class="s1"> 
<a name="l182"> </span><span class="s2">margin</span><span class="s1">: </span><span class="s3">0 </span><span class="s1">-</span><span class="s3">5</span><span class="s4">px </span><span class="s3">0 0</span><span class="s1">; 
<a name="l183">} 
<a name="l184"></span><span class="s0">div</span><span class="s1">.</span><span class="s0">nav-container ul</span><span class="s1">.</span><span class="s0">primary-nav li div</span><span class="s1">.</span><span class="s0">tab div</span><span class="s1">.</span><span class="s0">tab-main</span><span class="s1">, 
<a name="l185"></span><span class="s0">div</span><span class="s1">.</span><span class="s0">nav-container ul</span><span class="s1">.</span><span class="s0">primary-nav li</span><span class="s1">.</span><span class="s0">selected div</span><span class="s1">.</span><span class="s0">tab div</span><span class="s1">.</span><span class="s0">tab-main </span><span class="s1">{ 
<a name="l186"> </span><span class="s2">float</span><span class="s1">: </span><span class="s4">left</span><span class="s1">; 
<a name="l187"> </span><span class="s2">padding</span><span class="s1">: </span><span class="s3">5</span><span class="s4">px </span><span class="s3">15</span><span class="s4">px </span><span class="s3">0 10</span><span class="s4">px</span><span class="s1">; 
<a name="l188"> </span><span class="s2">text-align</span><span class="s1">: </span><span class="s4">center</span><span class="s1">; 
<a name="l189"> </span><span class="s2">margin</span><span class="s1">: </span><span class="s3">0 </span><span class="s4">auto </span><span class="s3">0 </span><span class="s4">auto</span><span class="s1">; 
<a name="l190">} 
<a name="l191"></span><span class="s0">div</span><span class="s1">.</span><span class="s0">nav-container ul</span><span class="s1">.</span><span class="s0">primary-nav li div</span><span class="s1">.</span><span class="s0">tab div</span><span class="s1">.</span><span class="s0">last</span><span class="s1">, 
<a name="l192"></span><span class="s0">div</span><span class="s1">.</span><span class="s0">nav-container ul</span><span class="s1">.</span><span class="s0">primary-nav li</span><span class="s1">.</span><span class="s0">selected div</span><span class="s1">.</span><span class="s0">tab-last div</span><span class="s1">.</span><span class="s0">last </span><span class="s1">{ 
<a name="l193"> </span><span class="s2">float</span><span class="s1">: </span><span class="s4">left</span><span class="s1">; 
<a name="l194"> </span><span class="s2">padding</span><span class="s1">: </span><span class="s3">5</span><span class="s4">px </span><span class="s3">10</span><span class="s4">px </span><span class="s3">0 10</span><span class="s4">px</span><span class="s1">; 
<a name="l195"> </span><span class="s2">text-align</span><span class="s1">: </span><span class="s4">center</span><span class="s1">; 
<a name="l196"> </span><span class="s2">margin</span><span class="s1">: </span><span class="s3">0 </span><span class="s4">auto </span><span class="s3">0 </span><span class="s4">auto</span><span class="s1">; 
<a name="l197">} 
<a name="l198"></span><span class="s0">div</span><span class="s1">.</span><span class="s0">nav-container ul</span><span class="s1">.</span><span class="s0">primary-nav li</span><span class="s1">.</span><span class="s0">inactive div</span><span class="s1">.</span><span class="s0">tab div</span><span class="s1">.</span><span class="s0">tab-main </span><span class="s1">{ 
<a name="l199"> </span><span class="s2">background</span><span class="s1">: </span><span class="s0">url</span><span class="s1">(</span><span class="s4">../images/nav/nav-bg-center-inactive.gif</span><span class="s1">) </span><span class="s4">repeat-x left top</span><span class="s1">; 
<a name="l200"> </span><span class="s2">height</span><span class="s1">: </span><span class="s3">28</span><span class="s4">px</span><span class="s1">; 
<a name="l201">} 
<a name="l202"></span><span class="s0">div</span><span class="s1">.</span><span class="s0">nav-container ul</span><span class="s1">.</span><span class="s0">primary-nav li</span><span class="s1">.</span><span class="s0">inactive div</span><span class="s1">.</span><span class="s0">tab div</span><span class="s1">.</span><span class="s0">tab-left </span><span class="s1">{ 
<a name="l203"> </span><span class="s2">width</span><span class="s1">: </span><span class="s3">2</span><span class="s4">px</span><span class="s1">; 
<a name="l204"> </span><span class="s2">background</span><span class="s1">: </span><span class="s0">url</span><span class="s1">(</span><span class="s4">../images/nav/nav-bg-left-inactive.gif</span><span class="s1">) </span><span class="s4">no-repeat left top</span><span class="s1">; 
<a name="l205"> </span><span class="s2">height</span><span class="s1">: </span><span class="s3">28</span><span class="s4">px</span><span class="s1">; 
<a name="l206">} 
<a name="l207"></span><span class="s0">div</span><span class="s1">.</span><span class="s0">nav-container ul</span><span class="s1">.</span><span class="s0">primary-nav li</span><span class="s1">.</span><span class="s0">inactive div</span><span class="s1">.</span><span class="s0">tab div</span><span class="s1">.</span><span class="s0">tab-right </span><span class="s1">{ 
<a name="l208"> </span><span class="s2">width</span><span class="s1">: </span><span class="s3">2</span><span class="s4">px</span><span class="s1">; 
<a name="l209"> </span><span class="s2">background</span><span class="s1">: </span><span class="s0">url</span><span class="s1">(</span><span class="s4">../images/nav/nav-bg-right-inactive.gif</span><span class="s1">) </span><span class="s4">no-repeat right top</span><span class="s1">; 
<a name="l210"> </span><span class="s2">height</span><span class="s1">: </span><span class="s3">28</span><span class="s4">px</span><span class="s1">; 
<a name="l211">} 
<a name="l212"></span><span class="s0">div</span><span class="s1">.</span><span class="s0">nav-container ul</span><span class="s1">.</span><span class="s0">primary-nav li</span><span class="s1">.</span><span class="s0">selected div</span><span class="s1">.</span><span class="s0">tab div</span><span class="s1">.</span><span class="s0">tab-main </span><span class="s1">{ 
<a name="l213"> </span><span class="s2">background</span><span class="s1">: </span><span class="s0">url</span><span class="s1">(</span><span class="s4">../images/nav/nav-bg-center-active.gif</span><span class="s1">) </span><span class="s4">repeat-x left top</span><span class="s1">; 
<a name="l214"> </span><span class="s2">height</span><span class="s1">: </span><span class="s3">28</span><span class="s4">px</span><span class="s1">; 
<a name="l215">} 
<a name="l216"></span><span class="s0">div</span><span class="s1">.</span><span class="s0">nav-container ul</span><span class="s1">.</span><span class="s0">primary-nav li</span><span class="s1">.</span><span class="s0">selected div</span><span class="s1">.</span><span class="s0">tab div</span><span class="s1">.</span><span class="s0">tab-left </span><span class="s1">{ 
<a name="l217"> </span><span class="s2">background</span><span class="s1">: </span><span class="s4">transparent </span><span class="s0">url</span><span class="s1">(</span><span class="s4">../images/nav/nav-bg-left-active.gif</span><span class="s1">) </span><span class="s4">no-repeat left top</span><span class="s1">; 
<a name="l218"> </span><span class="s2">width</span><span class="s1">: </span><span class="s3">4</span><span class="s4">px</span><span class="s1">; 
<a name="l219"> </span><span class="s2">height</span><span class="s1">: </span><span class="s3">28</span><span class="s4">px</span><span class="s1">; 
<a name="l220">} 
<a name="l221"></span><span class="s0">div</span><span class="s1">.</span><span class="s0">nav-container ul</span><span class="s1">.</span><span class="s0">primary-nav li</span><span class="s1">.</span><span class="s0">selected div</span><span class="s1">.</span><span class="s0">tab div</span><span class="s1">.</span><span class="s0">tab-right </span><span class="s1">{ 
<a name="l222"> </span><span class="s2">background-image</span><span class="s1">: </span><span class="s0">url</span><span class="s1">(</span><span class="s4">../images/nav/nav-bg-right-active.gif</span><span class="s1">); 
<a name="l223"> </span><span class="s2">width</span><span class="s1">: </span><span class="s3">4</span><span class="s4">px</span><span class="s1">; 
<a name="l224"> </span><span class="s2">height</span><span class="s1">: </span><span class="s3">28</span><span class="s4">px</span><span class="s1">; 
}</span> 
</pre> 
</p> 

<p>And finally the html: 
<code><pre> 
<a name="l31"> </span><span class="s0">&lt;</span><span class="s4">div </span><span class="s1">class=</span><span class="s2">&quot;nav-container&quot;</span><span class="s0">&gt;</span><span class="s3"> 
<a name="l32"> </span><span class="s0">&lt;</span><span class="s4">ul </span><span class="s1">class=</span><span class="s2">&quot;primary-nav &quot;</span><span class="s0">&gt;</span><span class="s3"> 
<a name="l33"> </span><span class="s0">&lt;</span><span class="s4">li </span><span class="s1">class=</span><span class="s2">&quot;selected&quot;</span><span class="s0">&gt;</span><span class="s3"> 
<a name="l34"> </span><span class="s0">&lt;</span><span class="s4">div </span><span class="s1">class=</span><span class="s2">&quot;tab&quot;</span><span class="s0">&gt;</span><span class="s3"> 
<a name="l35"> </span><span class="s0">&lt;</span><span class="s4">div </span><span class="s1">class=</span><span class="s2">&quot;tab-left&quot;</span><span class="s0">&gt;&lt;/</span><span class="s4">div</span><span class="s0">&gt;</span><span class="s3"> 
<a name="l36"> </span><span class="s0">&lt;</span><span class="s4">div </span><span class="s1">class=</span><span class="s2">&quot;tab-main&quot;</span><span class="s0">&gt;&lt;</span><span class="s4">a </span><span class="s1">href=</span><span class="s2">&quot;#&quot;</span><span class="s0">&gt;</span><span class="s3">Home</span><span class="s0">&lt;/</span><span class="s4">a</span><span class="s0">&gt;&lt;/</span><span class="s4">div</span><span class="s0">&gt;</span><span class="s3"> 
<a name="l37"> </span><span class="s0">&lt;</span><span class="s4">div </span><span class="s1">class=</span><span class="s2">&quot;tab-right&quot;</span><span class="s0">&gt;&lt;/</span><span class="s4">div</span><span class="s0">&gt;</span><span class="s3"> 
<a name="l38"> </span><span class="s0">&lt;/</span><span class="s4">div</span><span class="s0">&gt;</span><span class="s3"> 
<a name="l39"> </span><span class="s0">&lt;/</span><span class="s4">li</span><span class="s0">&gt;</span><span class="s3"> 
<a name="l40"> </span><span class="s0">&lt;</span><span class="s4">li </span><span class="s1">class=</span><span class="s2">&quot;inactive&quot;</span><span class="s0">&gt;</span><span class="s3"> 
<a name="l41"> </span><span class="s0">&lt;</span><span class="s4">div </span><span class="s1">class=</span><span class="s2">&quot;tab&quot;</span><span class="s0">&gt;</span><span class="s3"> 
<a name="l42"> </span><span class="s0">&lt;</span><span class="s4">div </span><span class="s1">class=</span><span class="s2">&quot;tab-left&quot;</span><span class="s0">&gt;&lt;/</span><span class="s4">div</span><span class="s0">&gt;</span><span class="s3"> 
<a name="l43"> </span><span class="s0">&lt;</span><span class="s4">div </span><span class="s1">class=</span><span class="s2">&quot;tab-main&quot;</span><span class="s0">&gt;&lt;</span><span class="s4">a </span><span class="s1">href=</span><span class="s2">&quot;#&quot;</span><span class="s0">&gt;</span><span class="s3">Profile</span><span class="s0">&lt;/</span><span class="s4">a</span><span class="s0">&gt;&lt;/</span><span class="s4">div</span><span class="s0">&gt;</span><span class="s3"> 
<a name="l44"> </span><span class="s0">&lt;</span><span class="s4">div </span><span class="s1">class=</span><span class="s2">&quot;tab-right&quot;</span><span class="s0">&gt;&lt;/</span><span class="s4">div</span><span class="s0">&gt;</span><span class="s3"> 
<a name="l45"> </span><span class="s0">&lt;/</span><span class="s4">div</span><span class="s0">&gt;</span><span class="s3"> 
<a name="l46"> </span><span class="s0">&lt;/</span><span class="s4">li</span><span class="s0">&gt;</span><span class="s3"> 
<a name="l47"> </span><span class="s0">&lt;</span><span class="s4">li </span><span class="s1">class=</span><span class="s2">&quot;inactive&quot;</span><span class="s0">&gt;</span><span class="s3"> 
<a name="l48"> </span><span class="s0">&lt;</span><span class="s4">div </span><span class="s1">class=</span><span class="s2">&quot;tab&quot;</span><span class="s0">&gt;</span><span class="s3"> 
<a name="l49"> </span><span class="s0">&lt;</span><span class="s4">div </span><span class="s1">class=</span><span class="s2">&quot;tab-left&quot;</span><span class="s0">&gt;&lt;/</span><span class="s4">div</span><span class="s0">&gt;</span><span class="s3"> 
<a name="l50"> </span><span class="s0">&lt;</span><span class="s4">div </span><span class="s1">class=</span><span class="s2">&quot;tab-main&quot;</span><span class="s0">&gt;&lt;</span><span class="s4">a </span><span class="s1">href=</span><span class="s2">&quot;#&quot;</span><span class="s0">&gt;</span><span class="s3">About Us</span><span class="s0">&lt;/</span><span class="s4">a</span><span class="s0">&gt;&lt;/</span><span class="s4">div</span><span class="s0">&gt;</span><span class="s3"> 
<a name="l51"> </span><span class="s0">&lt;</span><span class="s4">div </span><span class="s1">class=</span><span class="s2">&quot;tab-right&quot;</span><span class="s0">&gt;&lt;/</span><span class="s4">div</span><span class="s0">&gt;</span><span class="s3"> 
<a name="l52"> </span><span class="s0">&lt;/</span><span class="s4">div</span><span class="s0">&gt;</span><span class="s3"> 
<a name="l53"> </span><span class="s0">&lt;/</span><span class="s4">li</span><span class="s0">&gt;</span><span class="s3"> 
<a name="l54"> </span><span class="s0">&lt;</span><span class="s4">li </span><span class="s1">class=</span><span class="s2">&quot;inactive&quot;</span><span class="s0">&gt;</span><span class="s3"> 
<a name="l55"> </span><span class="s0">&lt;</span><span class="s4">div </span><span class="s1">class=</span><span class="s2">&quot;tab&quot;</span><span class="s0">&gt;</span><span class="s3"> 
<a name="l56"> </span><span class="s0">&lt;</span><span class="s4">div </span><span class="s1">class=</span><span class="s2">&quot;tab-left&quot;</span><span class="s0">&gt;&lt;/</span><span class="s4">div</span><span class="s0">&gt;</span><span class="s3"> 
<a name="l57"> </span><span class="s0">&lt;</span><span class="s4">div </span><span class="s1">class=</span><span class="s2">&quot;tab-main last&quot;</span><span class="s0">&gt;&lt;</span><span class="s4">a </span><span class="s1">href=</span><span class="s2">&quot;#&quot;</span><span class="s0">&gt;</span><span class="s3">Help</span><span class="s0">&lt;/</span><span class="s4">a</span><span class="s0">&gt;&lt;/</span><span class="s4">div</span><span class="s0">&gt;</span><span class="s3"> 
<a name="l58"> </span><span class="s0">&lt;</span><span class="s4">div </span><span class="s1">class=</span><span class="s2">&quot;tab-right&quot;</span><span class="s0">&gt;&lt;/</span><span class="s4">div</span><span class="s0">&gt;</span><span class="s3"> 
<a name="l59"> </span><span class="s0">&lt;/</span><span class="s4">div</span><span class="s0">&gt;</span><span class="s3"> 
<a name="l60"> </span><span class="s0">&lt;/</span><span class="s4">li</span><span class="s0">&gt;</span><span class="s3"> 
<a name="l61"> </span><span class="s0">&lt;/</span><span class="s4">ul</span><span class="s0">&gt;</span><span class="s3"> 
<a name="l62"> </span><span class="s0">&lt;/</span><span class="s4">div</span><span class="s0">&gt;</span><span class="s3"> 
<a name="l63"> </span><span class="s0">&lt;/</span><span class="s4">div</span><span class="s0">&gt;</span> 

</pre></code> 
</p>
