// Application routes

const express           = require('express');
const router            = express.Router();
const userController    = require('./controllers/user.controller');
const millsController  = require('./controllers/mill.controller');

router.post('/login', userController.authUser);
router.get('/logout', userController.logout);
router.post('/users/register', userController.processRegister);

// route middleware to authenticate and check token
router.use(userController.routerMiddleware);


// ---------------------------------------------------------
// AUTHENTICATED ROUTES BELOW THIS COMMENT
// ---------------------------------------------------------

// Verify user's token is valid on authenticated route load
router.post('/validate', userController.validateToken);

router.get('/mills', millsController.showMills);
router.get('/mills/:id', millsController.showSingle);




// admin route middleware to verify admin status
router.use(userController.adminMiddleware);


// ---------------------------------------------------------
// ADMIN ROUTES BELOW THIS COMMENT
// ---------------------------------------------------------

router.get('/users', userController.getUsers);
router.post('/users/create', userController.processCreate);

//create
router.post('/mills/create', millsController.processCreate);

//edit
router.post('/mills/:uuid', millsController.processEdit);

// seed mills
router.get('/mills/seed', millsController.seedEvents);

// view single
router.get('/users/:uuid', userController.manageUser);

//delete
router.get('/mills/:uuid/delete', millsController.deleteMill);
router.post('/users/:uuid/delete', userController.deleteUser);


module.exports = router;

