import { FolderKanban, Ellipsis } from 'lucide-react';
import type { Project } from '../types/page';
// import { Progress } from './ui/progress';

interface ProjectCardProps {
  project: Project;
  onClick?: (projectId: string) => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const completionPercentage = Math.round((project.completedTasks / project.taskCount) * 100);

  return (
    <div
      className="bg-white rounded-lg p-5 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onClick?.(project.id)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <FolderKanban className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm mb-1">{project.name}</h3>
            <p className="text-xs text-gray-500 capitalize">{project.status}</p>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Ellipsis className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Progress</span>
          <span className="font-medium">{completionPercentage}%</span>
        </div>
        {/* <Progress value={completionPercentage} className="h-2" /> */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{project.completedTasks} of {project.taskCount} tasks</span>
        </div>
      </div>
    </div>
  );
}
