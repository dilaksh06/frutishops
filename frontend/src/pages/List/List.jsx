import { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from 'react-toastify';

const List = ({ url }) => {
    const [list, setList] = useState([]);

    // Fetch list from API
    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            console.log(response.data);
            if (response.data.success) {
                setList(response.data.data);
            } else {
                toast.error("Failed to fetch food items.");
            }
        } catch (error) {
            console.error("Error fetching food list:", error);
            toast.error("An error occurred while fetching the list.");
        }
    };

    // Remove food item by ID
    const removeFood = async (foodId) => {
        try {
            const response = await axios.post(`${url}/api/food/remove`, { id: foodId });

            if (response.data.success) {
                toast.success(response.data.message);
                await fetchList();  // Refresh the list after successful removal
            } else {
                toast.error("Failed to remove food item.");
            }
        } catch (error) {
            console.error("Error removing food item:", error);
            toast.error("An error occurred while removing the food item.");
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div className="list add flex-col">
            <p>All Foods List</p>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b> {/* Corrected spelling from "prive" to "price" */}
                    <b>Action</b>
                </div>
                {list.length > 0 ? (
                    list.map((item, index) => (
                        <div key={index} className="list-table-format">
                            <img src={`${url}/images/` + item.image} alt={item.name} />
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>{item.price}</p>
                            <p onClick={() => removeFood(item._id)} className="cursor">x</p>
                        </div>
                    ))
                ) : (
                    <p>No food items available.</p>
                )}
            </div>
        </div>
    );
};

export default List;
