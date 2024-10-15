import { getEnvPath } from "./path.ts";
Deno.test("Get", {
	permissions: {
		env: ["PATH"]
	}
}, () => {
	console.log(getEnvPath());
});
