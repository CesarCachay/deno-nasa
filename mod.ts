import { Application } from "https://deno.land/x/oak@v5.0.0/mod.ts";

const app = new Application();
const PORT = 8000;

// ctx or context is an object which contains the current state of the application
app.use((ctx) => {
  ctx.response.body = `Hello from the server`;
});

if (import.meta.main) {
  await app.listen({
    port: PORT,
  });
}
