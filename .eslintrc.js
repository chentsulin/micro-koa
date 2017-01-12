module.exports = {
  parser: 'babel-eslint',
  extends: [
    'airbnb-base',
  ],
  env: {
    node: true,
    jest: true,
  },
  rules: {
    'no-param-reassign': 'off',
  },
};
