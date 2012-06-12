---
layout: blog
title: JSF Ajax Filter/Slider with UIData
tags: [Java]
preview:
previewimage:
---

<p>In any RIA where h:dataTable is used, probably 90% of the time, you will need a filter in the same view/page as the dataTable. A Filter can be anything from a list of links, a select many list, or in this example, a slider.</p> 

<p>At first, I thought about just creating the component and have it add the value of the slider to a request parameter so that the backing bean could have access to the value. The backing bean could then loop through the list and compare the slider value to the object, then present the filtered data. This is probably the most common and easiest option in most cases, but it seems there are too many drawbacks in developing this way.</p> 

<ol> 
<li>This custom config leads to repeated code scattered throughout each backing bean that makes use of the filter.</li> 
<li>Even if you abstract this functionality, it would be just as easy, and beneficial, to create a custom component to handle this. You could create a component that could filter any other component that makes use of UIData.</li> 
<li>If you have 5 filters in 1 view, and they all create a combined criteria for your dataTable list, it would be nice if this logic was hidden under the hood of the component and everything played well together.</li> 
</ol> 

<p>A UIData filtering component should be much like the dataScroller component. It should have a "for" attribute with the id of your component to be filtered. We can provide attributes like range, start position, and all other common component attributes. It would also be nice to have a "depends" attribute that would allow a comma delimeted list of other filter component id's that would provide a state or limits for this components functionality.</p> 

<p>Although my slider component is 95% complete, I guess I'm using this post as a semi-blueprint/laying some thoughts on paper. Filtering is an important part of displaying tabular, or any, data and I haven't seen any open source components addressing it. If anyone reading knows of JSF filtering, please leave a url. I plan on submitting the slider to JSF-Comp or any other project willing to take it within the next week.</p>
