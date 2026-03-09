class Router {
    constructor(routes, notFound) {
        this.routes = routes;
        this.notFound = notFound;
        this.listeners = [];
    }

    getPath() {
        return window.location.pathname;
    }

    getRoute() {
        const path = this.getPath();
        return this.routes.find((route) => route.path === path);
    }

    getComponent() {
        const route = this.getRoute();
        return route ? route.component : this.notFound;
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