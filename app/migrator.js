const { exec } = require("child_process");

module.exports = async () => {
    return new Promise((resolve) => {
        exec("npm run db:migrate", {env: process.env}, () => {
            exec("npm run db:seed", {env: process.env}, () => {
                resolve();
            });
        });
    });
};