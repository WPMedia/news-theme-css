# Theme CSS
## Overview
This is the CSS framework for the Fusion News Theme that provides the foundation CSS for the news theme. The main responsibilities of this CSS framework are as follow:
- A CSS grid layout framework (with flexbox fallback for older browsers)
- CSS reset
- Typography
- Breakpoints and spacing
- Utility Sass functions (i.e. convert px to rems, etc.)

### Getting Started:
To use Theme CSS within a feature pack repository, it must be configurerd through a file in the root of the repo called `blocks.json`. This is a file that Fusion (Hydrate versions) knows to
look for and run specific internal build commands to bring everything
together.

Below describes the various properties related to the Theme CSS that are in blocks.json and their
purpose:

| **Property**   |  **Description** |
|---|---|
| **cssFramework** |  The CSS framework package being used. For News theme, it is the news-theme-css package. |
| **cssImport**   |  Specifies the main Sass file entry point into the framework. This is leveraged by fusion to automatically import the framework into each of the block's source file in fusion-news-theme-blocks during build time. So, in other words, you do not have to explicitly import the css framework in your blocks source code. |
| **sassImport**   |  Specifies the entry point for the Sass variables from the cssframework so that these variables can be leveraged in custom CSS for a consistent look and feel. |
| **sassVariableOverrides**   | In addition to using styled components to set theme properties, we also want the css framework to pick up on the custom settings and over-ride the appropriate Sass default properties. Fusion handles the override process internally.  |
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