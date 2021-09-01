module.exports = async ({ monkey, cord }) =>
    new Promise((resolve, reject) => {
        monkey.touchUp(...cord, (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
