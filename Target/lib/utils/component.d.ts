import type { Application } from "../application";
import { EventDispatcher } from "./events";
/**
 * Exposes a reference to the root Application component.
 */
export interface ComponentHost {
    readonly application: Application;
}
export interface Component<E extends Record<keyof E, unknown[]> = {}> extends AbstractComponent<ComponentHost, E> {
}
export interface ComponentClass<T extends Component, O extends ComponentHost = ComponentHost> {
    new (owner: O): T;
}
/**
 * Option-bag passed to Component decorator.
 */
export interface ComponentOptions {
    name?: string;
    /** Specify valid child component class.  Used to prove that children are valid via `instanceof` checks */
    childClass?: Function;
    internal?: boolean;
}
/**
 * Class decorator applied to Components
 */
export declare function Component(options: ComponentOptions): (target: Function, _context: unknown) => void;
/**
 * Component base class.  Has an owner (unless it's the application root component),
 * can dispatch events to its children, and has access to the root Application component.
 *
 * @template O type of component's owner.
 */
export declare abstract class AbstractComponent<O extends ComponentHost, E extends Record<keyof E, unknown[]>> extends EventDispatcher<E> implements ComponentHost {
    /**
     * The owner of this component instance.
     */
    private _componentOwner;
    /**
     * The name of this component as set by the `@Component` decorator.
     */
    componentName: string;
    /**
     * Create new Component instance.
     */
    constructor(owner: O);
    /**
     * Initialize this component.
     */
    protected initialize(): void;
    /**
     * Return the application / root component instance.
     */
    get application(): Application;
    /**
     * Return the owner of this component.
     */
    get owner(): O;
}
/**
 * Component that can have child components.
 *
 * @template O type of Component's owner
 * @template C type of Component's children
 */
export declare abstract class ChildableComponent<O extends ComponentHost, C extends Component, E extends Record<keyof E, unknown[]>> extends AbstractComponent<O, E> {
    private _componentChildren?;
    private _defaultComponents?;
    /**
     * Create new Component instance.
     */
    constructor(owner: O);
    /**
     * Retrieve a plugin instance.
     *
     * @returns  The instance of the plugin or undefined if no plugin with the given class is attached.
     */
    getComponent(name: string): C | undefined;
    getComponents(): C[];
    addComponent<T extends C>(name: string, componentClass: T | ComponentClass<T, O>): T;
}