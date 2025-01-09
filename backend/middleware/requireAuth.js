const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth = async (req, res, next) => {
  // verify authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'You must be logged in' });
  }

  const token = authorization.replace('Bearer ', '');
  try {
    const {_id} = jwt.verify(token, process.env.SECRET);
    req.user = await User.findOne({_id}).select('_id');
    next();
  } catch (err) {
    console.log('authorization error = ', err);
    return res.status(401).json({ error: 'Unauthorized request' });
  }
};

module.exports = requireAuth;
