/**
 * GenericClass short text.
 * @param T  Generic parameter.
 */
export class GenericClass<T> {
	/**
	 * Generic property.
	 */
	protected value: T;

	/**
	 * Generic property array.
	 */
	protected values: T[];

	/**
	 * Constructor short text.
	 * @param value  Constructor parameter.
	 */
	constructor(value: T) {
		this.value = value;
	}

	/**
	 * getValue short text.
	 * @return Return value comment.
	 */
	getValue(): T {
		return this.value;
	}
}

/**
 * NonGenericClass short text.
 */
export class NonGenericClass extends GenericClass<string> {}
