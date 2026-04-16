import express from 'express';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import { router, publicProcedure } from './trpc';

// 1. Nossa "Placa Mae" de rotas do tRPC
const appRouter = router({
  healthCheck: publicProcedure.query(() => {
    return { status: 'ok', message: '📡 Backend Cloud (Azure) 100% Online e Isolado!' };
  }),
});

// A Tipagem exportada será usada no Lovable!
export type AppRouter = typeof appRouter;

// 2. Criação do Servidor Express Focado na Nuvem (Azure)
const app = express();

// Permite que seu frontend chame esse servidor de portas diferentes
app.use(cors({ origin: '*' }));

// Conecta o express ao tRPC na rota /trpc
app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  })
);

// Padrão Azure WAF: Usamos a porta que a Azure mandar pelo ambiente, 
// se não tivermos na nuvem ainda, abrimos no :8080 local para testar!
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`🚀 Motor de Nuvem ligado na porta ${port}`);
});
