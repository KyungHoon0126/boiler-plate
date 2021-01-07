const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const config = require('./config/key')

const { auth } = require("./middleware/auth")
const { User } = require("./models/User")

// CORS : 웹에서 서버에 접근할 때 크롬 보안 정책 오류
// app.use() : 서버를 프로그래밍할 때 꼭 필요한 모듈들을 사용하는 것, middleware 역할
app.use(bodyParser.urlencoded({extended: true})) // application/x-www-form-urlencoded을 분석해서 가져옴.
app.use(bodyParser.json()) // application/json을 분석해서 가져옴.

app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false // 써 줘야 에러가 안난다고 함.
}).then(() => console.log("MongoDB Connected...")) // 연결이 잘되었는지, 안되었는지 확인
  .catch(err => console.log(err)) // 에러가 생길 때 보여줌.


app.get('/', (req, res) => res.send('Hello World!'))

// router : 경로
app.post('/api/users/register', (req, res) => {
    // 회원 가입 할때 필요한 정보들을 client에서 가져오면
    // 그것들을 데이터 베이스에 넣어준다.
    const user = new User(req.body)
    
    user.save((err, userInfo) => {
        if (err) return res.json({success: false, err})
        return res.status(200).json({
            success: true
        })
    })
})

app.post('/api/users/login', (req, res) => {
    // 요청된 이메일을 데이터베이스에서 있는지 찾는다.
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        };

        // 요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인.
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) {
                return res.json({ 
                    loginSuccess: false, 
                    message: "비밀번호가 틀렸습니다." 
                })
            };   

            // 비밀번호 까지 맞다면 토큰을 생성하기.
            user.generateToken((err, user) => {
                if (err) {
                    console.log(err)
                    return res.status(400).send(err)
                }

                // 토큰을 저장한다. 어디에? 쿠키, 로컬스토리지
                res.cookie("x_auth", user.token)
                   .status(200)
                   .json({
                       loginSuccess: true,
                       userId: user._id
                   });
            });
        });
    });
});

app.get('/api/users/auth', auth, (req, res) => {
    // 미들 웨어 : endpoint에서 request를 받은 다음에 callBack function 전에 중간에 뭐를 해주는 것.
    // 여기서 미들 웨어는 auth

    // 여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication이 True라는 말.
    res.status(200).json({
        _id: req.userId,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role : req.user.role,
        image: req.user.image
    });    
});

app.get("/api/users/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))