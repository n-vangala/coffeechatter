import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const HOURS = Array.from({ length: 24 }, (_, i) => i);

const AvailabilitySelector = ({ availability, onAvailabilityChange }) => {
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState(null);

  const handleMouseDown = (day, hour) => {
    setIsSelecting(true);
    setSelectionStart({ hour });
    const newAvailability = [...availability];
    newAvailability[day][hour] = !newAvailability[day][hour];
    onAvailabilityChange(newAvailability);
  };

  const handleMouseEnter = (day, hour) => {
    if (isSelecting && selectionStart) {
      const newAvailability = [...availability];
      const startDay = Math.min(selectionStart.day, day);
      const endDay = Math.max(selectionStart.day, day);
      const startHour = Math.min(selectionStart.hour, hour);
      const endHour = Math.max(selectionStart.hour, hour);

      for (let d = startDay; d <= endDay; d++) {
        for (let h = startHour; h <= endHour; h++) {
          newAvailability[d][h] = newAvailability[selectionStart.day][selectionStart.hour];
        }
      }
      onAvailabilityChange(newAvailability);
    }
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
    setSelectionStart(null);
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, []);

  return (
    <div className="grid grid-cols-8 gap-1">
      <div className="col-span-1"></div>
      {DAYS.map((day, index) => (
        <div key={day} className="text-center font-semibold">{day}</div>
      ))}
      {HOURS.map((hour) => (
        <React.Fragment key={hour}>
          <div className="text-right pr-2">{hour}:00</div>
          {DAYS.map((_, dayIndex) => (
            <div
              key={`${dayIndex}-${hour}`}
              className={`w-full h-6 border ${
                availability[dayIndex][hour] ? 'bg-blue-500' : 'bg-gray-200'
              }`}
              onMouseDown={() => handleMouseDown(dayIndex, hour)}
              onMouseEnter={() => handleMouseEnter(dayIndex, hour)}
            ></div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

const OrgMemberDashboard = () => {
  const [availability, setAvailability] = useState(
    Array(7).fill().map(() => Array(24).fill(false))
  );
  const [maxChatsPerDay, setMaxChatsPerDay] = useState(3);
  const [gapBetweenChats, setGapBetweenChats] = useState(30);
  const [scheduledChats, setScheduledChats] = useState([]);

  useEffect(() => {
    // Fetch scheduled chats from API
    // For now, we'll use mock data
    setScheduledChats([
      { id: 1, date: '2024-09-01', time: '14:00', applicantName: 'Alice Johnson', applicantEmail: 'alice@example.com' },
      { id: 2, date: '2024-09-03', time: '15:30', applicantName: 'Bob Wilson', applicantEmail: 'bob@example.com' },
    ]);
  }, []);

  const handleAvailabilityChange = useCallback((newAvailability) => {
    setAvailability(newAvailability);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Organization Member Dashboard</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Your Availability</CardTitle>
        </CardHeader>
        <CardContent>
          <AvailabilitySelector 
            availability={availability} 
            onAvailabilityChange={handleAvailabilityChange} 
          />
          <div className="mt-4 space-y-4">
            <div>
              <Label htmlFor="maxChats">Maximum Chats Per Day</Label>
              <Select value={maxChatsPerDay} onValueChange={setMaxChatsPerDay}>
                <SelectTrigger id="maxChats">
                  <SelectValue placeholder="Select max chats" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <SelectItem key={num} value={num}>{num}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="gapBetweenChats">Gap Between Chats (minutes)</Label>
              <Select value={gapBetweenChats} onValueChange={setGapBetweenChats}>
                <SelectTrigger id="gapBetweenChats">
                  <SelectValue placeholder="Select gap duration" />
                </SelectTrigger>
                <SelectContent>
                  {[0, 15, 30, 45, 60].map((num) => (
                    <SelectItem key={num} value={num}>{num}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Scheduled Coffee Chats</CardTitle>
        </CardHeader>
        <CardContent>
          {scheduledChats.length > 0 ? (
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="text-left">Date</th>
                  <th className="text-left">Time</th>
                  <th className="text-left">Applicant Name</th>
                  <th className="text-left">Applicant Email</th>
                </tr>
              </thead>
              <tbody>
                {scheduledChats.map((chat) => (
                  <tr key={chat.id}>
                    <td>{chat.date}</td>
                    <td>{chat.time}</td>
                    <td>{chat.applicantName}</td>
                    <td>{chat.applicantEmail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No coffee chats scheduled yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OrgMemberDashboard;