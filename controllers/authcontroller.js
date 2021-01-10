const User = require('../models/user_model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function(err, hasedpass){
        if(err) {
            res.json({
                error: err
            }).redirect('/register')
        }

        let user = new User({
            user: req.body.username,
            email: req.body.email,
            password: hasedpass
        })
        user.save()
        .then(user => {
          const message = "User Registered!"
          res.redirect('/register/?message='+message);
        })
        .catch(error => {
            const message = "An error occurred!";
            res.redirect('/register/?message=' +message+';'+error);
    })
    })
}

const login = (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;
    //console.log(username);

    User.findOne({$or: [{email:username},{user:username}]})
    .then(user => {
        
        if(user){
            bcrypt.compare(password, user.password, function(err, result){
                if(err){
                    res.json({
                        error: err
                    })
                    
                }
                if(result){
                    const expiration = 1800000000;
                    let token = jwt.sign({name: user.name}, process.env.JWT_SECRET)
                    console.log(token);

                    res.cookie('token', token, {
                        expires: new Date(Date.now() + expiration),
                        secure: false, // set to true if your using https
                        httpOnly: true,
                      });
                    res.cookie('user', user, {
                        expires: new Date(Date.now() + expiration),
                        secure: false, // set to true if your using https
                        httpOnly: true,
                      });
                      
                      const message = "User Loged in!"
                      res.redirect('/?message='+message);
                      
                }else{
                    const message = 'Wrong password!!!';
                    res.redirect('/login/?message=' +message);
                }
            })
                }else{
                    const message = 'User not found!';
                    res.redirect('/login/?message=' +message);
            
        }
    })

}

module.exports = {
    register, login
}
