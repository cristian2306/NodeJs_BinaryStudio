import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  // TODO: Implement methods to work with fighters
  /*
    id: "",
    name: "",
    health: 100,
    power: 0,
    defense: 1, // 1 to 10
  */
  //getFighters
  getFighters() {
    return fighterRepository.getAll()
  }
  //getFighter
  getFighter(id) {
    const fighter = fighterRepository.getOne({ id })
    if (!fighter) { return null }
    return fighter
  }
  //postFighter
  createFighter({ name, health = 100, power, defense }) {
    return fighterRepository.create({ name, health, power, defense })
  }
  //putFighter
  updateFighter(id, fighterToUpdate) {
    return fighterRepository.update(id, fighterToUpdate)
  }
  //DeleteFighter
  deleteFighter(id) {
    return fighterRepository.delete(id)
  }
}

const fighterService = new FighterService();

export { fighterService };
