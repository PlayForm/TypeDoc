import type { BundledLanguage, BundledTheme } from "shiki" with { "resolution-mode": "import" };
export declare function loadShikiMetadata(): Promise<void>;
export declare function loadHighlighter(lightTheme: BundledTheme, darkTheme: BundledTheme, langs: BundledLanguage[]): Promise<void>;
export declare function isSupportedLanguage(lang: string): boolean;
export declare function getSupportedLanguages(): string[];
export declare function getSupportedLanguagesWithoutAliases(): string[];
export declare function getSupportedThemes(): string[];
export declare function isLoadedLanguage(lang: string): boolean;
export declare function highlight(code: string, lang: string): string;
export declare function getStyles(): string;
//# sourceMappingURL=highlighter.d.ts.map