function getHome(req, res)  {
  let validToken = false;
  if (req.session.jwt) {
    req.flash('validToken', true);
  }
  res.json({
    validToken: req.flash('validToken'),
    success: req.flash('success')
  });
}

module.exports = {
  getHome
};