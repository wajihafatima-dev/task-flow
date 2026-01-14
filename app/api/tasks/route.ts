import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@/app/generated/prisma';

// ---------------------
// Types
// ---------------------
export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'COMPLETED' | 'ON_HOLD' | 'PENDING'
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'

interface CreateTaskBody {
  title: string
  description?: string
  status?: TaskStatus
  progress?: number
  timeEstimate?: number
  timeSpent?: number
  dueDate?: string // ISO string
  priority?: TaskPriority
  archived?: boolean
  projectId: string
  listId?: string
  assigneeId?: string
  labelIds?: string[] // array of label IDs
}

// ---------------------
// GET /api/tasks
// Fetch all tasks with relations
// ---------------------
export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        project: true,
        list: true,
        assignee: true,
        labels: true,
        comments: { include: { user: true } },
        attachments: true,
        activities: true,
      },
      orderBy: { updatedAt: 'desc' },
    })

    return NextResponse.json(tasks, { status: 200 })
  } catch (error) {
    console.error('GET /api/tasks error:', error)
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 })
  }
}

// ---------------------
// POST /api/tasks
// Create a new task
// ---------------------
export async function POST(request: NextRequest) {
  try {
    const body: CreateTaskBody = await request.json()

    const {
      title,
      description,
      status = 'TODO',
      progress = 0,
      timeEstimate,
      timeSpent,
      dueDate,
      priority = 'MEDIUM',
      archived = false,
      projectId,
      listId,
      assigneeId,
      labelIds,
    } = body

    // Validation
    if (!title || !projectId) {
      return NextResponse.json(
        { error: 'Missing required fields: title or projectId' },
        { status: 400 }
      )
    }

    // Prepare Prisma create data
    const taskData: Prisma.TaskCreateInput = {
      title,
      description,
      status,
      progress,
      timeEstimate,
      timeSpent,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      priority,
      archived,
      projectId,
      listId,
      assigneeId,
      labels: labelIds?.length
        ? {
            connect: labelIds.map((id) => ({ id })),
          }
        : undefined,
    }

    // Create the task
    const task = await prisma.task.create({
      data: taskData,
    })

    // Fetch task with full relations
    const fullTask = await prisma.task.findUnique({
      where: { id: task.id },
      include: {
        project: true,
        list: true,
        assignee: true,
        labels: true,
        comments: { include: { user: true } },
        attachments: true,
        activities: true,
      },
    })

    if (!fullTask) {
      return NextResponse.json({ error: 'Task not found after creation' }, { status: 404 })
    }

    return NextResponse.json(fullTask, { status: 201 })
  } catch (error) {
    console.error('POST /api/tasks error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
