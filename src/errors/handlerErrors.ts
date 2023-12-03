import { NextFunction, Request, Response } from 'express';
import {
  UniqueConstraintError,
  ValidationError,
  ConnectionError,
  DatabaseError,
  QueryError,
} from 'sequelize';
import { ClientError, ServerError } from '.';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
): void => {
  if (error instanceof UniqueConstraintError) {
    const message = `Duplicate entry: ${error.errors[0]?.value}`;
    res.status(409).json({ message });
  } else if (error instanceof ValidationError) {
    const message = error.errors.map(e => e.message).join(', ');
    res.status(400).json({ message });
  } else if (error instanceof ConnectionError) {
    res.status(500).json({ message: 'Error de conexion' });
  } else if (error instanceof DatabaseError) {
    res.status(500).json({ message: `Error de base de datos: ${error.message}` });
  } else if (error instanceof QueryError) {
    res.status(500).json({ message: 'Error de consulta' });
  } else if (error instanceof ClientError || error instanceof ServerError) {
    res.status(error.StatusCode).json({
      message: error.message,
    });
  } else {
    console.error(error.name, error.message);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
