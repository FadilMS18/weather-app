const globals = require("globals");
const pluginJs = require("@eslint/js");


module.exports = [
  {files: ["./src/modules/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: { globals: globals.browser }},
  // pluginJs.configs.recommended,
  {
    rules:{
      semi: 'warn',
      "prefer-const": 'warn',
      "no-undef": 'warn',
      "no-unused-vars": 'warn',
    },
    ignores: ['eslint.config.js'],
  },
  
];