const { getToken, getUserFromToken } = require('./login_helper');

const tokenExtractor = (req, res, next) => {
  try {
    const token = getToken(req);
    if (token) {
      req.token = token;
    }
    next();
  }
  catch (e) {
    next(e);
  }
};

const userExtractor = async (req, res, next) => {
  if (req.token) {
    try {
      req.user = await getUserFromToken(req.token);
    }
    catch (e) {
      next(e);
    };
  }
  next();
};

module.exports = { tokenExtractor, userExtractor };
