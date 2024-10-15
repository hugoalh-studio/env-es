import { getAllEnv } from "./env.ts";
Deno.test("Get All", {
	permissions: {
		env: true
	}
}, () => {
	console.log(getAllEnv());
});
