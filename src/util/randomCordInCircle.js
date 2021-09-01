const _ = require("lodash");

module.exports = ({ cord, radius }) => {
    const angle = _.random(0, Math.PI * 2);

    const cordX = cord[0] + Math.cos(angle) * radius;
    const cordY = cord[1] + Math.sin(angle) * radius;

    return [cordX, cordY];
};
