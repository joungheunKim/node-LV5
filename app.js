const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;
const dotenv = require('dotenv')
dotenv.config()

const router = require('./routes')

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));
app.use(express.static('assets'));

app.use('/api', router);

app.listen(PORT, () => {
  console.log(PORT, '포트 번호로 서버가 실행되었습니다.');
});


