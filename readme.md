# [News Theme CSS](https://staging.arcpublishing.com/alc/docs/styleguides/news-theme-css)

This is the CSS framework for the Fusion News Theme. [Theme Blocks](https://github.com/WPMedia/fusion-news-theme-blocks) and the [Engine Theme SDK](https://github.com/WPMedia/engine-theme-sdk) import the SCSS files. Then they are [compiled](https://github.com/WPMedia/fusion/blob/e497a3117912ea3dc5ad2d0a6b83a45c2210513e/engine/webpack/_shared/rules/sass.js) later with node-sass and extracted by Webpack in Fusion.

## Files Summary 

As far as I can gather, the following files are included in the News Theme CSS:

### processTemplates.js

This file is used by `"build-all": "npm run process-templates && npm run build-guide",` to generate files in the scss folder. The file uses `tmpl` files within the templates folder to generate the files.

### templates/

This folder includes scss.tmpl files that are used to generate the files in the scss folder. In order to generate changes to the `scss/_breakpoints.scss` and `scss/_variables.scss` files, you will need to modify their corresponding `scss.tmpl` files. 

### scss/

This folder contains the `.scss` files that are compiled by Webpack. You will notice two index files. There is an _index.scss file that is used to import all the other files when used by themes. This is the source of truth for the News Theme CSS. There is also the index.scss file. On the other hand, the `index.scss` file is used by the styleguide. Any changes to the _index.scss file should also be made to the index.scss file in order to showcase the changes to potential client users of the news theme css. Changes in this output shown to client developers is available in the `/styleguide` folder.

### styleguide/

This includes the `styleguide/css` that will be used by the styleguide to show the changes in the News Theme CSS. If, for example, the styleguide does not show colors, then the file is not being generated and included in the styleguide. As far as I can gather, the kss-assets folder is not being used by the styleguide to give dynamic behavior for readers of the styleguide.

The html files within the folder should be familiar. They are the output of `npm run build-guide`. You can view the styleguide by viewing the entrypoint `index.html` within the styleguide folder.

The styleguide has been customized based on changes to the `michelangelo/` folder. 

### `michelangelo/`

This folder was a forked package and styleguide generator. This package is configured by the `kss-config.json file`.

### `kss-config.json`

You will notice within the configuration that the source css is needed to be targeted: 

```
  "css": [
    "css/index.css"
  ]
```

In order to publish this folder as a whole, all of the assets need to be within one folder. This is intended to be published programmatically within the `codebuilder` folder. 

### `codebuild/`

The `buildspec.yml` file is used to generate the styleguide. The `buildspec.yml` generates the styleguide and moves that file into the s3 bucket read by ALC to distribute the styleguide. This infrastructure was provisioned via the `cfn` folder.

### `cfn/`

This is where the aws-pagebuilder-group targets the pipeline to create the infrastructure that hosts the styleguide. You can see the infrastructure setup: https://github.com/WPMedia/aws-group-pagebuilder/blob/master/cfn/configs/news-theme-css-inf/config.yml

The `aws-group-pagebuilder` is the parent pipeline that generates other pipelines (shoutout Anna for this lingo). 

### `.github`

The template for pull requests is here. This folder is used by GitHub to customize the repo experience. 

### `js`

You may notice that this folder is not all `scss` files. There are also `.js` files that configure global styles. Ideally, in the future, this would be factored out. 

## `dist-tags`

This package has been published with a number of dist-tags meant for different purposes:

- `stable`: Production environment
- `beta`: Sandbox environment
- `rc`: Release candidate environment
- `canary`: For developers to test on core components

## Usage as a block dependency:

Include as an dependency in a custom block:

`blocks/card-list-block/package.json`

```json
{
  "name": "@wpmedia/card-list-block",
  "peerDependencies": {
    "@wpmedia/engine-theme-sdk": "^2.2.0",
    "@wpmedia/news-theme-css": "*"
  }
}
```

## Usage as a theme dependency:

- Fusion will then inject these overrides and framework. Set the following in the feature pack's blocks.json:

NOTE: sassVariableOverrides is deprecated in favor of using site-specific js values using styled-components

`feature-pack/blocks.json`
```json
{
  "cssFramework": "@wpmedia/news-theme-css@stable",
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
- and run `npx fusion start` with `useLocal` set to `true` in `blocks.json`.

## Contributing

### Local Development Commands:

- `npm i` Install dependencies for library
- `npm run build-all` Create output for style guide

### Publish The Style Guide

- `npm run build-all`
- Rename output for uploading ... news-theme-css \$ `mv styleguide news-theme-css`
- Authenticate with okta for dev admin privileges within wp arc account
- Go to s3 bucket for hosting docs `arc-learning-center-static`
- Go to directory `docs/styleguides`
- Replace `news-theme-css` with your output
- Since the styleguide is dependent on the css files `/css/index.css/` and `styleguide.css`, these files are built during the build docs command and locally linked via `kss-config.json`.

### Update the style of the styleguide (meta)
The [styleguide](https://staging.arcpublishing.com/alc/docs/styleguides/news-theme-css) is generated using a modified version of [michelangelo](https://github.com/stamkracht/michelangelo) in the `/michelangelo` folder.

- Go to michelangelo/kss_styleguide/custom-template/index.hbs
- Change relevant issues
- Make sure to run `npm run build-all` to see effect
- View locally in styleguide/index.html

### To publish a new beta version
1. Check `staging` version in `package.json` under version. As a sanity check, you can also look at published version to GitHub packages via `npm view @wpmedia/news-theme-css time`. This will show what versions have been published.
2. Look at how `news-theme-css` is used by themes blocks. Check for the latest `@beta` version via `npm view @wpmedia/news-theme-css@beta`.
3. Update the version `npm version prerelease --preid=beta`.
4. Publish to the beta dist-tag `npm publish --tag beta`

block/package.json
```json
{
  "devDependencies": {
    "@wpmedia/news-theme-css": "*"
  }
}
```
3. Push the version update to `staging`.
4. Publish the beta-tagged version `npm publish --tag beta`

### To test a beta or canary version

- For canary, do the same steps as above but with canary instead of beta
- Fusion will then inject these overrides and framework. Set the following in the feature pack's blocks.json:

`feature-pack/blocks.json`
```json
{
  "cssFramework": "@wpmedia/news-theme-css@beta"
}

```

Include as an dependency in a custom block:

`blocks/card-list-block/package.json`

```json
{
  "name": "@wpmedia/card-list-block",
  "peerDependencies": {
    "@wpmedia/news-theme-css": "*"
  }
}
```

### Deploy to Arc Learning Center
News theme CSS automatically deploys to ALC. You can find the live version [here](https://staging.arcpublishing.com/alc/docs/styleguides/news-theme-css)

## License

Shield: [![CC BY-NC-ND 4.0][cc-by-shield]][cc-by-nc-nd]

This work is licensed under a
[Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License][cc-by-nc-nd].

[![CC BY-NC-ND 4.0][cc-by-image]][cc-by-nc-nd]

[cc-by-nc-nd]: https://creativecommons.org/licenses/by-nc-nd/4.0/
[cc-by-image]: https://licensebuttons.net/l/by-nc-nd/3.0/88x31.png
[cc-by-shield]: https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-lightgrey.svg
