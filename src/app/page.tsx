import { TodoItem } from "@/components/TodoItem";
import { prisma } from "@/db";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";

function getTodos() {
  return prisma.todo.findMany();
}

async function toggleTodo(id: string, complete: boolean) {
  "use server";

  await prisma.todo.update({ where: { id }, data: { complete } });
}

export default async function Home() {
  const todos = await getTodos();

  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Todos</h1>
        <Link
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          href="/new"
        >
          New
        </Link>
      </header>
      <ul className="pl-4">
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
        ))}
      </ul>
    </>
  );
}

//! ************************************************************************************

//! npx create-next-app@latest .  son son soru haricinde hepsi yes
//! npm i prisma --save-dev
//! npx prisma init --datasource-provider sqlite
//! .gitignore  file la .env ekle
//! schema.prisma dosyasina sunlari yaz;
//! model Todo{
//!   id        String @id @default(uuid())
//!   title     String
//!   complete  Boolean
//!   createdAt DateTime @default(now())
//!   updatedAt DateTime @updatedAt
//! }
//! npx prisma migrate dev --name init
//! .gitignore file la dev.db* ekle
//! src folder i icine db.ts file ac. ve db.ts dosyasi icine import { PrismaClient } from "@prisma/client" yaz. aslinda https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices sitesinden db.ts dosyasi icin kismi kopyala.
//! start application  npm run dev
//! global.css i temizle, sadece ilk 3 satir kalsin.
//! layout.tex icinde export const metadata: Metadata = {title: "Todo App Next.js",} degistir.
//!  route icin app folder icinde new folder olusturup icine page.tsx acalim.

