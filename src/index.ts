import express from "express";
import { AuthService } from "./auth/service";
import { SignupPayload, LoginPayload } from "./auth/types";

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    const payload: SignupPayload = req.body;
    const user = await AuthService.signup(payload);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const payload: LoginPayload = req.body;
    const user = await AuthService.login(payload);

    if (!user) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/me", async (req, res) => {
  try {
    const userId = 1;
    const user = await AuthService.getUserById(userId);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server on port : ${PORT}`);
});
