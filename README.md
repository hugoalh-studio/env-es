# Env (ES)

[**⚖️** MIT](./LICENSE.md)

[![GitHub: hugoalh/env-es](https://img.shields.io/github/v/release/hugoalh/env-es?label=hugoalh/env-es&labelColor=181717&logo=github&logoColor=ffffff&sort=semver&style=flat "GitHub: hugoalh/env-es")](https://github.com/hugoalh/env-es)
[![JSR: @hugoalh/env](https://img.shields.io/jsr/v/@hugoalh/env?label=@hugoalh/env&labelColor=F7DF1E&logo=jsr&logoColor=000000&style=flat "JSR: @hugoalh/env")](https://jsr.io/@hugoalh/env)
[![NPM: @hugoalh/env](https://img.shields.io/npm/v/@hugoalh/env?label=@hugoalh/env&labelColor=CB3837&logo=npm&logoColor=ffffff&style=flat "NPM: @hugoalh/env")](https://www.npmjs.com/package/@hugoalh/env)

An ES (JavaScript & TypeScript) module for enhanced environment variables operation.

## 🔰 Begin

### 🎯 Targets

|  | **Remote** | **JSR** | **NPM** |
|:--|:--|:--|:--|
| **[Bun](https://bun.sh/)** >= v1.1.0 | ❌ | ❓ | ✔️ |
| **[Deno](https://deno.land/)** >= v1.42.0 | ✔️ | ✔️ | ✔️ |
| **[NodeJS](https://nodejs.org/)** >= v16.13.0 | ❌ | ❓ | ✔️ |

> [!NOTE]
> - It is possible to use this module in other methods/ways which not listed in here, however those methods/ways are not officially supported, and should beware maybe cause security issues.

### #️⃣ Resources Identifier

- **Remote - GitHub Raw:**
  ```
  https://raw.githubusercontent.com/hugoalh/env-es/{Tag}/mod.ts
  ```
- **JSR:**
  ```
  [jsr:]@hugoalh/env[@{Tag}]
  ```
- **NPM:**
  ```
  [npm:]@hugoalh/env[@{Tag}]
  ```

> [!NOTE]
> - For usage of remote resources, it is recommended to import the entire module with the main path `mod.ts`, however it is also able to import part of the module with sub path if available, but do not import if:
>
>   - it's path has an underscore prefix (e.g.: `_foo.ts`, `_util/bar.ts`), or
>   - it is a benchmark or test file (e.g.: `foo.bench.ts`, `foo.test.ts`), or
>   - it's symbol has an underscore prefix (e.g.: `_bar`, `_foo`).
>
>   These elements are not considered part of the public API, thus no stability is guaranteed for them.
> - For usage of JSR or NPM resources, it is recommended to import the entire module with the main entrypoint, however it is also able to import part of the module with sub entrypoint if available, please visit the [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub entrypoints.
> - It is recommended to use this module with tag for immutability.

### 🛡️ Runtime Permissions

- Environment Variable \[Deno: `env`\]
  - `PATH` (Optional)
  - `PATHEXT` (Optional, Windows Platforms)
  - *Resources*
- File System - Read \[Deno: `read`; NodeJS (>= v20.9.0) 🧪: `fs-read`\]
  - *Resources* (Optional)
- System Info \[Deno: `sys`\]
  - `gid` (Optional, POSIX/UNIX Platforms)
  - `uid` (Optional, POSIX/UNIX Platforms)

## 🧩 APIs

- ```ts
  const env: Env;
  ```
- ```ts
  const envPath: EnvPath;
  ```
- ```ts
  const envPathExt: EnvPathExt;
  ```
- ```ts
  interface Env {
    delete(key: string): void;
    get(key: string): string | undefined;
    getAll(): { [key: string]: string; };
    has(key: string): boolean;
    set(key: string, value: string): void;
  }
  ```
- ```ts
  interface EnvPath {
    add(...values: string[]): void;
    delete(...values: string[]): void;
    get(): string[];
  }
  ```
- ```ts
  interface EnvPathExt {
    add(...values: string[]): void;
    delete(...values: string[]): void;
    get(): string[] | null;
  }
  ```

> [!NOTE]
> - For the full or prettier documentation, can visit via:
>   - [Deno CLI `deno doc`](https://docs.deno.com/runtime/reference/cli/documentation_generator/)
>   - [JSR](https://jsr.io/@hugoalh/env)

## ✍️ Examples

- ```ts
  env.set("SOME_VAR", "Value");
  env.has("SOME_VAR");
  //=> true
  env.get("SOME_VAR");
  //=> "Value"
  ```
