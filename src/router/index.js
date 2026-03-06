import Router from "./Router.js";
import {notFound, routes} from "./routes.js";

const router = new Router(routes, notFound);

export default router;