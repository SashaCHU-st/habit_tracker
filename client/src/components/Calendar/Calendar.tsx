import { useEffect } from "react";
interface HighlightDate {
  date: Date;
  status: number | string;
}


interface CalendarProps {
  year: number;
  month: number;
  highlightDates: HighlightDate[];
  onDateClick?: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({
  year,
  month,
  highlightDates,
  onDateClick,
}) => {
  useEffect(() => {
  console.log("Updated highlightDates in Calendar:", highlightDates);
}, [highlightDates]);

  const isSameDay = (d1: Date, d2: Date) => {
    if (!(d1 instanceof Date) || !(d2 instanceof Date)) return false;
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const getDaysInMonth = (year: number, month: number): Date[] => {
    const date = new Date(year, month, 1);
    const days: Date[] = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const days = getDaysInMonth(year, month);
  const firstDayIndex = new Date(year, month, 1).getDay();

  const getStatusForDate = (date: Date): number | string | undefined => {
    const found = highlightDates.find((hd) => isSameDay(hd.date, date));
    if (found) {
      console.log(`Status for ${date.toDateString()} is ${found.status}`);
    }
    return found?.status;
  };

  const getBgColorByStatus = (status?: number | string) => {
    const numStatus = typeof status === "string" ? parseFloat(status) : status;
    switch (numStatus) {
      case 0:
        return "bg-red-500 text-white";
      case 0.5:
        return "bg-yellow-300";
      case 1:
        return "bg-green-400 text-white";
      default:
        return "bg-gray-50 hover:bg-gray-100";
    }
  };

  return (
    <div className="grid grid-cols-7 gap-1 p-2 bg-white rounded-lg shadow-md">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
        <div key={day} className="font-bold text-center text-gray-700">
          {day}
        </div>
      ))}

      {Array.from({ length: firstDayIndex }).map((_, idx) => (
        <div key={`empty-${idx}`} />
      ))}

      {days.map((date) => {
        const status = getStatusForDate(date);
        const bgColor = getBgColorByStatus(status);
        return (
          <button
            key={date.toISOString()}
            type="button"
            onClick={() => onDateClick?.(date)}
            className={`text-center p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${bgColor}`}
          >
            {date.getDate()}
          </button>
        );
      })}
    </div>
  );
};


export default Calendar;
