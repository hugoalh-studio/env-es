import { isOSWindows } from "./_info.ts";
import { envDelimitation } from "./delimitation.ts";
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
	 * > **🛡️ Runtime Permissions**
	 * > 
	 * > - Environment Variable \[Deno: `env`\]
	 * >   - `PATHEXT` (Windows Platforms)
	 * @param {...string} values Value that need to add to the environment variable `PATHEXT`.
	 * @returns {void}
	 */
	add(...values: string[]): void;
	/**
	 * Delete value from the environment variable `PATHEXT`.
	 * 
	 * > **🛡️ Runtime Permissions**
	 * > 
	 * > - Environment Variable \[Deno: `env`\]
	 * >   - `PATHEXT` (Windows Platforms)
	 * @param {...string} values Value that need to delete from the environment variable `PATHEXT`.
	 * @returns {void}
	 */
	delete(...values: string[]): void;
	/**
	 * Get the values of the environment variable `PATHEXT`; Always return `null` for non Windows platforms.
	 * 
	 * > **🛡️ Runtime Permissions**
	 * > 
	 * > - Environment Variable \[Deno: `env`\]
	 * >   - `PATHEXT` (Windows Platforms)
	 * @returns {string[] | null} Values of the environment variable `PATHEXT`.
	 */
	get(): string[] | null;
}
/**
 * Add value to the environment variable `PATHEXT`.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable \[Deno: `env`\]
 * >   - `PATHEXT` (Windows Platforms)
 * @param {...string} values Value that need to add to the environment variable `PATHEXT`.
 * @returns {void}
 */
export function addEnvPathExt(...values: string[]): void {
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
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable \[Deno: `env`\]
 * >   - `PATHEXT` (Windows Platforms)
 * @param {...string} values Value that need to delete from the environment variable `PATHEXT`.
 * @returns {void}
 */
export function deleteEnvPathExt(...values: string[]): void {
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
 * Get the values of the environment variable `PATHEXT`; Always return `null` for non Windows platforms.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable \[Deno: `env`\]
 * >   - `PATHEXT` (Windows Platforms)
 * @returns {string[] | null} Values of the environment variable `PATHEXT`.
 */
export function getEnvPathExt(): string[] | null {
	if (!isOSWindows) {
		return null;
	}
	const values: string[] = Array.from(getEnvPathExtInternal().result.values());
	if (values.length > 0) {
		return values;
	}
	return [".com", ".exe", ".bat", ".cmd", ".vbs", ".vbe", ".js", ".jse", ".wsf", ".wsh", ".msc"];
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
