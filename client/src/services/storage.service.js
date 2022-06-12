function StorageService() {
    this.setData = (key, value) => {
        localStorage.setItem(key, value);
    }

    this.getData = (key) => {
        return localStorage.getItem(key);
    }
}

export default StorageService;
