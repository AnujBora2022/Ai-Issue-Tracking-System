import Issue from "../models/Issue.js";

export const createIssue = async (req, res) => {
  try {

    const issue = await Issue.create({
      ...req.body,
      createdBy: req.user.id
    });

    res.status(201).json(issue);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// export const getIssues = async (req, res) => {
//   try {

//     const issues = await Issue.find({
//       projectId: req.params.projectId
//     }).populate("assignedTo createdBy");

//     res.json(issues);

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// REPLACE WITH:
export const getIssues = async (req, res) => {
  try {
    const issues = await Issue.find({
      projectId: req.params.projectId,
      $or: [
        { createdBy: req.user.id },
        // { assignedTo: req.user.id }
        // REPLACE WITH:
        { assignedTo: { $in: [req.user.id] } }

      ]
    }).populate("assignedTo createdBy");
    res.json(issues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const updateIssue = async (req, res) => {
  try {

    const issue = await Issue.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(issue);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// export const deleteIssue = async (req, res) => {
//   try {

//     await Issue.findByIdAndDelete(req.params.id);

//     res.json({ message: "Issue deleted" });

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// REPLACE WITH:
export const deleteIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ message: "Issue not found" });
    if (issue.createdBy.toString() !== req.user.id)
      return res.status(403).json({ message: "Only the creator can delete this issue" });
    await Issue.findByIdAndDelete(req.params.id);
    res.json({ message: "Issue deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
