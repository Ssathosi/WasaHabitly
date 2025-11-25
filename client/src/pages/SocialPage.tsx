import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { CommentSection } from "@/components/CommentSection";
import { Heart, MessageCircle, Share2, Trophy, Users, MoreHorizontal, Send } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const MOCK_POSTS = [
  {
    id: 1,
    user: { name: "Budi Santoso", handle: "@budi_s", avatar: "https://github.com/shadcn.png" },
    content: "Baru saja menyelesaikan streak 30 hari untuk 'Lari Pagi'! Rasanya luar biasa. 🏃‍♂️🔥",
    timestamp: "2 jam yang lalu",
    likes: 24,
    comments: 5,
    achievement: { title: "30 Day Streak", icon: <Trophy className="h-4 w-4 text-yellow-500" /> },
    commentsList: [
      { id: 1, author: "Siti Rahma", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Siti", content: "Keren banget Budi! Terus semangat! 💪", timestamp: "1 jam lalu", likes: 3, liked: false },
      { id: 2, author: "Dimas Anggara", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dimas", content: "Inspiratif! Kapan giliran aku mencapai 30 hari?", timestamp: "45 menit lalu", likes: 1, liked: false },
    ]
  },
  {
    id: 2,
    user: { name: "Siti Rahma", handle: "@siti_r", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Siti" },
    content: "Akhirnya bisa konsisten membaca buku 15 menit sehari selama seminggu ini. Buku 'Atomic Habits' sangat membantu!",
    timestamp: "4 jam yang lalu",
    likes: 42,
    comments: 12,
    achievement: null,
    commentsList: [
      { id: 3, author: "Budi Santoso", avatar: "https://github.com/shadcn.png", content: "Buku yang sama yang aku baca! Rekomendasi bagus.", timestamp: "3 jam lalu", likes: 5, liked: false }
    ]
  },
  {
    id: 3,
    user: { name: "Dimas Anggara", handle: "@dimas_a", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dimas" },
    content: "Sesi deep work 2 jam selesai. Produktivitas meningkat pesat dengan teknik Pomodoro. 🍅",
    timestamp: "6 jam yang lalu",
    likes: 15,
    comments: 2,
    achievement: { title: "Focus Master", icon: <Trophy className="h-4 w-4 text-purple-500" /> },
    commentsList: []
  }
];

const SUGGESTED_FRIENDS = [
  { name: "Rina Wati", mutuals: 3, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rina" },
  { name: "Joko Anwar", mutuals: 1, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Joko" },
  { name: "Maya Putri", mutuals: 5, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya" },
];

export default function SocialPage() {
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [newPost, setNewPost] = useState("");
  const [expandedPost, setExpandedPost] = useState<number | null>(null);

  const handlePost = () => {
    if (!newPost.trim()) return;
    
    const post = {
      id: Date.now(),
      user: { name: "Anda", handle: "@anda", avatar: "https://github.com/shadcn.png" },
      content: newPost,
      timestamp: "Baru saja",
      likes: 0,
      comments: 0,
      achievement: null,
      commentsList: []
    };
    
    setPosts([post, ...posts]);
    setNewPost("");
  };

  const handleLike = (id: number) => {
    setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  const handleAddComment = (postId: number, content: string) => {
    setPosts(posts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: p.comments + 1,
          commentsList: [
            ...p.commentsList,
            {
              id: Date.now(),
              author: "Anda",
              avatar: "https://github.com/shadcn.png",
              content,
              timestamp: "Baru saja",
              likes: 0,
              liked: false
            }
          ]
        };
      }
      return p;
    }));
  };

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Feed */}
      <div className="lg:col-span-2 space-y-6">
        {/* Create Post */}
        <Card className="bg-card/30 border-white/5 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>ME</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-4">
                <Input 
                  placeholder="Bagikan progres atau pencapaianmu hari ini..." 
                  className="bg-white/5 border-white/10 focus-visible:ring-accent"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handlePost()}
                />
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 text-muted-foreground">
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-accent hover:bg-accent/10">
                      <Trophy className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button size="sm" onClick={handlePost} className="bg-accent hover:bg-accent/90 text-white">
                    <Send className="h-3 w-3 mr-2" /> Posting
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Posts Feed */}
        <div className="space-y-4">
          {posts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="bg-card/30 border-white/5 backdrop-blur-sm hover:border-white/10 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex gap-3">
                      <Avatar>
                        <AvatarImage src={post.user.avatar} />
                        <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-sm">{post.user.name}</h4>
                          <span className="text-muted-foreground text-xs">{post.user.handle}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>

                  <p className="text-sm leading-relaxed mb-4 text-foreground/90">
                    {post.content}
                  </p>

                  {post.achievement && (
                    <div className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-xs font-medium text-accent">
                      {post.achievement.icon}
                      {post.achievement.title}
                    </div>
                  )}

                  <Separator className="bg-white/5 mb-4" />

                  <div className="flex items-center justify-between text-muted-foreground">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="hover:text-red-400 hover:bg-red-500/10 gap-2"
                      onClick={() => handleLike(post.id)}
                    >
                      <Heart className={cn("h-4 w-4", post.likes > 0 && "fill-current")} /> 
                      {post.likes}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="hover:text-blue-400 hover:bg-blue-500/10 gap-2"
                      onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                    >
                      <MessageCircle className="h-4 w-4" /> 
                      {post.comments}
                    </Button>
                    <Button variant="ghost" size="sm" className="hover:text-green-400 hover:bg-green-500/10 gap-2">
                      <Share2 className="h-4 w-4" /> 
                      Share
                    </Button>
                  </div>

                  {expandedPost === post.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-white/5"
                    >
                      <CommentSection 
                        postId={post.id} 
                        comments={post.commentsList} 
                        onAddComment={(content) => handleAddComment(post.id, content)}
                      />
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6 hidden lg:block">
        <Card className="bg-card/30 border-white/5 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Users className="h-4 w-4" /> Teman yang Mungkin Dikenal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {SUGGESTED_FRIENDS.map((friend, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={friend.avatar} />
                    <AvatarFallback>{friend.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="overflow-hidden">
                    <p className="text-sm font-medium truncate">{friend.name}</p>
                    <p className="text-xs text-muted-foreground">{friend.mutuals} mutual friends</p>
                  </div>
                </div>
                <Button size="xs" variant="outline" className="h-7 px-2 text-xs border-white/10 hover:bg-white/10">
                  Add
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-card/30 border-white/5 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Grup Populer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {["Early Risers Club", "Book Worms Indonesia", "10K Steps Daily"].map((group, idx) => (
              <div key={idx} className="flex items-center gap-3 cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-xs font-bold text-white border border-white/10">
                  {group[0]}
                </div>
                <span className="text-sm font-medium">{group}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
