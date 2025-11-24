import Project from "../models/Project.js";

export const getProjects = async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
};

export const getProjectById = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: "Project not found" });
  res.json(project);
};

export const createProject = async (req, res) => {
  const newProject = await Project.create(req.body);
  res.status(201).json(newProject);
};

export const updateProject = async (req, res) => {
  const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: "Project not found" });
  res.json(updated);
};

export const deleteProject = async (req, res) => {
  const deleted = await Project.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Project not found" });
  res.json({ message: "Deleted successfully" });
};

export const deleteAllProjects = async (_req, res) => {
  await Project.deleteMany({});
  res.json({ message: "All projects deleted" });
};
