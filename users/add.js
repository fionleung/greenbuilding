router.get('/add', function(req, res, next) {
  res.render('UserAdd');
});

router.post('/add', function(req, res, next) {
  var newUser = new userModel({
    username: req.body.username,
    email: req.body.email
  })
  newUser.save(function(err, data){
    if(err){ return console.log(err) }
    res.redirect('/users/list');
  })
});
