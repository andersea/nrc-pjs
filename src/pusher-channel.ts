import { Node, Red } from 'node-red';
import { IPusherChannelNodeProperties, IPusherSocketConfigNode } from './pusher-common';

export = (RED: Red) => {
    RED.nodes.registerType('pusher-channel', function (this: Node, props: IPusherChannelNodeProperties) {
        RED.nodes.createNode(this, props);

        const configNode = RED.nodes.getNode(props.config) as IPusherSocketConfigNode;
        if (configNode) {
            const channel = configNode.connection.subscribe(props.channel);
            const eventHandler = (data: any) => {
                const msg = {
                    channel: props.channel,
                    payload: data.hasOwnProperty('payload') ? data.payload : data,
                    topic: props.event,
                };
                this.send(msg);
            };
            channel.bind(props.event, eventHandler);

            this.on('close', () => {
                channel.unbind(props.event, eventHandler);
                configNode.connection.unsubscribe(props.channel);
            })
        } else {
            this.error('Connection not configured');
        }
    });
};
