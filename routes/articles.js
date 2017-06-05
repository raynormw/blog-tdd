const router = require('express').Router();
const articles_controller = require('../controllers/articles_controller');
const helpers = require('../helpers/util');

router.get('/', helpers.admin, articles_controller.getAll);
router.get('/:id', helpers.auth, articles_controller.getSingle);
router.post('/', helpers.auth, articles_controller.createArticle);
router.put('/:id', helpers.auth, articles_controller.updateArticle);
router.delete('/:id', helpers.auth, articles_controller.deleteArticle);

module.exports = router;
