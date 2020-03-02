module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint"
  ],
  plugins: ["react", "react-hooks", "@typescript-eslint"],
  rules: {
    semi: ["error", "always"],
    "space-before-function-paren": [
      "error",
      { anonymous: "never", named: "never", asyncArrow: "always" }
    ],
    "react/prop-types": [2],
    "react/jsx-uses-react": [1],
    "react/jsx-uses-vars": [2],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/prefer-interface": "off",
    "@typescript-eslint/no-empty-interface": "off"
  },
  parser: "@typescript-eslint/parser",
  env: { es6: true },
  settings: {
    react: {
      version: "detect"
    }
  }
};
