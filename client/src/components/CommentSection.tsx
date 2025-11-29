import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Reply, X } from "lucide-react";
import { motion } from "framer-motion";

interface Reply {
  id: number;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
}

interface Comment {
  id: number;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  liked: boolean;
  replies?: Reply[];
}

interface CommentSectionProps {
  postId: number;
  comments: Comment[];
  onAddComment?: (content: string) => void;
}

export function CommentSection({ postId, comments, onAddComment }: CommentSectionProps) {
  const [newComment, setNewComment] = useState("");
  const [likedComments, setLikedComments] = useState<Set<number>>(new Set());
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");
  const [likedReplies, setLikedReplies] = useState<Set<number>>(new Set());

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment?.(newComment);
      setNewComment("");
    }
  };

  const handleAddReply = (commentId: number) => {
    if (replyText.trim()) {
      console.log(`Reply to comment ${commentId}: ${replyText}`);
      setReplyText("");
      setReplyingTo(null);
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

  const toggleReplyLike = (replyId: number) => {
    const newLiked = new Set(likedReplies);
    if (newLiked.has(replyId)) {
      newLiked.delete(replyId);
    } else {
      newLiked.add(replyId);
    }
    setLikedReplies(newLiked);
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
            data-testid="input-comment"
          />
          <Button
            onClick={handleAddComment}
            disabled={!newComment.trim()}
            className="bg-accent hover:bg-accent/90 text-white rounded"
            size="sm"
            data-testid="button-send-comment"
          >
            Kirim
          </Button>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4 mt-4">
        {comments.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">Belum ada komentar. Jadilah yang pertama!</p>
        ) : (
          comments.map((comment, idx) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="space-y-3"
            >
              {/* Main Comment */}
              <div className="flex gap-3">
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
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => toggleLike(comment.id)}
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                      data-testid={`button-like-comment-${comment.id}`}
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
                    <button 
                      onClick={() => setReplyingTo(comment.id)}
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                      data-testid={`button-reply-${comment.id}`}
                    >
                      <Reply className="h-3.5 w-3.5" />
                      Balas
                    </button>
                  </div>
                </div>
              </div>

              {/* Reply Input */}
              {replyingTo === comment.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex gap-3 ml-11 mb-3"
                >
                  <Avatar className="h-7 w-7 border border-white/10">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>YO</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 flex gap-2">
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="bg-accent/10 border border-accent/20 rounded-lg px-3 py-2">
                        <p className="text-xs text-muted-foreground">Membalas <span className="font-semibold text-accent">{comment.author}</span></p>
                      </div>
                      <Input
                        placeholder="Tulis balasan..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAddReply(comment.id)}
                        className="bg-white/5 border-white/10 text-xs focus-visible:ring-accent"
                        data-testid={`input-reply-${comment.id}`}
                      />
                    </div>
                    <div className="flex gap-1 flex-col justify-end">
                      <Button
                        onClick={() => handleAddReply(comment.id)}
                        disabled={!replyText.trim()}
                        className="bg-accent hover:bg-accent/90 text-white rounded"
                        size="sm"
                        data-testid={`button-send-reply-${comment.id}`}
                      >
                        Kirim
                      </Button>
                      <Button
                        onClick={() => {
                          setReplyingTo(null);
                          setReplyText("");
                        }}
                        variant="ghost"
                        size="sm"
                        className="h-8 text-muted-foreground hover:text-foreground"
                        data-testid={`button-cancel-reply-${comment.id}`}
                      >
                        <X className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="ml-11 space-y-3 pt-2 border-l border-white/10 pl-4">
                  {comment.replies.map((reply, replyIdx) => (
                    <motion.div
                      key={reply.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: replyIdx * 0.05 }}
                      className="flex gap-3"
                    >
                      <Avatar className="h-7 w-7 border border-white/10 flex-shrink-0">
                        <AvatarImage src={reply.avatar} />
                        <AvatarFallback>{reply.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="bg-white/5 border border-white/10 rounded-lg p-2.5">
                          <div className="flex items-center justify-between mb-0.5">
                            <p className="text-xs font-semibold">{reply.author}</p>
                            <p className="text-xs text-muted-foreground">{reply.timestamp}</p>
                          </div>
                          <p className="text-xs text-foreground">{reply.content}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-1.5">
                          <button
                            onClick={() => toggleReplyLike(reply.id)}
                            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                            data-testid={`button-like-reply-${reply.id}`}
                          >
                            <Heart
                              className={`h-3 w-3 ${
                                likedReplies.has(reply.id)
                                  ? "text-red-400 fill-red-400"
                                  : ""
                              }`}
                            />
                            <span>{reply.likes + (likedReplies.has(reply.id) ? 1 : 0)}</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
