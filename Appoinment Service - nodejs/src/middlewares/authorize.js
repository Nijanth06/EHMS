exports.authorize = (roles)=> {
    return function(req, res, next) {
      console.log(req.role,roles)
      if (roles.includes(req.role)) {
        next();
      } else {
        res.status(401).json({ message: 'Unauthorized' });
      }
    }
  }
  