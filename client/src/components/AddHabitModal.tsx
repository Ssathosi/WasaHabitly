import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AddHabitModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (habit: { title: string; description: string; category: string }) => void;
}

export function AddHabitModal({ open, onOpenChange, onAdd }: AddHabitModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("health");

  const handleAdd = () => {
    if (title.trim()) {
      onAdd({ title, description, category });
      setTitle("");
      setDescription("");
      setCategory("health");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card/50 border-white/10 backdrop-blur-md">
        <DialogHeader>
          <DialogTitle>Tambah Habit Baru</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title" className="text-sm font-medium text-muted-foreground mb-2 block">
              Nama Habit
            </Label>
            <Input
              id="title"
              placeholder="Contoh: Lari pagi"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-white/5 border-white/10 focus-visible:ring-accent"
            />
          </div>
          <div>
            <Label htmlFor="description" className="text-sm font-medium text-muted-foreground mb-2 block">
              Deskripsi
            </Label>
            <Input
              id="description"
              placeholder="Contoh: Lari selama 30 menit"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-white/5 border-white/10 focus-visible:ring-accent"
            />
          </div>
          <div>
            <Label htmlFor="category" className="text-sm font-medium text-muted-foreground mb-2 block">
              Kategori
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="bg-white/5 border-white/10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-white/10">
                <SelectItem value="health">Kesehatan</SelectItem>
                <SelectItem value="productivity">Produktivitas</SelectItem>
                <SelectItem value="learning">Belajar</SelectItem>
                <SelectItem value="wellness">Wellness</SelectItem>
              </SelectContent>
            </Select>
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
