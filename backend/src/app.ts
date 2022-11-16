import "reflect-metadata"
import "express-async-errors"
import express from "express"
import { errorMiddleware } from "./middlewares/error.middleware"
import { userRoutes } from "./routes/users/users.routes"
import { authRoutes } from "./routes/authentication/authentication.routes"
import { accountsRoutes } from "./routes/accounts/accounts.routes"
import { transactionsRoutes } from "./routes/transactions/transactions.routes"

const app = express()
app.use(express.json())

app.get("", async (req, res) => {
    return res.status(200).send("Hello World")
})

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/account", accountsRoutes);
app.use("/transactions", transactionsRoutes);

app.use(errorMiddleware);

export default app