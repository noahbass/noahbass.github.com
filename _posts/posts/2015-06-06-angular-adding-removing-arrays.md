---
layout: post
title: "AngularJS: Adding and Removing Items in an Array"
description: "A simple AngularJS demo for adding and removing items from an array and displaying that array."
---

The goal of this is to create a simple way to add and remove items from a list in Angular. You can see the finished demo on [plnkr](http://plnkr.co/edit/2i90K72iHNGHqFjIeCqE?p=preview). Here is the user interaction:

<video autoplay loop>
    <source src="//zippy.gfycat.com/AdvancedGreedyKiskadee.mp4" type="video/mp4">
    <source src="//zippy.gfycat.com/AdvancedGreedyKiskadee.webm" type="video/webm">
</video>

To start off, I have a new controller in my Angular app for this demo. It's called `demoController`.

{% highlight js %}
app.controller('demoController', function($scope) {
    // initial items

    // add an item

    // remove an item
});
{% endhighlight %}

Then in my html, I have this new controller with some scaffolding of what I want the ui to look like.

{% highlight html %}
<div ng-controller="demoController">
    <!-- list of items with a button to remove that item -->
    <ul>
        <li ng-repeat="item in items">
            {{ item }} <button ng-click="remove($index)">Remove</button>
        </li>
    </ul>

    <!-- input and button it add a new item -->
    <div>
        <input type="text" ng-model="input">
        <button type="submit" ng-click="add()">Add</button>
    </div>
</div>
{% endhighlight %}

So back to the javascript. First some initial data to supply:

{% highlight js %}
app.controller('demoController', function($scope) {
    // initial items
    $scope.items = [
    	'item one',
    	'item two',
    	'item three'
    ];
});
{% endhighlight %}

Then a way to add a new item by getting the text in the input and pushing that to the items scope:

{% highlight js %}
app.controller('demoController', function($scope) {
    // initial items
    $scope.items = [
    	'item one',
    	'item two',
    	'item three'
    ];

    // add an item
    $scope.add = function() {
        $scope.items.push($scope.input);
    };
});
{% endhighlight %}

Lastly, removing an item from items. Angular provides an `$index` that we can use to remove a specific item:

{% highlight js %}
app.controller('demoController', function($scope) {
    // initial items
    $scope.items = [
    	'item one',
    	'item two',
    	'item three'
    ];

    // add an item
    $scope.add = function() {
    	$scope.items.push($scope.input);
    };

    // remove an item
    $scope.remove = function(index) {
    	$scope.items.splice(index, 1);
    };
});
{% endhighlight %}

That's a simple way to add and remove items. See the demo on [plnkr](http://plnkr.co/edit/2i90K72iHNGHqFjIeCqE?p=preview).

## Extra

Right now when you add a new item to the list, the input keeps the input that was added. Not a good ui. To remove the input when it is submitted, simply make the input scope emtpy with `$scope.input = '';` in `$scope.add`:

{% highlight js %}
$scope.add = function() {
    $scope.items.push($scope.input);
    $scope.input = '';
};
{% endhighlight %}
