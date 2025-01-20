var express = require('express');
var router = express.Router();
const UserModel = require('./users');
const PostModel = require('./post');
const passport = require('passport');
const upload = require('./multer');
const localStrategy = require('passport-local')
passport.use(new localStrategy(UserModel.authenticate()));

//  Routes
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// Login
router.get('/login', function (req, res) {

  res.render('login', { error: req.flash('error') });

});


// Register route 
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
  failureRedirect: '/login',
  failureFlash: true
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
    const user = await UserModel.findOne({ username: req.session.passport.user }).populate('posts');
    res.render('profile', { user, posts: user.posts });
    console.log(user);
  } catch (err) {
    res.redirect('/');
  }
});
// Feed route
router.get('/feed', isLoggedIn, async function (req, res) {
  res.render('feed');
});


//  Upload Route
router.post('/upload', isLoggedIn, upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No files were uploaded');
  }


  //  KJo file upload hui hai use save karo as a post and uscka id user ke posts array me add karo
  const user = await UserModel.findOne({ username: req.session.passport.user });

  const postData = await PostModel.create({
    postText: req.body.caption,
    user: user._id,
    image: req.file.filename
  })

   user.posts.push(postData._id);
  await user.save();
res.send('File uploaded successfully');

});



// Is Logged in function
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}


module.exports = router;
