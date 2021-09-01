module.exports = function generateDrag({
    cordStart,
    cordEnd,
    segTime = 50,
    segCount = 20,
}) {
    const distenceX = cordEnd[0] - cordStart[0];
    const distenceY = cordEnd[1] - cordStart[1];
    const vInitX = (2 * distenceX) / (segCount * segTime);
    const vInitY = (2 * distenceY) / (segCount * segTime);
    const aX = -vInitX / (segCount * segTime);
    const aY = -vInitY / (segCount * segTime);

    let result = [];

    result.push({ cord: cordStart, time: segTime });
    for (let index = 1; index < segCount; index++) {
        let CordX =
            cordStart[0] +
            (vInitX + (aX * segTime * index) / 2) * segTime * index;
        let CordY =
            cordStart[1] +
            (vInitY + (aY * segTime * index) / 2) * segTime * index;
        result.push({
            cord: [Math.round(CordX), Math.round(CordY)],
            time: segTime,
        });
    }
    result.push({ cord: cordEnd, time: segTime });

    return result;
};
