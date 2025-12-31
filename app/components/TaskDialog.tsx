import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "./ui-components/Dialog";
import { Button } from "./ui-components/Button";
import { Input } from "./ui-components/Input";
import { Label } from "./ui-components/Label";
import { Select, SelectItem } from "./ui-components/Select";
import type { TaskStatus } from "../types/page";

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (task: {
    title: string;
    status: TaskStatus;
    timeEstimate: string;
    projectId?: string;
  }) => void;
}

export function TaskDialog({ open, onOpenChange, onSubmit }: TaskDialogProps) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<TaskStatus>("todo");
  const [timeEstimate, setTimeEstimate] = useState("");
  const [projectId, setProjectId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({
      title,
      status,
      timeEstimate,
      projectId: projectId || undefined,
    });
    // Reset form
    setTitle("");
    setStatus("todo");
    setTimeEstimate("");
    setProjectId("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogTitle>Create New Task</DialogTitle>
        <DialogDescription>
          Add a new task to your project. Fill in the details below.
        </DialogDescription>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Task Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task title..."
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={status}
                onChange={(val) => setStatus(val as TaskStatus)}
              >
                <SelectItem value="todo">To Do</SelectItem>
                <SelectItem value="in progress">In Progress</SelectItem>
                <SelectItem value="on hold">On Hold</SelectItem>
                <SelectItem value="done">Done</SelectItem>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="timeEstimate">Time Estimate</Label>
              <Input
                id="timeEstimate"
                value={timeEstimate}
                onChange={(e) => setTimeEstimate(e.target.value)}
                placeholder="e.g., 4h, 2d"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="project">Project (Optional)</Label>
              <Select
                value={status}
                onChange={(val) => setStatus(val as TaskStatus)}
              >
                <SelectItem value="todo">To Do</SelectItem>
                <SelectItem value="in progress">In Progress</SelectItem>
                <SelectItem value="on hold">On Hold</SelectItem>
                <SelectItem value="done">Done</SelectItem>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create Task</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
