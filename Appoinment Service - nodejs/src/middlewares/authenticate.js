const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next)=>{
  const token = req.headers.authorization.split(' ')[1];
//   const decodedToken = jwt.verify(token, '5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437');
  const decoded = jwt.decode(token);
//   console.log(decodedToken);
  req.role = decoded.role;
  next();
}
