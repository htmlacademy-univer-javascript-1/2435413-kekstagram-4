const getTimeInMinutes = (time) => {
  time = time.split(':').map(Number);

  return time[0] * 60 + time[1];
};

const isOnTime = (startDay, endDay, startMeeting, meetingInMinutes) => {
  const startDayInMinutes = getTimeInMinutes(startDay);
  const endDayInMinutes = getTimeInMinutes(endDay);
  const startmeetingInMinutes = getTimeInMinutes(startMeeting);
  const endmeetingInMinutes = startmeetingInMinutes + meetingInMinutes;
  return (startDayInMinutes <= startmeetingInMinutes) && (endmeetingInMinutes <= endDayInMinutes);
};

isOnTime('08:00', '17:30', '14:00', 90); // true
isOnTime('8:0', '10:0', '8:0', 120);     // true
isOnTime('08:00', '14:30', '14:00', 90); // false
isOnTime('14:00', '17:30', '08:0', 90);  // false
isOnTime('8:00', '17:30', '08:00', 900); // false
