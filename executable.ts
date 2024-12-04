import { extname as getPathExtname } from "jsr:@std/path@^1.0.8/extname";
import { isAbsolute as isPathAbsolute } from "jsr:@std/path@^1.0.8/is-absolute";
import { join as joinPath } from "jsr:@std/path@^1.0.8/join";
import { isOSWindows } from "./_info.ts";
import { getEnvPath } from "./path.ts";
import { getEnvPathExt } from "./pathext.ts";
export interface GetExecutableOptions {
	/**
	 * Whether to include the entries in the working directory.
	 * 
	 * - **`false`:** Do not include the entries in the working directory.
	 * - **`true`:** Do include the entries in the working directory, which use current process working directory.
	 * - **`string`:** Do include the entries in the working directory, which specify.
	 * @default {false}
	 */
	cwd?: boolean | string;
	/**
	 * Filter the entries which match any filter. Use `string` for exact match, use `RegExp` for expression match. By default, all of the entries will yield.
	 */
	filters?: (string | RegExp)[];
}
export interface ExecutableEntry {
	/**
	 * Basename of the executable.
	 * @example "git.exe"
	 */
	basename: string;
	/**
	 * Name of the executable.
	 * @example "git"
	 */
	name: string;
	/**
	 * Absolute path of the executable.
	 * @example "C:\\Program Files\\Git\\cmd\\git.exe"
	 */
	path: string;
}
/**
 * Get the information of the executables, asynchronously.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable \[Deno: `env`\]
 * >   - `PATH`
 * >   - `PATHEXT` (Windows Platforms)
 * > - File System - Read \[Deno: `read`; NodeJS (>= v20.9.0) 🧪: `fs-read`\]
 * >   - *Resources*
 * > - System Info \[Deno: `sys`\]
 * >   - `gid` (POSIX/UNIX Platforms)
 * >   - `uid` (POSIX/UNIX Platforms)
 * @param {GetExecutableOptions} [options={}] Options.
 * @returns {AsyncGenerator<ExecutableEntry>} An async iterable iterator that yield the information of the executables.
 */
export async function* getAllExecutable(options: GetExecutableOptions = {}): AsyncGenerator<ExecutableEntry> {
	const {
		cwd = false,
		filters = []
	} = options;
	const yielded: Set<string> = new Set<string>();
	const envPathExts: string[] | null = getEnvPathExt();
	const envPaths: string[] = getEnvPath();
	if (typeof cwd === "string") {
		envPaths.unshift(cwd);
	} else if (cwd) {
		envPaths.unshift(Deno.cwd());
	}
	for (const envPath of envPaths.filter((envPath: string): boolean => {
		return isPathAbsolute(envPath);
	})) {
		try {
			for await (const { name: basename } of Deno.readDir(envPath)) {
				const path: string = joinPath(envPath, basename);
				try {
					if (
						!(await isExecutablePathInternal(path, {}, envPathExts)) ||
						yielded.has(path)
					) {
						continue;
					}
				} catch {
					continue;
				}
				const name: string = isOSWindows ? basename.slice(0, basename.length - getPathExtname(basename).length) : basename;
				if (
					filters.length === 0 ||
					(filters.length > 0 && filters.some((filter: string | RegExp): boolean => {
						return ((typeof filter === "string") ? (
							filter === basename ||
							filter === name ||
							filter === path
						) : (
							filter.test(basename) ||
							filter.test(name) ||
							filter.test(path)
						));
					}))
				) {
					yielded.add(path);
					yield {
						basename,
						name,
						path
					};
				}
			}
		} catch (error) {
			if (
				error instanceof Deno.errors.NotADirectory ||
				error instanceof Deno.errors.NotFound ||
				error instanceof Deno.errors.PermissionDenied
			) {
				continue;
			}
			throw error;
		}
	}
}
/**
 * Get the information of the executables, synchronously.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable \[Deno: `env`\]
 * >   - `PATH`
 * >   - `PATHEXT` (Windows Platforms)
 * > - File System - Read \[Deno: `read`; NodeJS (>= v20.9.0) 🧪: `fs-read`\]
 * >   - *Resources*
 * > - System Info \[Deno: `sys`\]
 * >   - `gid` (POSIX/UNIX Platforms)
 * >   - `uid` (POSIX/UNIX Platforms)
 * @param {GetExecutableOptions} [options={}] Options.
 * @returns {Generator<ExecutableEntry>} An iterable iterator that yield the information of the executables.
 */
