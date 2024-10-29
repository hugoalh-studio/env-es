import { assert } from "STD/assert/assert";
import {
	getAllExecutable,
	getExecutable
} from "./executable.ts";
Deno.test("Get All", {
	permissions: {
		env: ["PATH", "PATHEXT"],
		read: true,
		sys: ["gid", "uid"]
	}
}, async () => {
	for await (const value of getAllExecutable()) {
		console.log(value);
	};
});
Deno.test("Get `git`", {
	permissions: {
		env: ["PATH", "PATHEXT"],
		read: true,
		sys: ["gid", "uid"]
	}
}, async () => {
	assert(await getExecutable("git"));
});
