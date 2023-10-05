const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');


const validateRunInput = [
    check('')
    .exists()

    check('text')
    .exists({ checkFalsy: true })
    .isLength({ min: 5, max: 140 })
    .withMessage('Tweet must be between 5 and 140 characters')

    handleValidationErrors
]