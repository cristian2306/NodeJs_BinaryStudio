import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();
// GET / api / fighters
router.get('', (req, res) => {
  const fighters = fighterService.getFighters();
  res.send(fighters)
})
// GET / api / fighters /: id
router.get('/:id', (req, res) => {
  const { id } = req.params
  const fighter = fighterService.getFighter(id)
  res.send(fighter)
})
// POST / api / fighters
router.post('', createFighterValid, (req, res) => {
  const fighter = req.body
  const createFighter = fighterService.createFighter(fighter)
  res.send(createFighter)
})
// PUT / api / fighters /: id
router.put('/:id', updateFighterValid, (req, res) => {
  const { id } = req.params
  const fighter = req.body
  const updatedFighter = fighterService.updateFighter(id, fighter)
  res.send(updatedFighter)
})
// DELETE / api / fighters /: id
router.delete('/:id', (req, res) => {
  const { id } = req.params
  const deletedFighter = fighterService.deleteFighter(id)
  res.send(deletedFighter)
})
// TODO: Implement route controllers for fighter


export { router };
