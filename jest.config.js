const { pathsToModuleNameMapper } = require("ts-jest/utils");
const tsconfig = require("./tsconfig.json");

module.exports = {
    preset: "ts-jest",
    moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths)
};
