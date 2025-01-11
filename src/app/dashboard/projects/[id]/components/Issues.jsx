import { Button } from "@/components/ui/button";
import React from "react";

const Issues = ({ project, setProject }) => {
  return (
    <div>
      {project.issues.length === 0 ? (
        <p>No issues found.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Email</th>
              <th>Title</th>
              <th>Description</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody>
            {project.issues.map((issue, index) => (
              <tr
                className={`${
                  issue.state === "Replied" &&
                  "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
                key={index}
              >
                <td>{issue.userEmail}</td>
                <td>{issue.title}</td>
                <td>
                  {issue.description.length > 20
                    ? issue.description.slice(0, 20) + "..."
                    : issue.description}
                </td>
                <td>{issue.state}</td>
                {issue.state === "Not replied" && (
                  <td>
                    <Button
                      onClick={() => alert("you have do the implementation")}
                    >
                      Reply
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Issues;
