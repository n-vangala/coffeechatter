import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for organization members
const mockMembers = [
  { id: 1, name: 'John Doe', image: '/api/placeholder/100/100', completedChats: 5, scheduledChats: 2, availability: ['Monday 2-4pm', 'Wednesday 1-3pm'] },
  { id: 2, name: 'Jane Smith', image: '/api/placeholder/100/100', completedChats: 3, scheduledChats: 1, availability: ['Tuesday 10am-12pm', 'Thursday 3-5pm'] },
  // Add more mock data as needed
];

// Mock data for prospective applicants
const mockApplicants = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', chatDate: '2024-09-01', chatTime: '14:00', assignedTo: 'John Doe' },
  { id: 2, name: 'Bob Wilson', email: 'bob@example.com', chatDate: '2024-09-02', chatTime: '15:30', assignedTo: 'Jane Smith' },
  // Add more mock data as needed
];

const MemberCard = ({ member, onSelect }) => (
  <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onSelect(member)}>
    <CardContent className="flex flex-col items-center p-4">
      <Avatar className="h-16 w-16 mb-2">
        <AvatarImage src={member.image} alt={member.name} />
        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
      </Avatar>
      <h3 className="text-lg font-semibold text-center">{member.name}</h3>
      <p className="text-sm text-gray-500 text-center">Chats: {member.completedChats} completed, {member.scheduledChats} scheduled</p>
    </CardContent>
  </Card>
);

const MemberDetails = ({ member }) => (
  <Card>
    <CardHeader>
      <CardTitle>{member.name}</CardTitle>
    </CardHeader>
    <CardContent>
      <p><strong>Completed Chats:</strong> {member.completedChats}</p>
      <p><strong>Scheduled Chats:</strong> {member.scheduledChats}</p>
      <p><strong>Availability:</strong></p>
      <ul>
        {member.availability.map((slot, index) => (
          <li key={index}>{slot}</li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

const ApplicantList = ({ applicants }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white">
      <thead className="bg-gray-100">
        <tr>
          <th className="py-2 px-4 text-left">Name</th>
          <th className="py-2 px-4 text-left">Email</th>
          <th className="py-2 px-4 text-left">Chat Date</th>
          <th className="py-2 px-4 text-left">Chat Time</th>
          <th className="py-2 px-4 text-left">Assigned To</th>
        </tr>
      </thead>
      <tbody>
        {applicants.map((applicant) => (
          <tr key={applicant.id} className="border-b">
            <td className="py-2 px-4">{applicant.name}</td>
            <td className="py-2 px-4">{applicant.email}</td>
            <td className="py-2 px-4">{applicant.chatDate}</td>
            <td className="py-2 px-4">{applicant.chatTime}</td>
            <td className="py-2 px-4">{applicant.assignedTo}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const AdminDashboard = () => {
  const [members, setMembers] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    // In a real application, you would fetch this data from your API
    setMembers(mockMembers);
    setApplicants(mockApplicants);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <Tabs defaultValue="members" className="w-full">
        <TabsList>
          <TabsTrigger value="members">Organization Members</TabsTrigger>
          <TabsTrigger value="applicants">Prospective Applicants</TabsTrigger>
        </TabsList>
        <TabsContent value="members">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {members.map(member => (
              <MemberCard key={member.id} member={member} onSelect={setSelectedMember} />
            ))}
          </div>
          {selectedMember && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Member Details</h2>
              <MemberDetails member={selectedMember} />
            </div>
          )}
        </TabsContent>
        <TabsContent value="applicants">
          <h2 className="text-xl font-semibold mb-4">Prospective Applicants</h2>
          <ApplicantList applicants={applicants} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;