# Clock using vanilla js

- [Nodemon](#nodemon)
- [`http.createServer()` - serving a website with a `html` file](#httpcreateserver---serving-a-website-with-a-html-file)
- [Route redirection](#route-redirection)
- [Using a font from an online url](#using-a-font-from-an-online-url)
- [Setting up a favicon](#setting-up-a-favicon)
- [Updating html elements' content with js](#updating-html-elements-content-with-js)
- [Updating document title with js](#updating-document-title-with-js)
- [Updating clock time every second / 1000 milliseconds](#updating-clock-time-every-second--1000-milliseconds)
- [Date API methods](#date-api-methods)
- [Difficulties faced](#difficulties-faced)
  - [Not able to use `fs.createReadStream()` to read html file contents to browser](#not-able-to-use-fscreatereadstream-to-read-html-file-contents-to-browser)
  - [Not able to serve more than one file when responding to request](#not-able-to-serve-more-than-one-file-when-responding-to-request)


### Nodemon

Nodemon is a tool that helps to automatically restart a node application server when file changes are detected in the directory.

Help

```
nodemon --help
or
npx nodemon --help
```

Use nodemon to start servers just as you would start servers by themselves.

Original

```
./index.js parameter1 parameter2
```

With nodemon

```
nodemon ./index.js parameter1 parameter2
```

### `http.createServer()` - serving a website with a `html` file

`http`'s `createServer()` method takes in a callback function that takes in two parameters, request and response, and handles the request to return a responose.

The url requested can be retrieved through `request.url` to verify the url route requested. Then, we can indicate the response status code with `response.writeHead(statusCode, options)` and proceed with writing the data we want to write to the webpage.

In this case, we want to write `index.html` contents to the webpage and hence we use the `fs.readFile()` method to retrieve the data from `index.html` and write it to the response body.

Responses must always be ended by calling the `.end()` method.

### Route redirection

Route can be redirected by using the `301` status code.

To do this, use the `response.writeHead()` method to write status code of `301` and options with the `Location` key providing the route to redirect to.

Code:

```js
response.writeHead(301, { Location: "/" });
response.end();
```

### Using a font from an online url

We can use the `link` tag and specify the relationship attribute `rel` as `stylesheet`. Then, provide the font url in `href` attribute.

Code:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
  rel="stylesheet"
/>
```

Then we can use the font family in css: `font-family: "Inter"`

### Setting up a favicon

We can use the `link` tag and specify the relationship attribute `rel` as `shortcut icon`. Then, specify the resource type with `type` attribute set as `image/jpg` or any other type that the image used is. Finally provide the favicon url in `href` attribute.

Code:
```html
<link
  rel="shortcut icon"
  type="image/jpg"
  href="https://img.freepik.com/free-vector/hand-painted-peach-pattern_23-2148974955.jpg?w=826&t=st=1691757901~exp=1691758501~hmac=69f0a2a8ac7b2d9668282628e1c00db0a6f295fddcbe22583e636aebe90dc506"
/>
```

### Updating html elements' content with js

Code:
```js
document.getElementById("id").innerHTML = "value";
```

### Updating document title with js

Code:
```js
document.title = "Title";
```

### Updating clock time every second / 1000 milliseconds

Use `setInterval()` method and provide a callback that updates time variable / HTML, and set the interval to 1000.

```js
setInterval(() => updateTime(), 1000);
```

### Date API methods

The following methods all return values in the client's timezone.
- `getFullYear()` - get year (4 digit)
- `getMonth()` - get month in number (0-indexed)
- `getDate()` - get day of month
- `getHours()` - get hour
- `getMinutes()` - get minute
- `getSeconds()` - get second

### Difficulties faced

#### Not able to use `fs.createReadStream()` to read html file contents to browser

Tried to use the `fs` library's `createReadStream()` method to directly pipe the read contents to the response object, but was not able to work.

Code:

```js
htmlReadStream = fs.createReadStream("index.html");
response.writeHead(200, { "Content-Type": "text/html" });
htmlReadStream.pipe(response);
response.end();
```

#### Not able to serve more than one file when responding to request

Currently using `fs.readFile("index.html")` to serve just the `index.html` file to the client browser. However, this means that if we want to link the styles (link tag) or js (script tag with src) from another file, then the browser will not be able to retrieve these files as they were not served along with the `index.html` file. I was not able to find a solution for this to serve multiple files, hence resorted to using inline styles and script.
