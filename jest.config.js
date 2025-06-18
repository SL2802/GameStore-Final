const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} */
module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Pra funcionar os imports usando @/
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // Pra rodar o mock global antes dos testes
};
