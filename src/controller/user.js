const { createUser, findUserByEmail } = require('../model/user');
const bcrypt = require('bcrypt');

// Register User
const registerUser = async (req, res) => {
    try {
        const { name, email, password, healthData } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required' });
        }

        // Default health data
        const defaultHealthData = {
            chronicDiseases: { type1Diabetes: false, type2Diabetes: false },
            heartAndBloodPressure: { highBP: false, lowBP: false, highCholesterol: false },
            digestiveDisorder: { celiacDisease: false, lactoseIntolerance: false }
        };

        // Merge provided health data with default values
        const userHealthData = {
            chronicDiseases: { ...defaultHealthData.chronicDiseases, ...healthData?.chronicDiseases },
            heartAndBloodPressure: { ...defaultHealthData.heartAndBloodPressure, ...healthData?.heartAndBloodPressure },
            digestiveDisorder: { ...defaultHealthData.digestiveDisorder, ...healthData?.digestiveDisorder }
        };

        // Create user in the database
        const newUser = await createUser(name, email, password, userHealthData);

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};

// Login User
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        res.json({ message: 'Login successful', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};

module.exports = { registerUser, loginUser };
