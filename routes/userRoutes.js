import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

function haveError(res) {
  if (res.err) {
    throw new Error(res.err)
  }
}
// GET / api / users
router.get('', (req, res, next) => {
  try {
    haveError(res)
    const users = userService.getUsers();
    res.data = users
  } catch (error) {
    next()
  }
})
// GET / api / users /: id
router.get('/:id', (req, res, next) => {
  try {
    haveError(res)
    const { id } = req.params
    const user = userService.getUser(id)
    res.data = user
  } catch (error) {
    next()
  }
})
// POST / api / users
router.post('', createUserValid, (req, res, next) => {
  try {
    haveError(res)
    const user = req.body
    const createuser = userService.createUser(user)
    res.data = createuser
  } catch (error) {
    next()
  }
})
// PUT / api / users /: id
router.put('/:id', updateUserValid, (req, res, next) => {
  try {
    haveError(res)
    const { id } = req.params
    const user = req.body
    const updateduser = userService.updateUser(id, user)
    res.data = updateduser
  } catch (error) {
    next()
  }
})
// DELETE / api / users /: id
router.delete('/:id', (req, res, next) => {
  try {
    haveError(res)
    const { id } = req.params
    const deleteduser = userService.deleteUser(id)
    res.data = deleteduser
  } catch (error) {
    next()
  }
})

router.use(responseMiddleware)
// TODO: Implement route controllers for user

export { router };
