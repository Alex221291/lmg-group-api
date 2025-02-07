import { HttpException, HttpStatus } from '@nestjs/common';

export class ApiError extends HttpException {
  constructor(error: any) {
    super(error, HttpStatus.BAD_REQUEST);
  }
}