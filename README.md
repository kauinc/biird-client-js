Javascript client for the biird Api service.

Download the biird javascript library from here:

https://github.com/biirdio/client-js/blob/master/biird.js

Set up your HTML markup.

<pre>
&#60;div class="biird" data-biird-id="b9fb0f44-31d5-45df-9ec3-776568802c31"&#62;&#60;/div&#62;
</pre>

Add the library to the end of your Body tag. biird will automatically initialize on load.

<pre>
<script type="text/javascript" src="biird/biird.min.js"></script>
</pre>

To change any dimension call the Update function and pass the optios as a JSON string. Call the Refresh function right after to update the resources with the new dimensions.

<pre>
$(function() {
    biird.update({'language': 'en'});
    biird.refresh();
});
</pre>
