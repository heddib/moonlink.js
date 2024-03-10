"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoonlinkQueue = void 0;
const __1 = require("../..");
class MoonlinkQueue {
    db = __1.Structure.db;
    guildId;
    manager;
    constructor(manager, guildId) {
        if (!manager || !guildId) {
            throw new Error("[ @Moonlink/Queue ]: Invalid constructor arguments");
        }
        this.guildId = guildId;
        this.manager = __1.Structure.manager;
    }
    add(data, position) {
        if (!data)
            throw new Error('[ @Moonlink/Queue ]: "data" option is empty');
        let queue = this.getQueue();
        position =
            position !== undefined && position >= 1
                ? position - 1
                : queue.length;
        if (position < 0 || position > queue.length) {
            throw new Error("@Moonlink(Queue) - Invalid position specified");
        }
        queue.splice(position, 0, data);
        this.setQueue(queue);
    }
    has(identifier) {
        if (!identifier || typeof identifier !== "string") {
            throw new Error("@Moonlink(Queue) - Invalid identifier specified");
        }
        const queue = this.getQueue();
        return queue.some(track => track.identifier === identifier);
    }
    first() {
        const queue = this.getQueue();
        return queue.length > 0 ? queue[0] : null;
    }
    shift() {
        let queue = this.getQueue();
        if (!queue.length)
            return null;
        let track = queue.shift();
        this.setQueue(queue);
        return track;
    }
    unshift(data) {
        let queue = this.getQueue();
        queue.unshift(data);
        this.setQueue(queue);
    }
    push(data) {
        let queue = this.getQueue();
        queue.push(data);
        this.setQueue(queue);
    }
    pop() {
        let queue = this.getQueue();
        if (!queue.length)
            return null;
        let track = queue.pop();
        this.setQueue(queue);
        return track;
    }
    clear() {
        const queue = this.getQueue();
        if (queue.length > 0) {
            this.setQueue([]);
            return true;
        }
        return false;
    }
    get size() {
        return this.getQueue().length;
    }
    shuffle() {
        const currentQueue = this.all;
        for (let i = currentQueue.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [currentQueue[i], currentQueue[j]] = [
                currentQueue[j],
                currentQueue[i]
            ];
        }
        this.setQueue(currentQueue);
        return true;
    }
    remove(position) {
        if (!position || typeof position !== "number" || position < 1) {
            throw new Error("[ @Moonlink/Queue ]: Invalid position specified");
        }
        const queue = this.getQueue();
        if (position > queue.length) {
            throw new Error("[ @Moonlink/Queue ]: Position exceeds queue length");
        }
        queue.splice(position - 1, 1);
        this.setQueue(queue);
        return true;
    }
    get all() {
        return this.getQueue();
    }
    getQueue() {
        return this.db.get(`queue.${this.guildId}`) || [];
    }
    setQueue(queue) {
        this.db.set(`queue.${this.guildId}`, queue);
    }
}
exports.MoonlinkQueue = MoonlinkQueue;
