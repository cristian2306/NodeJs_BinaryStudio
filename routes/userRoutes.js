import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();
// GET / api / users
router.get('', (req, res) => {
  const users = userService.getUsers();
  res.send(users)
})
// GET / api / users /: id
router.get('/:id', (req, res) => {
  const { id } = req.params
  const user = userService.search({ id })
  res.send(user)
})
// POST / api / users
router.post('', (req, res) => {
  const user = req.body
  const createuser = userService.createUser(user)
  res.send(createuser)
})
// PUT / api / users /: id
router.put('/:id', (req, res) => {
  const { id } = req.params
  const user = req.body
  const updateduser = userService.updateUser(id, user)
  res.send(updateduser)
})
// DELETE / api / users /: id
router.delete('/:id', (req, res) => {
  const { id } = req.params
  const deleteduser = userService.deleteUser(id)
  res.send(deleteduser)
})
// TODO: Implement route controllers for user

export { router };
