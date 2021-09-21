import express, { Request, Response } from "express";
import { topPlayersController } from "../controllers";

const apiRouter: express.Router = express.Router();

(function registerRoutes() {
    apiRouter.get(`/topPlayers/:category`, topPlayersController);
})();

namespace API {
    interface Route {
        path: string;
        method: "GET" | "POST" | "PUT" | "DELETE";
    }

    const routes: Route[] = [];

    (function getRoutes() {
        for (let i = 0; i < apiRouter.stack.length; i++) {
            routes.push({
                path: apiRouter.stack[i].route.path,
                method: apiRouter.stack[i].route.stack[0].method.toUpperCase(),
            });
        }
    })();

    export function controller(req: Request, res: Response) {
        return res.status(200).json({
            routes,
        });
    }
}

apiRouter.get("", API.controller);

export default apiRouter;
