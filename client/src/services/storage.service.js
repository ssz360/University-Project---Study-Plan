function StorageService() {
    this.setData = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    }

    this.getData = (key) => {
        return JSON.parse(localStorage.getItem(key));
    }

    
    this.deleteData = (key) => {
        return localStorage.removeItem(key);
    }
}

export default StorageService;
