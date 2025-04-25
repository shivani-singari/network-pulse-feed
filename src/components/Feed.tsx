
import { useState } from "react";
import { PostComposer } from "./PostComposer";
import { Card } from "./ui/card";

interface Post {
  id: number;
  content: string;
  author: string;
  timestamp: Date;
  likes: number;
}

export const Feed = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      content: "Excited to announce our new project launch! 🚀",
      author: "Sarah Johnson",
      timestamp: new Date(),
      likes: 42,
    },
  ]);

  const handleNewPost = (content: string) => {
    const newPost = {
      id: Date.now(),
      content,
      author: "Current User",
      timestamp: new Date(),
      likes: 0,
    };
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="space-y-4">
      <PostComposer onPost={handleNewPost} />
      {posts.map((post) => (
        <Card key={post.id} className="p-4">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{post.author}</span>
                <span className="text-sm text-muted-foreground">
                  {post.timestamp.toLocaleDateString()}
                </span>
              </div>
              <p className="mt-2">{post.content}</p>
              <div className="mt-4 flex items-center gap-4">
                <button className="text-sm text-muted-foreground hover:text-primary">
                  Like • {post.likes}
                </button>
                <button className="text-sm text-muted-foreground hover:text-primary">
                  Comment
                </button>
                <button className="text-sm text-muted-foreground hover:text-primary">
                  Share
                </button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
