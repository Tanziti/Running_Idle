const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

// validateTweetInput is a combination Express middleware that uses the `check`
// middleware to validate the keys in the body of a request to create/edit
// a tweet
const validateCharacterInput = [
  check('name')
    .exists({ checkFalsy: true })
    .isLength({ min: 2, max: 15 })
    .withMessage('Character must have a name with at least 2 letters'),
 
  check('outfit')
   .exists({ checkFalsy: true })
   .withMessage('must pick a color'),
  check('shoes')
   .exists({ checkFalsy: true })
   .withMessage('must pick a color'),
  handleValidationErrors
    
  
];

module.exports = validateCharacterInput;