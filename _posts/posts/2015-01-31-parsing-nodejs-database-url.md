---
layout: post
title: Parsing a Node.js Database URL
description: 'Given a database url (maybe in Heroku), parse that url and chop it into parts.'
---

In a service like Heroku, you are given a database url such as `postgres://username:password@localhost:5432/my_db`. But what if you need to chop this up to get just the scheme, username, etc.?

Node.js has a built in module called `url` that has a `parse` method. You can try it out with a database url:

<video autoplay loop>
    <source src="//zippy.gfycat.com/FinishedKeenHamster.mp4" type="video/mp4">
    <source src="//zippy.gfycat.com/FinishedKeenHamster.webm" type="video/webm">
</video>

Here you can see an output of keys and values that we need:

{% highlight js %}
{
    protocol: 'postgres:',
    slashes: true,
    auth: 'username:password',
    host: 'localhost:5432',
    port: '5432',
    hostname: 'localhost',
    hash: null,
    search: null,
    query: null,
    pathname: '/my_db',
    path: '/my_db',
    href: 'postgres://username:password@localhost:5432/my_db'
}
{% endhighlight %}

We can use that as a reference for chopping everything up in the database url. First, the scheme (or protocol):

{% highlight js %}
// taking the length minus one to remove the colon
const scheme = db_url.protocol.substr(0, db_url.protocol.length - 1)
{% endhighlight %}

The username:

{% highlight js %}
// take only the username from auth
const user = db_url.auth.substr(0, db_url.auth.indexOf(':'))
{% endhighlight %}

The password:

{% highlight js %}
// take only the password from auth
const pass = db_url.auth.substr(db_url.auth.indexOf(':') + 1, db_url.auth.length)
{% endhighlight %}

The host:

{% highlight js %}
const host = db_url.hostname
{% endhighlight %}

The port:

{% highlight js %}
const port = db_url.port
{% endhighlight %}

And finally, the db name:

{% highlight js %}
const db = db_url.path.slice(1)
{% endhighlight %}

Completed it will look something like this:

{% highlight js %}
const url = require('url')
const DATABASE_URL = process.env.DATABASE_URL || 'postgres://username:password@localhost:5432/my_db'

const db_url = url.parse(DATABASE_URL)
const scheme = db_url.protocol.substr(0, db_url.protocol.length - 1)
const user   = db_url.auth.substr(0, db_url.auth.indexOf(':'))
const pass   = db_url.auth.substr(db_url.auth.indexOf(':') + 1, db_url.auth.length)
const host   = db_url.hostname
const port   = db_url.port
const db     = db_url.path.slice(1)
{% endhighlight %}
