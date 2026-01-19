import { app } from "./app.js";
import { env } from "./config/env.js";

const PORT = env.PORT || 3333;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});