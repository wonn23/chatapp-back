import express from 'express';
import cors from 'cors';
import AppDataSource from './database/data-source';
import { morganMiddleware } from './middlewares/morgan';

const app = express();

app.use(morganMiddleware);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 기본 페이지
app.get('/', (req, res) => {
  res.send('안녕하세요, 기본 페이지입니다.');
});

AppDataSource.initialize()
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch(error => console.log(error));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
