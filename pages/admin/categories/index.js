import axiosInstance from "@/lib/axiosInstance";

export async function getServerSideProps() {
    try{
        const response = await axiosInstance.get('/sport-categories');
        console.log("juned" +response);
        const categories = response?.data?.result?.data ?? [];
        return {
            props: {
                categories,
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

export default function Categories({categories}) {
    return(
        <div>
            <h1 className="text-3xl font-bold mb-6">Manage Categories</h1>

            {/* Form untuk menambah kategori */}
            <div className="mb-6">
                <input
                    type="text"
                    // value={newCategoryName} // (seharusnya ada state baru untuk kategori baru)
                    onChange={(e) => { /* Handle the category name input */ }}
                    className="border p-2"
                    placeholder="New Category Name"
                />
                <button
                    // onClick={handleAddCategory} // (Tombol untuk menambah kategori baru)
                    className="bg-blue-500 text-white p-2 ml-2"
                >
                    Add Category
                </button>
            </div>

            {/* Menampilkan daftar kategori */}
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
                                // onClick={() => handleDeleteCategory(category.id)} // Fungsi untuk menghapus kategori
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
        </div>
    )

}