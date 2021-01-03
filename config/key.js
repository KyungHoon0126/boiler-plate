if (process.env.NODE_ENV === 'production') { // 환경 변수
    module.exports = require('./prod');
}