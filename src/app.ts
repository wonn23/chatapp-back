import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { morganMiddleware } from './middlewares/morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const app = express();

app.use(helmet());

// DoS 공격방지, API 남용 방지, 서버 리소스를 위한 요청 속도 제한
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15분
  max: 100, // 각 IP당 최대 100요청
  message: '너무 많은 요청을 보냈습니다. 나중에 다시 시도해 주세요.',
});
app.use(limiter);

app.use(morganMiddleware);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 기본 페이지
app.get('/', (req, res) => {
  res.send('안녕하세요, 기본 페이지입니다.');
});

// 에러 처리 미들웨어
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send('서버 에러가 발생했습니다.');
});

export default app;
