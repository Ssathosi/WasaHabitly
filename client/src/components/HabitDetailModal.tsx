import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Edit2, Trash2, Copy } from "lucide-react";

interface HabitDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  habit: {
    id: number;
    title: string;
    description?: string;
    streak: number;
  } | null;
  onEdit?: (habit: any) => void;
  onDelete?: (id: number) => void;
}

export function HabitDetailModal({ open, onOpenChange, habit, onEdit, onDelete }: HabitDetailModalProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState(habit?.title || "");
  const [editDescription, setEditDescription] = useState(habit?.description || "");

  if (!habit) return null;

  const handleSaveEdit = () => {
    onEdit?.({ ...habit, title: editTitle, description: editDescription });
    setIsEditMode(false);
    onOpenChange(false);
  };

  const handleDelete = () => {
    if (confirm(`Apakah Anda yakin ingin menghapus habit "${habit.title}"?`)) {
      onDelete?.(habit.id);
      onOpenChange(false);
    }
  };

  if (isEditMode) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="bg-card/50 border-white/10 backdrop-blur-md">
          <DialogHeader>
            <DialogTitle>Edit Habit</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-title" className="text-sm font-medium text-muted-foreground mb-2 block">
                Nama Habit
              </Label>
              <Input
                id="edit-title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="bg-white/5 border-white/10 focus-visible:ring-accent"
              />
            </div>
            <div>
              <Label htmlFor="edit-desc" className="text-sm font-medium text-muted-foreground mb-2 block">
                Deskripsi
              </Label>
              <Input
                id="edit-desc"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="bg-white/5 border-white/10 focus-visible:ring-accent"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditMode(false)} className="border-white/10">
              Batal
            </Button>
            <Button onClick={handleSaveEdit} className="bg-accent hover:bg-accent/90 text-white">
              Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card/50 border-white/10 backdrop-blur-md">
        <DialogHeader>
          <DialogTitle>{habit.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Deskripsi</p>
            <p className="text-foreground">{habit.description || "Tidak ada deskripsi"}</p>
          </div>
          <Separator className="bg-white/10" />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Streak</p>
              <p className="text-2xl font-bold text-accent">{habit.streak} hari</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">ID</p>
              <p className="text-sm text-foreground/60">#{habit.id}</p>
            </div>
          </div>
        </div>
        <DialogFooter className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setIsEditMode(true)}
            className="border-blue-500/30 hover:bg-blue-500/10 text-blue-400"
          >
            <Edit2 className="h-4 w-4 mr-2" /> Edit
          </Button>
          <Button
            variant="outline"
            onClick={handleDelete}
            className="border-red-500/30 hover:bg-red-500/10 text-red-400"
          >
            <Trash2 className="h-4 w-4 mr-2" /> Hapus
          </Button>
          <Button onClick={() => onOpenChange(false)} className="bg-accent hover:bg-accent/90 text-white">
            Tutup
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
