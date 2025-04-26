import { CalendarDays, MapPin } from "lucide-react";

export default function ActivityCard({ activity }) {
  const formattedDate = new Date(activity.activity_date).toLocaleDateString('id-ID', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const formatTime = (time) => {
    return time?.slice(0, 5).replace(":", ".");
  };

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-md transition">
      <h2 className="text-xl font-semibold mb-2">{activity.title}</h2>

      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
        <span>{activity.sport_category?.name || "Olahraga"}</span>
        <span>•</span>
        <span>Newbie - Beginner</span> {/* Dummy */}
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
        <CalendarDays className="w-4 h-4" />
        <span>{formattedDate}, {formatTime(activity.start_time)} - {formatTime(activity.end_time)}</span>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
        <MapPin className="w-4 h-4" />
        <span>{activity.address.split(",")[0]} - {activity.city?.city_name}</span>
      </div>

      <div className="flex items-center mb-2">
        <div className="flex -space-x-2">
          {activity.participants?.slice(0, 5).map((p, idx) => (
            <div key={idx} className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 border-2 border-white">
              {p.user.name.charAt(0).toUpperCase()}
            </div>
          ))}
        </div>
        <span className="ml-4 text-sm text-gray-500">{activity.participants?.length ?? 0}/{activity.slot}</span>
      </div>

      <hr className="my-2" />

      <div className="flex items-center gap-2 text-sm">
        <div className="w-8 h-8 rounded-full bg-yellow-300 flex items-center justify-center font-bold text-white">
          {activity.organizer?.name?.charAt(0).toUpperCase() || "O"}
        </div>
        <div>
          <div className="font-semibold">{activity.organizer?.name || "Organizer"}</div>
          <div className="text-gray-500 text-xs">⭐ 4.9 (12)</div>
        </div>
      </div>
    </div>
  );
}
