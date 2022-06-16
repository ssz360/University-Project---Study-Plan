function checkEmail(str) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(str);
}



module.exports = { checkEmail }