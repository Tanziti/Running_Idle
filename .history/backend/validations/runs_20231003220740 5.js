const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');


const validateRunInput = [
    check('character')
    .exists({checkFalsy: true})
    .withMessage('No character provided'),
    check('startTime')
    .exists({checkFalsy: true})
    .withMessage('Need a start time'),
    check('startPosition')
    .exists({checkFalsy: true})
    .withMessage('Need a starting position'),
    handleValidationErrors
]

module.exports = validateRunInput;