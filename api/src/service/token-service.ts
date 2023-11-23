import { IUserDto } from "@/dtos/user-dto"
import jwt from 'jsonwebtoken'
import tokenModel from '../models/token-model'
import { DeleteResult } from "mongodb"
import config from "../config"
console.log(config)

class TokenService {
    generateTokens(payload: IUserDto) {
        const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET, {expiresIn: '24h'})
        const refreshToken = jwt.sign(payload, config.JWT_REFRESH_SECRET, {expiresIn: '30d'})

        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token: string) {
        try {
            const userData = jwt.verify(token, config.JWT_ACCESS_SECRET)

            return userData as IUserDto
        } catch (error) {
            return null
        }
    }

    validateRefreshToken(token: string) {
        try {
            const userData = jwt.verify(token, config.JWT_REFRESH_SECRET)

            return userData as IUserDto
        } catch (error) {
            return null
        }
    }

    async saveToken(userId: IUserDto['id'], refreshToken: string) {
        const tokenData = await tokenModel.findOne({user: userId})

        if(tokenData) {
            tokenData.refreshToken = refreshToken
            
            return tokenData.save()
        }

        const token = await tokenModel.create({user: userId, refreshToken})

        return token.save()
    }

    async removeToken(refreshToken: string): Promise<DeleteResult> {
        const tokenData = await tokenModel.deleteOne({refreshToken})

        return tokenData
    }

    async findToken(refreshToken: string) {
        
        const tokenData = await tokenModel.findOne({refreshToken})

        return tokenData
    }
}

export default new TokenService()