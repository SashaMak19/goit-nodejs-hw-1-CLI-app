const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(id) {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === id);
  return result;
}

async function removeContact(id) {
  const contacts = await listContacts();
  const indexForRemoving = contacts.findIndex((contact) => contact.id === id);

  if (indexForRemoving === -1) {
    return null;
  }

  const [result] = contacts.splice(indexForRemoving, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 3));
  return result;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  const newArr = [...contacts, newContact];

  await fs.writeFile(contactsPath, JSON.stringify(newArr, null, 3));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
