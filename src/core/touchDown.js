module.exports = async ({ monkey, cord }) =>
    new Promise((resolve, reject) => {
        monkey.touchDown(...cord, (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
