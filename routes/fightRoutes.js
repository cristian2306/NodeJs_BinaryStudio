import { Router } from "express";
import { fightService } from "../services/fightService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

function haveError(res, next) {
  console.log(res.err)
  if (res.err) {
    throw new Error()
  }
}

router.get('', (req, res, next) => {
  try {
    haveError(res)
    const fight = fightService.getFights();
    res.data = fight
    next()
  } catch (error) {
    next()
  }
})
// GET / api / fights /: id
router.get('/:id', (req, res, next) => {
  try {
    haveError(res)
    const { id } = req.params
    const fight = fightService.getGight(id)
    res.data = fight
    next()
  } catch (error) {
    next()
  }
})
// POST / api / fights
router.post('', (req, res, next) => {
  try {
    haveError(res)
    const fight = req.body
    const createfight = fightService.createFight(fight)
    res.data = createfight
    next()
  } catch (error) {
    next()
  }
})
// PUT / api / fights /: id
router.put('/:id', (req, res, next) => {
  try {
    haveError(res)
    const { id } = req.params
    const fight = req.body
    const updatedfight = fightService.updateFight(id, fight)
    res.data = updatedfight
    next()
  } catch (error) {
    next()
  }
})
// DELETE / api / fights /: id
router.delete('/:id', (req, res, next) => {
  try {
    haveError(res)
    const { id } = req.params
    const deletedfight = fightService.deleteFight(id)
    res.data = deletedfight
    next()
  } catch (error) {
    next()
  }
})

router.use(responseMiddleware)
// OPTIONAL TODO: Implement route controller for fights

export { router };
