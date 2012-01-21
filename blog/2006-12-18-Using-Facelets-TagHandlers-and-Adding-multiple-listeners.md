---
layout: blog
title: Using Facelets TagHandlers and Adding multiple listeners
tags: [Java]
---

<p>
ComponentHandler, HtmlComponentHandler, or TagHandler. So I think I finally have a handle on what each of these are used for. Okay the first 2 are easy, HtmlComponentHandler extends ComponentHandler. But what is a MetaRuleset and what can it do for my components? It looks to mee like it is just a method binding passthrough for the component when you call <code>MetaRuleset.addRule(typeTagRule);</code>?
</p>
<p>
TagHandler ended up saving the day for me, and after spending hours/days trying to get the first 2 to do what I was wanting, this one took me like 5 minutes. I was trying to add a handler to a component which turned out to be the wrong thing to do in facelets. Now, All one has to do is declare a tag in the *taglib.xml file and point it to the new handler class (as explained on Facelets docs). 
</p>
<code>
<pre>
</span><a name="l41">    <span class="s2">&lt;</span><span class="s5">tag</span><span class="s2">&gt;</span><span class="s0"> 
</span></a><a name="l42">        <span class="s2">&lt;</span><span class="s5">tag-name</span><span class="s2">&gt;</span><span class="s6">sliderListener</span><span class="s2">&lt;/</span><span class="s5">tag-name</span><span class="s2">&gt;</span><span class="s0"> 
</span></a><a name="l43">        <span class="s2">&lt;</span><span class="s5">handler-class</span><span class="s2">&gt;</span><span class="s6">com.halesconsulting.web.jsf.handler.SliderTagHandler</span><span class="s2">&lt;/</span><span class="s5">handler-class</span><span class="s2">&gt;</span><span class="s0"> 
</span></a><a name="l44">    <span class="s2">&lt;/</span><span class="s5">tag</span><span class="s2">&gt;</span><span class="s0"> </a>
</pre>
</code>
<p>
Next is defining the required and not-required attributes for your tag in the class.
</p>
<code>
<pre>
</span></a><a name="l27">  <span class="s0">private final </span><span class="s1">TagAttribute test; 
</span></a><a name="l28">  <span class="s0">private final </span><span class="s1">TagAttribute var; </a></a>
</pre>
</code>
<code>
<pre>
</span></a><a name="l35">  <span class="s0">public </span><span class="s1">SliderTagHandler(TagConfig config) { 
</span></a><a name="l36">      <span class="s0">super</span><span class="s1">(config); 
</span></a><a name="l37"> 
</a><a name="l38">      <span class="s2">// helper method for getting a required attribute</span><span class="s1"> 
</span></a><a name="l39">      <span class="s0">this</span><span class="s1">.test = </span><span class="s0">this</span><span class="s1">.getRequiredAttribute(</span><span class="s4">"type"</span><span class="s1">); 

</span></a><a name="l40"> 
</a><a name="l41">      <span class="s2">// helper method</span><span class="s1"> 
</span></a><a name="l42">      <span class="s0">this</span><span class="s1">.var = </span><span class="s0">this</span><span class="s1">.getAttribute(</span><span class="s4">"var"</span><span class="s1">); 
</span></a><a name="l43">  } </a></a></a></a></a>
</pre>
</code>

<p>Next, in the apply method, I was able to get this tags parent component instance (just like in JSP component development where you call <code>UIComponentTag tag = UIComponentTag.getParentUIComponentTag(pageContext);</code> It took me a while to figure out where I needed to do this, but after this worked, you should have seen the excitement! Nothing like figuring shit out on your own when no documentation could be found on what you are trying to do!</p> 
<p>I had to add a HashMap to keep track of what listeners had already been added. Otherwise, each render added a new listener...</p>
<code>
<pre>
</a><a name="l45">  <span class="s2">/** 

</span></a><a name="l46">   * Threadsafe Method for controlling evaluation of 
</a><a name="l47">   * its child tags, represented by "nextHandler" 
</a><a name="l48">   */<span class="s1"> 
</span></a><a name="l49">  <span class="s0">public void </span><span class="s1">apply(FaceletContext ctx, UIComponent parent) </span><span class="s0">throws </span><span class="s1">IOException, FacesException, ELException { 
</span></a><a name="l50"> 
</a><a name="l51">      <span class="s0">boolean </span><span class="s1">b = </span><span class="s0">this</span><span class="s1">.test.getBoolean(ctx); 

</span></a><a name="l52"> 
</a><a name="l53">      <span class="s0">if </span><span class="s1">(!addedMap.containsKey(test.getValue())){ 
</span></a><a name="l54">          SliderSource sliderSource = (SliderSource)parent; 
</a><a name="l55">          SliderListener listener = createSliderListener(test.getValue()); 
</a><a name="l56">          addedMap.put(test.getValue(),<span class="s0">true</span><span class="s1">); 
</span></a><a name="l57">          sliderSource.addSliderListener(listener); 
</a><a name="l58">      } 
</a><a name="l59">       

</a><a name="l60">      <span class="s0">if </span><span class="s1">(</span><span class="s0">this</span><span class="s1">.var != </span><span class="s0">null</span><span class="s1">) { 
</span></a><a name="l61">          ctx.setAttribute(var.getValue(ctx), <span class="s0">new </span><span class="s1">Boolean(b)); 
</span></a><a name="l62">      } 
</a><a name="l63">      <span class="s0">if </span><span class="s1">(b) { 
</span></a><a name="l64">          <span class="s0">this</span><span class="s1">.nextHandler.apply(ctx, parent); 

</span></a><a name="l65">      } 
</a><a name="l66">  } </a>
</pre>
</code>
<p>I still need to do a little more digging on the details of the nextHandler stuff. But I was happy to get it working the "right way"</p> 

