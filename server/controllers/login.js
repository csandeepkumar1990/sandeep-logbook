const bcrypt = require('bcryptjs');

const User = require('../database/models/user');

module.exports = async (req, res) => {
  const { email, pass } = req.body;

  const user = await User.findOne({ email });
  if (!user || !user.password) {
    console.log('no user');
    res.status(200).json({ err: 'username or password incorrect' });
    return;
  }

  bcrypt.compare(pass, user.password)
    .then((verified) => {
      if (verified) {
        req.session.user = { userId: user.id, name: user.name, email: user.email };
        res.cookie('user', `name=${user.name}&avatar=${user.twitterImg}&userId=${user.id}`);
        res.json({ msg: 'success', name: user.name, redirect: '/home' });
      } else {
        res.status(200).json({ err: 'username or password incorrect' });
      }
    });
};
