module.exports = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return;
    }
    res.clearCookie('connect.sid');
    res.clearCookie('user');
    res.json({ msg: 'success' });
  });
};
