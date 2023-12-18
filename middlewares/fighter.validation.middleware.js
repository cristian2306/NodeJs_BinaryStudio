import {
  FIGHTER,
  FIGHTER_FIELDS,
  MESSAGE_VALIDATION,
  FIELDS_FORMAT
} from "../models/fighter.js";

//GUardar en un arreglo los errores
const fighterKeys = Object.keys(FIGHTER)
let errors

function validateFieldNumber({ max, min, errorMessage }, value) {
  if (!(min <= value || value <= max)) {
    errors.push({ statusCode: 400, message: errorMessage })
  }
}

function validateFields(res, fighter) {
  //Validate all fiels
  const reqKeys = Object.keys(fighter)
  console.log({ fighterKeys })
  //Validates extra fields
  reqKeys.forEach((key) => {
    if (!fighterKeys.includes(key)) {
      errors.push({ statusCode: 400, message: `${MESSAGE_VALIDATION.EXTRA_FIELD_NOT_ALLOWED}: ${key}` })
    }
  })
  //Validates missed fields
  FIGHTER_FIELDS.forEach(key => {
    if (!reqKeys.includes(key)) {
      console.log({ key })
      errors.push({ statusCode: 400, message: `${MESSAGE_VALIDATION.MISSED_FIELD}: ${key}` })
    }
  })
}

const createFighterValid = (req, res, next) => {
  errors = new Array()
  // TODO: Implement validatior for FIGHTER entity during creation
  // all fields are required, except for id and health
  console.log(req.body)
  const fighter = req.body
  console.log({ fighter })
  validateFields(res, fighter)
  const { name, power, defense, health, id } = fighter
  //Validate id Propertie
  if (id) {
    delete fighter.id
  }
  console.log('Body', req.body)
  //Validate fields format
  validateFieldNumber(FIELDS_FORMAT.POWER, power)
  validateFieldNumber(FIELDS_FORMAT.DEFENSE, defense)
  if (health) {
    validateFieldNumber(FIELDS_FORMAT.HEALTH, health)
  }
  if (errors.length === 0) {
    console.log('No hay errores')
    next()
  } else {
    let errorMessage = ''
    errors.forEach(error => {
      console.log({ error })
      errorMessage += error.message + ','
    })
    res.status(400).send({ error: true, message: errorMessage })
  }

};

const updateFighterValid = (req, res, next) => {
  const { fighterToUpdate } = req.body
  console.log({ fighterValues })
  // TODO: Implement validatior for FIGHTER entity during update
  // at least one field from the model must be present
  next();
};

export { createFighterValid, updateFighterValid };
