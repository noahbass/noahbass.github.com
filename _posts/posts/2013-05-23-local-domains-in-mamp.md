---
layout: post
title: Local Domains in MAMP (Virtual Hosts)
description: 'How to create virtual hosts with the free version of MAMP. Example: <code>http://test.dev/</code>.'
---

These intructions are for the free version of [MAMP](http://www.mamp.info/) for getting the virtual hosts functionality seen in MAMP Pro. I also have these instructions in a [video](http://youtu.be/QNX05ebHtKI).

(This has been tested in version 2 and 3 of MAMP)

## Set MAMP's ports

Open up MAMP, click on preferences, then go to the ports tab. Click "Set to defualt Apache and MySQL ports". Click okay and shutdown MAMP.

## Set the domain in the hosts

Open up a terminal and navigate to your root user directory. Then do these commands (you may have to use `sudo`):

{% highlight bash %}
$ cd /etc/
$ nano hosts
{% endhighlight %}

Look for the line that says:

    127.0.0.1 localhost

Add a space and then the name you would like to use. I'll use test.dev:

    127.0.0.1 localhost test.dev

Now save the document.

## Allow Virtual Hosts in MAMP

Virtual hosts are turned off by default. To turn this feature on open `/Applications/MAMP/conf/apach2/httpd.conf` and search for the following lines (usually at the bottom of the file):

{% highlight apache %}
# Virtual hosts
# Include /Applications/MAMP/conf/apache/extra/httpd-vhosts.conf
{% endhighlight %}

Now simply uncomment the line so it looks like:

{% highlight apache %}
# Virtual hosts
Include /Applications/MAMP/conf/apache/extra/httpd-vhosts.conf
{% endhighlight %}

## Set the domain in the MAMP config

Unlike the MAMP Pro, the free version of MAMP does not have a gui for adding and removing custom domains (virtual hosts). There is an easy workaround though.

Navigate to `/Applications/MAMP/conf/apache/extra/` in the finder. Then open up the document named `httpd-vhosts.conf`.

At the bottom of the document add this code for your custom doamin. Again, in this example I'm using the domain `test.dev` and a directory named `test.dev` in my sites directory:

{% highlight apache %}
<VirtualHost *:80>
    ServerName test.dev
    ServerAlias www.test.dev
    DocumentRoot /Users/noah/Sites/test.dev/
    <Directory /Users/noah/Sites/test.dev/>
        Options Indexes FollowSymLinks MultiViews
        AllowOverride All
        Order allow,deny
        allow from all
    </Directory>
</VirtualHost>
{% endhighlight %}

## Get MAMP and Chrome Running

Now you can open MAMP and start up its servers.

Quit and reopen Chrome if it wasn't already off during this process and go to `http://test.dev` in this case.

You now have a local domain set up for developing purposes!
