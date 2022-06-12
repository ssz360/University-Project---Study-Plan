function StorageService() {
    this.setData = (key, value) => {
        localStorage.setItem(key, value);
    }

    this.getData = (key) => {
        return localStorage.getItem(key);
    }

    
    this.deleteData = (key) => {
        return localStorage.removeItem(key);
    }
}

export default StorageService;
