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
 * Delete an environment variable.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable \[Deno: `env`\]
 * >   - *Resources*
 * @param {string} key Key of the environment variable.
 * @returns {void}
 */
export const deleteEnv: Env["delete"] = Deno.env.delete;
/**
 * Get a snapshot of the environment variables at invocation as a simple object of keys and values.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable \[Deno: `env`\]
 * >   - *Resources*
 * @returns {{ [key: string]: string; }} A snapshot of the environment variables.
 */
export const getAllEnv: Env["getAll"] = Deno.env.toObject;
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
export const getEnv: Env["get"] = Deno.env.get;
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
export const hasEnv: Env["has"] = Deno.env.has;
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
export const setEnv: Env["set"] = Deno.env.set;
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
