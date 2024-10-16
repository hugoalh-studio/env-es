import { envDelimitation } from "./delimitation.ts";
const isOSWindows: boolean = Deno.build.os === "windows";
function assertValuesFileExtension(...values: string[]): void {
	values.forEach((value: string): void => {
		if (!value.startsWith(".")) {
			throw new SyntaxError(`\`${value}\` is not an valid file extension!`);
		}
	});
}
function getEnvPathExtInternal() {
	const resultArray: string[] = envDelimitation.get("PATHEXT");
	const resultSet: Set<string> = new Set<string>(resultArray);
	return {
		hasDuplicated: resultArray.length === resultSet.size,
		result: resultSet
	};
}
/**
 * Environment variable `PATHEXT` interface.
 */
export interface EnvPathExt {
	/**
	 * Add value to the environment variable `PATHEXT`.
	 * 
	 * > **🛡️ Require Runtime Permissions**
	 * > 
	 * > - Deno
	 * >   - Environment Variable (`env`)
	 * >     - `PATHEXT`
	 * @param {...string} values Value that need to add to the environment variable `PATHEXT`.
	 * @returns {void}
	 */
	add(...values: string[]): void;
	/**
	 * Delete value from the environment variable `PATHEXT`.
	 * 
	 * > **🛡️ Require Runtime Permissions**
	 * > 
	 * > - Deno
	 * >   - Environment Variable (`env`)
	 * >     - `PATHEXT`
	 * @param {...string} values Value that need to delete from the environment variable `PATHEXT`.
	 * @returns {void}
	 */
	delete(...values: string[]): void;
	/**
	 * Get the values of the environment variable `PATHEXT`; Always return `null` for non-Windows operate system.
	 * 
	 * > **🛡️ Require Runtime Permissions**
	 * > 
	 * > - Deno
	 * >   - Environment Variable (`env`)
	 * >     - `PATHEXT`
	 * @returns {string[] | null} Values of the environment variable `PATHEXT`.
	 */
	get(): string[] | null;
}
/**
 * Add value to the environment variable `PATHEXT`.
 * 
 * > **🛡️ Require Runtime Permissions**
 * > 
 * > - Deno
 * >   - Environment Variable (`env`)
 * >     - `PATHEXT`
 * @param {...string} values Value that need to add to the environment variable `PATHEXT`.
 * @returns {void}
 */
export const addEnvPathExt: EnvPathExt["add"] = (...values: string[]): void => {
	assertValuesFileExtension(...values);
	if (isOSWindows && values.length > 0) {
		const { result: target } = getEnvPathExtInternal();
		for (const value of values) {
			target.add(value.toUpperCase());
		}
		envDelimitation.set("PATHEXT", Array.from(target.values()));
	}
};
/**
 * Delete value from the environment variable `PATHEXT`.
 * 
 * > **🛡️ Require Runtime Permissions**
 * > 
 * > - Deno
 * >   - Environment Variable (`env`)
 * >     - `PATHEXT`
 * @param {...string} values Value that need to delete from the environment variable `PATHEXT`.
 * @returns {void}
 */
export const deleteEnvPathExt: EnvPathExt["delete"] = (...values: string[]): void => {
	assertValuesFileExtension(...values);
	if (isOSWindows && values.length > 0) {
		const {
			hasDuplicated,
			result: target
		} = getEnvPathExtInternal();
		let isModified: boolean = hasDuplicated;
		for (const value of values) {
			isModified = target.delete(value) || isModified;
		}
		if (isModified) {
			envDelimitation.set("PATHEXT", Array.from(target.values()));
		}
	}
};
/**
 * Get the values of the environment variable `PATHEXT`; Always return `null` for non-Windows operate system.
 * 
 * > **🛡️ Require Runtime Permissions**
 * > 
 * > - Deno
 * >   - Environment Variable (`env`)
 * >     - `PATHEXT`
 * @returns {string[] | null} Values of the environment variable `PATHEXT`.
 */
export const getEnvPathExt: EnvPathExt["get"] = (): string[] | null => {
	if (!isOSWindows) {
		return null;
	}
	const values: string[] = Array.from(getEnvPathExtInternal().result.values());
	if (values.length > 0) {
		return values;
	}
	return [".EXE", ".CMD", ".BAT", ".COM"];
};
/**
 * Environment variable `PATHEXT` interface.
 */
export const envPathExt: EnvPathExt = Object.freeze({
	add: addEnvPathExt,
	delete: deleteEnvPathExt,
	get: getEnvPathExt
});
export default envPathExt;
