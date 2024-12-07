import jsonServer from "json-server";
import path from "path";
import fs from "fs";

const dbFile = path.resolve("db", "db.json");

function getDB() {
    const file = fs.readFileSync(dbFile, "utf8");
    return JSON.parse(file);
}

const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const router = jsonServer.router(dbFile);

server.set("view engine", "ejs");

server.use(middlewares);

server.get("/", function (req, res) {
    const dbData = getDB();
    res.render("index", {
        ...dbData,
        services: dbData.services.sort((a: any, b: any) => a.sort - b.sort),
    });
});

server.use("/api", router);

server.listen(3001, () => {
    console.log("JSON Server is running on http://localhost:3001");
});
