# Create Website Static

Create Website Static with no build configuration.

## Quick Overview

```sh
npx @oomag/create-website-static my-app --install
cd my-app
npm run start
```

It will create a directory called `my-app` inside the current folder.<br>
Inside that directory, it will generate the initial project structure and install the transitive dependencies:

```
my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
└── src
    └── _includes
        └── footer
            └── footer.njk
        └── head
            └── head.njk
        └── header
            └── header.njk
        └── modals
            ├── contacts.njk
            └── thank.njk
    └── _layouts
        ├── default.njk
        ├── default_ru.njk
        └── index.njk
    └── assets
        └── css
            ├── _application.sass
            └── bundle.njk
        └── fonts
        └── images
        └── js
            ├── _application.js
            └── bundle.njk
        └── root
            ├── favicon.ico
            ├── favicon.png
            └── favicon.svg
    └── en
        └── index.njk
    └── ru
        └── index.njk
```

No configuration or complicated folder structures, only the files you need to build your app.<br>
Once the installation is done, you can open your project folder:

```sh
cd my-app
```

Inside the newly created project, you can run some built-in commands:

### `npm run start` or `yarn start`

Runs the app in development mode.<br>
Open [http://localhost:8888](http://localhost:8888) to view it in the browser.

The page will automatically reload if you make changes to the code.<br>
You will see the build errors and lint warnings in the console.

### `npm run build` or `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>

Your app is ready to be deployed.

## What’s Included?

Your environment will have everything you need to build a modern static-website:

- 11ty, Coffescript, SASS, Nunjucks, and Flow syntax support.
- A live development server that warns about common mistakes.
- A build script to bundle JS, CSS, and images for production, with hashes and sourcemaps.

## Filters 

Your environment will have everything you need to build a modern static-website:

- fonts_path - path to font file
- css_path - path to css file
- js_path - path to js file
- images_path - path to image file
- favicon_tags - generate favicons set from favicon.png
- jsmin - minify the js file
- sass - gerate and minify the css file

# Publish Module

For publishing cli module:

```
npm publish --access=public
```

For publishing dependencies:

```
npm publish --workspaces --access public
```


