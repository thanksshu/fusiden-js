const _ = require("lodash");

module.exports = ({ cordFirst, cordSecond }) => {
    const maxX = Math.max(cordFirst[0], cordSecond[0]);
    const maxY = Math.max(cordFirst[1], cordSecond[1]);
    const minX = Math.min(cordFirst[0], cordSecond[0]);
    const minY = Math.min(cordFirst[1], cordSecond[1]);

    const cordX = _.random(maxX, minX);
    const cordY = _.random(maxY, minY);

    return [cordX, cordY];
};
