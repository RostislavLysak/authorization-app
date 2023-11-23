import type { Response, Request, NextFunction } from 'express'
import ApiError from '../exceptions/api-error'
import tokenService from '../service/token-service'

export default function(req: Request, res: Response, next: NextFunction) {
    try {
        const authorizationHeaders = req.headers['authorization']

        if(!authorizationHeaders) {
            return next(ApiError.UnauthorizedError())
        }

        const accessToken = authorizationHeaders.split(' ')[1]

        if(!accessToken) {
            return next(ApiError.UnauthorizedError())
        }

        const userData = tokenService.validateAccessToken(accessToken)

        if(!userData) {
            return next(ApiError.UnauthorizedError())
        }

        req.user = userData
        
        next()
    } catch (error) {
        return next(ApiError.UnauthorizedError())
    }
}