import * as NodeRED from 'node-red';
import Pusher = require('pusher-js');

type PusherConnection = Pusher.Pusher;

interface IPusherNodeProperties extends NodeRED.NodeProperties {
    cluster: string;
    appkey: string;
    channel: string;
    event: string;
}

export = (RED: NodeRED.Red) => {
    class PusherNode implements NodeRED.NodeOutputMixin, NodeRED.NodeInputMixin {
        public send: (msg?: any) => void;
        public on: (event: string | symbol, listener: (...args: any[]) => void) => this;

        private connection: PusherConnection;
        private subscriptions: ISubscription[] = [];

        constructor(props: IPusherNodeProperties) {
            RED.nodes.createNode(this, props);
            this.connection = this.connect(props.appkey, props.cluster);
            if (isSubscriptionSpec(props)) {
                this.subscriptions.push(this.subscribe(props));
            }
            this.on('input', (msg: ISubscriptionMessage) => {
                if (Array.isArray(msg.payload)) {
                    msg.payload.filter(isSubscriptionSpec).forEach(val => {
                        this.subscriptions.push(this.subscribe(val));
                    });
                } else {
                    if (isSubscriptionSpec(msg.payload)) {
                        this.subscriptions.push(this.subscribe(msg.payload));
                    }
                }
            })
            this.on('close', () => {
                this.subscriptions.forEach(this.unsubscribe)
                this.connection.disconnect();
            })
        }

        private connect(appKey: string, cluster: string): PusherConnection {
            return new Pusher(appKey, {
                cluster,
                encrypted: true
            });
        }

        private subscribe(subscriptionSpec: ISubscriptionSpec): ISubscription {
            const channel = this.connection.subscribe(subscriptionSpec.channel);
            const eventHandler = (data: any) => {
                const msg = {
                    channel: subscriptionSpec.channel,
                    payload: data.hasOwnProperty('payload') ? data.payload : data,
                    topic: subscriptionSpec.event,
                };
                this.send(msg);
            }
            channel.bind(subscriptionSpec.event, eventHandler);
            return {
                channel,
                event: subscriptionSpec.event,
                eventHandler
            };
        }

        private unsubscribe(subscription: ISubscription): void {
            subscription.channel.unbind(subscription.event, subscription.eventHandler);
            this.connection.unsubscribe(subscription.channel.name);
        }

    }
    RED.nodes.registerType('pusher', PusherNode);
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

interface ISubscription {
    channel: Pusher.Channel;
    event: string;
    eventHandler: (data: any) => void;
}

