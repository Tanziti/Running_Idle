const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');


const validateRunInput = [
    check('')
    .exists()
    handleValidationErrors
]