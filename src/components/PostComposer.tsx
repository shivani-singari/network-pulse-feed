
import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";

export const PostComposer = ({ onPost }: { onPost: (content: string) => void }) => {
  const [content, setContent] = useState("");
  const { toast } = useToast();
  const MAX_LENGTH = 500;

  const handlePost = () => {
    if (content.trim()) {
      onPost(content);
      setContent("");
      toast({
        title: "Post published!",
        description: "Your post has been shared with your network.",
      });
    }
  };

  return (
    <div className="bg-card rounded-lg p-4 shadow-sm">
      <Textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="mb-4"
        maxLength={MAX_LENGTH}
      />
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {content.length}/{MAX_LENGTH}
        </span>
        <Button onClick={handlePost} disabled={!content.trim()}>
          Post
        </Button>
      </div>
    </div>
  );
};
