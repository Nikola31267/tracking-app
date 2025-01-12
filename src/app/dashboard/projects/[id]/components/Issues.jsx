import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IssueReplyDialog } from "./IssueReplyDialog";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

export default function IssueTable({ project, setProject }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const projectName = project.projectName;
  const projectId = project._id;
  const { toast } = useToast();

  const handleReplyClick = (issue) => {
    setSelectedIssue(issue);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedIssue(null);
  };

  const handleReplySubmit = async (title, description) => {
    try {
      const response = await axios.post("http://localhost:8000/issues/reply", {
        userEmail: selectedIssue.userEmail,
        title: title,
        description: description,
        projectName,
        id: projectId,
        issueId: selectedIssue._id,
      });

      toast({
        title: "Success",
        description: "Issue reply sent successfully.",
      });

      setProject((prevProject) => {
        const updatedIssues = prevProject.issues.map((issue) =>
          issue._id === selectedIssue._id
            ? { ...issue, state: "Replied" }
            : issue
        );
        return { ...prevProject, issues: updatedIssues };
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to send issue reply.",
      });
    } finally {
      handleDialogClose();
    }
  };

  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full bg-white divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              State
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {project.issues.map((issue, index) => (
            <tr
              className={`${
                issue.state === "Replied" &&
                "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
              key={index}
            >
              <td className="px-6 py-4 whitespace-nowrap">{issue.userEmail}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {" "}
                {issue.title.length > 20
                  ? issue.title.slice(0, 20) + "..."
                  : issue.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {issue.description.length > 20
                  ? issue.description.slice(0, 20) + "..."
                  : issue.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{issue.state}</td>
              {issue.state === "Not replied" && (
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button onClick={() => handleReplyClick(issue)}>Reply</Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {selectedIssue && (
        <IssueReplyDialog
          isOpen={isDialogOpen}
          onClose={handleDialogClose}
          onSubmit={handleReplySubmit}
          userEmail={selectedIssue.userEmail}
        />
      )}
    </div>
  );
}
