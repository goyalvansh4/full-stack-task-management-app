const express = require('express');
const { getMenu, createMenu, updateMenu, deleteMenu } = require('../../Controller/Menu Management/menu.controller');
const { authMiddleWare } = require('../../Middleware/auth.middleware');
const router = express.Router();


router.get('/',authMiddleWare,getMenu);
router.post('/',authMiddleWare,createMenu);
router.put('/:id',updateMenu);
router.delete('/:id',deleteMenu);

module.exports = router;