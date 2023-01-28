const express = require('express');
const { chatBot, detailMessageBot } = require('./controllers/chatbot');
const { newContact, listContacts, detailContact } = require('./controllers/contacts');
const { newMessages, listMessages, detailMessage } = require('./controllers/messages');
const { usersRegistration, login, verifyEmail, verifyUser } = require('./controllers/users');
const { authorization } = require('./middlewares/verifyToken');
const router = express();

router.post("/users", usersRegistration);
router.post("/login", login);
router.get("/email", verifyEmail);

router.use(authorization);
router.get("/users", verifyUser);
router.post("/contacts", newContact);
router.get("/contacts", listContacts);
router.get("/contacts/:id", detailContact);
router.post("/messages", newMessages);
router.post("/bot", chatBot);
router.get("/bot/:id_origem", detailMessageBot);
router.get("/messages", listMessages);
router.get("/messages/:user_id", detailMessage);

module.exports = router;