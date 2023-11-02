import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
    log: [
        { emit: 'stdout', level: 'warn' },
        { emit: 'stdout', level: 'error' }
    ]
})

export const Restaurants = prisma.restaurants
export const Menus = prisma.menus
