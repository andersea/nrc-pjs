# aea-nrc-pjs

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

> aea-nrc-pjs

This node provides a connection to [pusher.com](https://pusher.com) websocket service. The node uses the official pusher.com api and reuses a single connection for all channels.

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

Warning: This is unofficial alpha stuff, mainly for my own use. I refactor and make breaking changes as I feel I need to. Don't use this unless you are prepared to fix serious workflow breakage.

Add the new pusher node to your workflow from the social category and open the node properties. Add a connection the appropriate app key. You can select another cluster if the application you are connecting to is hosted on another cluster than the default. You also have the option of naming the connection.

Subscriptions can be made either by configuring the channel and event name in the node properties, but also by sending a message to the node with this payload shape:

<<<<<<< HEAD
```
=======
´´´
>>>>>>> 0fd6b7b494aa8e7d99d4a4ad44a2fc38b43958db
{
    "channel": "channelname",
    "event": "eventname"
}
```

Both methods are possible on the same node. It is also possible to send an array of objects with the above shape to subscribe to multiple channels at the same time.


## Maintainers

[@andersea](https://github.com/andersea)

## Contribute

PRs accepted.

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

MIT © 2017 Anders E. Andersen
