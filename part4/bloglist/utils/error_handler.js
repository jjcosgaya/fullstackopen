const errorHandler = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }
  if (err.name === 'LoginError') {
    return res.status(401).json({ error: err.message });
  }
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'Invalid login token' });
  }
  if (err.name === 'AuthorizationError') {
    return res.status(403).json({ error: err.message });
  }
  next(err);
};

module.exports = errorHandler;
