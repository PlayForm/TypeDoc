/* eslint-disable no-console */

import { performance } from "perf_hooks";

const benchmarks: { name: string; calls: number; time: number }[] = [];

export function bench<T extends (..._: any) => any>(
	fn: T,
	name: string = fn.name,
): T {
	const matching = benchmarks.find((b) => b.name === name);
	const timer = matching || {
		name,
		calls: 0,
		time: 0,
	};
	if (!matching) benchmarks.push(timer);

	return function bench(this: any, ...args: any) {
		timer.calls++;
		const start = performance.now();
		const end = () => (timer.time += performance.now() - start);
		let result: any;
		try {
			result = fn.apply(this, args);
		} catch (error) {
			end();
			throw error;
		}

		if (result instanceof Promise) {
			result.then(
				(res) => {
					end();
					return res;
				},
				() => {
					end();
				},
			);
		} else {
			end();
		}

		return result;
	} as any;
}

export function Bench<T extends (..._: any) => any>(
	value: T,
	context: ClassMethodDecoratorContext,
): T {
	let runner: T | undefined;
	return function (this: any, ...args: any) {
		if (!runner) {
			const className = context.static
				? this.name
				: Object.getPrototypeOf(this).constructor.name;
			runner = bench(value, `${className}.${String(context.name)}`);
		}
		return runner.apply(this, args);
	} as any;
}

export function measure<T>(cb: () => T): T {
	return bench(cb, "measure()")();
}

process.on("exit", () => {
	if (!benchmarks.length) return;

	const width = benchmarks.reduce((a, b) => Math.max(a, b.name.length), 11);
	console.log("=".repeat(width + 35));
	console.log(
		`${"Benchmarked".padEnd(width)} | Calls | Time (ms) | Average (ms)`,
	);
	console.log("=".repeat(width + 35));

	for (const { name, calls, time } of benchmarks) {
		console.log(
			`${name.padEnd(width)} | ${calls.toString().padEnd(5)} | ${time
				.toFixed(2)
				.padEnd(9)} | ${(time / calls).toFixed(2)}`,
		);
	}

	console.log("=".repeat(width + 35));
});
