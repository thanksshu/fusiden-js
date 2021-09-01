const { Adb } = require("@devicefarmer/adbkit");

module.exports = async ({ device, package }) => {
    return await device
        .shell(`pidof -s ${package}`)
        .then(Adb.util.readAll)
        .then((output) => {
            return output.toString().trim();
        });
};
