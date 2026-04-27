/**
 * Thin abstraction over `window.localStorage` for storing serialisable objects.
 * Exported as a singleton – import and use directly without instantiating.
 *
 * @class LocalStorage
 */
class LocalStorage{
    constructor(){}

    /**
     * Serialises `object` to a JSON string and saves it under `key`.
     *
     * @param {string} key    - The storage key.
     * @param {*}      object - Any JSON-serialisable value.
     * @returns {void}
     */
    setObject(key, object){
        const data= JSON.stringify(object);
        window.localStorage.setItem(key, data);
    }

    /**
     * Retrieves and deserialises the value stored under `key`.
     * Returns an empty array when the key does not exist.
     *
     * @param {string} key - The storage key.
     * @returns {*} The parsed value, or `[]` when the key is absent.
     */
    getObject(key){
        const object = window.localStorage.getItem(key);
        return object ? JSON.parse(object) : [];
    }

    /**
     * Removes the entry identified by `key` from localStorage.
     *
     * @param {string} key - The storage key to remove.
     * @returns {void}
     */
    remove(key){
        localStorage.removeItem(key);
    }
}

export default new LocalStorage();