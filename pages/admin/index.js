import Layout from "@/src/components/admin/layout";

export default function AdminDashboard() {
    return (
        <Layout>
          <h1 className="text-3xl font-bold mb-6">Welcome to Admin Dashboard</h1>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Total Users</h3>
              <p className="text-2xl font-bold">1,500</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Active Sessions</h3>
              <p className="text-2xl font-bold">200</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Sales</h3>
              <p className="text-2xl font-bold">$20,000</p>
            </div>
          </div>
        </Layout>
      );
  }