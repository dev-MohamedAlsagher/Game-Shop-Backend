const NOT_FOUND = 'NOT_FOUND';
const VALIDATION_FAILED = 'VALIDATION FAILED';
const UNAUTHORIZED = 'UNAUTHORIZED';
const FORBIDDEN = 'FORBIDDEN';
const REGISTRATIE_FAILED = 'REGISTRATIE FAILED'


class ServiceError extends Error {

  constructor(code, message, details = {}) {
    super(message);
    this.code = code;
    this.details = details;
    this.name = 'ServiceError';
  }


  static notFound(message, details) {
    return new ServiceError(NOT_FOUND, message, details);
  }

  static unauthorized(message, details) {
    return new ServiceError(UNAUTHORIZED, message, details);
  }

  static forbidden(message, details) {
    return new ServiceError(FORBIDDEN, message, details);
  }
  
  static validationFailed(message, details) {
    return new ServiceError(VALIDATION_FAILED, message, details);
  }
  static EmailExists(message, details){
    return new ServiceError(REGISTRATIE_FAILED, message,details);
  }


  get isNotFound() {
    return this.code === NOT_FOUND;
  }


  get isValidationFailed() {
    return this.code === VALIDATION_FAILED;
  }

  get isUnauthorized() {
    return this.code === UNAUTHORIZED;
  }

  
  get isForbidden() {
    return this.code === FORBIDDEN;
  }
}

module.exports = ServiceError;
