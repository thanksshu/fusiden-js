const { Adb } = require("@devicefarmer/adbkit");
const EventEmitter = require("events");
const _ = require("lodash");
const util = require("util");

const _getPid = require("./core/getPid");
const _getTime = require("./core/getTime");
const _touchDown = require("./core/touchDown");
const _touchUp = require("./core/touchUp");
const _touchMove = require("./core/touchMove");
const _quitMonkey = require("./core/quitMonkey");
const _showPointerLocation = require("./core/showPointerLocation");

module.exports = class GFBot extends EventEmitter {
    constructor({ id }) {
        super();
        const client = Adb.createClient();
        this.device = client.getDevice(id);
    }

    async connect() {
        this.logcat = await this.openLogcat();
        this.monkey = await this.device.openMonkey();
        this.emit("connect");
    }

    async close() {
        this.logcat.end();
        await _quitMonkey({ monkey: this.monkey });
        this.emit("close");
    }

    async getPid() {
        return await _getPid({
            device: this.device,
            package: "com.sunborn.girlsfrontline.cn",
        });
    }

    async getTime() {
        return await _getTime({ device: this.device }).then((date) => {
            return new Date(date).getTime();
        });
    }

    async openLogcat() {
        const logcat = await this.device.openLogcat({ clear: true });
        const date = await this.getTime();
        const pid = await this.getPid();
        logcat.on("entry", (entry) => {
            // filter entrys
            entry.date = new Date(entry.date).getTime();
            if (
                entry.pid == pid &&
                entry.tag == "Unity" &&
                entry.date >= date
            ) {
                // emit message event
                this.emit("message", entry.message);
            }
        });
        return logcat;
    }

    async showPointerLocation({ show }) {
        await _showPointerLocation({ device: this.device, show: show });
    }

    async touchDown({ cord }) {
        await _touchDown({ monkey: this.monkey, cord: cord });
    }

    async touchUp({ cord }) {
        await _touchUp({ monkey: this.monkey, cord: cord });
    }
    async touchMove({ cord }) {
        await _touchMove({ monkey: this.monkey, cord: cord });
    }

    async tap({ cord, time = 50 }) {
        await this.touchDown(cord);
        await util.promisify(setTimeout)(time);
        await this.touchUp(cord);
    }

    async slide({ cordTime }) {
        for (const [index, obj] of cordTime.entries()) {
            // first point touch down
            if (index == 0) {
                await this.touchDown({ cord: obj.cord });
                await util.promisify(setTimeout)(obj.time);
                continue;
            }
            // last point touch up
            if (index == cordTime.length - 1) {
                await this.touchUp({ cord: obj.cord });
                await util.promisify(setTimeout)(obj.time);
                continue;
            }
            // touch move
            await this.touchMove({ cord: obj.cord });
            await util.promisify(setTimeout)(obj.time);
            continue;
        }
    }
};
