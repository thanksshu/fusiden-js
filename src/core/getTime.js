const { Adb } = require("@devicefarmer/adbkit");

module.exports = async ({ device }) => {
    return await device
        .shell(`echo $(date +\'%Y-%m-%d %H:%M:%S.000\')`)
        .then(Adb.util.readAll)
        .then((output) => {
            return output.toString().trim();
        });
};
