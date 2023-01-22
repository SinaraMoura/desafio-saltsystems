require('dotenv').config();
const knex = require("../connection");

const newMessages = async (req, res) => {
    const { user_id, message } = req.body;

    try {
        const messages = await knex('messages').insert({ user_id, message }).returning('*');
        return res.status(200).json(messages);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const listMessages = async (req, res) => {
    try {
        const queryListMessages = await knex('messages');
        return res.status(200).json(queryListMessages);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const detailMessage = async (req, res) => {
    const { user_id } = req.params;

    try {
        const queryListMessagesId = await knex('messages as me').join("contacts as co", "co.id", "=", "me.user_id").select("co.name", "co.phone_number", "me.id", "me.user_id", "me.message", "me.data_message").orderBy("me.data_message", "asc").where({ user_id }).returning('*');
        return res.status(200).json(queryListMessagesId);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { newMessages, listMessages, detailMessage };