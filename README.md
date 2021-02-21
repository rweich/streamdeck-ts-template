# streamdeck-ts-template

A template repository for creating streamdeck plugins in typescript using the [streamdeck-ts](https://github.com/rweich/streamdeck-ts) library.

Includes / Uses
- eslint / prettier to make the code look nice
- webpack to build / bundle the plugin
- semantic-release to automatically create and release a package ready to be installed by the streamdeck software

## Usage

### Start
- Fork this repository.

### Init
To install all the packages necessary run:
```shell
yarn install
```

### Create
- overwrite the example code in the [plugin.ts](./src/plugin.ts)
  - make sure the plugin instance is exported as default export
- add your code in the [propertyinspector.ts](./src/propertyinspector.ts) (if you want a propertyinspector)
  - make sure the propertyinspector instance is exported as default export

### Configure
- Open the [manifest.json](assets/manifest.json) file and apply the configuration based on the [documentation](https://developer.elgato.com/documentation/stream-deck/sdk/manifest/):
  - Note: no need to set the _Version_ as that'll be done by the release workflow
- add / change all the necessary icons to the [images](./assets/images) directory
- if you dont need a propertyinspector -> remove the _PropertyInspectorPath_ from the manifest

### Build
Build the development-version of the plugin with:
```shell
yarn build
```
The resulting directory created in the dist directory can be copied into your streamdeck plugin folder as described in the [documentation](https://developer.elgato.com/documentation/stream-deck/sdk/create-your-own-plugin/).

### Release
Start the release by manually by executing the [release workflow](.github/workflows/release.yml) in your github actions.
This will use the current state of the main branch to create a plugin-archive that can be installed using the streamdeck software.

## Links
[Official Streamdeck developer documentation.](https://developer.elgato.com/documentation/)

[Example implementaition of the NumberDisplay-plugin using this template.]()
