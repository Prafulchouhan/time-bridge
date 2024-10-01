import { format } from "date-fns";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Calendar, Clock, Video } from "lucide-react";
import CancelMeetingButton from "./cancel-meet-button";
import { Button } from "@/components/ui/button";

export default function MeetingList({ meetings, type }) {
    if (meetings.length === 0) {
        return <p>No {type} meetings found.</p>;
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {meetings.map((meeting) => (
                <Card key={meeting.id} className="flex flex-col justify-between">
                    <CardHeader>
                        <CardTitle>{meeting.event.title}</CardTitle>
                        <CardDescription>with {meeting.name}</CardDescription>
                        <CardDescription>
                            &quot;{meeting.additionalInfo}&quot;
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center mb-2">
                            <Calendar className="mr-2 h-4 w-4" />
                            <span>{format(new Date(meeting.startTime), "MMMM d, yyyy")}</span>
                        </div>
                        <div className="flex items-center mb-2">
                            <Clock className="mr-2 h-4 w-4" />
                            <span>
                                {format(new Date(meeting.startTime), "h:mm a")} -{" "}
                                {format(new Date(meeting.endTime), "h:mm a")}
                            </span>
                        </div>
                        {meeting.meetingLink && (
                            <div className="flex items-center">
                                <Video className="mr-4 h-4 w-4" />
                                <Button className='mr-2'>
                                    <a
                                        href={meeting.meetingLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Join Meeting
                                    </a>
                                </Button>
                                {type === "upcoming" && (
                                    <CancelMeetingButton meetingId={meeting.id} />
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}