# Vue.js

> Vue is a progressive framework for building user interfaces. Unlike other monolithic frameworks, Vue is designed from the ground up to be incrementally adoptable. The core library is focused on the view layer only, and is easy to pick up and integrate with other libraries or existing projects.

The first thing to do is to include Vue in the HTML page:

```html
<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
```

Next, we have to create our application by initializing the Vue instance: 

```js
var app = new Vue({
    el: '#app',
    data: {
        message: "Hello!"
    }
});
```

The `el` property points view at the HTML element that all of our HTML side view code will be wrapped in, which is usually a `div`:

```html
<div id="app">
    <!-- Vue code goes here -->
    {{message}}
</div>
```

The `data` property can include variables for Vue which is accessible in the HTML page using `{{variableName}}`. These variables can have different types (string, boolean, array, ...). If you have a boolean variable you can show or hide an element using the `v-if` directive on an HTML tag:

```html
<div v-if="show">I am visible</div>
```

You can also bind data to an HTML tag. For instance, variable `url: "www.google.com"` can be binded to the `href` attribute of an `a` tag like so:

```html
<a v-bind:href="url">Click</a>
```

Another directive in Vue is `v-for`. This can be used to iterate over items in an array. For example, when we have an array variable `users: ['john', 'mike', 'jane']`, we can use the following code to bind these users in a dropdown dynamically:

```html
<select name="users">
    <option v-for="user in users" :value="user">{{user}}</option>
</select>
```

It is also possible to define methods in the Vue instance:

```js
var app = new Vue({
    el: '#app',
    data: {},
    methods: {
        hello: function() {
            alert('Hello!');
        }
    }
});
```

We can interact with the methods using the `v-on` directive:

```html
<button v-on:click="hello">Click</button>
```

Another powerful directive in Vue is `v-model` which provides "two-way data binding" between form input and the app state. Suppose we have a variable `age: 20`, we can bind this variable to an input tag on our HTML page and let the user change the value to whatever they desire:

```html
<input type="text" v-model="age">

```

## Exercise

Make use of the Vue directives:

```html |{type: 'playground'}
<!DOCTYPE html>
<html>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"   integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="   crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
<body>
    <div id="app">
        <!-- insert html tags here -->
        <p>
            Hello World!
        </p>
    </div>

    <script>
        $(document).ready(function () {
            var app = new Vue({
                el: "#app",
                data: {}
            })
        });
    </script>    

</body>
</html>
```

1. Show/hide the paragraph tag on the page using a checkbox input.
2. Using an input that gets a color, change the color of the paragraph tag on the page. You can bind the style attribute using `v-bind:style="{}"` and inside the `{}` you can list any CSS attributes you want (e.g. `fontSize`, `color`, etc). The value for CSS attributes can then be binded to the variable you define in the `init` state.
3. Create a dropdown with different programming languages.