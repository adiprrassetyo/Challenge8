const migrator = require("./migrator");

jest.setTimeout(20000);

describe("test migrator", () => {
    // beforeEach(async () => {
    //     return migrator()
    // })

    it("test", (done) => {
        migrator().then(done).catch(done)
    });
});
