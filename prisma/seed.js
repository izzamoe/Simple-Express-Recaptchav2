import { PrismaClient } from "@prisma/client";
// import bcrypt from 'bcrypt';

const prisma = new PrismaClient();



const user1 = await prisma.user.create({
    data: {
        username: 'user1',
        password: "11",
        createTime: new Date(),
    },
});

const user2 = await prisma.user.create({
    data: {
        username: 'user2',
        password: "11",
        createTime: new Date(),
    },
});

console.log({ user1, user2 });

//
// async function main() {
//
//
//
//
//
//
// }
//
// main()
//     .catch((e) => {
//         console.error(e);
//         process.exit(1);
//     })
//     .finally(async () => {
//         await prisma.$disconnect();
//     });