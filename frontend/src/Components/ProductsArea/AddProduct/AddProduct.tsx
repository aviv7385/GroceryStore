import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import CategoryModel from "../Models/CategoryModel";
import ProductModel from "../Models/ProductsModel";
import "./AddProduct.css";

function AddProduct(): JSX.Element {

    // create history object by using the useHistory() hook  (to redirect to another page)
    const history = useHistory();

    // update the genres data in the state
    const categoriesArray = useState<CategoryModel[]>([]);
    const categoriesList = categoriesArray[0]; // the data
    const setCategories = categoriesArray[1]; // the function that updates the data in the state

    // get the genres list to display in the select box
    useEffect(() => {
        (async function () {
            const response = await axios.get<CategoryModel[]>("http://localhost:3001/api/products/categories");
            const categories = response.data;
            setCategories(categories);
        })();
    }, []);


    // create form
    const { register, handleSubmit } = useForm<ProductModel>();

    // function to send the data from the form to the server
    async function sendData(product: ProductModel) {
        try {
            const response = await axios.post("http://localhost:3001/api/products", product);
            const addedProduct = response.data;
            alert(addedProduct.productName + " has been successfully added!");
            console.log(addedProduct);
            history.push("/");// redirect to main page
        }
        catch (err) {
            console.log(err);
            console.log(err.message);
            alert("Error!");
        }
    }


    return (
        <div className="AddProduct">
            <h2>Add Product</h2>

            <form onSubmit={handleSubmit(sendData)}>

                <label>Product Name:</label>
                <input type="text" name="productName" ref={register} />
                <br /><br />

                <label>Produce Date & Time:</label>
                <input type="datetime-local" name="produceDate" ref={register} />
                <br /><br />

                <label>Expiry Date & Time:</label>
                <input type="datetime-local" name="expireDate" ref={register} />
                <br /><br />

                <label>Category:</label>
                <select name="categoryId" ref={register} defaultValue="0" >
                    <option value="0" disabled>Choose from the list below</option>
                    {categoriesList.map(c => <option key={c.categoryId} value={c.categoryId}>{c.category}</option>)}
                </select>
                <br /><br />

                <label>Price:</label>
                <input type="number" step="0.01" name="productPrice" ref={register} />
                <br /><br />

                <button>Add</button>


            </form>
        </div>
    );
}

export default AddProduct;
