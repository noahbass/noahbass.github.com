---
layout: post
title: Google Docs Spreadsheet Javascript Form Collection
description: 'What if you wanted to use your own custom form on your own website without having to use embeding. Here is how to insert data from a form to a spreadsheet.'
---

Some of the ideas in this post are based from [Martin Hawksey](http://mashe.hawksey.info/).

Google spreadsheets is a great way of and it integrates perfectly with Google forms. But what if you wanted to use your own custom form on your own website without having to use any nasty embeding.

Here is a simple way to insert data from an external form to a spreadsheet:

## Setup the Spreadsheet Code

1. Go into your Google Docs and create a new spreadsheet. Name it whatever you'd like.

2. In the menu bar, click on `Tools` and select `Script editor...` from the dropdown.

3. Click on `Blank Project` and replace the default script with the following script:

{% highlight js %}
// forked from https://gist.github.com/mhawksey/1276293

// function to recieve the data from the form
function doPost(e) {
    // get the correct spreadsheet
    var ss = SpreadsheetApp.openById(ScriptProperties.getProperty('active'));

    // get the sheet with a name of "DATA"
    var sheet = ss.getSheetByName("DATA");

    // find the headers of the sheet and their values
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

    // get the row below the headers
    var nextRow = sheet.getLastRow();

    // get the first cell
    var cell = sheet.getRange('a1');

    // the first column in the sheet
    var col = 0;

    // insert the data into the spreadsheet in a loop only
    // if the header is the same as the html name=""
    for (i in headers){
      if (headers[i] == "Timestamp"){
          val = new Date();
      } else {
          val = e.parameter[headers[i]];
      }
      cell.offset(nextRow, col).setValue(val);
      col++;
    }

    // debugging
    var app = UiApp.createApplication();
    var panel = app.createVerticalPanel();
    for(p in e.parameters){
        panel.add(app.createLabel(p +" "+e.parameters[p]));
    }
    app.add(panel);

    return app;
}

// function to init the spreadsheet for the first time
function setUp() {
    ScriptProperties.setProperty('active', SpreadsheetApp.getActiveSpreadsheet().getId());
}
{% endhighlight %}

4. Save the project (Files -> Save) and name it whatever you'd like.

5. Click on `Run` in the menu bar and select `setUp`. Then go ahead and authorize it in the popup window.

6. Click on `Run` in the menu bar and select `setUp` again.

7. Click on `Publish` in the menu bar and select `Deploy as Web App...`. Give the project a version, make sure it is executing as yourself, and make sure `Anyone, even anonymous` has access to the app. Then click `Deploy`.

8. Copy the `Current web app URL` that has been generated, we'll use that in the form later.


## Setup the Form

Create a html document with your form (notice the use of the `name` attribute, I'll discuss this later):

{% highlight html %}
<form>
    <input type="text" placeholder="name" name="Name">
    <input type="text" placeholder="comment" name="Comment">

    <input type="submit" value="submit">
</form>
{% endhighlight %}

Make sure to include jQuery (because of `$.post`) before the following javascript and paste in the url from the web app URL that we generated earlier:

{% highlight js %}
$('form').submit(function() {
    // post the form data to the spreadsheet
    $.post('https://script.google.com/macros/s/AKfycbyOyFG6fPlMOZi6Biv8Df9qIY46_DYWK4YiPbR8hl-nfb7omMs/exec', $('form').serialize());

    // reset the value on the input
    $('input[type=text]').val('');
    return false;
});
{% endhighlight %}


## Setup the Spreadsheet

Now we have the code for the sheet and the form to send data to the sheet. The last step is to setup the columns in the sheet. Columns in the sheet (A1, B1, C1, ...) must correspond to the `name` attribute found on the input in the form in order to accept data from the form. So if I have a an input in my form with `name="First Name"`, I must have a column in my sheet with `First Name`.

Also, you can easily capture the timestamp of form submission within the sheet. You can simply have a column called `Timestamp` in your sheet, no input in your form required.


## Resoucres

Working example:

* [Form](http://jsfiddle.net/nbass/DpEAb/)
* [Spreadsheet](http://goo.gl/mf1O7T)

[Gist](http://gist.github.com/noahbass/12373d4b9b28f494f789) with all files referenced in this post.
