"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
exports.createAppForTesting = createAppForTesting;
const Path = __importStar(require("path"));
const typescript_1 = __importDefault(require("typescript"));
const index_1 = require("./converter/index");
const renderer_1 = require("./output/renderer");
const serialization_1 = require("./serialization");
const index_2 = require("./utils/index");
const component_1 = require("./utils/component");
const utils_1 = require("./utils");
const array_1 = require("./utils/array");
const assert_1 = require("assert");
const entry_point_1 = require("./utils/entry-point");
const paths_1 = require("./utils/paths");
const general_1 = require("./utils/general");
const exports_1 = require("./validation/exports");
const documentation_1 = require("./validation/documentation");
const links_1 = require("./validation/links");
const application_events_1 = require("./application-events");
const tsconfig_1 = require("./utils/tsconfig");
const fs_1 = require("./utils/fs");
const ReflectionSymbolId_1 = require("./models/reflections/ReflectionSymbolId");
const internationalization_1 = require("./internationalization/internationalization");
const highlighter_1 = require("./utils/highlighter");
const FileRegistry_1 = require("./models/FileRegistry");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const packageInfo = require("../../package.json");
const supportedVersionMajorMinor = packageInfo.peerDependencies.typescript
    .split("||")
    .map((version) => version.replace(/^\s*|\.x\s*$/g, ""));
const DETECTOR = Symbol();
function createAppForTesting() {
    // @ts-expect-error private constructor
    const app = new Application(DETECTOR);
    app.files = new FileRegistry_1.FileRegistry();
    return app;
}
const DEFAULT_READERS = [
    new index_2.TypeDocReader(),
    new index_2.PackageJsonReader(),
    new index_2.TSConfigReader(),
];
/**
 * The default TypeDoc main application class.
 *
 * This class holds the two main components of TypeDoc, the {@link Converter} and
 * the {@link Renderer}. When running TypeDoc, first the {@link Converter} is invoked which
 * generates a {@link ProjectReflection} from the passed in source files. The
 * {@link ProjectReflection} is a hierarchical model representation of the TypeScript
 * project. Afterwards the model is passed to the {@link Renderer} which uses an instance
 * of {@link Theme} to generate the final documentation.
 *
 * Both the {@link Converter} and the {@link Renderer} emit a series of events while processing the project.
 * Subscribe to these Events to control the application flow or alter the output.
 *
 * @remarks
 *
 * Access to an Application instance can be retrieved with {@link Application.bootstrap} or
 * {@link Application.bootstrapWithPlugins}. It can not be constructed manually.
 */
