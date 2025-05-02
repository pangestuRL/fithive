import Sidebar from "../sidebar";

export default function Layout({children}){
    return(
        <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">
        {children}
      </div>
    </div>
    )
}