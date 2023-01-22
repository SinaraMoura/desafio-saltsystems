const express = require('express');
const { newContact, listContacts, detailContact } = require('./controllers/contacts');
const { newMessages, listMessages, detailMessage } = require('./controllers/messages')
const router = express();

router.post("/contacts", newContact);
router.get("/contacts", listContacts);
router.get("/contacts/:id", detailContact);
router.post("/messages", newMessages);
router.get("/messages", listMessages);
router.get("/messages/:user_id", detailMessage);

module.exports = router;