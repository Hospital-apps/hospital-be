const express = require('express');
const router = express.Router();
const {
  createSpecialty,
  getAllSpecialties,
  getSpecialtyById,
  updateSpecialty,
  deleteSpecialty
} = require('../controllers/specialtyController');


router.post('/', createSpecialty);
router.get('/', getAllSpecialties);
router.get('/:id', getSpecialtyById);
router.put('/:id', updateSpecialty);
router.delete('/:id', deleteSpecialty);
module.exports = router;
