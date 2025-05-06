import Sidebar from "../sidebar";
import { useEffect, useState } from 'react';

export default function Layout({children}){
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);

    return(
      <div className="flex">
        <Sidebar />

        {isClient && (
        <div className="flex-1 p-6">
          <div className="bg-white p-6 rounded-lg shadow-md">{children}</div>
        </div>
        )}
      </div>
    );
}