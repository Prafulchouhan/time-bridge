import TestimonialCarausel from "@/components/testimonials";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader,CardTitle } from "@/components/ui/card";
import { ArrowRight, Calendar, Clock, LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    icon: Calendar,
    title: "Create Events",
    description: "Easily set up and customize your event types",
  },
  {
    icon: Clock,
    title: "Manage Availability",
    description: "Define your availability to streamline scheduling",
  },
  {
    icon: LinkIcon,
    title: "Custom Links",
    description: "Share your personalized scheduling link",
  },
];
const howItWorks = [
  { step: "Sign Up", description: "Create your free Schedulrr account" },
  {
    step: "Set Availability",
    description: "Define when you're available for meetings",
  },
  {
    step: "Share Your Link",
    description: "Send your scheduling link to clients or colleagues",
  },
  {
    step: "Get Booked",
    description: "Receive confirmations for new appointments automatically",
  },
];
export default function Home() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-24">
        <div className="lg:w-1/2">
          <h1 className="text-7xl font-extrabold pb-6 gradient-title">Simplify Your Scheduling</h1>
          <p className="text-xl text-gray-600 mb-10">
            Time-Bridge helps you manage your time effectively. Create events, set your availiblity, and let other book time with you seemlessly.
          </p>
          <Link href='/dashboard'>
          <Button size='lg' className='text-lg'>
            Get Started <ArrowRight className="ml-2 h-5 w-5"/>
          </Button>
          </Link>
        </div>
        <div className="lg:w-1/2 flex justify-center">
        <div className="relative w-full max-w-md aspect-square">
          <Image src='/poster.png'
          alt="Scheduling illustration"
          layout="fill"
          objectFit="contain"
          />
          </div>
        </div>
      </div>
      <div className="mb-24">
        <h2 className="text-3xl font-bold text-center mb-12 text-green-600">Key Features</h2>
        <div className="grid grid-col-1 md:grid-cols-3 gap-8">
          {features.map((feature, index)=>{
            return(
              <Card key={index}>
                <CardHeader>
                  <feature.icon className="w-12 h-12 text-green-500 mb-4 mx-auto"/>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>  
            );
          })}
        </div>
      </div>
      <div className="mb-24">
        <h2 className="text-3xl font-bold text-center mb-12 text-green-600">What user say</h2>
        <TestimonialCarausel/>
       </div>

       <div className="mb-24">
        <h2 className="text-3xl font-bold text-center mb-12 text-green-600">How it Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {howItWorks.map((step, index)=>(
            <div key={index} className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold text-xl">{index+1}</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">{step.step}</h3>
              <h3 className="text-gray-600">{step.description}</h3>
            </div>
          ))}
        </div>
       </div>

       <div className="bg-green-600 text-white rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Simplify Your Scheduling ?</h2>
        <p className="text-xl mb-6">
          Join thousend of professionals who trust Time Bridge for efficient time management.
        </p>
        <Link href="/dashboard">
        <Button className='bg-white text-green-700'>
          Start for free <ArrowRight className="ml-2 h-5 w-5"/>
        </Button>
        </Link>
       </div>
    </main>
  );
}
