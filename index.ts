import express, { Request, Response } from "express";
import { DBClient, getUsers } from "./db";
const app = express();

const serverName: string = "Hello World";

const options = {
	dotfiles: "ignore",
	etag: false,
	extensions: ["htm", "html"],
	index: ["index.html"],
	maxAge: "1d",
	redirect: false,
	setHeaders(res: Response) {
		res.set("x-timestamp", "Date.now: " + Date.now());
	},
};

app.use(express.static("public", options));

// * to see it on yourself. try to open your browser and type this url http://localhost:13005/add?a=3&b=4

app.get("/add", (req: Request, res: Response) => {
	// const url = new URL(req.url, `http://${req.headers.host}`);
	// const a = parseInt(url.searchParams.get("a") || "0");
	// const b = parseInt(url.searchParams.get("b") || "0");

	// * reference: https://expressjs.com/en/guide/migrating-5.html#req.query
	const a = parseInt((req.query.a as string) || "0");
	const b = parseInt((req.query.b as string) || "0");
	res.json({ message: "Addition", result: a + b });
});

app.get("/api/users", async (req: Request, res: Response) => {
	await DBClient.getInstance().connect();
	const users = await getUsers();
	res.json({ message: "List of users", users: users });
});

app.listen(13005, () => {
	console.log(`Server [${serverName}] is running on port 13005 ....`);
}).on("error", (err) => {
	console.error(err);
});
