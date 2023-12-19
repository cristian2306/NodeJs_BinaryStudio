const FIGHTER = {
  id: "",
  name: "",
  health: 100,
  power: 0,
  defense: 1, // 1 to 10
};

const MESSAGE_VALIDATION = {
  POWER_VALIDATION: 'The power has to be inside 1 and 100',
  DEFENSE_VALIDATION: 'The defense has to be inside 1 and 10',
  HEALTH_VALIDATION: 'The health has to be inside 80 and 120',
  EXTRA_FIELD_NOT_ALLOWED: 'Extra field not allowed',
  MISSED_FIELD: 'Missed field',
  UPDATE_ERROR: 'At least one field must be present',
  ID_FIELD: 'Id in the request body should NOT be present',
  SAME_NAME: 'Name already exists'
}

const FIGHTER_FIELDS = ['name', 'power', 'defense']

const FIELDS_FORMAT = {
  POWER: { max: 100, min: 1, errorMessage: MESSAGE_VALIDATION.POWER_VALIDATION },
  DEFENSE: { max: 10, min: 1, errorMessage: MESSAGE_VALIDATION.DEFENSE_VALIDATION },
  HEALTH: { max: 120, min: 80, errorMessage: MESSAGE_VALIDATION.HEALTH_VALIDATION }
}

export { FIGHTER, MESSAGE_VALIDATION, FIELDS_FORMAT, FIGHTER_FIELDS };
