---
layout: post
title: Sails.js Environment Config Variables
description: 'Sails.js does not really do a good enough job at handling environment variables out of the box. Here is one workaround.'
---

So [Sails.js](http://sailsjs.org/) way of handling environment variables is horrifying.

Everything in [`config/local.js`](http://sailsjs.org/#/documentation/anatomy/myApp/config/local.js.html) and [`config/env`](http://sailsjs.org/#/documentation/anatomy/myApp/config/env) sort of do their job, but it's not enough for environment variables.

What we really need is a place to store all of our config variables regardless if we are in a development, testing, or production environment. The answer is simple: use [dotenv](https://github.com/motdotla/dotenv). This will load a `.env` file or look for environment variables on the machine.

Start by pulling it into the Sails.js project and following the dotenv [docs](https://github.com/motdotla/dotenv#usage):

{% highlight sh %}
$ npm install dotenv --save
{% endhighlight %}

Then require dotenv in `app.js` and load the `.env` file:

{% highlight js %}
var dotenv = require('dotenv');
dotenv.load();
{% endhighlight %}

Create a `.env` and put some vars in it:

{% highlight text %}
CLIENT_ID=enfiownqefniqofewqofnieqwvewlk
CLIENT_SECRET=123456789
{% endhighlight %}

Now you can access those environment variables anywhere in the app (probably in some `config/` files):

{% highlight js %}
console.log(process.env.CLIENT_ID);
console.log(process.env.CLIENT_SECRET);
{% endhighlight %}
