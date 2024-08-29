import { type Reflection } from "../../../../models";
import { JSX } from "../../../../utils";
import type { PageEvent } from "../../../events";
import type { DefaultThemeRenderContext } from "../DefaultThemeRenderContext";

export declare function sidebar(
	context: DefaultThemeRenderContext,
	props: PageEvent<Reflection>,
): JSX.Element;
export declare function sidebarLinks(
	context: DefaultThemeRenderContext,
): JSX.Element | null;
export declare function settings(
	context: DefaultThemeRenderContext,
): JSX.Element;
export declare const navigation: (
	context: DefaultThemeRenderContext,
	props: PageEvent<Reflection>,
) => JSX.Element;
export declare function pageSidebar(
	context: DefaultThemeRenderContext,
	props: PageEvent<Reflection>,
): JSX.Element;
export declare function pageNavigation(
	context: DefaultThemeRenderContext,
	props: PageEvent<Reflection>,
): JSX.Element;