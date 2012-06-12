---
layout: blog
title: Preformatting html code blocks
tags: [util]
preview:
previewimage:
---


<p>When the time comes to put html or xml settings as an example in your blog (or any html for that matter), this sed one-liner really helps out...</p>
<p>Replace the *** with an "&"... the page example won't render correctly if I use verbatim characters.</p>
<code style="background-color:black;color:chartreuse;">
cat -v article.xhtml | sed -e "s/^***lt;/\\&lt;/g" -e "s/&gt;/\\***gt;/g" > article.code.xhtml
</code>  