let Application = (() => {
    var _Application_lang_accessor_storage, _Application_skipErrorChecking_accessor_storage, _Application_entryPointStrategy_accessor_storage, _Application_entryPoints_accessor_storage;
    let _classDecorators = [(0, component_1.Component)({ name: "application", internal: true })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = component_1.ChildableComponent;
    let _lang_decorators;
    let _lang_initializers = [];
    let _lang_extraInitializers = [];
    let _skipErrorChecking_decorators;
    let _skipErrorChecking_initializers = [];
    let _skipErrorChecking_extraInitializers = [];
    let _entryPointStrategy_decorators;
    let _entryPointStrategy_initializers = [];
    let _entryPointStrategy_extraInitializers = [];
    let _entryPoints_decorators;
    let _entryPoints_initializers = [];
    let _entryPoints_extraInitializers = [];
    var Application = _classThis = class extends _classSuper {
        /** @internal */
        get lang() { return __classPrivateFieldGet(this, _Application_lang_accessor_storage, "f"); }
        set lang(value) { __classPrivateFieldSet(this, _Application_lang_accessor_storage, value, "f"); }
        /** @internal */
        get skipErrorChecking() { return __classPrivateFieldGet(this, _Application_skipErrorChecking_accessor_storage, "f"); }
        set skipErrorChecking(value) { __classPrivateFieldSet(this, _Application_skipErrorChecking_accessor_storage, value, "f"); }
        /** @internal */
        get entryPointStrategy() { return __classPrivateFieldGet(this, _Application_entryPointStrategy_accessor_storage, "f"); }
        set entryPointStrategy(value) { __classPrivateFieldSet(this, _Application_entryPointStrategy_accessor_storage, value, "f"); }
        /** @internal */
        get entryPoints() { return __classPrivateFieldGet(this, _Application_entryPoints_accessor_storage, "f"); }
        set entryPoints(value) { __classPrivateFieldSet(this, _Application_entryPoints_accessor_storage, value, "f"); }
        /**
         * Create a new TypeDoc application instance.
         */
        constructor(detector) {
            if (detector !== DETECTOR) {
                throw new Error("An application handle must be retrieved with Application.bootstrap or Application.bootstrapWithPlugins");
            }
            super(null); // We own ourselves
            /**
             * The serializer used to generate JSON output.
             */
            this.serializer = new serialization_1.Serializer();
            /**
             * The deserializer used to restore previously serialized JSON output.
             */
            this.deserializer = new serialization_1.Deserializer(this);
            /**
             * The logger that should be used to output messages.
             */
            this.logger = new index_2.ConsoleLogger();
            /**
             * Internationalization module which supports translating according to
             * the `lang` option.
             */
            this.internationalization = new internationalization_1.Internationalization(this);
            /**
             * Proxy based shortcuts for internationalization keys.
             */
            this.i18n = this.internationalization.proxy;
            this.options = new utils_1.Options(this.i18n);
            this.files = new FileRegistry_1.ValidatingFileRegistry();
            _Application_lang_accessor_storage.set(this, __runInitializers(this, _lang_initializers, void 0));
            _Application_skipErrorChecking_accessor_storage.set(this, (__runInitializers(this, _lang_extraInitializers), __runInitializers(this, _skipErrorChecking_initializers, void 0)));
            _Application_entryPointStrategy_accessor_storage.set(this, (__runInitializers(this, _skipErrorChecking_extraInitializers), __runInitializers(this, _entryPointStrategy_initializers, void 0)));
            _Application_entryPoints_accessor_storage.set(this, (__runInitializers(this, _entryPointStrategy_extraInitializers), __runInitializers(this, _entryPoints_initializers, void 0)));
            __runInitializers(this, _entryPoints_extraInitializers);
            this.converter = new index_1.Converter(this);
            this.renderer = new renderer_1.Renderer(this);
            this.logger.i18n = this.i18n;
        }
        /**
         * Initialize TypeDoc, loading plugins if applicable.
         */
        static async bootstrapWithPlugins(options = {}, readers = DEFAULT_READERS) {
            await (0, highlighter_1.loadShikiMetadata)();
            const app = new Application(DETECTOR);
            readers.forEach((r) => app.options.addReader(r));
            app.options.reset();
            app.setOptions(options, /* reportErrors */ false);
            await app.options.read(new index_2.Logger());
            app.logger.level = app.options.getValue("logLevel");
            await (0, index_2.loadPlugins)(app, app.options.getValue("plugin"));
            await app._bootstrap(options);
            return app;
        }
        /**
         * Initialize TypeDoc without loading plugins.
         *
         * @example
         * Initialize the application with pretty-printing output disabled.
         * ```ts
         * const app = Application.bootstrap({ pretty: false });
         * ```
         *
         * @param options Options to set during initialization
         * @param readers Option readers to use to discover options from config files.
         */
        static async bootstrap(options = {}, readers = DEFAULT_READERS) {
            await (0, highlighter_1.loadShikiMetadata)();
            const app = new Application(DETECTOR);
            readers.forEach((r) => app.options.addReader(r));
            await app._bootstrap(options);
            return app;
        }
        async _bootstrap(options) {
            this.options.reset();
            this.setOptions(options, /* reportErrors */ false);
            await this.options.read(this.logger);
            this.setOptions(options);
            this.logger.level = this.options.getValue("logLevel");
            for (const [lang, locales] of Object.entries(this.options.getValue("locales"))) {
                this.internationalization.addTranslations(lang, locales);
            }
            if ((0, general_1.hasBeenLoadedMultipleTimes)()) {
                this.logger.warn(this.i18n.loaded_multiple_times_0((0, general_1.getLoadedPaths)().join("\n\t")));
            }
            this.trigger(application_events_1.ApplicationEvents.BOOTSTRAP_END, this);
            if (!this.internationalization.hasTranslations(this.lang)) {
                // Not internationalized as by definition we don't know what to include here.
                this.logger.warn(`Options specified "${this.lang}" as the language to use, but TypeDoc does not support it.`);
                this.logger.info(("The supported languages are:\n\t" +
                    this.internationalization
                        .getSupportedLanguages()
                        .join("\n\t")));
                this.logger.info("You can define/override local locales with the `locales` option, or contribute them to TypeDoc!");
            }
            if (this.options.getValue("useHostedBaseUrlForAbsoluteLinks") &&
                !this.options.getValue("hostedBaseUrl")) {
                this.logger.warn(this.i18n.useHostedBaseUrlForAbsoluteLinks_requires_hostedBaseUrl());
                this.options.setValue("useHostedBaseUrlForAbsoluteLinks", false);
            }
        }
        setOptions(options, reportErrors = true) {
            for (const [key, val] of Object.entries(options)) {
                try {
                    this.options.setValue(key, val);
                }
                catch (error) {
                    (0, assert_1.ok)(error instanceof Error);
                    if (reportErrors) {
                        this.logger.error(error.message);
                    }
                }
            }
        }
        /**
         * Return the path to the TypeScript compiler.
         */
        getTypeScriptPath() {
            return (0, paths_1.nicePath)(Path.dirname(require.resolve("typescript")));
        }
        getTypeScriptVersion() {
            return typescript_1.default.version;
        }
        /**
         * Gets the entry points to be documented according to the current `entryPoints` and `entryPointStrategy` options.
         * May return undefined if entry points fail to be expanded.
         */
        getEntryPoints() {
            return (0, entry_point_1.getEntryPoints)(this.logger, this.options);
        }
        /**
         * Run the converter for the given set of files and return the generated reflections.
         *
         * @returns An instance of ProjectReflection on success, undefined otherwise.
         */
        async convert() {
            const start = Date.now();
            // We freeze here rather than in the Converter class since TypeDoc's tests reuse the Application
            // with a few different settings.
            this.options.freeze();
            this.logger.verbose(`Using TypeScript ${this.getTypeScriptVersion()} from ${this.getTypeScriptPath()}`);
            if (this.entryPointStrategy === entry_point_1.EntryPointStrategy.Merge) {
                return this._merge();
            }
            if (this.entryPointStrategy === entry_point_1.EntryPointStrategy.Packages) {
                return this._convertPackages();
            }
            if (!supportedVersionMajorMinor.some((version) => version == typescript_1.default.versionMajorMinor)) {
                this.logger.warn(this.i18n.unsupported_ts_version_0(supportedVersionMajorMinor.join(", ")));
            }
            const entryPoints = this.getEntryPoints();
            if (!entryPoints) {
                // Fatal error already reported.
                return;
            }
            const programs = (0, array_1.unique)(entryPoints.map((e) => e.program));
            this.logger.verbose(`Converting with ${programs.length} programs ${entryPoints.length} entry points`);
            if (this.skipErrorChecking === false) {
                const errors = programs.flatMap((program) => typescript_1.default.getPreEmitDiagnostics(program));
                if (errors.length) {
                    this.logger.diagnostics(errors);
                    return;
                }
            }
            if (this.options.getValue("emit") === "both") {
                for (const program of programs) {
                    program.emit();
                }
            }
            const startConversion = Date.now();
            this.logger.verbose(`Finished getting entry points in ${Date.now() - start}ms`);
            const project = this.converter.convert(entryPoints);
            this.logger.verbose(`Finished conversion in ${Date.now() - startConversion}ms`);
            return project;
        }
        convertAndWatch(success) {
            this.options.freeze();
            if (!this.options.getValue("preserveWatchOutput") &&
                this.logger instanceof index_2.ConsoleLogger) {
                typescript_1.default.sys.clearScreen?.();
            }
            this.logger.verbose(`Using TypeScript ${this.getTypeScriptVersion()} from ${this.getTypeScriptPath()}`);
            if (!supportedVersionMajorMinor.some((version) => version == typescript_1.default.versionMajorMinor)) {
                this.logger.warn(this.i18n.unsupported_ts_version_0(supportedVersionMajorMinor.join(", ")));
            }
            if (Object.keys(this.options.getCompilerOptions()).length === 0) {
                this.logger.warn(this.i18n.no_compiler_options_set());
            }
            // Doing this is considerably more complicated, we'd need to manage an array of programs, not convert until all programs
            // have reported in the first time... just error out for now. I'm not convinced anyone will actually notice.
            if (this.options.getFileNames().length === 0) {
                this.logger.error(this.i18n.solution_not_supported_in_watch_mode());
                return;
            }
            // Support for packages mode is currently unimplemented
            if (this.entryPointStrategy !== entry_point_1.EntryPointStrategy.Resolve &&
                this.entryPointStrategy !== entry_point_1.EntryPointStrategy.Expand) {
                this.logger.error(this.i18n.strategy_not_supported_in_watch_mode());
                return;
            }
            const tsconfigFile = (0, tsconfig_1.findTsConfigFile)(this.options.getValue("tsconfig")) ??
                "tsconfig.json";
            // We don't want to do it the first time to preserve initial debug status messages. They'll be lost
            // after the user saves a file, but better than nothing...
            let firstStatusReport = true;
            const host = typescript_1.default.createWatchCompilerHost(tsconfigFile, {}, typescript_1.default.sys, typescript_1.default.createEmitAndSemanticDiagnosticsBuilderProgram, (diagnostic) => this.logger.diagnostic(diagnostic), (status, newLine, _options, errorCount) => {
                if (!firstStatusReport &&
                    errorCount === void 0 &&
                    !this.options.getValue("preserveWatchOutput") &&
                    this.logger instanceof index_2.ConsoleLogger) {
                    typescript_1.default.sys.clearScreen?.();
                }
                firstStatusReport = false;
                this.logger.info(typescript_1.default.flattenDiagnosticMessageText(status.messageText, newLine));
            });
            let successFinished = true;
            let currentProgram;
            const runSuccess = () => {
                if (!currentProgram) {
                    return;
                }
                if (successFinished) {
                    if (this.options.getValue("emit") === "both") {
                        currentProgram.emit();
                    }
                    this.logger.resetErrors();
                    this.logger.resetWarnings();
                    const entryPoints = (0, entry_point_1.getWatchEntryPoints)(this.logger, this.options, currentProgram);
                    if (!entryPoints) {
                        return;
                    }
                    const project = this.converter.convert(entryPoints);
                    currentProgram = undefined;
                    successFinished = false;
                    void success(project).then(() => {
                        successFinished = true;
                        runSuccess();
                    });
                }
            };
            const origCreateProgram = host.createProgram;
            host.createProgram = (rootNames, options, host, oldProgram, configDiagnostics, references) => {
                // If we always do this, we'll get a crash the second time a program is created.
                if (rootNames !== undefined) {
                    options = this.options.fixCompilerOptions(options || {});
                }
                return origCreateProgram(rootNames, options, host, oldProgram, configDiagnostics, references);
            };
            const origAfterProgramCreate = host.afterProgramCreate;
            host.afterProgramCreate = (program) => {
                if (typescript_1.default.getPreEmitDiagnostics(program.getProgram()).length === 0) {
                    currentProgram = program.getProgram();
                    runSuccess();
                }
                origAfterProgramCreate?.(program);
            };
            typescript_1.default.createWatchProgram(host);
        }
        validate(project) {
            const checks = this.options.getValue("validation");
            const start = Date.now();
            // No point in validating exports when merging. Warnings will have already been emitted when
            // creating the project jsons that this run merges together.
            if (checks.notExported &&
                this.entryPointStrategy !== entry_point_1.EntryPointStrategy.Merge) {
                (0, exports_1.validateExports)(project, this.logger, this.options.getValue("intentionallyNotExported"));
            }
            if (checks.notDocumented) {
                (0, documentation_1.validateDocumentation)(project, this.logger, this.options.getValue("requiredToBeDocumented"));
            }
            if (checks.invalidLink) {
                (0, links_1.validateLinks)(project, this.logger);
            }
            this.trigger(Application.EVENT_VALIDATE_PROJECT, project);
            this.logger.verbose(`Validation took ${Date.now() - start}ms`);
        }
        /**
         * Render HTML for the given project
         */
        async generateDocs(project, out) {
            const start = Date.now();
            out = Path.resolve(out);
            await this.renderer.render(project, out);
            if (this.logger.hasErrors()) {
                this.logger.error(this.i18n.docs_could_not_be_generated());
            }
            else {
                this.logger.info(this.i18n.docs_generated_at_0((0, paths_1.nicePath)(out)));
                this.logger.verbose(`HTML rendering took ${Date.now() - start}ms`);
            }
        }
        /**
         * Write the reflections to a json file.
         *
         * @param out The path and file name of the target file.
         * @returns Whether the JSON file could be written successfully.
         */
        async generateJson(project, out) {
            const start = Date.now();
            out = Path.resolve(out);
            const ser = this.serializer.projectToObject(project, process.cwd());
            const space = this.options.getValue("pretty") ? "\t" : "";
            await (0, index_2.writeFile)(out, JSON.stringify(ser, null, space) + "\n");
            this.logger.info(this.i18n.json_written_to_0((0, paths_1.nicePath)(out)));
            this.logger.verbose(`JSON rendering took ${Date.now() - start}ms`);
        }
        /**
         * Print the version number.
         */
        toString() {
            return [
                "",
                `TypeDoc ${Application.VERSION}`,
                `Using TypeScript ${this.getTypeScriptVersion()} from ${this.getTypeScriptPath()}`,
                "",
            ].join("\n");
        }
        async _convertPackages() {
            if (!this.options.isSet("entryPoints")) {
                this.logger.error(this.i18n.no_entry_points_for_packages());
                return;
            }
            const packageDirs = (0, entry_point_1.getPackageDirectories)(this.logger, this.options, this.options.getValue("entryPoints"));
            if (packageDirs.length === 0) {
                this.logger.error(this.i18n.failed_to_find_packages());
                return;
            }
            const origFiles = this.files;
            const origOptions = this.options;
            const projects = [];
            const projectsToConvert = [];
            // Generate a json file for each package
            for (const dir of packageDirs) {
                this.logger.verbose(`Reading project at ${(0, paths_1.nicePath)(dir)}`);
                let opts;
                try {
                    opts = origOptions.copyForPackage(dir);
                }
                catch (error) {
                    (0, assert_1.ok)(error instanceof Error);
                    this.logger.error(error.message);
                    this.logger.info(this.i18n.previous_error_occurred_when_reading_options_for_0((0, paths_1.nicePath)(dir)));
                    continue;
                }
                await opts.read(this.logger, dir);
                // Invalid links should only be reported after everything has been merged.
                opts.setValue("validation", { invalidLink: false });
                if (opts.getValue("entryPointStrategy") ===
                    entry_point_1.EntryPointStrategy.Packages) {
                    this.logger.error(this.i18n.nested_packages_unsupported_0((0, paths_1.nicePath)(dir)));
                    continue;
                }
                (0, ReflectionSymbolId_1.addInferredDeclarationMapPaths)(opts.getCompilerOptions(), opts.getFileNames());
                projectsToConvert.push({ dir, options: opts });
            }
            for (const { dir, options } of projectsToConvert) {
                this.logger.info(this.i18n.converting_project_at_0((0, paths_1.nicePath)(dir)));
                this.options = options;
                this.files = new FileRegistry_1.ValidatingFileRegistry();
                let project = await this.convert();
                if (project) {
                    this.validate(project);
                    const serialized = this.serializer.projectToObject(project, process.cwd());
                    projects.push(serialized);
                }
                // When debugging memory issues, it's useful to set these
                // here so that a breakpoint on the continue statement below
                // gets the memory as it ought to be with all TS objects released.
                project = undefined;
                this.files = undefined;
                // global.gc!();
                continue;
            }
            this.options = origOptions;
            this.files = origFiles;
            if (projects.length !== packageDirs.length) {
                this.logger.error(this.i18n.failed_to_convert_packages());
                return;
            }
            this.logger.info(this.i18n.merging_converted_projects());
            const result = this.deserializer.reviveProjects(this.options.getValue("name") || "Documentation", projects, process.cwd(), this.files);
            this.trigger(application_events_1.ApplicationEvents.REVIVE, result);
            return result;
        }
        _merge() {
            const start = Date.now();
            if (!this.options.isSet("entryPoints")) {
                this.logger.error(this.i18n.no_entry_points_to_merge());
                return;
            }
            const rootDir = (0, fs_1.deriveRootDir)(this.entryPoints);
            const entryPoints = this.entryPoints.flatMap((entry) => {
                const result = (0, fs_1.glob)(entry, rootDir);
                if (result.length === 0) {
                    this.logger.warn(this.i18n.entrypoint_did_not_match_files_0((0, paths_1.nicePath)(entry)));
                }
                else {
                    this.logger.verbose(`Expanded ${(0, paths_1.nicePath)(entry)} to:\n\t${result
                        .map(paths_1.nicePath)
                        .join("\n\t")}`);
                }
                return result;
            });
            const jsonProjects = entryPoints.map((path) => {
                try {
                    return JSON.parse((0, fs_1.readFile)(path));
                }
                catch {
                    this.logger.error(this.i18n.failed_to_parse_json_0((0, paths_1.nicePath)(path)));
                    return null;
                }
            });
            if (this.logger.hasErrors())
                return;
            const result = this.deserializer.reviveProjects(this.options.getValue("name"), jsonProjects, process.cwd(), this.files);
            this.logger.verbose(`Reviving projects took ${Date.now() - start}ms`);
            // If we only revived one project, the project documents were set for
            // it when it was created. If we revived more than one project then
            // it's convenient to be able to add more documents now.
            if (jsonProjects.length > 1) {
                this.converter.addProjectDocuments(result);
            }
            this.trigger(application_events_1.ApplicationEvents.REVIVE, result);
            return result;
        }
    };
    _Application_lang_accessor_storage = new WeakMap();
    _Application_skipErrorChecking_accessor_storage = new WeakMap();
    _Application_entryPointStrategy_accessor_storage = new WeakMap();
    _Application_entryPoints_accessor_storage = new WeakMap();
    __setFunctionName(_classThis, "Application");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        _lang_decorators = [(0, utils_1.Option)("lang")];
        _skipErrorChecking_decorators = [(0, utils_1.Option)("skipErrorChecking")];
        _entryPointStrategy_decorators = [(0, utils_1.Option)("entryPointStrategy")];
        _entryPoints_decorators = [(0, utils_1.Option)("entryPoints")];
        __esDecorate(_classThis, null, _lang_decorators, { kind: "accessor", name: "lang", static: false, private: false, access: { has: obj => "lang" in obj, get: obj => obj.lang, set: (obj, value) => { obj.lang = value; } }, metadata: _metadata }, _lang_initializers, _lang_extraInitializers);
        __esDecorate(_classThis, null, _skipErrorChecking_decorators, { kind: "accessor", name: "skipErrorChecking", static: false, private: false, access: { has: obj => "skipErrorChecking" in obj, get: obj => obj.skipErrorChecking, set: (obj, value) => { obj.skipErrorChecking = value; } }, metadata: _metadata }, _skipErrorChecking_initializers, _skipErrorChecking_extraInitializers);
        __esDecorate(_classThis, null, _entryPointStrategy_decorators, { kind: "accessor", name: "entryPointStrategy", static: false, private: false, access: { has: obj => "entryPointStrategy" in obj, get: obj => obj.entryPointStrategy, set: (obj, value) => { obj.entryPointStrategy = value; } }, metadata: _metadata }, _entryPointStrategy_initializers, _entryPointStrategy_extraInitializers);
        __esDecorate(_classThis, null, _entryPoints_decorators, { kind: "accessor", name: "entryPoints", static: false, private: false, access: { has: obj => "entryPoints" in obj, get: obj => obj.entryPoints, set: (obj, value) => { obj.entryPoints = value; } }, metadata: _metadata }, _entryPoints_initializers, _entryPoints_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Application = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    /**
     * The version number of TypeDoc.
     */
    _classThis.VERSION = packageInfo.version;
    /**
     * Emitted after plugins have been loaded and options have been read, but before they have been frozen.
     * The listener will be given an instance of {@link Application}.
     */
    _classThis.EVENT_BOOTSTRAP_END = application_events_1.ApplicationEvents.BOOTSTRAP_END;
    /**
     * Emitted after a project has been deserialized from JSON.
     * The listener will be given an instance of {@link ProjectReflection}.
     */
    _classThis.EVENT_PROJECT_REVIVE = application_events_1.ApplicationEvents.REVIVE;
    /**
     * Emitted when validation is being run.
     * The listener will be given an instance of {@link ProjectReflection}.
     */
    _classThis.EVENT_VALIDATE_PROJECT = application_events_1.ApplicationEvents.VALIDATE_PROJECT;
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Application = _classThis;
})();
exports.Application = Application;