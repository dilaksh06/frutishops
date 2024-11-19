import { useState } from "react";
import { assets } from "../../assets/assets";
import "./Add.css";
import axios from 'axios';
import { toast } from "react-toastify";

const Add = ({ url }) => {
    const [image, setImage] = useState(null);
    const [audio, setAudio] = useState(null);
    const [data, setData] = useState({
        name: "",
        type: "",
        country: "",
        material: "",
        genre: "",
        description: "",
        price: "",
        category: "String Instruments"
    });

    // Handle form data changes
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle form submission
    const onSubmitHandler = async (event) => {
        event.preventDefault();

        // Basic validation
        if (!data.name || !data.description || !data.price || !image || !audio) {
            console.error('Please fill all required fields, and upload both an image and audio');
            return;
        }

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('type', data.type);
        formData.append('country', data.country);
        formData.append('description', data.description);
        formData.append('price', Number(data.price));
        formData.append('category', data.category);
        formData.append('material', data.material);
        formData.append('genre', data.genre);
        formData.append('image', image);
        formData.append('audio', audio);  // Appending audio file

        try {
            // Send form data to API
            const response = await axios.post(`${url}/api/instruments/add`, formData);

            // Check if the response status indicates success
            if (response.status === 200 || response.status === 201) {
                // Reset form on success
                setData({
                    name: "",
                    type: "",
                    country: "",
                    material: "",
                    genre: "",
                    description: "",
                    price: "",
                    category: "String Instruments"
                });
                setImage(null); // Reset image after success
                setAudio(null); // Reset audio after success
                toast.success(response.data.message);
            } else {
                toast.error(response.data.error);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An error occurred.");
            }
        }
    };

    return (
        <div className="add">
            <form className="flex-col" onSubmit={onSubmitHandler}>
                <div className="add-image-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img
                            src={image ? URL.createObjectURL(image) : assets.upload_area}
                            alt="Upload"
                        />
                    </label>
                    <input
                        onChange={(e) => setImage(e.target.files[0])}
                        type="file"
                        id="image"
                        accept="image/*"
                        hidden
                        required
                    />

                    <p>Upload Audio</p>
                    <label htmlFor="audio">
                        <div>
                            {audio ? (
                                <audio controls>
                                    <source src={URL.createObjectURL(audio)} type={audio.type} />
                                    Your browser does not support the audio element.
                                </audio>
                            ) : (
                                <img
                                    src={assets.upload_area}
                                    alt="Upload"
                                />
                            )}
                        </div>
                    </label>
                    <input
                        onChange={(e) => setAudio(e.target.files[0])}
                        type="file"
                        id="audio"
                        hidden
                        accept="audio/*"
                        required
                    />
                </div>

                <div className="add-product-name flex-col">
                    <p>Instrument Name</p>
                    <input
                        onChange={onChangeHandler}
                        value={data.name}
                        type="text"
                        name="name"
                        placeholder="Type here"
                        required
                    />
                </div>

                <div className="add-product-name flex-col">
                    <p>Instrument Type/Category</p>
                    <input
                        onChange={onChangeHandler}
                        value={data.type}
                        type="text"
                        name="type"  // Corrected name
                        placeholder="Type here"
                        required
                    />
                </div>

                <div className="add-product-name flex-col">
                    <p>Origin/Country of Origin</p>
                    <input
                        onChange={onChangeHandler}
                        value={data.country}
                        type="text"
                        name="country"  // Corrected name
                        placeholder="Type here"
                        required
                    />
                </div>

                <div className="add-material-name flex-col">
                    <p>Material(s) Used</p>
                    <select onChange={onChangeHandler} name="material" value={data.material}>
                        <option value="maple">Maple</option>
                        <option value="rosewood">Rosewood</option>
                        <option value="mahogany">Mahogany</option>
                        <option value="ebony">Ebony</option>
                        <option value="spruce">Spruce</option>
                        <option value="pine">Pine</option>
                        <option value="alder">Alder</option>
                        <option value="cedar">Cedar</option>
                        <option value="walnut">Walnut</option>
                        <option value="brass">Brass</option>
                        <option value="silver">Silver</option>
                        <option value="gold">Gold</option>
                        <option value="copper">Copper</option>
                        <option value="steel">Steel</option>
                        <option value="nickel">Nickel</option>
                        <option value="aluminum">Aluminum</option>
                        <option value="plastic">Plastic</option>
                        <option value="resin">Resin</option>
                        <option value="acrylic">Acrylic</option>
                        <option value="fiberglass">Fiberglass</option>
                        <option value="ivory">Ivory</option>
                        <option value="bone">Bone</option>
                        <option value="animal_skin">Animal Skin</option>
                        <option value="shell">Shell</option>
                        <option value="cotton">Cotton</option>
                        <option value="silk">Silk</option>
                        <option value="carbon_fiber">Carbon Fiber</option>
                        <option value="composite_wood">Composite Wood</option>
                        <option value="glass">Glass</option>
                        <option value="ceramic">Ceramic</option>
                    </select>
                </div>

                <div className="add-material-name flex-col">
                    <p>Musical Genre</p>
                    <select onChange={onChangeHandler} name="genre" value={data.genre} >
                        <option value="classical">Classical</option>
                        <option value="jazz">Jazz</option>
                        <option value="folk">Folk</option>
                        <option value="rock">Rock</option>
                        <option value="pop">Pop</option>
                        <option value="traditional">Traditional</option>
                        <option value="blues">Blues</option>
                        <option value="electronic">Electronic</option>
                        <option value="reggae">Reggae</option>
                        <option value="country">Country</option>
                        <option value="hiphop">Hip-Hop</option>
                        <option value="metal">Metal</option>
                        <option value="worldmusic">World Music</option>
                        <option value="opera">Opera</option>
                        <option value="funk">Funk</option>
                    </select>
                </div>

                <div className="add-product-description flex-col">
                    <p>Product Description</p>
                    <textarea
                        onChange={onChangeHandler}
                        value={data.description}
                        name="description"
                        rows="6"
                        placeholder="Write content here"
                        required
                    />
                </div>

                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Music Instrument Type</p>
                        <select onChange={onChangeHandler} name="category" value={data.category}>
                            <option value="String Instruments">String Instruments</option>
                            <option value="Woodwind Instruments">Woodwind Instruments</option>
                            <option value="Brass Instruments">Brass Instruments</option>
                            <option value="Percussion Instruments">Percussion Instruments</option>
                        </select>
                    </div>

                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input
                            onChange={onChangeHandler}
                            value={data.price}
                            type="number"
                            name="price"
                            placeholder="$20"
                            required
                        />
                    </div>
                </div>

                <button type="submit" className="add-btn">ADD</button>
            </form>
        </div>
    );
};

export default Add;
