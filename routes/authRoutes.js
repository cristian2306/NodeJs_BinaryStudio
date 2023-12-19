import { Router } from "express";
import { authService } from "../services/authService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.post(
  "/login",
  (req, res, next) => {
    const { email, password } = req.body
    try {
      const data = authService.login({ email })
      if (password !== data.password) {
        res.err = { statusCode: 400, message: 'Login failed' };
      } else {
        res.data = data;

      }
    } catch (err) {
      if (err === "User not found") {
        res.err = { statusCode: 404, message: err.message };
      }
      else {
        res.err = { statusCode: 400, message: err.message };
      }
    } finally {
      next();
    }
  },
  responseMiddleware
);

export { router };
