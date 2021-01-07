const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50   
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        maxlength: 100
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type:Number,
        default:0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})


// userModel에 user 정보를 저장하기 전에 무엇을 한다음에 끝나면 user 정보를 저장.
userSchema.pre('save', function (next){
    var user = this
    if (user.isModified('password')) {
        // 비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds, function(err, salt){
            if (err) return next(err)

            bcrypt.hash(user.password, salt, function(err, hash){ // hash : 암호화된 비밀번호
                if (err) return next(err)
                user.password = hash // 비밀번호를 암호회된 걸로 교체
                next()
            })
        })   
    } else {
        next()
    }   
}) 

userSchema.methods.comparePassword = function(plainPassword, cb){
    // plainPassword 1234567  ===  암호화된 비밀번호 $2b$10$RwV/xGLEv86gVLqvBNPNDutPhYDV2/uLNhmSmXqCZoseGyYQexxf2
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if (err) {
            console.log(err)    
            return cb(err);
        } 
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb) {
    var user = this;

    // jsonwebtoken을 이용해서 token을 생성하기
    var token =  jwt.sign(user._id.toHexString(),'secret')

    user.token = token;
    user.save(function (err, user){
        if(err) {
            console.log(err)    
            return cb(err)
        }
        cb(null, user);
    })
}

userSchema.statics.findByToken = function(token, cb) {
    var user = this;

    // 토큰을 decode 한다.
    jwt.verify(token, 'secret', function(err, decoded) {
        // 유저 아이디를 이용해서 유저를 찾은 다음에
        // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
        user.findOne({"_id" : decoded, "token": token}, function(err, user) {
            if (err) return cb(err);
            cb(null, user)            
        })        
    })
}
 
const User = mongoose.model('User', userSchema)

module.exports = { User }