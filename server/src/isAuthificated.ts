import { Request, RequestHandler } from "express";
import { getDB } from "./getDB";
import md5 from "md5";

const PUBLIC_METHODS = ["GET"];

export const isAuthificated = (req: Request) => {
    if (PUBLIC_METHODS.includes(req.method.toLocaleUpperCase())) {
        return true;
    }

    if (getDB().tokens?.includes(md5(req.headers.authorization || ""))) {
        return true;
    }

    return false;
};

export const authMiddleware: RequestHandler = (req, res, next) => {
    if (isAuthificated(req)) {
        return next();
    }

    res.sendStatus(401);
};
