import { initTRPC } from '@trpc/server';

// Instância única exigida
const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;
