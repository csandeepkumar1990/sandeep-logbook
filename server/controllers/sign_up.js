const bcrypt = require('bcryptjs');

const User = require('../database/models/user');

module.exports = async (req, res) => {
  const { name, email, pass } = req.body;
  const user = await User.findOne({ email });
  if (user && user.email && user.password) {
    res.json({ msg: 'this email already registered', redirect: '/login' });
    return;
  }
  if (user && user.email && !user.password) {
    res.json({ msg: 'this email already registered with Twitter account', redirect: '/api/twitter-login' });
    return;
  }
  bcrypt.hash(pass, 10, (err, hashedPass) => {
    User.create({
      name,
      email,
      password: hashedPass,
    })
      .then((newUser) => {
        req.session.user = { userId: newUser.id, name: newUser.name, email: newUser.email };
        res.cookie('user', `name=${newUser.name}&avatar=${newUser.twitterImg}&userId=${newUser.id}`);
        res.json({ msg: 'success', redirect: '/home' });
      })
      .catch((dbErr) => {
        console.error(dbErr);
      });
  });
};
