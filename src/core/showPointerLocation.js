const { Adb } = require("@devicefarmer/adbkit");

module.exports = async ({ device, show }) => {
    return await device
        .shell(`settings put system pointer_location ${+show}`)
        .then(Adb.util.readAll)
        .then((output) => {
            return output.toString().trim();
        });
};
