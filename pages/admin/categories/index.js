import axiosInstanceAdmin from "@/lib/axiosInstanceAdmin";
import Layout from "@/src/components/admin/layout";
import { useState } from "react";

export async function getServerSideProps() {
    try{
        const token = `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`;
        
        const response = await axiosInstanceAdmin.get('/sport-categories');
        console.log(response.request.headers['Authorization']);
        const categories = response?.data?.result?.data ?? [];
        return {
            props: {
                categories, token
            },
        };
    }catch(error){
        console.error('Error fetching categories:', error);

        return {
            props: {
                categories: [],
            },
        };
    }
}

export default function Categories({categories : initialCategories, token}) {
    const [categories, setCategories] = useState(initialCategories);
    const [newCategoryName, setNewCategoryName] = useState("");

    const handleAddCategory = async () => {
        console.log(token);
        
        if(newCategoryName.trim() === ""){
            console.log('Category name is empty');
            return;
        }
        try {
            
            const response = await axiosInstanceAdmin.post('/sport-categories/create', {
                name :newCategoryName
            });
            console.log('Response from API:', response);
            

            setCategories((prevCategories) => [
                ...prevCategories,
                response.data.result,
            ]);

            setNewCategoryName("");

        }catch(error){
            console.log("Error adding category:", error);

            if (error.response) {       
                console.log("Response error:", error.response);
                if (error.response.status === 401) {
                    console.log("Unauthorized access. Please check your authentication.");
                }
            } else {
            console.log("Error:", error.message);
            }
        }
    };

    const handleDeleteCategory = async (id) => {
        try {
          await axiosInstanceAdmin.delete(`/sport-categories/delete/${id}`);
    
          // Menghapus kategori yang dipilih dari daftar yang ada di state
          setCategories((prevCategories) =>
            prevCategories.filter((category) => category.id !== id)
          );
        } catch (error) {
          console.error("Error deleting category:", error);
        }
      };


    return(
        <Layout>
            <h1 className="text-3xl font-bold mb-6">Manage Categories</h1>

            {/* Form untuk menambah kategori */}
            <div className="mb-6">
                <input
                    type="text"
                    value={newCategoryName} 
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="border p-2"
                    placeholder="New Category Name"
                />
                <button
                    onClick={handleAddCategory}
                    className="bg-blue-500 text-white p-2 ml-2"
                >
                    Add Category
                </button>
            </div>

            <ul>
                {categories.length > 0 ? (
                    categories.map((category) => (
                        <li key={category.id} className="mb-4 flex items-center">
                            <span className="flex-1">{category.name}</span>
                            <button
                                // onClick={() => handleEditCategory(category.id)} // Fungsi untuk mengedit kategori
                                className="bg-yellow-500 text-white p-2 ml-2"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeleteCategory(category.id)} 
                                className="bg-red-500 text-white p-2 ml-2"
                            >
                                Delete
                            </button>
                        </li>
                    ))
                ) : (
                    <p>No categories available.</p> // Menampilkan pesan jika tidak ada kategori
                )}
            </ul>
        </Layout>
    )

}