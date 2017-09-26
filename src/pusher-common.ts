import { Node, NodeId, NodeProperties } from 'node-red';
import { Pusher } from 'pusher-js';

export interface IPusherSocketConfigNode extends Node {
    connection: Pusher;
    cluster: string;
    appKey: string;
}

export interface IPusherSocketConfigNodeProperties extends NodeProperties {
    appkey: string;
    cluster: string;
}

export interface IPusherChannelNodeProperties extends NodeProperties {
    config: NodeId;
    channel: string;
    event: string;
}