import fs from "fs";
import { DB_FILE_PATH } from "./config";

export function getDB() {
    const file = fs.readFileSync(DB_FILE_PATH, "utf8");
    return JSON.parse(file);
}
