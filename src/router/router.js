/**
 * A minimal hash-free client-side router.
 *
 * Supports parameterised routes (`:param`), programmatic navigation, popstate
 * handling, and a simple pub/sub mechanism so UI components can react to
 * location changes.
 *
 * @class Router
 */
class Router {

    /**
     * Creates a Router instance.
     *
     * @param {RouteDefinition[]}      routes   - Array of route definitions to match against.
     * @param {React.ComponentType}    notFound - Fallback component rendered when no route matches.
     */
    constructor(routes, notFound) {
        this.routes = routes;
        this.notFound = notFound;
        this.listeners = [];
    }

    /**
     * Attempts to match `path` against every registered route in order.
     * Extracts named parameters from `:param` segments.
     *
     * @param {string} path - The URL pathname to match (e.g. `/projects/my-app`).
     * @returns {RouteMatch|null} The first matching route and its params, or `null` when nothing matches.
     */
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

    /**
     * Returns the current browser pathname.
     *
     * @returns {string} The value of `window.location.pathname`.
     */
    getPath() {
        return window.location.pathname;
    }

    /**
     * Resolves the current pathname to a route match.
     *
     * @returns {RouteMatch|null} The matched route, or `null` when no route matches.
     */
    getRoute() {
        return this.matchRoute(this.getPath());
    }

    /**
     * Returns the dynamic path parameters for the current URL.
     *
     * @returns {Object.<string,string>} Key/value pairs of URL parameters, or an empty object.
     */
    getParams() {
        const match = this.getRoute();
        return match ? match.params : {};
    }

    /**
     * Returns the React component associated with the current route.
     * Falls back to `this.notFound` when no route matches.
     *
     * @returns {React.ComponentType} The component to render.
     */
    getComponent() {
        const match = this.getRoute();
        return match ? match.route.component : this.notFound;
    }

    /**
     * Navigates to `path` by pushing a new entry onto the browser history stack
     * and notifying all subscribers.
     *
     * @param {string} path - Absolute pathname to navigate to (e.g. `/to-do`).
     * @returns {void}
     */
    navigate(path) {
        window.history.pushState({}, "", path);
        this.notify();
    }

    /**
     * Registers a listener that is called whenever the active route changes.
     *
     * @param {function(string): void} listener - Callback receiving the new pathname.
     * @returns {void}
     */
    subscribe(listener) {
        this.listeners.push(listener);
    }

    /**
     * Invokes all registered listeners with the current pathname.
     *
     * @returns {void}
     */
    notify() {
        this.listeners.forEach((listener) => listener(this.getPath()));
    }

    /**
     * Attaches a `popstate` event listener so back/forward browser navigation
     * triggers subscriber notifications.
     * Call once during application initialisation.
     *
     * @returns {void}
     */
    start() {
        window.addEventListener("popstate", () => {
            this.notify();
        });
    }

    /**
     * Returns whether the given path exactly matches the current location.
     *
     * @param {string} path - Pathname to test.
     * @returns {boolean} `true` when `path` equals `window.location.pathname`.
     */
    isActive(path) {
        return this.getPath() === path;
    }
}

export default Router;