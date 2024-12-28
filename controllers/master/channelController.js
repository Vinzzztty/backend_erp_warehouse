const { Channel } = require("../../models");

module.exports = {
    // Create a new channel
    createChannel: async (req, res) => {
        try {
            const { Name, Initial, Category, Notes, Status } = req.body;

            const newChannel = await Channel.create({
                Name,
                Initial,
                Category,
                Notes,
                Status,
            });

            res.status(201).json({
                status: { code: 201, message: "Channel created successfully" },
                data: newChannel,
            });
        } catch (error) {
            res.status(500).json({
                status: { code: 500, message: error.message },
            });
        }
    },

    // Get all channels
    getAllChannels: async (req, res) => {
        try {
            const channels = await Channel.findAll();

            res.status(200).json({
                status: {
                    code: 200,
                    message: "Channels retrieved successfully",
                },
                data: channels,
            });
        } catch (error) {
            res.status(500).json({
                status: { code: 500, message: error.message },
            });
        }
    },

    // Get channel by ID
    getChannelById: async (req, res) => {
        try {
            const { id } = req.params;
            const channel = await Channel.findByPk(id);

            if (!channel) {
                return res.status(404).json({
                    status: { code: 404, message: "Channel not found" },
                });
            }

            res.status(200).json({
                status: {
                    code: 200,
                    message: "Channel retrieved successfully",
                },
                data: channel,
            });
        } catch (error) {
            res.status(500).json({
                status: { code: 500, message: error.message },
            });
        }
    },

    // Update channel by ID
    updateChannel: async (req, res) => {
        try {
            const { id } = req.params;
            const { Name, Initial, Category, Notes, Status } = req.body;

            const channel = await Channel.findByPk(id);

            if (!channel) {
                return res.status(404).json({
                    status: { code: 404, message: "Channel not found" },
                });
            }

            await channel.update({
                Name,
                Initial,
                Category,
                Notes,
                Status,
            });

            res.status(200).json({
                status: { code: 200, message: "Channel updated successfully" },
                data: channel,
            });
        } catch (error) {
            res.status(500).json({
                status: { code: 500, message: error.message },
            });
        }
    },

    // Delete channel by ID
    deleteChannel: async (req, res) => {
        try {
            const { id } = req.params;
            const channel = await Channel.findByPk(id);

            if (!channel) {
                return res.status(404).json({
                    status: { code: 404, message: "Channel not found" },
                });
            }

            await channel.destroy();

            res.status(200).json({
                status: { code: 200, message: "Channel deleted successfully" },
            });
        } catch (error) {
            res.status(500).json({
                status: { code: 500, message: error.message },
            });
        }
    },
};
