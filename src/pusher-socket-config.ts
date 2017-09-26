import { Red } from 'node-red';
import * as Pusher from 'pusher-js';
import { IPusherSocketConfigNode, IPusherSocketConfigNodeProperties } from './pusher-common';

export = (RED: Red) => {
    RED.nodes.registerType('pusher-socket-config', function (this: IPusherSocketConfigNode, props: IPusherSocketConfigNodeProperties) {
        RED.nodes.createNode(this, props);
        this.appKey = props.appkey;
        this.cluster = props.cluster;
        this.connection = new Pusher(this.appKey, {
            cluster: this.cluster,
            encrypted: true
        });
    });
};
