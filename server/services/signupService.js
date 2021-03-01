const fileServices = require('./fileService');

exports.validate = (credentials) => {

    const {id, name, email, password} = {...credentials};
    const users = fileServices.getFileContents('../data/users.json');

    function validEmail(email) {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
            return (true)
        }
        return (false)
    }

    const validation = users.reduce((checkedObj, user) => {

        if(user.email === email){
            checkedObj.emailError = 'This email is used already.';
            checkedObj.valid = false;
        }

        if(!validEmail(email)){
            checkedObj.emailError = 'Wrong email format.';
            checkedObj.valid = false;
        }

        if(name.trim() === ''){
            checkedObj.nameError = 'Enter a name, please.';
            checkedObj.valid = false;
        }

        if(name.trim().indexOf(' ') === -1){
            checkedObj.nameError = 'Enter both first and last name.';
            checkedObj.valid = false;
        }

        if(password.trim() === ''){
            checkedObj.passwordError = 'Enter a password, please.';
            checkedObj.valid = false;
        }

        if(password.trim().length < 5){
            checkedObj.passwordError = 'The password must have min 5 characters.';
            checkedObj.valid = false;
        }

        return checkedObj;

    }, {nameError:'', emailError:'', passwordError:'', valid:true});

    return validation;
}

  exports.saveUser = (info) => {
      const filePath = '../data/users.json';
      fileServices.writeFileContents(filePath, info);
  }