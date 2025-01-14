"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitUnquotedString =
	exports.VarianceModifier =
	exports.TypeParameterReflection =
	exports.SignatureReflection =
	exports.ReflectionSymbolId =
	exports.ReferenceReflection =
	exports.ProjectReflection =
	exports.ParameterReflection =
	exports.ReflectionKind =
	exports.DocumentReflection =
	exports.DeclarationReflection =
	exports.ContainerReflection =
	exports.TraverseProperty =
	exports.ReflectionFlags =
	exports.ReflectionFlag =
	exports.Reflection =
		void 0;
var abstract_1 = require("./abstract");
Object.defineProperty(exports, "Reflection", {
	enumerable: true,
	get: function () {
		return abstract_1.Reflection;
	},
});
Object.defineProperty(exports, "ReflectionFlag", {
	enumerable: true,
	get: function () {
		return abstract_1.ReflectionFlag;
	},
});
Object.defineProperty(exports, "ReflectionFlags", {
	enumerable: true,
	get: function () {
		return abstract_1.ReflectionFlags;
	},
});
Object.defineProperty(exports, "TraverseProperty", {
	enumerable: true,
	get: function () {
		return abstract_1.TraverseProperty;
	},
});
var container_1 = require("./container");
Object.defineProperty(exports, "ContainerReflection", {
	enumerable: true,
	get: function () {
		return container_1.ContainerReflection;
	},
});
var declaration_1 = require("./declaration");
Object.defineProperty(exports, "DeclarationReflection", {
	enumerable: true,
	get: function () {
		return declaration_1.DeclarationReflection;
	},
});
var document_1 = require("./document");
Object.defineProperty(exports, "DocumentReflection", {
	enumerable: true,
	get: function () {
		return document_1.DocumentReflection;
	},
});
var kind_1 = require("./kind");
Object.defineProperty(exports, "ReflectionKind", {
	enumerable: true,
	get: function () {
		return kind_1.ReflectionKind;
	},
});
var parameter_1 = require("./parameter");
Object.defineProperty(exports, "ParameterReflection", {
	enumerable: true,
	get: function () {
		return parameter_1.ParameterReflection;
	},
});
var project_1 = require("./project");
Object.defineProperty(exports, "ProjectReflection", {
	enumerable: true,
	get: function () {
		return project_1.ProjectReflection;
	},
});
var reference_1 = require("./reference");
Object.defineProperty(exports, "ReferenceReflection", {
	enumerable: true,
	get: function () {
		return reference_1.ReferenceReflection;
	},
});
var ReflectionSymbolId_1 = require("./ReflectionSymbolId");
Object.defineProperty(exports, "ReflectionSymbolId", {
	enumerable: true,
	get: function () {
		return ReflectionSymbolId_1.ReflectionSymbolId;
	},
});
var signature_1 = require("./signature");
Object.defineProperty(exports, "SignatureReflection", {
	enumerable: true,
	get: function () {
		return signature_1.SignatureReflection;
	},
});
var type_parameter_1 = require("./type-parameter");
Object.defineProperty(exports, "TypeParameterReflection", {
	enumerable: true,
	get: function () {
		return type_parameter_1.TypeParameterReflection;
	},
});
Object.defineProperty(exports, "VarianceModifier", {
	enumerable: true,
	get: function () {
		return type_parameter_1.VarianceModifier;
	},
});
var utils_1 = require("./utils");
Object.defineProperty(exports, "splitUnquotedString", {
	enumerable: true,
	get: function () {
		return utils_1.splitUnquotedString;
	},
});
