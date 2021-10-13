export default class AppError extends Error {
  status: 'fail' | 'error';
  isOperational: boolean = true;

  constructor(public message: string, public statusCode: number) {
    super(message);
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    Error.captureStackTrace(this, this.constructor);
  }
}
