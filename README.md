# Infinite Craft Multiplayer - Chrome Extension

This is a Chrome extension that adds a multiplayer feature to the game [Infinite Craft](https://neal.fun/infinite-craft/). (this also works in Edge) This extension is not completely functional, just proof of concept, but it's open to PR and Issues and if Neal (the game developer) wants, a partnership!

I've created an insightful blog post about how I created this extension. You can read it [here](https://dev.to/vtnorton/how-i-made-infinite-craft-a-multiplayer-game-with-a-few-lines-of-code-4ne7) and it contains details of what needs to be done, and how stuff was made.

## Installation

1. Clone this repository
2. Install the dependencies with `yarn install`
3. Create a [SuperViz account](https://superviz.com/?origin=infinite-craft) and get your API key
4. Use the file `env.sample.ts` to create a new file called `env.ts` with your API key
5. Make sure to add `neal.fun` as a whitelist domain on the [SuperViz dashboard](https://dashboard.superviz.com/developer).
6. Use the command `yarn build` to build the extension
7. Open Chrome and go to `chrome://extensions/`
8. Enable "Developer mode" in the top right corner
9. Click "Load unpacked" and select the folder `dist` in this repository
10. Open [Infinite Craft](https://neal.fun/infinite-craft/) and start playing!

## How to develop

Use the same steps as the installation, but instead of using `yarn build`, use `yarn dev` to start the development server. This will automatically build the extension when you make changes to the code.

You will need to reload the extension in Chrome every time you make changes to the code.

## Known Issues & What needs to work

- The IDs of the instances can be duplicated because the way the game generates is a sequential one. This means that if someone creates an instance on Participant-A it will receive an instance-10 id. If a new element by Participant-A is created it will be intance-11. The problem with this is that for every other participant in a room (Participant-B, Participant-C), the extension will create an instance-10 element, but this is not game-generated so if any of these participants create a new thing, guess what the id will be? Another instance-10. There are ways to fix this but having a partnership with the developer would be incredible.
- When the extension is enabled... when I use other web pages, it won't let me scroll through their content. And I'm not aware why... perhaps because it's loading the CSS on every page hehehe (haven't debugged it yet)

## Contributing

Feel free to contribute to this project. You can open an issue or create a pull request.

## License

This repository is licensed under the MIT License. But the game is not mine, so you should check the game's license before using this extension.
