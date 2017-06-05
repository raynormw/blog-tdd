const router = require('express').Router();

router.get('/', function(req, res) {
  res.send("Our site is alive, yeay..");
});

module.exports = router;
