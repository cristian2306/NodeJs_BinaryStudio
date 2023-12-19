import {
  FIGHTER,
  FIGHTER_FIELDS,
  MESSAGE_VALIDATION,
  FIELDS_FORMAT
} from "../models/fighter.js";

import { fighterService } from '../services/fighterService.js'

//GUardar en un arreglo los errores
const fighterKeys = Object.keys(FIGHTER)

let errors

function validateFieldNumber({ max, min, errorMessage }, value) {
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
  validateExtraFields(reqKeys)
  //Validates missed fields
  FIGHTER_FIELDS.forEach(key => {
    if (!reqKeys.includes(key)) {

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
    if (key === 'NAME') {
      const respSearch = fighterService.search({ name: fighter.name })
      if (respSearch) {
        errors.push({ statusCode: 400, message: `${MESSAGE_VALIDATION.SAME_NAME}:${fighter.name}` })
      }
    }
  })
}

const validateErrors = (next, res) => {
  if (errors.length > 0) {
    let errorMessage = ''
    errors.forEach(error => {
      errorMessage += error.message + ','
    })
    res.err = { codeStatus: 400, message: errorMessage }
  }
  next()
}

const createFighterValid = (req, res, next) => {
  errors = new Array()
  // TODO: Implement validatior for FIGHTER entity during creation
  // all fields are required, except for id and health
  const fighter = req.body
  validateFields(res, fighter)
  const { id } = fighter
  //Validate id Propertie
  if (id) {
    delete fighter.id
  }
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