export function* getAllExecutableSync(options: GetExecutableOptions = {}): Generator<ExecutableEntry> {
	const {
		cwd = false,
		filters = []
	} = options;
	const yielded: Set<string> = new Set<string>();
	const envPathExts: string[] | null = getEnvPathExt();
	const envPaths: string[] = getEnvPath();
	if (typeof cwd === "string") {
		envPaths.unshift(cwd);
	} else if (cwd) {
		envPaths.unshift(Deno.cwd());
	}
	for (const envPath of envPaths.filter((envPath: string): boolean => {
		return isPathAbsolute(envPath);
	})) {
		try {
			for (const { name: basename } of Deno.readDirSync(envPath)) {
				const path: string = joinPath(envPath, basename);
				try {
					if (
						!(isExecutablePathInternalSync(path, {}, envPathExts)) ||
						yielded.has(path)
					) {
						continue;
					}
				} catch {
					continue;
				}
				const name: string = isOSWindows ? basename.slice(0, basename.length - getPathExtname(basename).length) : basename;
				if (
					filters.length === 0 ||
					(filters.length > 0 && filters.some((filter: string | RegExp): boolean => {
						return ((typeof filter === "string") ? (
							filter === basename ||
							filter === name ||
							filter === path
						) : (
							filter.test(basename) ||
							filter.test(name) ||
							filter.test(path)
						));
					}))
				) {
					yielded.add(path);
					yield {
						basename,
						name,
						path
					};
				}
			}
		} catch (error) {
			if (
				error instanceof Deno.errors.NotADirectory ||
				error instanceof Deno.errors.NotFound ||
				error instanceof Deno.errors.PermissionDenied
			) {
				continue;
			}
			throw error;
		}
	}
}
/**
 * Get the information of the executable, asynchronously.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable \[Deno: `env`\]
 * >   - `PATH`
 * >   - `PATHEXT` (Windows Platforms)
 * > - File System - Read \[Deno: `read`; NodeJS (>= v20.9.0) 🧪: `fs-read`\]
 * >   - *Resources*
 * > - System Info \[Deno: `sys`\]
 * >   - `gid` (POSIX/UNIX Platforms)
 * >   - `uid` (POSIX/UNIX Platforms)
 * @param {Omit<GetExecutableOptions, "filter">} [options={}] Options.
 * @returns {Promise<ExecutableEntry | undefined>} The information of the executable.
 */
export async function getExecutable(specifier: string, options: Omit<GetExecutableOptions, "filter"> = {}): Promise<ExecutableEntry | undefined> {
	for await (const element of getAllExecutable({
		...options,
		filters: [specifier]
	})) {
		return element;
	}
	return undefined;
}
/**
 * Get the information of the executable, synchronously.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable \[Deno: `env`\]
 * >   - `PATH`
 * >   - `PATHEXT` (Windows Platforms)
 * > - File System - Read \[Deno: `read`; NodeJS (>= v20.9.0) 🧪: `fs-read`\]
 * >   - *Resources*
 * > - System Info \[Deno: `sys`\]
 * >   - `gid` (POSIX/UNIX Platforms)
 * >   - `uid` (POSIX/UNIX Platforms)
 * @param {Omit<GetExecutableOptions, "filter">} [options={}] Options.
 * @returns {ExecutableEntry | undefined} The information of the executable.
 */
export function getExecutableSync(specifier: string, options: Omit<GetExecutableOptions, "filter"> = {}): ExecutableEntry | undefined {
	for (const element of getAllExecutableSync({
		...options,
		filters: [specifier]
	})) {
		return element;
	}
	return undefined;
}
export interface IsExecutablePathOptions {
	/**
	 * If the path is not exist, whether to return `false` instead of throw an error.
	 * @default {false}
	 */
	mayNotExist?: boolean;
	/**
	 * Effective group ID to check executable mode flags on POSIX/UNIX platforms.
	 * 
	 * Default to the group ID of the current process.
	 */
	gid?: number;
	/**
	 * Effective user ID to check executable mode flags on POSIX/UNIX platforms.
	 * 
	 * Default to the user ID of the current process.
	 */
	uid?: number;
}
/**
 * Determine whether the path is executable on the POSIX/UNIX platforms.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - System Info \[Deno: `sys`\]
 * >   - `gid`
 * >   - `uid`
 * @param {Deno.FileInfo} stat Stat of the path.
 * @param {IsExecutablePathOptions} [options={}] Options.
 * @returns {boolean} Determine result.
 */
function isExecutablePathInternalPOSIX(stat: Deno.FileInfo, options: IsExecutablePathOptions = {}): boolean {
	if (!stat.isFile) {
		return false;
	}
	const ownGid: number | null = options.gid ?? Deno.gid();
	const ownUid: number | null = options.uid ?? Deno.uid();
	if (ownGid === null) {
		throw new Error(`Unable to get the group ID of the process!`);
	}
	if (ownUid === null) {
		throw new Error(`Unable to get the user ID of the process!`);
	}
	const pathGid: number | null = stat.gid;
	const pathMode: number | null = stat.mode;
	const pathUid: number | null = stat.uid;
	if (pathGid === null) {
		throw new Error(`Unable to get the group ID of the file!`);
	}
	if (pathMode === null) {
		throw new Error(`Unable to get the mode of the file!`);
	}
	if (pathUid === null) {
		throw new Error(`Unable to get the user ID of the file!`);
	}
	const g: number = Number.parseInt('010', 8);
	const o: number = Number.parseInt('001', 8);
	const u: number = Number.parseInt('100', 8);
	return (
		Boolean(pathMode & o) ||
		(Boolean(pathMode & g) && ownGid === pathGid) ||
		(Boolean(pathMode & u) && pathUid === ownUid) ||
		(Boolean(pathMode & (u | g)) && ownUid === 0)
	);
}
/**
 * Determine whether the path is executable on the Windows platforms.
 * @returns {boolean} Determine result.
 */
