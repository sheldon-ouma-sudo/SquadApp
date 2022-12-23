module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  rules: {
    /* eslint-disable no-unused-vars */
    quotes: ["off", "double"],
    /* eslint-enable no-unused-vars */
  },
};
