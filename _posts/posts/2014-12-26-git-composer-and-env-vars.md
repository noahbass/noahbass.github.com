---
layout: post
title: Deploy PHP Projects with Git and Environment Variables
description: 'How to setup a <code>git push production</code> to a <code>composer install</code> and use environment variables for the deployed project.'
---

This is in addition to to [Jens Seger's post](http://jenssegers.be/blog/46/deploying-websites-with-git-and-composer-).

An `.env.php` file could include production database credentials:

{% highlight php %}
<?php

return array(
	'DATABASE_URL' => 'postgres://username:password@host/database'
);
{% endhighlight %}

Then in your app's production database connection config you would just specify the environment variable (this example in Laravel):

{% highlight php %}
<?php
// use these variables within your database config
$db       = parse_url(getenv('DATABASE_URL'));
$driver   = $db['scheme'];
$host     = $db['host'];
$database = substr($db['path'], 1);
$username = $db['user'];
$password = $db['pass'];
{% endhighlight %}

But how do you get these environment variables into the app everytime you `git push`? With the git post-receive hook found in `.git/hooks/` that Seger discusses in his post we can create a `.env.php` in the app directory everytime we deploy with the correct credentials. Just add this to your `post-receive` hook:

    cat > .env.php << EOF
    <?php

    return array(
    	'DATABASE_URL' => 'postgres://username:password@host/database',
    );
    EOF

Or maybe you want to pass some production Facebook api keys:

    cat > .env.php << EOF
    <?php

    return array(
    	'facebook.id'     => 'facebook-id-key',
    	'facebook.secret' => 'facebook-secret-key',
    );
    EOF

