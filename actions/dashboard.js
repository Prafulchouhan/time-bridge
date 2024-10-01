'use server'
import { db } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"

export async function getLatestUpdates(params) {
    const { userId } = auth()
    if (!userId) {
        throw new Error("Unauthorized")
    }


    const user = await db.user.findUnique({
        where: { clerkUserId: userId },
    })

    if (!user) {
        throw new Error('User Not found')
    }

    const now = new Date()

  const upcomingMeetings = await db.booking.findMany({
    where: {
      userId: user.id,
      startTime: { gt: now }
    },
    include: {
      event: {
            select: {title: true}
      }
    },
    orderBy: {
      startTime: 'asc'
    },
    take: 3
  })
  return upcomingMeetings;
}