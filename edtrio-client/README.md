# Edtr.io [![Version](https://img.shields.io/badge/version-2.2.0-black.svg?style=flat-square)](https://github.com/schul-cloud/edtrio/releases) [![Gitmoji](https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square)](https://gitmoji.carloscuesta.me)

<p align="center">
  <a href="#"><img src="./public/logo.png" /></a>
</p>

<p align="center">
  A rich text editor for easily creating content in schools based on <a href="https://github.com/ianstormtaylor/slate">Slate.js</a>.
</p>
<br/>

![Screenshot of Edtr.io in action](screenshot.png "Edtr.io in action")

> :rotating_light: Check it out here: https://schul-cloud.github.io/edtrio/

## Getting started

```shell
yarn install
yarn start
# go to localhost:3000 if it doesnt open automatically
```

## Features

- Hovering menu (**bold**, _italic_, <u>underline</u>, `code`, h1, h2)
- Markdown shortcuts (h1-h5 `#`, ul `-`, blockquotes `>`)
- Button to add Code Blocks
- Button to add Images
- Automatic audio/video link embed (Try pasting e.g. a [link to an mp3](http://www.jplayer.org/audio/mp3/TSP-01-Cro_magnon_man.mp3))
- Video integration (paste youtube/vimeo video link and it'll be auto-converted)

## Documentation

The docs can be found [here](https://edtrio-docs.netlify.com/).

## Contribute

We very much welcome any kinds of contributions! Have a look at our [issue tracker](https://github.com/schul-cloud/edtrio/issues) or [project board roadmap](https://github.com/schul-cloud/edtrio/projects/1) for inspiration.

- Issue Tracker: https://github.com/schul-cloud/edtrio/issues
- Source Code: https://github.com/schul-cloud/edtrio

For some tooling explanations and guidelines, please head on over to the [docs](https://edtrio-docs.netlify.com/).

## Deploying
The editor is deployed on https://schul-cloud.github.io/edtrio/.<br />
To deploy a new version simply run `yarn run deploy`.

## License

The project is licensed under the [MIT License](LICENSE).
