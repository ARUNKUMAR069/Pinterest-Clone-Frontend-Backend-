var express = require('express');
var router = express.Router();
const UserModel = require('./users');
const PostModel = require('./post');
const passport = require('passport');
const localStrategy = require('passport-local')
passport.use(new localStrategy(UserModel.authenticate()));

//  Routes
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// Login
router.get('/login', function (req, res) {

res.render('login');

});


// 

router.post('/register', async (req, res) => {

  const { fullname, username, email, password } = req.body;
  const user = new UserModel({ fullname, username, email });
  await UserModel.register(user, password).then(function () {

    passport.authenticate('local')(req, res, function () {
      res.redirect('/profile');

    })

  });

});

//  login route

router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/'
}), function (req, res) {
});



// Logout route

router.get('/logout', function (req, res) {
  req.logout(function (err) {

    if (err) {
      return next(err);
    }
    res.redirect('/');

  });

});
//  Profile route
router.get('/profile', isLoggedIn, async function (req, res) {
  try {
    const user = await UserModel.findById(req.user._id);
    res.render('profile', { user });
  } catch (err) {
    res.redirect('/');
  }
});




// Is Logged in function
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}












module.exports = router;
