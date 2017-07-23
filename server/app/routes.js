// Application routes

const express           = require('express');
const router            = express.Router();
const userController    = require('./controllers/user.controller');
const millsController  = require('./controllers/mill.controller');




router.get('/logout', userController.logout);
router.post('/auth', userController.authUser);

// route middleware to authenticate and check token
router.use(userController.routerMiddleware);


// ---------------------------------------------------------
// AUTHENTICATED ROUTES BELOW THIS COMMENT
// ---------------------------------------------------------

router.get('/mills', millsController.showMills);
router.get('/mills/:slug', millsController.showSingle);




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
router.get('/x/mills/:slug/edit', millsController.showEdit); //to delete
router.post('/mills/:slug', millsController.processEdit);

// seed mills
router.get('/mills/seed', millsController.seedEvents);

// view single
router.get('/users/:uuid', userController.manageUser);

//delete
router.get('/mills/:slug/delete', millsController.deleteMill);
router.post('/users/:uuid/delete', userController.deleteUser);


module.exports = router;

