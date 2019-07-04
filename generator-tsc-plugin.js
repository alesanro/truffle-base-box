const { Truffle } = require("@laborx/typechain-truffle-target");

module.exports = ctx => {
  return new Truffle(ctx);
};
