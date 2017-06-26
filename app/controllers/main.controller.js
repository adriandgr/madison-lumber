function showHome(req, res)  {
  res.render('pages/home', {
    success: req.flash('success')
  });
}

module.exports = {
  showHome
};