const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://kyunghoon:%23kkh03kkh%23@boilerplate.mtv0y.mongodb.net/boilerplate?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false // 써 줘야 에러가 안난다고 함.
}).then(() => console.log("MongoDB Connected...")) // 연결이 잘되었는지, 안되었는지 확인
  .catch(err => console.log(err)) // 에러가 생길 때 보여줌.


app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))