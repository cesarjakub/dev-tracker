import Router from "./router.js";
import {notFound, routes} from "./routes.js";

const router = new Router(routes, notFound);

export default router;