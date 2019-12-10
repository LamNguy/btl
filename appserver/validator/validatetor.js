
const validator = {} ;

validator.validateEmail = function(email) {

    let regExp = /(^((?=(1))\d{8})*@vnu.edu.vn$)/;
    return regExp.test(email)
};


validator.validateId  =function (id) {
    let regExp = /^((?=(1))\d{8}$)/ ;
    return regExp.test(id);
}


validator.validateName =function (name){
    let regExp = /^([A-Za-z]* *[A-Za-z]* *[A-Za-z]* *[A-Za-z]* *[A-Za-z]){5,30}$/ ;
    return regExp.test(name);
}



//17021280

module.exports= validator;