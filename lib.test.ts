import assert from "node:assert";

import test, { mock } from "node:test";
import { add, subtract } from "./lib";
import { DBClient, getUsers } from "./db";

test("lib", () => {
	assert.strictEqual(1 + 1, 2);
});

test("lib add()", () => {
	assert.strictEqual(add(1, 1), 2);
});

test("lib subtract()", () => {
	assert.strictEqual(subtract(4, 1), 3);
});

// ! not tested
test("DBClient should return the same instance", async (t) => {
	const instance1 = DBClient.getInstance();
	const instance2 = DBClient.getInstance();
	assert.strictEqual(instance1, instance2);
});

test("getUsers should return an array of users", async (t) => {
	// Mock the PoolClient's query method
	const mockRows = [
		{ id: 1, name: "Alice" },
		{ id: 2, name: "Bob" },
	];

	const mockQuery = mock.method(
		DBClient.getInstance().db,
		"query",
		async () => {
			return { rows: mockRows };
		}
	);

	const users = await getUsers();

	assert.strictEqual(mockQuery.mock.calls, users);
});

