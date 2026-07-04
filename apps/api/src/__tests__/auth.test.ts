import { prisma } from '../config/prisma'
import {getProfile, updateProfile} from '../controllers/userController'
import { Request, Response } from 'express'

jest.mock('../config/prisma', () => ({
    prisma: {
        user: {
            create: jest.fn(),
            update: jest.fn(),
            findUnique: jest.fn()
        }
    }
}))

const mockRequest = {
    body: {
        bio: "bio",
        avatarUrl: "avatarUrl"
    },
    params: {
        id: 1
    },
    user: {
        id: 1
    }
} as unknown as Request

describe("register", () => {

   /* test("should register a new user", () => {
        (prisma.user.create as jest.Mock).mockResolvedValue(profile);
    })*/
})