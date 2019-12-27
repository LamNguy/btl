/*
 *  TODO : Testing message response
 */

module.exports = {

    canNotFound : { message : "Can not found !"},
    canNotCreate: { message : "Can not create !"},
    Success : {message: 'success', success: true},
    Fail :{message : 'error' , success:false } ,
    canNotBlank :"This field can not be blanked",
    invalidName :"Invalid: name must contain only letters,min length:5 characters,max length:30 characters ",
    invalidId   :"Invalid: id must only number,8 characters and start by 1",
    invalidEmail:"Invalid: your email must match id@vnu.edu.vn",
    invalidTime: "Invalid time format xx:yy",
    invalidDate :"Invalid date format: dd/mm/yyyy",
    NotFoundDelete : "Can not find to delete",
    NotFoundUpdate : "Can not find to update"

}
