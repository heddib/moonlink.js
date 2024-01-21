import { MoonlinkDatabase, MoonlinkManager, MoonlinkTrack } from "../..";
export declare class MoonlinkQueue {
    db: MoonlinkDatabase;
    private guildId;
    private manager;
    constructor(manager: MoonlinkManager, data: {
        guildId: string;
    });
    add(data: MoonlinkTrack, position?: number): void;
    has(identifier: string): boolean;
    first(): any;
    shift(): any;
    push(data: any): void;
    clear(): boolean;
    get size(): number;
    remove(position: number): boolean;
    get all(): any;
    getQueue(): MoonlinkTrack[];
    setQueue(queue: MoonlinkTrack[]): void;
}
