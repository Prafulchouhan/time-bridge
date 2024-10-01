'use client'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod'
import { usernameSchema } from '@/app/_lib/validatosr';
import useFetch from '@/hooks/use-fetch';
import { updateUsername } from '@/actions/users';
import { BarLoader } from 'react-spinners';
import { getLatestUpdates } from '@/actions/dashboard';
import { format } from 'date-fns';

const page = () => {
  
  const {isLoaded, user} = useUser();

  const [origin, setOrigin] = useState('');

  const {register, handleSubmit,setValue, formState: {errors} } =  useForm({
    resolver: zodResolver(usernameSchema)
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin);
    }
    setValue("username", user?.username);
  }, [isLoaded]);

  const {loading , error , fn: fnUpdateUsername} = useFetch(updateUsername);

  const onSubmit = async (data)=>{
    fnUpdateUsername(data.username)
  }

  const {loading: loadingUpdates , data: upcomingMeetings , fn: fnUpdate} = useFetch(getLatestUpdates);

  useEffect(()=>{
    (async()=> await fnUpdate())();
  },[])
  return (
    <div className='space-y-8'>
      <Card>
          <CardHeader>
            <CardTitle>
              Welcome, {user?.firstName}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!loadingUpdates?(
              <div>
                {upcomingMeetings && upcomingMeetings.length>0?(
                  <ul>
                    {upcomingMeetings.map((meeting)=>{
                      return <li key={meeting.id}>
                        - {meeting.event.title} on{' '}
                        {format(
                          new Date(meeting.startTime)
                          ,'MMM d, yyyy h:mm a'
                        )}{' '}
                        with <span className='font-semibold'>{meeting.name}</span>
                      </li>
                    })}
                  </ul>
                ):<p>No Upcoming Meetings</p>}
              </div>
            ):(
              <p>Loading Updates...</p>
            )}
          </CardContent>
      </Card>
      <Card>
          <CardHeader>
            <CardTitle>
              Your Unique Link
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
              <div className='flex items-center gap-2'>
                <span>{origin}/</span>
                <Input {...register("username")} placeholder = 'username'/>
              </div>
              {errors.username && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.username.message}
                </p>
              )}
              {error && (
                <p className='text-red-500 text-sm mt-1'>
                  {error?.message}
                </p>
              )}
              {loading && 
              <BarLoader className='mb-4' width={"100%"} color='#36b7b7'/>}
              <Button type='submit'>Update username</Button>
            </form>
          </CardContent>
      </Card>
    </div>
  )
}

export default page