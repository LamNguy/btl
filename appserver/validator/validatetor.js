
const validator = {} ;

// match id@vnu.edu.vn
validator.validateEmail = function(email) {

    let regExp = /(^((?=(1))\d{8})*@vnu.edu.vn$)/;
    return regExp.test(email)
};

// only 8 numbers
validator.validateId  =function (id) {
    let regExp = /^((?=(1))\d{8}$)/ ;
    return regExp.test(id);
};

// only letters
validator.validateName =function (name){

    let regExp = /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +            "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềếểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +            "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$/ ;
    return regExp.test(name);
};

// yyyy/mm/dd or yyyy-mm-dd or yyyy.mm.dd
validator.validateDate = function(date){
    let regExp = /^(19|20)\d\d([- /.])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/;
    return regExp.test(date);
};

validator.validateTime = function(time){
    let regExp = /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/;
    return regExp.test(time);
}

module.exports= validator;
