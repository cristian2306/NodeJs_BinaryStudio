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
  console.log(max, min, errorMessage, value)
  if (!(min <= value && value <= max)) {
    errors.push({ statusCode: 400, message: errorMessage })
  }
}
function validateExtraFields(reqKeys) {
  reqKeys.forEach((key) => {
    if (!fighterKeys.includes(key)) {
      errors.push({ statusCode: 400, message: `${MESSAGE_VALIDATION.EXTRA_FIELD_NOT_ALLOWED}: ${key}` })
    }
  })
}
function validateFields(res, fighter) {
  //Validate all fiels
  const reqKeys = Object.keys(fighter)
  console.log({ fighterKeys })
  validateExtraFields(reqKeys)
  //Validates missed fields
  FIGHTER_FIELDS.forEach(key => {
    if (!reqKeys.includes(key)) {
      console.log({ key })
      errors.push({ statusCode: 400, message: `${MESSAGE_VALIDATION.MISSED_FIELD}: ${key}` })
    }
  })
}

const validateFieldsFormat = (fighter) => {
  const fields = Object.keys(FIELDS_FORMAT)
  const reqKeys = Object.keys(fighter)
  reqKeys.forEach(field => {
    const key = field.toUpperCase()
    if (fields.includes(key)) {
      validateFieldNumber(FIELDS_FORMAT[key], fighter[field])
    }
  })
}

const validateErrors = (next, res) => {
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
  validateFieldsFormat(fighter)
  validateErrors(next, res)

};

const updateFighterValid = (req, res, next) => {
  errors = new Array()
  const fighterToUpdate = req.body
  const updateKeys = Object.keys(fighterToUpdate)
  let ispresentField = false;
  fighterKeys.forEach(key => {
    if (updateKeys.includes(key)) {
      ispresentField = true
    }
  })
  if (!ispresentField) {
    errors.push({ statusCode: 400, message: `${MESSAGE_VALIDATION.UPDATE_ERROR}` })
  }
  validateFieldsFormat(fighterToUpdate)
  validateExtraFields(updateKeys)
  // TODO: Implement validatior for FIGHTER entity during update
  // at least one field from the model must be present
  validateErrors(next, res)
};

export { createFighterValid, updateFighterValid };
