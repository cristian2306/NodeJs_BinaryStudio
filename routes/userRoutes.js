import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

function haveError(res, next) {
  if (res.err) {
    next()
  }
}
// GET / api / users
router.get('', (req, res, next) => {
  haveError(res, next)
  const users = userService.getUsers();
  res.send(users)
})
// GET / api / users /: id
router.get('/:id', (req, res, next) => {
  haveError(res, next)
  const { id } = req.params
  const user = userService.getUser(id)
  res.send(user)
})
// POST / api / users
router.post('', createUserValid, (req, res, next) => {
  haveError(res, next)
  const user = req.body
  const createuser = userService.createUser(user)
  res.send(createuser)
})
// PUT / api / users /: id
router.put('/:id', updateUserValid, (req, res, next) => {
  haveError(res, next)
  const { id } = req.params
  const user = req.body
  const updateduser = userService.updateUser(id, user)
  res.send(updateduser)
})
// DELETE / api / users /: id
router.delete('/:id', (req, res, next) => {
  haveError(res, next)
  const { id } = req.params
  const deleteduser = userService.deleteUser(id)
  res.send(deleteduser)
})

router.use(responseMiddleware)
// TODO: Implement route controllers for user

export { router };
