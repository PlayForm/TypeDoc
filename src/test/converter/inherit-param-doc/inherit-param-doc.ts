export interface Base {
	/**
	 * @param a - Parameter A.
	 * @param b - Parameter B.
	 */
	method1(a: number, b: string): void;
	/**
	 * @param a - Parameter A.
	 * @param b - Parameter B.
	 */
	method2(a: number, b: string): void;
}

export class Class1 implements Base {
	/** @inheritDoc */
	method1(a: number, b: string): void {}
	/** @inheritDoc */
	method2(): void {}
}

export class Class2 implements Base {
	/**
	 * @inheritDoc
	 *
	 * @param a - Custom parameter A doc.
	 */
	method1(a: number, b: string): void {}
	/**
	 * @inheritDoc
	 *
	 * @param a - Custom parameter A doc.
	 */
	method2(a: number): void {}
}

export class Class3 implements Base {
	/**
	 * @inheritDoc
	 *
	 * @param c - Custom second parameter doc with name change.
	 */
	method1(a: number, c: string): void {}
	method2(a: number): void {}
}
