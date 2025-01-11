const express = require('express');
const { getMenu, createMenu, updateMenu, deleteMenu } = require('../../Controller/Menu Management/menu.controller');
const router = express.Router();


router.get('/',getMenu);
router.post('/',createMenu);
router.put('/:id',updateMenu);
router.delete('/:id',deleteMenu);

module.exports = router;