function showHome(req, res)  {
  if (req.session.jwt) {
    req.flash('validToken', true);
  }
  res.render('pages/home', {
    validToken: req.flash('validToken'),
    success: req.flash('success')
  });
}

module.exports = {
  showHome
};