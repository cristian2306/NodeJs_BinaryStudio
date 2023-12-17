import { userRepository } from "../repositories/userRepository.js";

class UserService {
  // TODO: Implement methods to work with user
  // const USER = {
  //   id: "",
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   phoneNumber: "",
  //   password: "", // min 3 symbols
  // };

  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
  //getUsers
  getUsers() {
    return userRepository.getAll()
  }
  //postUser
  createUser(user) {
    return userRepository.create(user)
  }
  //putUser
  updateUser(id, UserToUpdate) {
    return userRepository.update(id, UserToUpdate)
  }
  //DeleteUser
  deleteUser(id) {
    return userRepository.delete(id)
  }
}

const userService = new UserService();

export { userService };
