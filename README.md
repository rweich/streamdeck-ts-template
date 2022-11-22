# streamdeck-ts-template

![Build/Test](https://github.com/rweich/streamdeck-ts-template/workflows/Build%2FTest/badge.svg)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Frweich%2Fstreamdeck-ts-template.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Frweich%2Fstreamdeck-ts-template?ref=badge_shield)

A template repository for creating streamdeck plugins in typescript using the [streamdeck-ts](https://github.com/rweich/streamdeck-ts) library.

## Easily start building your own streamdeck plugins

This template gives you a fully configured initial setup to help you get started coding your own stremdeck plugin.
No need to worry about how to talk to the streamdeck or how to build and bundle everything together.

### Includes
- a streamdeck-sdk that lets you **easily communicate with the streamdeck**
- a fully configured build environment to **automatically create a package ready to be installed** by the streamdeck software

## Usage / Setup

### Start
- Fork this repository
- delete the CHANGELOG.md (it will be re-created by the release process)
- replace `rweich/streamdeck-ts-template` in the repository.url node in `package.json` with your repository name
  - modify the name / description / author as well
- modify the contents of the README.md file to your liking

### Init
To install all the packages necessary run:
```shell
yarn install
```

### Create / Code
- overwrite the example code in the [Plugin.ts](src/Plugin.ts)
  - make sure the plugin instance keeps being exported as default export
- add your code in the [Propertyinspector.ts](src/Propertyinspector.ts) (if you want a propertyinspector)
  - make sure the propertyinspector instance keeps being exported as default export

### Configure
- Open the [manifest.json](assets/manifest.json) file and apply the configuration based on the [documentation](https://developer.elgato.com/documentation/stream-deck/sdk/manifest/):
  - Note: no need to set the `Version` as that'll be done by the release workflow
- add / change all the necessary icons to the [images](./assets/images) directory
- if you don't need a propertyinspector -> remove `PropertyInspectorPath` from the manifest

### Build
Build the development-version of the plugin with:
```shell
yarn build
```
The resulting directory created in the dist directory can be copied into your streamdeck plugin folder as described in the [documentation](https://developer.elgato.com/documentation/stream-deck/sdk/create-your-own-plugin/).

### Release
Start the release by manually by executing the [release workflow](.github/workflows/release.yml) in your GitHub actions.
This will use the current state of the main branch to create a plugin-archive that can be installed using the streamdeck software.

## Misc

### Eslint / Prettier

This packages comes with eslint / prettier and [my](https://github.com/rweich/eslint-config) [own](https://github.com/rweich/prettier-config) very opinionated configuration.

If you don't want to use that, remove the `@rweich/eslint-config` and `@rweich/prettier-config` packages. Then remove the `eslintConfig` and `prettier` keys in `package.json`.

## Links

- Example implementation of the [NumberDisplay-plugin using this template.](https://github.com/rweich/streamdeck-ts-numberdisplay)
- [streamdeck-formbuilder](https://github.com/rweich/streamdeck-formbuilder) to programmatically build forms for the property inspector
- [Official Streamdeck developer documentation.](https://developer.elgato.com/documentation/)


## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Frweich%2Fstreamdeck-ts-template.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Frweich%2Fstreamdeck-ts-template?ref=badge_large)
