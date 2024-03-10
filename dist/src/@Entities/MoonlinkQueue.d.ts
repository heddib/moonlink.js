import { MoonlinkDatabase, MoonlinkManager, MoonlinkTrack } from "../..";
export declare class MoonlinkQueue {
    db: MoonlinkDatabase;
    private guildId;
    private manager;
    constructor(manager: MoonlinkManager, guildId: string);
    add(data: MoonlinkTrack, position?: number): void;
    has(identifier: string): boolean;
    first(): any;
    shift(): any;
    unshift(data: any): void;
    push(data: any): void;
    pop(): any;
    clear(): boolean;
    get size(): number;
    shuffle(): boolean;
    remove(position: number): boolean;
    get all(): any;
    getQueue(): MoonlinkTrack[];
    setQueue(queue: MoonlinkTrack[]): void;
}
