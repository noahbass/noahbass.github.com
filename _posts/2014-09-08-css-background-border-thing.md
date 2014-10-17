---
layout: post
title: CSS Rotated Bottom Border Thing
description: 'An interesting technique to an even more interesting feature.'
---

This technique allows you to create a background to a div that looks as if it is rotated.

<p data-height="350" data-theme-id="8345" data-slug-hash="FuEsJ" data-default-tab="result" data-user="noahbass" class='codepen'>See the Pen <a href='http://codepen.io/noahbass/pen/FuEsJ/'>rotated bottom border thing</a> by Noah (<a href='http://codepen.io/noahbass'>@noahbass</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>

The stlying for this component is built underneath the content. So add your content first:

{% highlight html %}
<section class="component">
  <div class="component__content">
    <h1>Egestas Ligula Nullam</h1>

    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
    Repudiandae ad velit tempore odit, facilis modi. Dolore sapiente,
    dolores vero omnis nesciunt tempora enim iste,
    veniam asperiores fugit consequatur minima, a.</p>
  </div>
</section>
{% endhighlight %}

From here you can concentrate on styling the content itself before worrying about the fancy rotated border. Here is some sass styling to get started:

{% highlight scss %}
.component {
  padding: 4rem 1rem;
  margin-bottom: 2rem;

  .component__content {
    max-width: 1000px;
    margin: 0 auto;
    padding-left: 10px;
    padding-right: 10px;
    color: #fff;
  }
}
{% endhighlight %}

Now onto the rotated bottom border part. It is built from the css `::before` psuedo selector. So set that up first with a background color to start:

{% highlight scss %}
.component {
  ...

  &::before {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: green;
  }

  .component__content {
    ...
  }
}
{% endhighlight %}

Concentrating on the `&::before` part of the sass, you'll notice that the background color overlays the content. Easy fix:

{% highlight scss %}
// 1. places background below content
&::before {
  content: '';
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: -1; // [1]
  background-color: green;
}
{% endhighlight %}

Now to get the component flush to the top and left:

{% highlight scss %}
&::before {
  content: '';
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: -1;
  top: 0;
  left: 0;
  background-color: green;
}
{% endhighlight %}

Finally, the transforms that rotate the background.

{% highlight scss %}
&::before {
  content: '';
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: -1;
  top: 0;
  left: 0;
  transform-origin: 0 100%;
  transform: rotate(-2deg) translateZ(0);
  background-color: green;
}
{% endhighlight %}

All you need to do is apply vendor prefixes and your good to go.
