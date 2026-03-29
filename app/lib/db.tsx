import { PrismaClient } from "@/prisma/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool as any);

const prismaClientSingleton = () => {
  return new PrismaClient({ adapter }).$extends({
    model: {
      $allModels: {
        async paginate<T, A>(
          this: T,
          args: A,
          options: { page: number; limit: number },
        ) {
          const page = options?.page || 1;
          const limit = options?.limit || 10;
          const skip = (page - 1) * limit;

          const [data, total] = await Promise.all([
            (this as any).findMany({
              ...(args || {}),
              skip,
              take: limit,
            }),
            (this as any).count({ where: (args as any)?.where }),
          ]);

          const totalPages = Math.ceil(total / limit);

          return {
            data,
            meta: {
              total,
              page,
              limit,
              totalPages,
              hasNextPage: page < totalPages,
              hasPrevPage: page > 1,
            },
          };
        },
      },
    },
  });
};

declare global {
  var PRISMA: ReturnType<typeof prismaClientSingleton> | undefined;
}

const prisma = globalThis.PRISMA ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.PRISMA = prisma;

export default prisma;
