import { Node, Red } from 'node-red';
import { IPusherChannelNodeProperties, IPusherSocketConfigNode } from './pusher-common';

export = (RED: Red) => {
    RED.nodes.registerType('pusher-channel', function (this: Node, props: IPusherChannelNodeProperties) {
        RED.nodes.createNode(this, props);

        const configNode = RED.nodes.getNode(props.config) as IPusherSocketConfigNode;
        if (configNode) {
            props.channels.split(',').map(x => x.trim()).map(channelName => {
                const channel = configNode.connection.subscribe(channelName);
                const eventHandler = (data: any) => {
                    const msg = {
                        channel: channelName,
                        payload: data.hasOwnProperty('payload') ? data.payload : data,
                        topic: props.event,
                    };
                    this.send(msg);
                };
                channel.bind(props.event, eventHandler);

                this.on('close', () => {
                    channel.unbind(props.event, eventHandler);
                    configNode.connection.unsubscribe(channelName);
                });
            });
        } else {
            this.error('Connection not configured');
        }
    });
};
