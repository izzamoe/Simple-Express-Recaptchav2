import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();



const hashedPassword1 = await bcrypt.hash('root', 10);
const user1 = await prisma.user.create({
    data: {
        username: 'root',
        password: hashedPassword1,
        createTime: new Date(),
    },
});