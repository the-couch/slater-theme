# SLATER
Slater than [Slate](https://github.com/Shopify/slate). Minimaler than minimal.

<img src="https://raw.githubusercontent.com/the-couch/slater/master/slater.png" style="width: 620px; margin: 2em 0;"/>

## Up and Running

Clone the repo to your local environment

`git clone git@github.com:the-couch/slater-theme.git theme`

`cd theme`

`npm install` or `yarn install`

-----

### Initial build

We need to upload our initial build of the theme, we can do this by running `npm run build` to compile the theme one time, from there we can zip the `src` archive and upload it to our Shopify environment.

-----

### Development

Duplicate the `config-sample.yml` and grab the creds from your shopify theme.

In two separate windows run the watch command (this is to allow us to use our own build process on top of Shopify Slate).

`npm run watch:assets` - watches js and css
`npm run start` - manages theme refresh/upload

## Why
I think slate is awesome, but I don't like that it's a closed box, I love the flexibility of things like react-create-app because it let's you actually eject the project and extend it. So this is a bit of a hack but I think y'all enjoy it. If you don't like it though, you don't have to use it ;)

## Why why
Slate is a really big step forward to Shopify theme development. However, we generally prefer Webpack to Gulp, vanilla js to jQuery, CSS to SCSS, functional to object-oriented, etc. We've removed the boilerplate in favor of *nothing*, and will be releasing packages to replace the functionality of Slate in the near future.
