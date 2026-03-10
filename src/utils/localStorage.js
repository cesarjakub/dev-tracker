class LocalStorage{
    constructor(){}

    setObject(key, object){
        const data= JSON.stringify(object);
        localStorage.setItem(key, data);
    }

    getObject(key){
        const object = localStorage.getItem(key);
        return JSON.parse(object);
    }

    remove(key){
        localStorage.removeItem(key);
    }
}

export default LocalStorage;