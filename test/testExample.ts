import { assert } from "chai";

contract("Test", accounts => {
  describe("test describe", async () => {
    it("1+1", async () => {
      assert.equal(1, 2 - 1);
    });
  });
});
