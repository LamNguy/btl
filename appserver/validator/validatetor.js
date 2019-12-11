
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
    let regExp = /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +            "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +            "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$/ ;
    return regExp.test(name);
}



//17021280

module.exports= validator;