# Theme CSS
## Overview
This is the CSS framework for the Fusion News Theme that provides the foundation CSS for the news theme. The main responsibilities of this CSS framework are as follow:
- A CSS grid layout framework (with flexbox fallback for older browsers)
- CSS reset
- Typography
- Breakpoints and spacing
- Utility Sass functions (i.e. convert px to rems, etc.)
- A JavaScript package that has versions of some of the Sass functions (i.e. `calculateRem`, `lightenDarkenColor` ) as well as an object 
(`framework`) that holds properties for spacing, breakpoints, etc. The `js/framework.js` file is useful when you need to tap 
into some of the functionality and properties of the framework when working in JavaScript. 
The JavaScript package also has a set of styled components (`js/styled/linkHovers.js`) that are used to set hover styles.

### Getting Started:
To use Theme CSS within a feature pack repository, it must be configured through a file in the root of the repo called `blocks.json`. This is a file that Fusion (Hydrate versions) knows to
look for and run specific internal build commands to bring everything
together.

Below describes the various properties related to the Theme CSS that are in blocks.json and their
purpose:

| **Property**   |  **Description** |
|---|---|
| **cssFramework** |  The CSS framework package being used. For News theme, it is the news-theme-css package. |
| **cssImport**   |  Specifies the main Sass file entry point into the framework. This is leveraged by fusion to automatically import the framework into each of the block's source file in fusion-news-theme-blocks during build time. So, in other words, you do not have to explicitly import the css framework in your blocks source code. |
| **sassImport**   |  Specifies the entry point for the Sass variables from the CSS framework so that these variables can be leveraged in custom CSS for a consistent look and feel. |
| **sassVariableOverrides**   | In addition to using styled components to set theme properties, we also want the CSS framework to pick up on the custom settings and override the appropriate Sass default properties. Fusion handles the override process internally.  |
| **values** | This is where the custom theme values for both `siteProperties` and `styleProperties` are set for the site. There are two main areas: default and per site. In order to override a default value for a specific Sass variable, add the relevant key-value pair to the `styleProperties` object.  |

#### Example

Here is an example of what a the CSS setup in the `block.json` might look like.

```
{
  "cssFramework": "@wpmedia/news-theme-css",
  "cssImport": "~@wpmedia/news-theme-css/scss/index",
  "sassImport": [
    "~@wpmedia/news-theme-css/scss/_variables.scss",
    "~@wpmedia/news-theme-css/scss/_functions.scss",
    "~@wpmedia/news-theme-css/scss/_colors.scss",
    "~@wpmedia/news-theme-css/scss/_breakpoints.scss",
    "~@wpmedia/news-theme-css/scss/_mixins.scss"
  ],
  "sassVariableOverrides": [
    "$primary-font-family: $theme-primary-font-family;",
    "$secondary-font-family: $theme-primary-font-family;",
    "$primary-color: $theme-primary-color;"
  ],
  "values": {
    "default": {
      "siteProperties": {
        "websiteName": "The Gazette",
        "locale": "en",
      },
      "styleProperties": {
        "primary-font-family": "Arial, 'Helvetica Neue', Helvetica, sans-serif",
        "secondary-font-family": "Georgia,Times,Times New Roman,serif",
        "primary-color": "#1B6FA6"
      }
    },
    "sites": {
      "arc-demo-1": {
        "siteProperties": {
          "websiteName": "Arc Demo 1",
        },
        "styleProperties": {
          "primary-font-family": "Work Sans",
          "secondary-font-family": "Work Sans",
          "primary-color": "#37a1e0"
        }
      },
      "arc-demo-2": {
        "siteProperties": {
          "websiteName": "Arc Demo 2",
        },
        "styleProperties": {
          "primary-font-family": "Eczar",
          "secondary-font-family": "Eczar",
          "primary-color": "#37a1e0"
        }
      }
    }
  }
}
```
### Custom Block Developers
If you are creating custom blocks for your site and plan on using news-theme-css as a dependency, 
then in addition to configuring blocks.json as per the section above, you will need to follow some additional
steps to ensure this framework is available in your code.  There are two different scenarios in custom development
that pertain to using this framework:  Developing custom components in a feature pack and developing custom
components in a separate repository. 

#### Developing custom components in a feature pack
If you are developing your custom components directly in your feature pack, then as long as you have set 
up your blocks.json to use the CSS Framework, you do not explicitly add the framework to any
package.json file or directly import the framework's sass files into your component's sass file.  Fusion takes 
care of properly importing the CSS Framework into component's sass file as well as setting theme values.  However.
if you require any of the functionality from the framework's JavaScript assets, then you will need to 
import that into your component's JavaScript.  For example, if you needed the `framework` object, you would
import that in your JS or JSX file like this: `import { framework } from '@wpmedia/news-theme-css/js/framework';`

#### Developing custom components in a separate repository
If you are developing your custom components in a separate repository, then as long as you have set 
up your blocks.json to use the css framework in the feature pack that will leverage your component repository, 
you still do not need to directly import the framework's sass files 
into your component's sass file.  However, you will need to add the CSS Framework as a dependency to your external 
component's package.json file. 

Note: When adding the dependency to package.json, ensure that it is the same version 
that you specify for `cssFramework` in blocks.json. 

If you require any of the functionality from the framework's 
JavaScript assets, then you will need to import that into your component's JavaScript.  
For example, if you needed the `framework` object, you would
import that in your JS or JSX file like this: `import { framework } from '@wpmedia/news-theme-css/js/framework';`
