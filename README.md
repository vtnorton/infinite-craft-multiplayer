# Infinite Craft Multiplayer - Chrome Extension

This is a Chrome extension that adds a multiplayer feature to the game [Infinite Craft](https://neal.fun/infinite-craft/). (this also works in Edge)

## Installation

1. Clone this repository
2. Install the dependencies with `yarn install`
3. Create a [SuperViz account](https://superviz.com/?origin=infinite-craft) and get your API key
4. Use the file `env.sample.ts` to create a new file called `env.ts` with your API key
5. Use the command `yarn build` to build the extension
6. Open Chrome and go to `chrome://extensions/`
7. Enable "Developer mode" in the top right corner
8. Click "Load unpacked" and select the folder `dist` in this repository
9. Open [Infinite Craft](https://neal.fun/infinite-craft/) and start playing!

## How to develop

Use the same steps as the installation, but instead of using `yarn build`, use `yarn dev` to start the development server. This will automatically build the extension when you make changes to the code.

You will need to reload the extension in Chrome every time you make changes to the code.

## How it works

I've created an insightful blog post about how I created this extension. You can read it [here](/).

## License

This repository is licensed under the MIT License. But the game is not mine, so you should check the game's license before using this extension.
