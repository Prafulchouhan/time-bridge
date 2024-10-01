import { getMeetings } from "@/actions/meetings"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MeetingList from "./_components/meeting-list"
import { Suspense } from "react"


export const metadata = {
  title: 'Your Meeting | Event-Bridge',
  description: 'View and manage your comming and past meetings.'
}

const MeetingPage = () => {
  return (
    <Tabs defaultValue="upcoming">
      <TabsList>
        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        <TabsTrigger value="past">Past</TabsTrigger>
      </TabsList>
      <TabsContent value="upcoming">
        <Suspense fallback={<div>Loading upcoming meetings ...</div>}>
          <UpcomingMeetings />
        </Suspense>
      </TabsContent>
      <TabsContent value="past">
        <Suspense fallback={<div>Loading upcoming meetings ...</div>}>
          <PastMeetings />
        </Suspense>
      </TabsContent>
    </Tabs>
  )
}

async function UpcomingMeetings() {
  const meets = await getMeetings('upcoming');
  return (<MeetingList meetings={meets} type={'upcoming'} />)
}

async function PastMeetings() {
  const meets = await getMeetings('past');
  return (<MeetingList meetings={meets} type={'past'} />)
}

export default MeetingPage