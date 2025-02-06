/**
 * Delete an environment variable.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable \[Deno: `env`\]
 * >   - *Resources*
 * @param {string} key Key of the environment variable.
 * @returns {void}
 */
export function deleteEnv(key: string): void {
	return Deno.env.delete(key);
}
/**
 * Get a snapshot of the environment variables at invocation as a simple object of keys and values.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable \[Deno: `env`\]
 * >   - *Resources*
 * @returns {{ [key: string]: string; }} A snapshot of the environment variables.
 */
export function getAllEnv(): { [key: string]: string; } {
	return Deno.env.toObject();
}
/**
 * Get the value of an environment variable.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable \[Deno: `env`\]
 * >   - *Resources*
 * @param {string} key Key of the environment variable.
 * @returns {string | undefined} Value of the environment variable.
 */
export function getEnv(key: string): string | undefined {
	return Deno.env.get(key);
}
/**
 * Check whether an environment variable is present.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable \[Deno: `env`\]
 * >   - *Resources*
 * @param {string} key Key of the environment variable.
 * @returns {boolean} Determine result.
 */
export function hasEnv(key: string): boolean {
	return Deno.env.has(key);
}
/**
 * Set an environment variable.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable \[Deno: `env`\]
 * >   - *Resources*
 * @param {string} key Key of the environment variable.
 * @param {string} value Value of the environment variable.
 * @returns {void}
 */
export function setEnv(key: string, value: string): void {
	return Deno.env.set(key, value);
}
/**
 * Environment variables interface.
 */
export interface Env {
	/**
	 * Delete an environment variable.
	 * 
	 * > **🛡️ Runtime Permissions**
	 * > 
	 * > - Environment Variable \[Deno: `env`\]
	 * >   - *Resources*
	 * @param {string} key Key of the environment variable.
	 * @returns {void}
	 */
	delete(key: string): void;
	/**
	 * Get the value of an environment variable.
	 * 
	 * > **🛡️ Runtime Permissions**
	 * > 
	 * > - Environment Variable \[Deno: `env`\]
	 * >   - *Resources*
	 * @param {string} key Key of the environment variable.
	 * @returns {string | undefined} Value of the environment variable.
	 */
	get(key: string): string | undefined;
	/**
	 * Get a snapshot of the environment variables at invocation as a simple object of keys and values.
	 * 
	 * > **🛡️ Runtime Permissions**
	 * > 
	 * > - Environment Variable \[Deno: `env`\]
	 * >   - *Resources*
	 * @returns {{ [key: string]: string; }} A snapshot of the environment variables.
	 */
	getAll(): { [key: string]: string; };
	/**
	 * Check whether an environment variable is present.
	 * 
	 * > **🛡️ Runtime Permissions**
	 * > 
	 * > - Environment Variable \[Deno: `env`\]
	 * >   - *Resources*
	 * @param {string} key Key of the environment variable.
	 * @returns {boolean} Determine result.
	 */
	has(key: string): boolean;
	/**
	 * Set an environment variable.
	 * 
	 * > **🛡️ Runtime Permissions**
	 * > 
	 * > - Environment Variable \[Deno: `env`\]
	 * >   - *Resources*
	 * @param {string} key Key of the environment variable.
	 * @param {string} value Value of the environment variable.
	 * @returns {void}
	 */
	set(key: string, value: string): void;
}
/**
 * Environment variables interface.
 */
export const env: Env = Object.freeze({
	delete: deleteEnv,
	get: getEnv,
	getAll: getAllEnv,
	has: hasEnv,
	set: setEnv
});
export default env;
