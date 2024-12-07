import jsonServer from "json-server";
import { authMiddleware } from "./isAuthificated";
import { DB_FILE_PATH } from "./config";
import { getDB } from "./getDB";

const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const router = jsonServer.router(DB_FILE_PATH);

server.set("view engine", "ejs");

server.use(middlewares);
server.use(authMiddleware);

server.get("/", function (req, res) {
    const dbData = getDB();
    res.render("index", {
        ...dbData,
        services: dbData.services.sort((a: any, b: any) => a.sort - b.sort),
    });
});

server.post("/api/login", function (req, res) {
    res.json({ success: true });
});

server.use("/api", router);

server.listen(3001, () => {
    console.log("JSON Server is running on http://localhost:3001");
});
