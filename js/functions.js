const getTimeInMinutes = (time) => {
  time = time.split(':').map(Number);

  return time[0] * 60 + time[1];
};

const isOnTime = (timeStartDay, timeEndDay, timeStartMeeting, meetingDuration) => {
  const timeStartDayInMin = getTimeInMinutes(timeStartDay);
  const timeEndDayInMin = getTimeInMinutes(timeEndDay);
  const timeStartMeetingInMin = getTimeInMinutes(timeStartMeeting);
  const timeEndMeetingInMin = timeStartMeetingInMin + meetingDuration;

  return (timeStartDayInMin <= timeStartMeetingInMin) && (timeEndMeetingInMin <= timeEndDayInMin);
};

isOnTime('08:00', '17:30', '14:00', 90); // true
isOnTime('8:0', '10:0', '8:0', 120);     // true
isOnTime('08:00', '14:30', '14:00', 90); // false
isOnTime('14:00', '17:30', '08:0', 90);  // false
isOnTime('8:00', '17:30', '08:00', 900); // false
