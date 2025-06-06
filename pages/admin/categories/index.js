import axiosInstance from "@/lib/axiosInstance";
import Layout from "@/src/components/admin/layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export async function getServerSideProps(context) {
    const { page = 1, per_page = 7 } = context.query;
    
    try{
        const response = await axiosInstance.get('/sport-categories', {
            params : {
                is_paginate: true,
                per_page,
                page
            }
        });
        const categories = response?.data?.result?.data ?? [];
        const totalItems = response?.data?.result?.total ?? 0;
        const totalPages = Math.ceil(totalItems / per_page); 

        console.log(totalItems);
        return {
            props: {
                categories,
                page: parseInt(page),
                totalPages,
                totalItems,
            },
        };
    }catch(error){
        console.error('Error fetching categories:', error);
        return {
            props: {
                categories: [],
                page: 1,
                totalPages: 1,
                totalItems: 0,
            },
        };
    }
}

export default function Categories({
        categories : initialCategories,
        page,
        totalPages,
        totalItems,
    }) {
    const router = useRouter();
    const [categories, setCategories] = useState(initialCategories);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [currentPage, setCurrentPage] = useState(page);
    const [editingCategory, setEditingCategory] = useState(null); 
    const [editCategoryName, setEditCategoryName] = useState(""); 
    const [isModalOpen, setIsModalOpen] = useState(false); 

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return; 
        router.push({
            pathname: router.pathname,
            query: { ...router.query, page: newPage },
        });
    };

    const handleAddCategory = async () => {
        
        if(newCategoryName.trim() === ""){
            console.log('Category name is empty');
            return;
        }
        try {
            const response = await axiosInstance.post('/sport-categories/create', {
                name :newCategoryName
            });
            console.log('Response from API:', response);
            alert('Success insert ' + newCategoryName);
            

            setCategories((prevCategories) => [
                ...prevCategories,
                response.data.result,
            ]);

            setNewCategoryName("");
            router.push({
                pathname: "/admin/categories",
                query: { page: 1 }, 
            });

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

    const handleDeleteCategory = async (id, name) => {
        try {
          await axiosInstance.delete(`/sport-categories/delete/${id}`);
          setCategories((prevCategories) =>
            prevCategories.filter((category) => category.id !== id)
          );
          alert('deleted ' + name);
          router.push({
            pathname: "/admin/categories",
            query: { page: 1 }, 
        });
        } catch (error) {
          console.error("Error deleting category:", error);
        }
    };
      
    useEffect(() => {
        const fetchData = async () => {
          const { page = 1, per_page = 7 } = router.query;
    
          const response = await axiosInstance.get('/sport-categories', {
            params: {
              is_paginate: true,
              per_page,
              page,
            },
          });
    
          setCategories(response?.data?.result?.data ?? []); 
          setCurrentPage(parseInt(page));
        };
    
        fetchData();
    }, [router.query.page]);

    const handleEditCategory = (category) => {
        setEditingCategory(category);
        setEditCategoryName(category.name); 
        setIsModalOpen(true); 
    };

    const handleSaveEdit = async () => {
        if (editCategoryName.trim() === "") {
          console.log("Category name is empty");
          return;
        }
    
        try {
          const response = await axiosInstance.post(`/sport-categories/update/${editingCategory.id}`, {
            name: editCategoryName,
          });
    
          const updatedCategory = response.data.result;
          setCategories((prevCategories) =>
            prevCategories.map((category) =>
              category.id === updatedCategory.id ? updatedCategory : category
            )
          );
          setIsModalOpen(false); 
          alert("Category "+editCategoryName+" updated successfully!");
        } catch (error) {
          console.log("Error updating category:", error);
        }
    };
    
    const handleCancelEdit = () => {
    setIsModalOpen(false); 
    };


    return (
        <Layout>
            <h1 className="text-3xl font-bold mb-6">Manage Categories</h1>
    
            <div className="mb-6 flex items-center">
                <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="border p-2"
                    placeholder="New Category Name"
                />
                <button onClick={handleAddCategory} className="bg-blue-500 text-white p-2 ml-2">
                    Add Category
                </button>
            </div>
    
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">No</th>
                        <th className="border px-4 py-2">Category Name</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.length > 0 ? (
                        categories.map((category, index) => (
                            <tr key={category.id}>
                                <td className="border px-4 py-2">{index + 1}</td>
                                <td className="border px-4 py-2">{category.name}</td>
                                <td className="border px-4 py-2">
                                    <button
                                        onClick={() => handleEditCategory(category)}
                                        className="bg-yellow-500 text-white p-2 ml-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteCategory(category.id, category.name)}
                                        className="bg-red-500 text-white p-2 ml-2"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center border px-4 py-2">
                                No categories available.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
    
            <div className="mt-6 flex justify-between">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage <= 1}
                    className="px-4 py-2 bg-blue-500 text-white disabled:bg-gray-400"
                >
                    Previous
                </button>
    
                <span>
                    Page {page} of {totalPages}
                </span>
    
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={page >= totalPages}
                    className="px-4 py-2 bg-blue-500 text-white disabled:bg-gray-400"
                >
                    Next
                </button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-2xl mb-4">Edit Category</h2>
                        <input
                            type="text"
                            value={editCategoryName}
                            onChange={(e) => setEditCategoryName(e.target.value)}
                            className="border p-2 mb-4 w-full"
                        />
                        <div className="flex justify-end">
                            <button
                                onClick={handleSaveEdit}
                                className="bg-green-500 text-white p-2 ml-2"
                            >
                                Save Changes
                            </button>
                            <button
                                onClick={handleCancelEdit}
                                className="bg-gray-500 text-white p-2 ml-2"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
    

}