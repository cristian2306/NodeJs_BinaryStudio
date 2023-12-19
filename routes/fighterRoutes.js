import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();
// GET / api / fighters
function haveError(res, next) {
  console.log(res.err)
  if (res.err) {
    throw new Error()
  }
}

router.get('', (req, res, next) => {
  try {
    haveError(res)
    const fighters = fighterService.getFighters();
    res.data = fighters
    next()
  } catch (error) {
    next()
  }
})
// GET / api / fighters /: id
router.get('/:id', (req, res, next) => {
  try {
    haveError(res)
    const { id } = req.params
    const fighter = fighterService.getFighter(id)
    res.data = fighter
    next()
  } catch (error) {
    next()
  }
})
// POST / api / fighters
router.post('', createFighterValid, (req, res, next) => {
  try {
    haveError(res)
    const fighter = req.body
    const createFighter = fighterService.createFighter(fighter)
    res.data = createFighter
    next()
  } catch (error) {
    next()
  }
})
// PUT / api / fighters /: id
router.put('/:id', updateFighterValid, (req, res, next) => {
  try {
    haveError(res)
    const { id } = req.params
    const fighter = req.body
    const updatedFighter = fighterService.updateFighter(id, fighter)
    res.data = updatedFighter
    next()
  } catch (error) {
    next()
  }
})
// DELETE / api / fighters /: id
router.delete('/:id', (req, res, next) => {
  try {
    haveError(res)
    const { id } = req.params
    const deletedFighter = fighterService.deleteFighter(id)
    res.data = deletedFighter
    next()
  } catch (error) {
    next()
  }
})

router.use(responseMiddleware)

// TODO: Implement route controllers for fighter


export { router };
