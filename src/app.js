import express from 'express';
import postsRouter from './routes/posts.router.js';

const app = express();
const PORT = 3000;


app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, PUT, POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next(); // 다음 미들웨어로 넘어가도록 호출
});

app.use('/', [postsRouter]);

app.listen(PORT, () => {
    console.log(PORT, '포트로 서버가 열렸어요!');
});
