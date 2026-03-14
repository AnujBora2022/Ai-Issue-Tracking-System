function ProjectCard({ project }) {
  return (
    <div style={{
      border: "1px solid #ddd",
      padding: "10px",
      margin: "10px 0"
    }}>
      <h4>{project.projectName}</h4>
      <p>{project.description}</p>
    </div>
  );
}

export default ProjectCard;