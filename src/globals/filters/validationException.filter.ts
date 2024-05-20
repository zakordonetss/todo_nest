import {
  Catch,
  ArgumentsHost,
  BadRequestException,
  ExceptionFilter,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const errors = exception.getResponse();

    const validationErrors = this.mapValidationErrors(errors);

    response.status(status).json({
      statusCode: status,
      message: 'Validation failed',
      errors: validationErrors,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }

  private mapValidationErrors(error: IValidationError | object | string): {
    [key: string]: string[];
  } {
    if (typeof error === 'string') return { 1: [error] };
    if (typeof error['message'] === 'string') return { 1: [error['message']] };

    if (Array.isArray(error['message'])) {
      return error['message'].reduce(
        (acc, errorMessage, index) => ({ ...acc, [index]: errorMessage }),
        {},
      );
    }
  }
}

interface IValidationError {
  message: string[];
  error: string;
  statusCode: number;
}
