import { app } from "./app";
import { env } from "./config/env";

const PORT = env.PORT || 3333;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});