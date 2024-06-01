import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const password = "123456";

const hashPasswordFunctionality = async (password: string) => {
  return await bcrypt.hash(password, 10);
}



async function main() {
  let hashedPassword : string = await hashPasswordFunctionality(password);
  
  const users: Prisma.UserCreateInput[] = [
    {
      email: "j@gmail.com",
      password: hashedPassword,
      phoneNumber: "1234567890",
      fullName: "John Doe",
    },
    {
      email: "b@gmail.com",
      password: hashedPassword,
      phoneNumber: "1234567890",
      fullName: "Bob Doe",
    }
  ]

  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });