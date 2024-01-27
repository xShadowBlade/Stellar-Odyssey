/**
 * @file ESLint configuration file.
 */

/**
 * @type {import("eslint").Linter.Config.rules}
 */
// eslint-disable-next-line
const rules = require("../../template-defaults/eslintrules.json");

/**
 * @type {import("eslint").Linter.Config}
 */
const options = {
    "extends": [
        "eslint:recommended",
        "prettier",
        "plugin:react/recommended",
        "react-app",
        "plugin:jsdoc/recommended-typescript",
        "plugin:@typescript-eslint/recommended",
    ],
    "env": {
        "node": true,
        "browser": true,
        "es6": true,
    },
    "parserOptions": {
        "sourceType": "module",
        "ecmaVersion": "latest",
    },
    "parser": "@typescript-eslint/parser",
    "rules": rules,
};
module.exports = options;