# News Theme CSS
## Overview
This is the CSS framework for the Fusion News Theme. 

### Commands:
    "scss-watch": "node-sass --watch scss -o css",
    "build": "node-sass scss -o css",
    "build-guide": "kss --config ./kss-config.json"
    
### Usage as a dependency:
1. Import as an NPM dependency in your blocks repo.
2. Set the following in the feature pack's blocks.json:
    `"cssImport": "~@wpmedia/news-theme-css/scss/index",` 
    Fusion will then inject this import into all your block's scss
    files...so you do not need to import it.

### View the styleguide
After running `npm run build` and then `npm run build-guide`, 
open styleguide/index.html

### To publish a new version
1. Run build and then build-guide
2. Commit changes and push to origin master
3. Run `npm version 1.0.4` Replace 1.0.4 with your new version.
4. Push to origin master
5. Run `npm publish`
6. In the root package.json file of the blocks repo, update 
@wpmedia/news-theme-css to the new version then run in the block repo
the following commands: `npx lerna clean` and then `npx lerna bootstrap`

### Deploy to Arc Learning Center
News theme CSS automatically deploys to ALC. You can find the live version [here](https://staging.arcpublishing.com/alc/docs/styleguides/news-theme-css)
