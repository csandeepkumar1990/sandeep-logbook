const querystring = require('querystring');
const { login } = require('./redirect_values');

const isAuthenticated = (req) => {
  const { user } = req.cookies;
  const parsedUser = user && querystring.parse(user);
  const userSession = req.session && req.session.user;
  console.log('user: ', parsedUser, userSession);
  if (parsedUser && userSession && parsedUser.userId === userSession.userId) {
    console.log('Authenticated user');
    return true;
  }
  console.log('Not authenticated user');
  return false;
};

exports.auth = (req, res, next) => {
  if (isAuthenticated(req)) {
    next();
  } else {
    res.clearCookie('connect.sid');
    res.clearCookie('user');
    res.redirect(login);
  }
};

exports.checkAuth = (req, res) => {
  const isAuth = isAuthenticated(req);
  if (!isAuth) {
    res.clearCookie('connect.sid');
    res.clearCookie('user');
  }
  res.json({ auth: isAuth });
};
