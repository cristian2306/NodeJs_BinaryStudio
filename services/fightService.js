import { fightRepository } from "../repositories/fightRepository.js";

class FightersService {
  // OPTIONAL TODO: Implement methods to work with fights
  search(search) {
    const item = fightRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  getFight(id) {
    return fightRepository.getOne({ id })
  }
  //getFights
  getFights() {
    return fightRepository.getAll()
  }
  //postFight
  createFight(Fight) {
    return fightRepository.create(Fight)
  }
  //putFight
  updateFight(id, FightToUpdate) {
    return fightRepository.update(id, FightToUpdate)
  }
  //DeleteFight
  deleteFight(id) {
    return fightRepository.delete(id)
  }
}

const fightersService = new FightersService();

export { fightersService };
