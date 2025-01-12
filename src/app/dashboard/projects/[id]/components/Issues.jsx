import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IssueReplyDialog } from "./IssueReplyDialog";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { Files } from "lucide-react";

export default function IssueTable({ project, setProject }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const projectName = project.projectName;
  const projectId = project._id;
  const { toast } = useToast();

  const codeSnippet =
    `<script src="https://pixeltrack.startgrid.xyz/js/issues.js" \n` +
    `        data-website-url="${project.projectName}" data-project-id="${project._id}" defer></script>`;

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
    <>
      {project.issues.length > 0 ? (
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    {issue.userEmail}
                  </td>
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    {issue.state === "Not replied" && (
                      <Button onClick={() => handleReplyClick(issue)}>
                        Reply
                      </Button>
                    )}
                  </td>
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
      ) : (
        <div className="bg-gray-100 p-4 rounded-lg">
          <h1 className="text-lg font-bold text-gray-700">
            Installation Script
          </h1>
          <p className="text-gray-700">
            Paste the following code into the <code>&lt;body&gt;</code> tag.
          </p>
          <hr className="border-gray-300 my-4" />
          <div className="flex justify-end items-center space-x-4">
            <button
              onClick={() => navigator.clipboard.writeText(codeSnippet)}
              className="text-gray-700 hover:text-gray-900 bg-gray-200 hover:bg-gray-300 p-2 rounded-lg font-semibold transition-colors duration-300 mt-3"
            >
              <Files className="w-5 h-5" />
            </button>
          </div>
          {codeSnippet && (
            <>
              <div className="mt-4 p-4 bg-gray-900 rounded-lg relative">
                <pre className="bg-gray-800 text-gray-300 p-4 rounded overflow-x-auto">
                  <code>{codeSnippet}</code>
                </pre>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
