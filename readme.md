# [News Theme CSS](https://staging.arcpublishing.com/alc/docs/styleguides/news-theme-css)

This is the CSS framework for the Fusion News Theme. [Theme Blocks](https://github.com/WPMedia/fusion-news-theme-blocks) and the [Engine Theme SDK](https://github.com/WPMedia/engine-theme-sdk) import the SCSS files. Then they are [compiled](https://github.com/WPMedia/fusion/blob/e497a3117912ea3dc5ad2d0a6b83a45c2210513e/engine/webpack/_shared/rules/sass.js) later with node-sass and extracted by Webpack in Fusion.

## Usage as a block dependency:

Include as an dependency in a custom block: 

`blocks/card-list-block/package.json`

```json
{
  "name": "@wpmedia/card-list-block",
  "dependencies": {
    "@wpmedia/engine-theme-sdk": "^2.2.0",
    "@wpmedia/news-theme-css": "^2.1.8"
  }
}
```

## Usage as a theme dependency:

- Fusion will then inject these overrides and framework. Set the following in the feature pack's blocks.json:

`feature-pack/blocks.json`
```json
{
  "cssFramework": "@wpmedia/news-theme-css",
  "cssImport": "@wpmedia/news-theme-css/scss/_index.scss",
  "sassImport": [
    "@wpmedia/news-theme-css/scss/_variables.scss",
    "@wpmedia/news-theme-css/scss/_functions.scss",
    "@wpmedia/news-theme-css/scss/_colors.scss",
    "@wpmedia/news-theme-css/scss/_breakpoints.scss",
    "@wpmedia/news-theme-css/scss/_mixins.scss"
  ],
  "sassVariableOverrides": [
    "$primary-font-family: $theme-primary-font-family;",
    "$secondary-font-family: $theme-primary-font-family;",
    "$primary-color: $theme-primary-color;"
  ]
}

```

## Linking and Debugging 

- Specify the cssFramework on `blocks.json` of feature pack
- and run `npx fusion start` with `useLocal` set to `true` in `blocks.json`

## Contributing 

### Local Development Commands:

- `npm i` Install dependencies for library 
- `npm run scss-watch` Watch changes in your scss
- `npm run build-all` Create output and style guide 

### Publish The Style Guide

- `npm run build-all`
- Rename output for uploading ... news-theme-css \$ `mv styleguide news-theme-css`
- Authenticate with okta for dev admin privileges within wp arc account
- Go to s3 bucket for hosting docs `arc-learning-center-static`
- Go to directory `docs/styleguides`
- Replace `news-theme-css` with your output
- Since the styleguide is dependent on the css files `/css/index.css/` and `styleguide.css`, these files should also be moved to the same bucket if there have been any updates
- See the live output https://staging.arcpublishing.com/alc/docs/styleguides/news-theme-css/ after signing into admin in okta

### Update the style of the styleguide (meta)
The [styleguide](https://staging.arcpublishing.com/alc/docs/styleguides/news-theme-css) is generated using a modified version of [michelangelo](https://github.com/stamkracht/michelangelo) in the `/michelangelo` folder.

- Go to michelangelo/kss_styleguide/custom-template/index.hbs
- Change relevant issues 
- Make sure to run `npm run build-all` to see effect
- View locally in styleguide/index.html

### To publish a new beta version
1. Check `staging` version in `package.json` under version. As a sanity check, you can also look at published version to GitHub packages via `npm view @wpmedia/news-theme-css time`. This will show what versions have been published. 
2. Look at how `news-theme-css` is used by themes blocks. Since we're using semantic versioning, we want to rely on version numbers rather than just tags. If you're publishing a beta version, you want to make sure the blocks in `stable` will not install this change. Therefore, you may need to iterate a major version (breaking change) in order to prevent issues. For instance, the example below would require the `news-theme-css` to be versioned `npm version 3.0.0` in order to not be included in the block. 

block/package.json
```json
{
  "dependencies": {
    "@wpmedia/news-theme-css": "^2.0.2"
  }
}
```
3. Push the version update to `staging`.
4. Publish the beta-tagged version `npm publish --tag beta`

### To test a beta or canary version 

- Fusion will then inject these overrides and framework. Set the following in the feature pack's blocks.json:

`feature-pack/blocks.json`
```json
{
  "cssFramework": "@wpmedia/news-theme-css@beta"
}

```

or, using numbered versions

`feature-pack/blocks.json`
```json
{
  "cssFramework": "@wpmedia/news-theme-css@^3.0.0"
}

```

- Please make sure that the version of the news theme css does not resolve to include the current `@latest` or `@stable` version designated in the block. If you're unsure about semantic versioning resolution, please consult [this reference](https://devhints.io/semver).

Include as an dependency in a custom block: 

`blocks/card-list-block/package.json`

```json
{
  "name": "@wpmedia/card-list-block",
  "dependencies": {
    "@wpmedia/engine-theme-sdk": "^2.2.0",
    "@wpmedia/news-theme-css": "^2.1.8"
  }
}
```

### Deploy to Arc Learning Center
News theme CSS automatically deploys to ALC. You can find the live version [here](https://staging.arcpublishing.com/alc/docs/styleguides/news-theme-css)

### View the styleguide

After running `npm run build` and then `npm run build-guide`, open styleguide/index.html.
