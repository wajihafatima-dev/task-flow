import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const task = await prisma.task.findUnique({
      where: { id: params.id },
      include: { project: true, activities: true }
    })
    if (!task) return NextResponse.json({ error: 'Task not found' }, { status: 404 })
    return NextResponse.json(task)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch task' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { name, status, timeSpent, progress, projectId } = await request.json()
    
    const task = await prisma.task.update({
      where: { id: params.id },
      data: {
        name,
        status,
        timeSpent: Number(timeSpent),
        progress: Number(progress),
        projectId
      }
    })
    return NextResponse.json(task)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update task' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.task.delete({ where: { id: params.id } })
    return NextResponse.json({ message: 'Task deleted' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 })
  }
}
