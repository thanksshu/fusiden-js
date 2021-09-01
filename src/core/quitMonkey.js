module.exports = async ({ monkey }) =>
    new Promise((resolve, reject) => {
        monkey.quit((err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
