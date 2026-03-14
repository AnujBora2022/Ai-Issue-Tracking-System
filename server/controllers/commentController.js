import Comment from "../models/Comment.js";
import Issue from "../models/Issue.js";

// export const addComment = async (req, res) => {
//   try {

//     const comment = await Comment.create({
//       issueId: req.body.issueId,
//       userId: req.user.id,
//       commentText: req.body.commentText
//     });

//     res.status(201).json(comment);

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// REPLACE WITH:
export const addComment = async (req, res) => {
  try {
    const { issueId, commentText } = req.body;
    const issue = await Issue.findById(issueId);
    if (!issue) return res.status(404).json({ message: "Issue not found" });
    // const isCreator = issue.createdBy.toString() === req.user.id;
    // const isAssigned = issue.assignedTo?.toString() === req.user.id;
    // if (!isCreator && !isAssigned)
    //   return res.status(403).json({ message: "Only creator or assigned user can comment" });

    // REPLACE WITH:
    const isCreator = issue.createdBy.toString() === req.user.id;
    const isAssigned = issue.assignedTo?.some(id => id.toString() === req.user.id);
    if (!isCreator && !isAssigned)
      return res.status(403).json({ message: "Only creator or assigned users can comment" });

    const comment = await Comment.create({ issueId, userId: req.user.id, commentText });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getComments = async (req, res) => {
  try {

    const comments = await Comment.find({
      issueId: req.params.issueId
    }).populate("userId", "name");

    res.json(comments);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const deleteComment = async (req, res) => {
  try {

    const comment = await Comment.findById(req.params.id);

    if (comment.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await comment.deleteOne();

    res.json({ message: "Comment deleted" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
