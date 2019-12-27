/*
 *   VALIDATE
 */

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
    let regExp = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)(?:0?2|(?:Feb))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

    return regExp.test(date);
};

validator.validateTime = function(time){
    let regExp = /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/;
    return regExp.test(time);
}

module.exports= validator;
