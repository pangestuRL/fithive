import axios from 'axios';

export async function getServerSideProps({ params }) {
  try {
    const response = await axios.get(
      `https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/sport-activities/${params.id}`
    );
    const activity = response?.data?.data;

    if (!activity) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        activity,
      },
    };
  } catch (error) {
    console.error('Error fetching activity detail:', error.message);
    return {
      notFound: true,
    };
  }
}

export default function ActivityDetail({ activity }) {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{activity.name}</h1>
      {activity.image && (
        <img
          src={activity.image}
          alt={activity.name}
          className="w-full rounded-lg mb-4"
        />
      )}
      <p className="text-gray-600 mb-2">
        <strong>Lokasi:</strong> {activity.location}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Harga:</strong> {activity.price_formatted || activity.price}
      </p>
      <p className="mt-4">{activity.description}</p>
    </div>
  );
}
