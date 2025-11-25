import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (task: { title: string }) => void;
}

export function AddTaskModal({ open, onOpenChange, onAdd }: AddTaskModalProps) {
  const [taskTitle, setTaskTitle] = useState("");

  const handleAdd = () => {
    if (taskTitle.trim()) {
      onAdd({ title: taskTitle });
      setTaskTitle("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card/50 border-white/10 backdrop-blur-md max-w-sm">
        <DialogHeader>
          <DialogTitle>Tambah Tugas Baru</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="task" className="text-sm font-medium text-muted-foreground mb-2 block">
              Deskripsi Tugas
            </Label>
            <Input
              id="task"
              placeholder="Masukkan tugas yang ingin diselesaikan..."
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              className="bg-white/5 border-white/10 focus-visible:ring-accent"
              autoFocus
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="border-white/10">
            Batal
          </Button>
          <Button onClick={handleAdd} className="bg-accent hover:bg-accent/90 text-white">
            Tambah
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
