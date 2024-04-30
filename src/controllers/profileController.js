const User = require('../models/user'); 
const Doctor = require('../models/Doctor'); 

exports.getUserProfile = async (req, res) => {
    try {
        let profile;
        if (req.user.role === 'dokter') {
            profile = await Doctor.findById(req.user._id);
        } else {
            profile = await User.findById(req.user._id);
        }

        if (!profile) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            status: 200,
            message: 'User profile loaded successfully',
            data: profile
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Internal server error',
            error: error.message
        });
    }
};