import Contact from "../models/Contact.js";

export const getContacts = async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
};

export const getContactById = async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) return res.status(404).json({ message: "Contact not found" });
  res.json(contact);
};

export const createContact = async (req, res) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json(newContact);
};

export const updateContact = async (req, res) => {
  const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: "Contact not found" });
  res.json(updated);
};

export const deleteContact = async (req, res) => {
  const deleted = await Contact.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Contact not found" });
  res.json({ message: "Deleted successfully" });
};

export const deleteAllContacts = async (_req, res) => {
  await Contact.deleteMany({});
  res.json({ message: "All contacts deleted" });
};
