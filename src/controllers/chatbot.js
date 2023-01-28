const { json } = require("express");
const knex = require("../connection");
const stages = require("../stages");

const chatBot = async (req, res) => {
    const { id_origem, id_destino, message } = req.body;

    try {
        const messages = await knex('chatbot').where({ id_origem });

        if (messages.length < 1) {
            const optionMenu = stages.menu.reduce((acc, value) => {
                return acc += ` 
                ${value.id} - ${value.descricao} - valor: R$ ${value.preco}
                `
            }, "Olá, sou o assistente virtual da SaltBurguer , e estou aqui para te ajudar. Vamos fazer o pedido? É só digitar o número da opção: ")

            const insertMessages = await knex('chatbot').insert({ id_origem, id_destino, message }).returning('*');
            const insertMessagesBot = await knex('chatbot').insert({ id_destino, message: optionMenu }).returning('*');

            return res.status(200).json([{ message: message, id: insertMessages[0].id, data_message: insertMessages[0].data_message },
            { message: optionMenu, id: insertMessagesBot[0].id, data_message: insertMessagesBot[0].data_message }]);
        }

        if (messages.length > 1) {
            const optionPagamento = stages.pagamento.reduce((acc, value) => {
                return acc += ` 
                ${value.id} - ${value.descricao}
                `
            }, "Qual a forma de pagamento? ");

            const queryBusca = await knex('chatbot').where({ message: optionPagamento }).andWhere({ id_origem });

            if (queryBusca.length < 1) {
                const insertMessages = await knex('chatbot').insert({ id_origem, message }).returning('*');
                const insertMessagesBot = await knex('chatbot').insert({ id_destino, message: optionPagamento }).returning('*');

                return res.status(200).json(messages);
            }
            const resposta = "Seu pedido será encaminhado. SaltBurguer agradece pela preferência !";
            const insertMessages = await knex('chatbot').insert({ id_origem, message }).returning('*');
            const insertMessagesBot = await knex('chatbot').insert({ id_destino, message: resposta }).returning('*');

            return res.status(200).json(messages);
        }

    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

const detailMessageBot = async (req, res) => {
    const { id_origem } = req.params;

    try {
        const queryListMessagesBot = await knex('chatbot').where({ id_origem }).returning("*");
        return res.status(200).json(queryListMessagesBot);
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

const deleteMessagesBot = async (req, res) => {
    const { id_origem } = req.params;
    try {
        const queryDeleteMessagesBot = await knex('chatbot').delete().where({ id_origem }).returning("*");
        return res.status(200).json(queryDeleteMessagesBot);
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

module.exports = { chatBot, detailMessageBot, deleteMessagesBot };