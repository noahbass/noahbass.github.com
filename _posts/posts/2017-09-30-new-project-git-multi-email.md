---
layout: post
title: "New Project: git-multi-email"
img: https://s3.us-east-2.amazonaws.com/assets.noahbass.com/blog/2017-09-30-new-project-git-multi-email/img.jpeg
---

[git-multi-email](https://github.com/noahbass/git-multi-email) solves the issue of using multiple email addresses in Git on a single machine. It's a global Git hook for changing your email address as necessary in the Git configuration local to the current repository as an alternative to changing your email address manually per repository.

## Example

For an example, consider the following directory structure on your machine:

{% highlight text %}
.
├── acmatuc
│   ├── archive
│   ├── cpp-language-review
│   └── visualizer
└── astronomerio
    ├── my-other-project
    └── my-project
{% endhighlight %}

And the following configuration in your global `.gitconfig` (found at `~/.gitconfig` on your machine):

{% highlight ini %}
# ...
[user]
    name = "Noah"
    email = "noah@noahbass.com"
[emails]
    astronomerio = noah@astronomer.io
    acmatuc = noah@acmatuc.org
{% endhighlight %}

Normally, when a commit is made, `noah@noahbass.com` is used as the email address.

Now, with git-multi-email, when a commit is made in a local repository anywhere within a folder named `astronomerio`, `noah@astronomer.io` will be used as the email alias and set locally for future use in that repository. Similarly, when a commit is made in a local repository anywhere within a folder named `acmatuc`, `noah@acmatuc.org` will be used as the email alias. Otherwise, any commit outside of these directories will use the default `noah@noahbass.com` email address.

## Demo

Here's a full demo using the example configuration:

<script src="https://asciinema.org/a/3kvgNxZ52z5q6up3HAE8EyqfC.js" id="asciicast-3kvgNxZ52z5q6up3HAE8EyqfC" async></script>

## Bugs

If you were to remove a line from the `[emails]` section in your `~/.gitconfig` file, then any Git repository where the email address changed within that directory will not automatically change back to the default email address (meaning `git config user.email` will still be the overridden email address).

If you do come across this issue, a quick fix is to set the `user.email` back to your default email address for that repository (ex: `git config user.email "noah@noahbass.com"`).

## Tests

There are no tests yet, but I've considered a solution that uses Docker for tests so that the tests are fully independent of existing Git configurations on a local machine.

That's it! See the project on [on GitHub](https://github.com/noahbass/git-multi-email#git-multi-email) for the installation guide.

Issues and pull requests are welcome!
