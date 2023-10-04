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
    .withMessage('Need a starting posit'),


    check('text')
    .exists({ checkFalsy: true })
    .isLength({ min: 5, max: 140 })
    .withMessage('Tweet must be between 5 and 140 characters')

    handleValidationErrors
]

module.exports = validateRunInput;