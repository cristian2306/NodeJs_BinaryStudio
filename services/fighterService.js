import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  // TODO: Implement methods to work with fighters
  constructor() {
    this.fightRepository = fighterRepository
  }
  /*
    id: "",
    name: "",
    health: 100,
    power: 0,
    defense: 1, // 1 to 10
  */
  //getFighters
  getFighters() {
    return fightRepository.getAll()
  }
  //getFighter
  getFighter(id) {
    return fightRepository.getOne({ id })
  }
  //postFighter
  createFighter({ name, health = 100, power, defense }) {
    return fightRepository.create({ name, health, power, defense })
  }
  //putFighter
  updateFighter(id, fighterToUpdate) {
    return fightRepository.update(id, fighterToUpdate)
  }
  //DeleteFighter
  deleteFighter(id) {
    return fightRepository.delete(id)
  }
}

const fighterService = new FighterService();

export { fighterService };
