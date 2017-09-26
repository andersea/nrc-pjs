# aea-nrc-pjs

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

> aea-nrc-pjs

These nodes provides a connection to [pusher.com](https://pusher.com) websocket service. These nodes use the official pusher.com api and reuse a single connection for all channels.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Maintainers](#maintainers)
- [Contribute](#contribute)
- [License](#license)

## Install

In your Node-RED user folder (usually ~/.node-red):
```
> npm install aea-nrc-pjs
```

## Usage

Add the new pusher channel node to your workflow and open the node properties. Add a connection configuration using the appropriate app key. You can select another cluster if the application you are connecting to is hosted on another cluster than the default. You also have the option of naming the connection.

On the channel node, specify the channel you are connecting to and the event you are pulling data from.

## Maintainers

[@andersea](https://github.com/andersea)

## Contribute

PRs accepted.

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

MIT © 2017 Anders E. Andersen
