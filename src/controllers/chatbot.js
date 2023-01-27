const { json } = require("express");
const knex = require("../connection");
const stages = require("../stages");

const chatBot = async (req, res) => {
    const { user_id, message } = req.body;

    try {
        const messages = await knex('messages').where({ user_id });

        if (messages.length < 1) {
            const optionMenu = stages.menu.reduce((acc, value) => {
                return acc += ` 
                ${value.id} - ${value.descricao} - valor: R$ ${value.preco}
                `
            }, "Olá, sou o assistente virtual da SaltBurguer , e estou aqui para te ajudar. Vamos fazer o pedido? É só digitar o número da opção: ")

            const insertMessages = await knex('messages').insert({ user_id, message }).returning('*');
            const insertMessagesBot = await knex('messages').insert({ user_id, message: optionMenu }).returning('*');

            return res.status(200).json([{ message: message, id: insertMessages[0].id, data_message: insertMessages[0].data_message },
            { message: optionMenu, id: insertMessagesBot[0].id, data_message: insertMessagesBot[0].data_message }]);
        }

        const pedido = stages.menu.find((item) => {
            return item.id === Number(message)
        })

        if (!pedido) {
            res.status(400).json({ message: "Essa opção não é válida" });
        }

        if (messages.length > 1) {
            const optionPagamento = stages.pagamento.reduce((acc, value) => {
                return acc += ` 
                ${value.id} - ${value.descricao}
                `
            }, "Qual a forma de pagamento? ");

            const queryBusca = await knex('messages').where({ message: optionPagamento }).andWhere({ user_id });

            if (queryBusca.length < 1) {
                const insertMessages = await knex('messages').insert({ user_id, message }).returning('*');
                const insertMessagesBot = await knex('messages').insert({ user_id, message: optionPagamento }).returning('*');

                messages.push({ message: message, id: insertMessages[0].id, data_message: insertMessages[0].data_message })
                messages.push({ message: optionPagamento, id: insertMessagesBot[0].id, data_message: insertMessagesBot[0].data_message })

                return res.status(200).json(messages);
            }
            const resposta = "Seu pedido será encaminhado. SaltBurguer agradece pela preferência !";
            const insertMessages = await knex('messages').insert({ user_id, message }).returning('*');
            const insertMessagesBot = await knex('messages').insert({ user_id, message: resposta }).returning('*');

            messages.push({ message: message, id: insertMessages[0].id, data_message: insertMessages[0].data_message })
            messages.push({ message: resposta, id: insertMessagesBot[0].id, data_message: insertMessagesBot[0].data_message })

            return res.status(200).json(messages);
        }

    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

module.exports = { chatBot };