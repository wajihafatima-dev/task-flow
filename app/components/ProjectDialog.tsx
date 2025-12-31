"use client";
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
import type { ProjectStatus } from "../types/page";
import { Select, SelectItem } from "./ui-components/Select";

interface ProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (project: { name: string; status: ProjectStatus }) => void;
}

export function ProjectDialog({
  open,
  onOpenChange,
  onSubmit,
}: ProjectDialogProps) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState<ProjectStatus>("active");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({
      name,
      status,
    });
    // Reset form
    setName("");
    setStatus("active");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogTitle>Create New Project</DialogTitle>
        <DialogDescription>
          Add a new project to organize your tasks. Fill in the details below.
        </DialogDescription>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter project name..."
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={status}
                onChange={(val) => setStatus(val as ProjectStatus)}
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
            <Button type="submit">Create Project</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
