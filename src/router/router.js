class Router {
    constructor(routes, notFound) {
        this.routes = routes;
        this.notFound = notFound;
        this.listeners = [];
    }

    matchRoute(path) {
        for (const route of this.routes) {
            const paramNames = [];

            const regexPath = route.path.replace(/:([^/]+)/g, (_, key) => {
                paramNames.push(key);
                return "([^/]+)";
            });

            const match = path.match(new RegExp(`^${regexPath}$`));

            if (match) {
                const params = {};
                paramNames.forEach((name, i) => {
                    params[name] = match[i + 1];
                });

                return { route, params };
            }
        }
        return null;
    }

    getPath() {
        return window.location.pathname;
    }

    getRoute() {
        return this.matchRoute(this.getPath());
    }

    getParams() {
        const match = this.getRoute();
        return match ? match.params : {};
    }

    getComponent() {
        const match = this.getRoute();
        return match ? match.route.component : this.notFound;
    }

    navigate(path) {
        window.history.pushState({}, "", path);
        this.notify();
    }

    subscribe(listener) {
        this.listeners.push(listener);
    }

    notify() {
        this.listeners.forEach((listener) => listener(this.getPath()));
    }

    start() {
        window.addEventListener("popstate", () => {
            this.notify();
        });
    }

    isActive(path) {
        return this.getPath() === path;
    }
}

export default Router;