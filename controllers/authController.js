const db = require("../models");
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
