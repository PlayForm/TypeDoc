"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hierarchy = hierarchy;
const utils_1 = require("../../../../utils");
const isLinkedReferenceType = (type) => type.visit({
    reference: (ref) => ref.reflection !== undefined,
}) ?? false;
function hasAnyLinkedReferenceType(h) {
    if (!h)
        return false;
    if (!h.isTarget && h.types.some(isLinkedReferenceType))
        return true;
    return hasAnyLinkedReferenceType(h.next);
}
function hierarchy(context, props) {
    if (!props)
        return;
    const fullLink = hasAnyLinkedReferenceType(props) ? (utils_1.JSX.createElement(utils_1.JSX.Fragment, null,
        " ",
        "(",
        utils_1.JSX.createElement("a", { href: context.relativeURL("hierarchy.html") +
                "#" +
                context.page.model.getFullName() }, context.i18n.theme_hierarchy_view_full()),
        ")")) : (utils_1.JSX.createElement(utils_1.JSX.Fragment, null));
    return (utils_1.JSX.createElement("section", { class: "tsd-panel tsd-hierarchy" },
        utils_1.JSX.createElement("h4", null,
            context.i18n.theme_hierarchy(),
            fullLink),
        hierarchyList(context, props)));
}
function hierarchyList(context, props) {
    return (utils_1.JSX.createElement("ul", { class: "tsd-hierarchy" }, props.types.map((item, i, l) => (utils_1.JSX.createElement("li", null,
        props.isTarget ? (utils_1.JSX.createElement("span", { class: "target" }, item.toString())) : (context.type(item)),
        i === l.length - 1 &&
            !!props.next &&
            hierarchyList(context, props.next))))));
}