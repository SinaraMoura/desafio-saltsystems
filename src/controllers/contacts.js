require('dotenv').config();
const knex = require("../connection");

const newContact = async (req, res) => {
    const { name, phone_number } = req.body;

    try {
        const querySaveContact = await knex('contacts').insert({ name, phone_number }).returning('*');
        return res.status(200).json({ message: "Contato cadastrado com sucesso!" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const listContacts = async (req, res) => {
    try {
        const queryListContacts = await knex('contacts');
        return res.status(200).json(queryListContacts);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const detailContact = async (req, res) => {
    const { id } = req.params;

    try {
        const queryDetailContact = await knex('contacts').where({ id }).returning("*").first();
        return res.status(200).json(queryDetailContact);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { newContact, listContacts, detailContact };