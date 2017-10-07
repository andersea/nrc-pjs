import * as NodeRED from 'node-red';
import Pusher = require('pusher-js');

type PusherConnection = Pusher.Pusher;

interface IPusherNodeProperties extends NodeRED.NodeProperties {
    cluster: string;
    appkey: string;
    channel: string;
    event: string;
}

interface ISubscriptionMessage {
    payload: ISubscriptionSpec | ISubscriptionSpec[];
}

interface ISubscriptionSpec {
    channel: string;
    event: string;
}

function isSubscriptionSpec(msg: any): msg is ISubscriptionSpec {
    return msg.channel && msg.event;
}

export = (RED: NodeRED.Red) => {
    function PusherNode(this: NodeRED.Node, props: IPusherNodeProperties) {
        RED.nodes.createNode(this, props);

        const connection = new Pusher(props.appkey, {
            cluster: props.cluster,
            encrypted: true
        });
        
        const subscribe = (subscriptionSpec: ISubscriptionSpec): void => {
            connection.subscribe(subscriptionSpec.channel).bind(subscriptionSpec.event, (data: any) => {
                this.send({
                    channel: subscriptionSpec.channel,
                    payload: data.hasOwnProperty('payload') ? data.payload : data,
                    topic: subscriptionSpec.event,
                });
            });
        }
        
        if (isSubscriptionSpec(props)) {
            subscribe(props);
        }

        this.on('input', (msg: ISubscriptionMessage) => {
            if (Array.isArray(msg.payload)) {
                msg.payload.filter(isSubscriptionSpec).forEach(val => {
                    subscribe(val);
                });
            } else {
                if (isSubscriptionSpec(msg.payload)) {
                    subscribe(msg.payload);
                }
            }
        });

        this.on('close', () => {
            connection.disconnect();
        })
    }
    
    RED.nodes.registerType('pusher', PusherNode);
}
