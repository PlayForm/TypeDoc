"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionDefaults =
	exports.ParameterHint =
	exports.ParameterType =
	exports.EmitStrategy =
	exports.CommentStyle =
	exports.TSConfigReader =
	exports.TypeDocReader =
	exports.PackageJsonReader =
	exports.ArgumentsReader =
	exports.Option =
	exports.Options =
		void 0;
var options_1 = require("./options");
Object.defineProperty(exports, "Options", {
	enumerable: true,
	get: function () {
		return options_1.Options;
	},
});
Object.defineProperty(exports, "Option", {
	enumerable: true,
	get: function () {
		return options_1.Option;
	},
});
var readers_1 = require("./readers");
Object.defineProperty(exports, "ArgumentsReader", {
	enumerable: true,
	get: function () {
		return readers_1.ArgumentsReader;
	},
});
Object.defineProperty(exports, "PackageJsonReader", {
	enumerable: true,
	get: function () {
		return readers_1.PackageJsonReader;
	},
});
Object.defineProperty(exports, "TypeDocReader", {
	enumerable: true,
	get: function () {
		return readers_1.TypeDocReader;
	},
});
Object.defineProperty(exports, "TSConfigReader", {
	enumerable: true,
	get: function () {
		return readers_1.TSConfigReader;
	},
});
var declaration_1 = require("./declaration");
Object.defineProperty(exports, "CommentStyle", {
	enumerable: true,
	get: function () {
		return declaration_1.CommentStyle;
	},
});
Object.defineProperty(exports, "EmitStrategy", {
	enumerable: true,
	get: function () {
		return declaration_1.EmitStrategy;
	},
});
Object.defineProperty(exports, "ParameterType", {
	enumerable: true,
	get: function () {
		return declaration_1.ParameterType;
	},
});
Object.defineProperty(exports, "ParameterHint", {
	enumerable: true,
	get: function () {
		return declaration_1.ParameterHint;
	},
});
var defaults_1 = require("./defaults");
Object.defineProperty(exports, "OptionDefaults", {
	enumerable: true,
	get: function () {
		return defaults_1.OptionDefaults;
	},
});