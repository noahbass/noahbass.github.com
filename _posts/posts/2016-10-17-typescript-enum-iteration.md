---
layout: post
title: "TypeScript Enum Iteration"
description: "something"
---

Recently I ran into the issue with enums in TypeScript. Iterating over an enum is possible, but it spits out possibly unintended items. Here the [for-in](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in), not [for-of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of), loop logs each item in the enum, numbers and strings:

{% highlight ts %}
enum Suit { Heart, Diamond, Spade, Club }

for (const suit in Suit) {
    console.log(suit);
}

// 0
// 1
// 2
// 3
// Heart
// Diamond
// Spade
// Club
{% endhighlight %}

So the solution seems straightforward... check if an item is a string. Now we should get no numbers:

{% highlight ts %}
for (const suit in Suit) {
    if (typeof suit === 'string') {
        console.log(suit);
    }
}

// 0
// 1
// 2
// 3
// Heart
// Diamond
// Spade
// Club
{% endhighlight %}

That includes both numbers and strings! The catch? Those numbers we see printed are actually strings. So some check such as `typeof suit === 'string'` is not sufficient. The solution, use [`Number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) as a boolean check:

{% highlight ts %}
for (const suit in Suit) {
    if (!Number(suit)) {
        console.log(suit);
    }
}

// Heart
// Diamond
// Spade
// Club
{% endhighlight %}
