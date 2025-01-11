"use client";

import SupportIcon from "@/components/SupportIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import React, { useState } from "react";

const TestPage = () => {
  const [replyEmail, setReplyEmail] = useState("");
  const [replyTitle, setReplyTitle] = useState("");
  const [replyDescription, setReplyDescription] = useState("");
  const projectName = "https://turboverify.vercel.app";
  const projectId = "676f26e40a5a344fe4c9c607";
  const issueId = "6782a82f9fa8d608194d095b";

  const handleReply = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/issues/reply", {
        userEmail: replyEmail,
        title: replyTitle,
        description: replyDescription,
        projectName,
        id: projectId,
        issueId,
      });

      const data = await response.data;
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div>
      <SupportIcon />
      <div>
        <h1 className="text-xl font-bold">Reply</h1>
        <form onSubmit={handleReply}>
          <Input
            type="email"
            placeholder="Email"
            value={replyEmail}
            onChange={(e) => setReplyEmail(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Title"
            value={replyTitle}
            onChange={(e) => setReplyTitle(e.target.value)}
          />
          <Textarea
            value={replyDescription}
            placeholder="Description"
            onChange={(e) => setReplyDescription(e.target.value)}
          />
          <Button variant="purple" type="submit">
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default TestPage;
