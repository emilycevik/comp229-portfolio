import Qualification from "../models/Qualification.js";

export const getQualifications = async (req, res) => {
  const qualifications = await Qualification.find();
  res.json(qualifications);
};

export const getQualificationById = async (req, res) => {
  const qualification = await Qualification.findById(req.params.id);
  if (!qualification) return res.status(404).json({ message: "Qualification not found" });
  res.json(qualification);
};

export const createQualification = async (req, res) => {
  const newQualification = await Qualification.create(req.body);
  res.status(201).json(newQualification);
};

export const updateQualification = async (req, res) => {
  const updated = await Qualification.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: "Qualification not found" });
  res.json(updated);
};

export const deleteQualification = async (req, res) => {
  const deleted = await Qualification.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Qualification not found" });
  res.json({ message: "Deleted successfully" });
};

export const deleteAllQualifications = async (_req, res) => {
  await Qualification.deleteMany({});
  res.json({ message: "All qualifications deleted" });
};
