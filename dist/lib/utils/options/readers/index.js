"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeDocReader =
	exports.TSConfigReader =
	exports.PackageJsonReader =
	exports.ArgumentsReader =
		void 0;
var arguments_1 = require("./arguments");
Object.defineProperty(exports, "ArgumentsReader", {
	enumerable: true,
	get: function () {
		return arguments_1.ArgumentsReader;
	},
});
var package_json_1 = require("./package-json");
Object.defineProperty(exports, "PackageJsonReader", {
	enumerable: true,
	get: function () {
		return package_json_1.PackageJsonReader;
	},
});
var tsconfig_1 = require("./tsconfig");
Object.defineProperty(exports, "TSConfigReader", {
	enumerable: true,
	get: function () {
		return tsconfig_1.TSConfigReader;
	},
});
var typedoc_1 = require("./typedoc");
Object.defineProperty(exports, "TypeDocReader", {
	enumerable: true,
	get: function () {
		return typedoc_1.TypeDocReader;
	},
});
