export function getDatesInRange(start: string, end: string): Date[] {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const dates: Date[] = [];

  let current = new Date(startDate);
  current.setHours(0, 0, 0, 0); // hours off
  const endDateNoTime = new Date(endDate);
  endDateNoTime.setHours(0, 0, 0, 0);

  while (current <= endDateNoTime) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return dates;
}