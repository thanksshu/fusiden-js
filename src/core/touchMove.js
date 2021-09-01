module.exports = async ({ monkey, cord }) =>
    new Promise((resolve, reject) => {
        monkey.touchMove(...cord, (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
