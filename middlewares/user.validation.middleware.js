import {
  USER,
  USER_FIELDS,
  FIELDS_FORMAT,
  MESSAGE_VALIDATION
} from "../models/user.js";

const userKeys = Object.keys(USER)

let errors

//validate fields
function validateExtraFields(reqKeys) {
  reqKeys.forEach((key) => {
    if (!userKeys.includes(key)) {
      errors.push({ statusCode: 400, message: `${MESSAGE_VALIDATION.EXTRA_FIELD_NOT_ALLOWED}: ${key}` })
    }
  })
}

function validateFields(res, user) {
  //Validate all fiels
  const reqKeys = Object.keys(user)
  console.log({ userKeys })
  validateExtraFields(reqKeys)
  //Validates missed fields
  USER_FIELDS.forEach(key => {
    if (!reqKeys.includes(key)) {
      console.log({ key })
      errors.push({ statusCode: 400, message: `${MESSAGE_VALIDATION.MISSED_FIELD}: ${key}` })
    }
  })
}

//Validate formats
const validateFieldsFormat = (user) => {
  const fields = Object.keys(FIELDS_FORMAT)
  const reqKeys = Object.keys(user)
  reqKeys.forEach(field => {
    if (fields.includes(field)) {
      const handle = FIELDS_FORMAT[field]
      const { error, statusCode, message } = handle(user[field])
      if (error) {
        errors.push({ statusCode, message })
      }
    }
  })
}
//validate errors
const validateErrors = (next, res) => {
  if (errors.length > 0) {
    let errorMessage = ''
    errors.forEach(error => {
      console.log({ error })
      errorMessage += error.message + ','
    })
    res.err = { codeStatus: 400, message: errorMessage }
  }
  next()
}
const createUserValid = (req, res, next) => {
  errors = new Array()
  // TODO: Implement validatior for USER entity during creation
  const user = req.body
  validateFields(res, user)
  validateFieldsFormat(user)
  validateErrors(next, res)
};

const updateUserValid = (req, res, next) => {
  errors = new Array()
  const userToUpdate = req.body
  const updateKeys = Object.keys(userToUpdate)
  let ispresentField = false;
  userKeys.forEach(key => {
    if (updateKeys.includes(key)) {
      ispresentField = true
    }
  })
  if (!ispresentField) {
    errors.push({ statusCode: 400, message: `${MESSAGE_VALIDATION.UPDATE_ERROR}` })
  }
  // TODO: Implement validatior for user entity during update
  validateFieldsFormat(userToUpdate)
  validateExtraFields(updateKeys)
  validateErrors(next, res)
};

export { createUserValid, updateUserValid };
