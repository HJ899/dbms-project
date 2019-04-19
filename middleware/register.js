const roles = require('../config/roles');

exports.getRegister = (req,res,next) => {
    res.send('Hello');
}

exports.getRegisterWithRole = (req,res,next) => {
    const role = req.params.role;
    let check = false;
    for(let role_check of roles.roles){
        if(role_check == role){
            check = true;
        }
    }
    if(!check){
        res.redirect('/register');
    }
    console.log(role);
    res.send('Hello');
}