import { getEnvPathExt } from "./pathext.ts";
Deno.test("Get", {
	permissions: {
		env: ["PATHEXT"]
	}
}, () => {
	console.log(getEnvPathExt());
});
