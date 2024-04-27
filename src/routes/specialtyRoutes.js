const express = require('express');
const router = express.Router();
const {
  createSpecialty,
  getAllSpecialties,
  getSpecialtyById,
  updateSpecialty,
  deleteSpecialty
} = require('../controllers/specialtyController');
const { authenticate } = require('../middleware/auth');


router.post('/', authenticate,createSpecialty);
router.get('/', authenticate,getAllSpecialties);
router.get('/:id', authenticate,getSpecialtyById);
router.put('/:id', authenticate,updateSpecialty);
router.delete('/:id', authenticate,deleteSpecialty);
module.exports = router;
