import { router as userRoutes } from "./userRoutes.js";
import { router as authRoutes } from "./authRoutes.js";
import { router as fighterRoutes } from "./fighterRoutes.js";
import { router as fightRoutes } from "./fightRoutes.js";

const initRoutes = (app) => {
  app.use((req, res, next) => {
    console.log('..........................................')
    console.log(`${req.method} ${req.url}`)
    console.log('Params')
    console.log(req.params)
    console.log('Body')
    console.log(req.body)
    next()
  })
  app.use("/api/users", userRoutes);
  app.use("/api/fighters", fighterRoutes);
  app.use("/api/fights", fightRoutes);
  app.use("/api/auth", authRoutes);
};

export { initRoutes };
