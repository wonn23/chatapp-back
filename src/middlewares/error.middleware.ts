import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/app-error';

// 에러 처리 미들웨어
export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  // 기본 상태 코드 설정
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // 개발 환경에서만 에러 스택을 출력
  if (process.env.NODE_ENV === 'development') {
    console.error('ERROR 💥:', err);
  }

  // 클라이언트에게 에러 응답 전송
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {}),
  });
};
