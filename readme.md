# Soccer information site

This site was create to provide information about soccer, including:

- Today's matches
- Top teams
- Top players

## Technical notes

### This is a Node project that will run on the eleventy SSG(Static Site Generator)

```sh
$ npm init -y
$ npm install @11ty/eleventy
```

### Include the eleventy startup script

Add a script to `package.json`:

```js
"scripts": {
  "start": "eleventy --serve"
},
```

### Eleventy (11y) ignore

11ty renders Markdown files we need to either delete or create an `.eleventyignore` (e.g. `readme.md`). Here's the [documentation](https://www.11ty.dev/docs/ignores/) for Eleventy ignore files.

### Create Layout Template

[Reference](https://www.11ty.io/docs/layouts/)

Create `src/_includes/layout.html`
The `layout.html` page can use templating powered by [liquid](https://shopify.github.io/liquid/basics/introduction/).

### Add Passthrough for 11y

Add [passthroughs](https://www.11ty.dev/docs/copy/) for our static assets in an `.eleventy.js` file.

This is our eleventy configuration file. It is a function that exports its contents for use by the Eleventy publishing system.
It includes instructions for input and output folders:

```js
module.exports = function (config) {
  config.addPassthroughCopy("./src/css/");
  config.addPassthroughCopy("./src/img/");
  config.addPassthroughCopy("./src/js/");

  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
```

### Data Folder

11ty allows you to create a `_data` folder which can then be used to store information you need for your site.

Create a `_data` folder in `src` and add `site.json` with the following json:

```js
{
  "siteTitle": "Soccer Info"
}
```

Now you can use it in your template.

### Front matter

Front matter can be created in the data folder as mentioned above or also in a folder/collection of pages.
For example: all md files under /pages can use a `.json` file that has their front matter

```js
{
  "layout": "layout.html",
  "tags": ["page", "nav"]
}
```

### Image optimization

For image optimization use the `<picture>` tag and source sets. And check in the Network tab in the inspector.

```html
<picture>
  <img
    sizes="(max-width: 880px) 100vw, 880px"
    srcset="
      goalie_nb3met_c_scale,w_200.jpg 200w,
      goalie_nb3met_c_scale,w_506.jpg 506w,
      goalie_nb3met_c_scale,w_880.jpg 880w
    "
    src="goalie_nb3met_c_scale,w_880.jpg"
    alt=""
  />
</picture>
```

Software for image optimization:

- [Sharp](https://www.npmjs.com/package/sharp) outputs multiple image sizes and formats. The HTML is often [generated](https://www.npmjs.com/package/gatsby-plugin-image) as [well](https://stackblitz.com/github/vercel/next.js/tree/canary/examples/image-component).

- Upload the image to a generator such as [responsivebreakpoints.com](https://www.responsivebreakpoints.com/). Download the zip file and place the unzipped folder in the `img` directory.

- Run images through a processor such as imageOptim.

- Remove image background [remove.bg](https://www.remove.bg/)

- Use online service like Cloudinary:

```html
<img
  src="https://res.cloudinary.com/deedee/image/upload/w_200,h_200,c_crop/v1623521871/samples/pesto.jpg"
  alt="basil"
/>

<img
  src="https://res.cloudinary.com/deedee/image/upload/w_200,e_grayscale/v1623521871/samples/pesto.jpg"
  alt="basil"
/>
```

### Happy Coding!

### Testing

You can test locally on your browser:

```sh
$ npx eleventy --serve
```
