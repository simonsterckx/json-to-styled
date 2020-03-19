module.exports = {
  moduleFileExtensions: ["js", "jsx", "json"],
  transform: {
    "^.+\\.js$": "babel-jest"
  },

  testMatch: [
    "<rootDir>/(tests/**/*.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx))"
  ],
  transformIgnorePatterns: ["<rootDir>/node_modules/"]
};
