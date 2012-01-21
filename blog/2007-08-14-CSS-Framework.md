---
layout: blog
title: CSS Framework
tags: [Java, css, framework]
---

<p>There are several possible ways to go about building a CSS framework. The framework I mention here is suited for myself and the group of developers I work with. It has proven successful on the past 3 projects I have been on. 
Once everyone knows about a base set of styles it's amazing how much more productive the team is. Not only do you have a "master" type of stylesheet to work from, everyone can edit the code and make changes faster because they are aware of the framework in use.</p> 

<p>Many UI folks use inline styles just to get a page marked up, or pixel perfect. But this actually hinders productivity and makes the developer almost double their work. We all know that when you're buried in a project and working away getting things done, it is much harder to come back and "fix" things. Some people may enjoy working like that, but as a project lead you constantly have to remind people to go back in and clean up their work and sometimes I end up doing it myself. And, if you are using inline styles, then you go back and fix them, other developers may have already added your style to a stylesheet and you may overlook it and duplicate the same style over and over again.</p> 

<p>Bottom line is, use a framework like the example below and life will be much easier ;)<p> 

<p>Here are a few examples of usage. This is a very lean and mean framework for managing widths and alignment. I'm not too concerned with zeroing out all of my html elements like p, table, td, ul, etc. That is a given and some sites differ due to legacy issues and crappy css code. 
<img src="/images/jroller/css-framework.jpg" alt=""/></p> 

<p>You will find yourself cascading the styles on almost every element. The great thing is that you don't have to double-pane the css file and your xhmtl, you can get things done very fast and done correctly... the first go 'round. </p> 

<p>And the code...</p> 
<pre> 
<span class="s0">.</span><span class="s1">align-center </span><span class="s0">{ 
</span><span class="s2">text-align</span><span class="s0">: </span><span class="s1">center</span><span 
class="s0">; 
} 

.</span><span class="s1">align-center-margin </span><span class="s0">{ 
</span><span class="s2">margin</span><span class="s0">: </span><span class="s3">0 </span><span 
class="s4">auto </span><span class="s3">0 </span><span class="s4">auto</span><span class="s0">; 
} 

.</span><span class="s1">float-left </span><span class="s0">{ 
</span><span class="s2">float</span><span class="s0">: </span><span class="s2">left</span><span 
class="s0">; 
} 

.</span><span class="s1">float-right </span><span class="s0">{ 
</span><span class="s2">float</span><span class="s0">: </span><span class="s2">right</span><span 
class="s0">; 
} 

.</span><span class="s1">align-left </span><span class="s0">{ 
</span><span class="s2">text-align</span><span class="s0">: </span><span class="s2">left</span><span 
class="s0">; 
} 

.</span><span class="s1">align-right </span><span class="s0">{ 
</span><span class="s2">text-align</span><span class="s0">: </span><span class="s2">right</span><span 
class="s0">; 
} 

.</span><span class="s1">half-width </span><span class="s0">{ 
</span><span class="s2">width</span><span class="s0">: </span><span class="s3">49</span><span 
class="s0">%; 
} 

.</span><span class="s1">quarter-width </span><span class="s0">{ 
</span><span class="s2">width</span><span class="s0">: </span><span class="s3">24.9</span><span 
class="s0">%; 
} 

.</span><span class="s1">three-quarter-width </span><span class="s0">{ 
</span><span class="s2">width</span><span class="s0">: </span><span class="s3">74.9</span><span 
class="s0">%; 
} 

.</span><span class="s1">full-width </span><span class="s0">{ 
</span><span class="s2">width</span><span class="s0">: </span><span class="s3">100</span><span 
class="s0">%; 
} 

.</span><span class="s1">third-width </span><span class="s0">{ 
</span><span class="s2">width</span><span class="s0">: </span><span class="s3">32.9</span><span 
class="s0">%; 
} 

.</span><span class="s1">two-third-width </span><span class="s0">{ 
</span><span class="s2">width</span><span class="s0">: </span><span class="s3">65.9</span><span 
class="s0">%; 
} 

.</span><span class="s1">tenpx-top-bottom </span><span class="s0">{ 
</span><span class="s2">margin</span><span class="s0">: </span><span class="s3">10</span><span 
class="s4">px </span><span class="s3">0 10</span><span class="s4">px </span><span class="s3">0</span><span 
class="s0">; 
} 

.</span><span class="s2">clear </span><span class="s0">{ 
</span><span class="s2">clear</span><span class="s0">: </span><span class="s4">both</span><span 
class="s0">; 
}</span></pre>
