module.exports = {
  preset: 'ts-jest',
  transform: {
    ".(ts|tsx)": "<rootDir>/node_modules/ts-jest/preprocessor.js"
  },
  testEnvironment: "node",
  testRegex: "(/tests/.*)\\.(ts|tsx|js)$",
  moduleFileExtensions: ["ts", "tsx", "js"]
};