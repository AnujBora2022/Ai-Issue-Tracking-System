import Project from "../models/Project.js";
import Issue from "../models/Issue.js";
import User from "../models/User.js";
// CREATE PROJECT
export const createProject = async (req, res) => {
  try {

    const { projectName, description } = req.body;

    const project = await Project.create({
      projectName,
      description,
      owner: req.user.id,
      members: [req.user.id]
    });

    res.status(201).json(project);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// GET PROJECTS OF USER
export const getProjects = async (req, res) => {
  try {

    const projects = await Project.find({
      members: req.user.id
    }).populate("owner members", "name email");

    res.json(projects);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// DELETE PROJECT
export const deleteProject = async (req, res) => {
  try {

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await project.deleteOne();

    res.json({ message: "Project deleted" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ADD MEMBER
export const addMember = async (req, res) => {
  try {
    const { email } = req.body;

    // Look up user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "No user found with this email" });

    const userId = user._id;

    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    if (project.owner.toString() !== req.user.id)
      return res.status(403).json({ message: "Only owner can add members" });

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { members: userId } },
      { new: true }
    ).populate("owner members", "name email");

    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ⭐ GET ALL ISSUES OF A PROJECT (NEW)
export const getProjectIssues = async (req, res) => {
  try {

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Only project members can view issues
    if (!project.members.includes(req.user.id)) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const issues = await Issue.find({
      projectId: req.params.id
    })
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email");

    res.json(issues);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};