const db = require("../../models");
const bcrypt = require("bcryptjs");

exports.registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const doesExistsUser = await db.User.findOne({ where: { username } });

        if (doesExistsUser)
            return res.status(400).json({ error: "Username already exists" });

        const newUser = await db.User.create({
            username,
            password: hashedPassword,
        });

        res.status(201).json({
            status: { code: 200, message: "User created successfully" },
            data: newUser,
        });
    } catch (error) {
        res.status(500).json({ status: { code: 500, message: error.message } });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await db.User.findOne({ where: { username } });

        if (!user) {
            return res.status(404).json({
                status: {
                    code: 404,
                    message: "User not found",
                },
            });
        }

        if (!(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({
                status: {
                    code: 401,
                    message: "Invalid password",
                },
            });
        }

        res.status(200).json({
            status: {
                code: 200,
                message: "User logged in successfully",
            },
        });
    } catch (error) {
        res.status(500).json({ status: { code: 500, message: error.message } });
    }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await db.User.findAll();
        res.status(200).json({
            status: { code: 200, message: "Users retrieved successfully" },
            data: users,
        });
    } catch (error) {
        res.status(500).json({ status: { code: 500, message: error.message } });
    }
};

// Get User by ID
exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await db.User.findByPk(id);

        if (!user) return res.status(404).json({ error: "User not found" });

        res.status(200).json({
            status: { code: 200, message: "User retrieved successfully" },
            data: user,
        });
    } catch (error) {
        res.status(500).json({ status: { code: 500, message: error.message } });
    }
};

// Update User
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, password } = req.body;

        const user = await db.User.findByPk(id);
        if (!user) return res.status(404).json({ error: "User not found" });

        const hashedPassword = password
            ? await bcrypt.hash(password, 10)
            : user.password;

        await user.update({ username, password: hashedPassword });

        res.status(200).json({
            status: { code: 200, message: "User updated successfully" },
            data: user,
        });
    } catch (error) {
        res.status(500).json({ status: { code: 500, message: error.message } });
    }
};

// Delete User
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await db.User.findByPk(id);
        if (!user) return res.status(404).json({ error: "User not found" });

        await user.destroy();

        res.status(200).json({
            status: { code: 200, message: "User deleted successfully" },
        });
    } catch (error) {
        res.status(500).json({ status: { code: 500, message: error.message } });
    }
};
