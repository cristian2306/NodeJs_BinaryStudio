import { userService } from '../services/userService.js'

const USER = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "", // min 3 symbols
};

const MESSAGE_VALIDATION = {
  EMAIL_VALIDATION: 'Email must be includes @gmail',
  PHONE_NUMBER_STARTS: 'Phone number must be begin with +380',
  PHONE_NUMBER_LENGHT: 'Phone number must be have 13 characters +380(4) xxxxxxxxx(9)',
  PASWWORD_TYPE: 'The password must to be a string',
  PASSWORD_LENGHT: 'The password must to have at least 3 characters',
  SAME_EMAIL: 'This email already in use',
  SAME_PHONENUMBER: 'This phonenumber already in use',
  EXTRA_FIELD_NOT_ALLOWED: 'Extra field not allowed',
  MISSED_FIELD: 'Missed field',
  UPDATE_ERROR: 'At least one field must be present',
  NOT_FOUND: 'User not found',
  ID_FIELD: 'Id in the request body should NOT be present'
}


const USER_FIELDS = ['firstName', 'lastName', 'email', 'phoneNumber', 'password']

const errorTemplate = (message) => { return { error: true, statusCode: 400, message } }
const FIELDS_FORMAT = {
  email: (email) => {
    if (!email.includes('@gmail')) {
      return errorTemplate(MESSAGE_VALIDATION.EMAIL_VALIDATION)
    } else if (userService.search({ email })) {
      return errorTemplate(MESSAGE_VALIDATION.SAME_EMAIL)
    } else {
      return { error: false }
    }
  },
  phoneNumber: (number) => {
    if (!number.startsWith('+380')) {
      return errorTemplate(MESSAGE_VALIDATION.PHONE_NUMBER_STARTS)
    } else if (number.length < 13) {
      return errorTemplate(MESSAGE_VALIDATION.PHONE_NUMBER_LENGHT)
    } else if (userService.search({ phoneNumber: number })) {
      return errorTemplate(`${MESSAGE_VALIDATION.SAME_PHONENUMBER}`)
    } else {
      return { error: false }
    }
  },
  password: (password) => {
    if (typeof password !== 'string') {
      return errorTemplate(MESSAGE_VALIDATION.PASWWORD_TYPE)
    } else if (password.length < 3) {
      return errorTemplate(MESSAGE_VALIDATION.PASSWORD_LENGHT)
    } else {
      return { error: false }
    }
  }
}

export { USER, MESSAGE_VALIDATION, USER_FIELDS, FIELDS_FORMAT };
