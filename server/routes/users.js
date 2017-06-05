const router = require('express').Router();
const users_controller = require('../controllers/users_controller');

router.get('/', users_controller.getUsers);
router.get('/:id', users_controller.getSingle);
router.post('/', users_controller.register);
router.delete('/:id', users_controller.deleteUser);
router.post('/login', users_controller.login);

module.exports = router;
