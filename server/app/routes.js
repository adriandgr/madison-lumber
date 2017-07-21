// Application routes

const express           = require('express');
const router            = express.Router();
const mainController    = require('./controllers/main.controller');
const userController    = require('./controllers/user.controller');
const eventsController  = require('./controllers/mill.controller');


//router.get('/', mainController.getHome);
router.get('/login', userController.getLogin);
router.get('/logout', userController.logout);

router.post('/api/auth', userController.authUser);
router.post('/api/authTwo', userController.authUserTwo);

// route middleware to authenticate and check token
router.use(userController.routerMiddleware);


// ---------------------------------------------------------
// AUTHENTICATED ROUTES BELOW THIS COMMENT
// ---------------------------------------------------------

router.get('/api/mills', eventsController.showMills);

// view single
router.get('/api/mills/:slug', eventsController.showSingle);




// admin route middleware to verify admin status
router.use(userController.adminMiddleware);


// ---------------------------------------------------------
// ADMIN ROUTES BELOW THIS COMMENT
// ---------------------------------------------------------

router.get('/api/users', userController.getUsers);
router.get('/users/create', userController.showCreate);
router.post('/api/users/create', userController.processCreate);

//create
router.get('/mills/create', eventsController.showCreate);
router.post('/mills/create', eventsController.processCreate);

//edit
router.get('/mills/:slug/edit', eventsController.showEdit);
router.post('/mills/:slug', eventsController.processEdit);

// seed mills
router.get('/mills/seed', eventsController.seedEvents);

// view single
router.get('/users/:uuid', userController.manageUser);

//delete
router.get('/mills/:slug/delete', eventsController.deleteEvent);
router.post('/users/:uuid/delete', userController.deleteUser);


module.exports = router;

