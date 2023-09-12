import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const server = Bun.serve({
  port: 3000,
  async fetch(request) {
    const { pathname } = new URL(request.url);
    const requestType = request.method;
    let response;
    if (pathname === "/users") {
      const users = await prisma.user.findMany();
      response = JSON.stringify(users);
    } else {
      response = "Try localhost:3000/users" + " method: " + requestType;
    }
    return new Response(response as any);
  },
});

console.log(`Listening on localhost: ${server.port}`);
// create a new user
// await prisma.user.create({
//   data: {
//     name: "John Dough",
//     email: `john-${Math.floor(Math.random() * 2147483648)}@example.com`,
//   },
// });

// count the number of users
// const count = await prisma.user.count();
// console.log(`There are ${count} users in the database.`);
