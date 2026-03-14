import ActivityLog from "../models/ActivityLog.js";

export const getActivity = async (req, res) => {
  try {

    const logs = await ActivityLog.find({
      projectId: req.params.projectId
    }).populate("userId", "name");

    res.json(logs);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
