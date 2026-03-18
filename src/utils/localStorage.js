class LocalStorage{
    constructor(){}

    setObject(key, object){
        const data= JSON.stringify(object);
        window.localStorage.setItem(key, data);
    }

    getObject(key){
        const object = window.localStorage.getItem(key);
        return object ? JSON.parse(object) : [];
    }

    remove(key){
        localStorage.removeItem(key);
    }
}

export default new LocalStorage();