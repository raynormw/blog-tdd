const router = require('express').Router();
const articles_controller = require('../controllers/articles_controller');

router.get('/', articles_controller.getAll);
router.get('/:id', articles_controller.getSingle);
router.post('/', articles_controller.createArticle);
router.put('/:id', articles_controller.updateArticle);
router.delete('/:id', articles_controller.deleteArticle);

module.exports = router;
