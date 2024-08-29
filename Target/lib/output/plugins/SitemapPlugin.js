"use strict";
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SitemapPlugin = void 0;
const path_1 = __importDefault(require("path"));
const utils_1 = require("../../utils");
const html_1 = require("../../utils/html");
const jsx_1 = require("../../utils/jsx");
const components_1 = require("../components");
const events_1 = require("../events");
const DefaultTheme_1 = require("../themes/default/DefaultTheme");
let SitemapPlugin = (() => {
    let _classDecorators = [(0, components_1.Component)({ name: "sitemap" })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = components_1.RendererComponent;
    var SitemapPlugin = _classThis = class extends _classSuper {
        get hostedBaseUrl() {
            const url = this.application.options.getValue("hostedBaseUrl");
            return !url || url.endsWith("/") ? url : url + "/";
        }
        initialize() {
            this.owner.on(events_1.RendererEvent.BEGIN, this.onRendererBegin.bind(this));
        }
        onRendererBegin(_event) {
            if (!(this.owner.theme instanceof DefaultTheme_1.DefaultTheme)) {
                return;
            }
            if (!this.hostedBaseUrl) {
                return;
            }
            this.owner.hooks.on("head.begin", (context) => {
                if (context.page.url === "index.html") {
                    return {
                        tag: "link",
                        props: { rel: "canonical", href: this.hostedBaseUrl },
                        children: [],
                    };
                }
                return { tag: jsx_1.Fragment, props: null, children: [] };
            });
            this.owner.preRenderAsyncJobs.push((event) => this.buildSitemap(event));
        }
        async buildSitemap(event) {
            // cSpell:words lastmod urlset
            const sitemapXml = path_1.default.join(event.outputDirectory, "sitemap.xml");
            const lastmod = new Date(this.owner.renderStartTime).toISOString();
            const urls = event.urls?.map((url) => {
                return {
                    tag: "url",
                    children: [
                        {
                            tag: "loc",
                            children: new URL(url.url, this.hostedBaseUrl).toString(),
                        },
                        {
                            tag: "lastmod",
                            children: lastmod,
                        },
                    ],
                };
            }) ?? [];
            const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n` +
                stringifyXml({
                    tag: "urlset",
                    attr: { xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9" },
                    children: urls,
                }) +
                "\n";
            await (0, utils_1.writeFile)(sitemapXml, sitemap);
        }
    };
    __setFunctionName(_classThis, "SitemapPlugin");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SitemapPlugin = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SitemapPlugin = _classThis;
})();
exports.SitemapPlugin = SitemapPlugin;
function stringifyXml(xml, indent = 0) {
    const parts = ["\t".repeat(indent), "<", xml.tag];
    for (const [key, val] of Object.entries(xml.attr || {})) {
        parts.push(" ", key, '="', (0, html_1.escapeHtml)(val), '"');
    }
    parts.push(">");
    if (typeof xml.children === "string") {
        parts.push((0, html_1.escapeHtml)(xml.children));
    }
    else {
        for (const child of xml.children) {
            parts.push("\n");
            parts.push(stringifyXml(child, indent + 1));
        }
        parts.push("\n", "\t".repeat(indent));
    }
    parts.push("</", xml.tag, ">");
    return parts.join("");
}