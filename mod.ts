import { Application, send } from "https://deno.land/x/oak@v5.0.0/mod.ts";

const app = new Application();
const PORT = 8000;

// the 2nd parameter next is an async function
app.use(async (ctx, next) => {
  await next();
  const time = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url}: ${time}`);
});

app.use(async (ctx, next) => {
  const start = Date.now();
  // This one will execute when the next middleware finished because of the await next
  await next();
  const delta = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${delta} ms`);
});

app.use(async (ctx) => {
  const filePath = ctx.request.url.pathname;
  const fileWhiteList = [
    "/index.html",
    "/javascripts/script.js",
    "/stylesheets/style.css",
    "/images/favicon.png",
  ];
  await send(ctx, filePath, {
    root: `${Deno.cwd()}/public`,
  });
});

// ctx or context is an object which contains the current state of the application
app.use((ctx) => {
  ctx.response.body = `Hello from the server`;
});

if (import.meta.main) {
  await app.listen({
    port: PORT,
  });
}
