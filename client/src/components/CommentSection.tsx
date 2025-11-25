import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Reply } from "lucide-react";
import { motion } from "framer-motion";

interface Comment {
  id: number;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  liked: boolean;
}

interface CommentSectionProps {
  postId: number;
  comments: Comment[];
  onAddComment?: (content: string) => void;
}

export function CommentSection({ postId, comments, onAddComment }: CommentSectionProps) {
  const [newComment, setNewComment] = useState("");
  const [likedComments, setLikedComments] = useState<Set<number>>(new Set());

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment?.(newComment);
      setNewComment("");
    }
  };

  const toggleLike = (commentId: number) => {
    const newLiked = new Set(likedComments);
    if (newLiked.has(commentId)) {
      newLiked.delete(commentId);
    } else {
      newLiked.add(commentId);
    }
    setLikedComments(newLiked);
  };

  return (
    <div className="space-y-4">
      {/* Add Comment */}
      <div className="flex gap-3">
        <Avatar className="h-8 w-8 border border-white/10">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>YO</AvatarFallback>
        </Avatar>
        <div className="flex-1 flex gap-2">
          <Input
            placeholder="Tulis komentar..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
            className="bg-white/5 border-white/10 text-sm focus-visible:ring-accent"
          />
          <Button
            onClick={handleAddComment}
            disabled={!newComment.trim()}
            className="bg-accent hover:bg-accent/90 text-white"
            size="sm"
          >
            Kirim
          </Button>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-3 mt-4">
        {comments.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">Belum ada komentar. Jadilah yang pertama!</p>
        ) : (
          comments.map((comment, idx) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex gap-3"
            >
              <Avatar className="h-8 w-8 border border-white/10 flex-shrink-0">
                <AvatarImage src={comment.avatar} />
                <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-semibold">{comment.author}</p>
                    <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                  </div>
                  <p className="text-sm text-foreground">{comment.content}</p>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => toggleLike(comment.id)}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Heart
                      className={`h-3.5 w-3.5 ${
                        likedComments.has(comment.id)
                          ? "text-red-400 fill-red-400"
                          : ""
                      }`}
                    />
                    <span>{comment.likes + (likedComments.has(comment.id) ? 1 : 0)}</span>
                  </button>
                  <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                    <Reply className="h-3.5 w-3.5" />
                    Balas
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
