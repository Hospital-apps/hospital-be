const express = require('express');
const router = express.Router();
const {
  createSpecialty,
  getAllSpecialties,
  getSpecialtyById,
  updateSpecialty,
  deleteSpecialty
} = require('../controllers/specialtyController');
const verifyToken = require('../middleware/auth');



router.post('/',verifyToken, createSpecialty);
router.get('/', verifyToken, getAllSpecialties);
router.get('/:id', verifyToken,getSpecialtyById);
router.put('/:id',verifyToken, updateSpecialty);
router.delete('/:id',verifyToken, deleteSpecialty);
module.exports = router;
