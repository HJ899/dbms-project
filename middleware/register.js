exports.getRegister = (req,res,next) => {
    const role = req.params.role;
    console.log(role);
    res.send('Hello');
}