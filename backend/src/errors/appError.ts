export class AppError extends Error {

    statusCode: number;
    message: string;

    constructor(statusCode = 400, message: string) {
        super()
        this.statusCode = statusCode
        this.message = message
    }
}