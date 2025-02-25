const { User } = require('../models/User')

let auth = (req, res, next) => {
    // 인증 처리를 하는 곳

    // 클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth;

    // 토큰을 복호화 한후 유저를 찾는다.
    User.findByToken(token, (err, user) => {
        if(err) {
            throw err;
        } 

        if(!user) {
            console.log(token)
            console.log("auth : !user")
            return res.json({ isAuth: false, error: true })
        } 

        req.token = token;
        req.user = user;
        next(); // next()를 안해주면 middleware에서 갇힌다.
    });

    // 유저가 있으면 인증 OK

    // 유저가 없으면 인증 NO
};

module.exports = { auth };