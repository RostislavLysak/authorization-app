import {Result, ValidationError} from 'express-validator'

interface IApiError {
    status: number
    errors: ValidationError[]
    message: string
}

export default class ApiError extends Error {
    status: IApiError['status'];
    errors: IApiError['errors'];

    constructor(status: IApiError['status'], message: IApiError['message'], errors: IApiError['errors'] = []) {
        super(message)

        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new ApiError(401, 'User not authorized')
    }

    static BadRequest(message: IApiError['message'], errors: IApiError['errors'] = []) {
        return new ApiError(400, message, errors)
    }

    static NotFound(message: IApiError['message'], errors: IApiError['errors'] = []) {
        return new ApiError(404, message, errors)
    }

    static ShouldVerify(message: IApiError['message'], errors: IApiError['errors'] = []) {
        return new ApiError(412, message, errors)
    }
}