const db = require("../../models");
const { Channel } = require("../../models");
const { Op } = db.Sequelize;

module.exports = {
    // Create a new channel
    createChannel: async (req, res) => {
        try {
            const { Name, Initial, Category, Notes, Status } = req.body;

            // Check if a channel with the same Name already exists
            const existingChannel = await Channel.findOne({ where: { Name } });

            if (existingChannel) {
                return res.status(400).json({
                    status: {
                        code: 400,
                        message: "Channel with this name already exists",
                    },
                });
            }

            // Create new channel if Name is unique
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

            const channelCode = parseInt(id, 10);

            if (isNaN(channelCode)) {
                return res.status(400).json({
                    status: { code: 400, message: "Invalid channel Code" },
                });
            }

            // Find channel using the correct primary key ('Code')
            const channel = await Channel.findByPk(channelCode);
            if (!channel) {
                return res.status(404).json({
                    status: { code: 404, message: "Channel not found" },
                });
            }

            // Check for duplicate channel name (excluding the current channel)
            if (Name) {
                const existingChannel = await Channel.findOne({
                    where: {
                        Name,
                        Code: { [Op.ne]: channelCode }, // Use 'Code' instead of 'id'
                    },
                });

                if (existingChannel) {
                    return res.status(400).json({
                        status: {
                            code: 400,
                            message: "Channel with this name already exists",
                        },
                    });
                }
            }

            // Update the channel
            await channel.update({
                Name: Name ?? channel.Name,
                Initial: Initial ?? channel.Initial,
                Category: Category ?? channel.Category,
                Notes: Notes ?? channel.Notes,
                Status: Status ?? channel.Status,
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