function isExecutablePathInternalWindows(path: string, stat: Deno.FileInfo, pathExts: string[]): boolean {
	if (!stat.isFile) {
		return false;
	}
	const pathLowerCase: string = path.toLowerCase();
	return pathExts.some((pathExt: string): boolean => {
		const pathExtLowerCase: string = pathExt.toLowerCase();
		return (pathLowerCase !== pathExtLowerCase && pathLowerCase.endsWith(pathExtLowerCase));
	});
}
/**
 * Determine whether the path is executable, asynchronously.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable \[Deno: `env`\]
 * >   - `PATHEXT` (Windows Platforms)
 * > - File System - Read \[Deno: `read`; NodeJS (>= v20.9.0) 🧪: `fs-read`\]
 * >   - *Resources*
 * > - System Info \[Deno: `sys`\]
 * >   - `gid` (POSIX/UNIX Platforms)
 * >   - `uid` (POSIX/UNIX Platforms)
 * @returns {Promise<boolean>} Determine result.
 */
async function isExecutablePathInternal(path: string, options: IsExecutablePathOptions, pathExts?: string[] | null): Promise<boolean> {
	const { mayNotExist = false } = options;
	try {
		const stat: Deno.FileInfo = await Deno.stat(path);
		if (isOSWindows) {
			return isExecutablePathInternalWindows(path, stat, pathExts ?? getEnvPathExt()!);
		}
		return isExecutablePathInternalPOSIX(stat, options);
	} catch (error) {
		if (error instanceof Deno.errors.NotFound && mayNotExist) {
			return false;
		}
		throw error;
	}
}
/**
 * Determine whether the path is executable, synchronously.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable \[Deno: `env`\]
 * >   - `PATHEXT` (Windows Platforms)
 * > - File System - Read \[Deno: `read`; NodeJS (>= v20.9.0) 🧪: `fs-read`\]
 * >   - *Resources*
 * > - System Info \[Deno: `sys`\]
 * >   - `gid` (POSIX/UNIX Platforms)
 * >   - `uid` (POSIX/UNIX Platforms)
 * @returns {boolean} Determine result.
 */
function isExecutablePathInternalSync(path: string, options: IsExecutablePathOptions, pathExts?: string[] | null): boolean {
	const { mayNotExist = false } = options;
	try {
		const stat: Deno.FileInfo = Deno.statSync(path);
		if (isOSWindows) {
			return isExecutablePathInternalWindows(path, stat, pathExts ?? getEnvPathExt()!);
		}
		return isExecutablePathInternalPOSIX(stat, options);
	} catch (error) {
		if (error instanceof Deno.errors.NotFound && mayNotExist) {
			return false;
		}
		throw error;
	}
}
/**
 * Determine whether the path is executable on the current platform, asynchronously.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable \[Deno: `env`\]
 * >   - `PATHEXT` (Windows Platforms)
 * > - File System - Read \[Deno: `read`; NodeJS (>= v20.9.0) 🧪: `fs-read`\]
 * >   - *Resources*
 * > - System Info \[Deno: `sys`\]
 * >   - `gid` (POSIX/UNIX Platforms)
 * >   - `uid` (POSIX/UNIX Platforms)
 * @param {string} path Path.
 * @param {IsExecutablePathOptions} [options={}] Options.
 * @returns {Promise<boolean>} Determine result.
 */
export function isExecutablePath(path: string, options: IsExecutablePathOptions = {}): Promise<boolean> {
	return isExecutablePathInternal(path, options);
}
/**
 * Determine whether the path is executable on the current platform, synchronously.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable \[Deno: `env`\]
 * >   - `PATHEXT` (Windows Platforms)
 * > - File System - Read \[Deno: `read`; NodeJS (>= v20.9.0) 🧪: `fs-read`\]
 * >   - *Resources*
 * > - System Info \[Deno: `sys`\]
 * >   - `gid` (POSIX/UNIX Platforms)
 * >   - `uid` (POSIX/UNIX Platforms)
 * @param {string} path Path.
 * @param {IsExecutablePathOptions} [options={}] Options.
 * @returns {boolean} Determine result.
 */
export function isExecutablePathSync(path: string, options: IsExecutablePathOptions = {}): boolean {
	return isExecutablePathInternalSync(path, options);
}
