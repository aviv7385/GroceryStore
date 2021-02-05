import axios from "axios";
import { Component, SyntheticEvent } from "react";
import { RouteComponentProps } from "react-router-dom";
import CategoryModel from "../Models/CategoryModel";
import ProductModel from "../Models/ProductsModel";
import "./ProductsList.css";

// The route parameters: 
interface MatchParams {
    categoryId: string; // Anything on the route is string!
}

interface ProductsListProps extends RouteComponentProps<MatchParams> {

}

interface ProductsListState {
    products: ProductModel[];
    categories: CategoryModel[];
}

class ProductsList extends Component<ProductsListProps, ProductsListState> {

    public constructor(props: ProductsListProps) {
        super(props);
        this.state = { products: [], categories: [] };
    }

    // get data from the server
    public async componentDidMount() {
        try {
            // get list of categories (to display in the select box) and update the data in the state
            const responseCategories = await axios.get<CategoryModel[]>("http://localhost:3001/api/products/categories/");
            const categories = responseCategories.data;
            this.setState({ categories });

            // get list of all products and update the data in the state
            // const id = +this.props.match.params.categoryId;
            const responseProducts = await axios.get<ProductModel[]>("http://localhost:3001/api/products/");
            const products = responseProducts.data;
            this.setState({ products });
        }
        catch (err) {
            console.log(err);
            console.log(err.message);
            alert("error");
        }
    }

    // get the categoryId from the option selected in the select box
    private setCategoryHandler = (args: SyntheticEvent) => {
        const categoryId = +(args.target as HTMLSelectElement).value;
        this.getProductsByCategory(categoryId);

    }

    // get all products which has the chosen category
    public getProductsByCategory = async (categoryId: number) => {
        try {
            if (categoryId !== undefined) {
                const response = await axios.get<ProductModel[]>("http://localhost:3001/api/products/" + categoryId);
                const products = response.data;
                this.setState({ products });
            }
            else {
                const responseProducts = await axios.get<ProductModel[]>("http://localhost:3001/api/products");
                const products = responseProducts.data;
                this.setState({ products });
            }

        }
        catch (err) {
            console.log(err)
            console.log(err.message)
            alert("ERROR");
        }
    }

    // get the id of the product when clicking on the "remove" button
    private setProductHandler = (args: SyntheticEvent) => {
        const productId = +(args.target as HTMLSelectElement).value; // get the value of the remove button
        this.deleteProduct(productId); // delete this specific book 
    }

    // delete the chosen product from the list and from the server and update the state 
    public deleteProduct = async (productId: number) => {
        try {
            let productName;
            this.state.products.forEach(p => {
                if (productId === p.productId) {
                    productName = p.productName;
                }
            });
            const answer = window.confirm(`Are you sure you want to remove the ${productName}?`);
            if (!answer) {
                return;
            }
            await axios.delete<ProductModel[]>("http://localhost:3001/api/products/" + productId);
            // update the state 
            const responseProducts = await axios.get<ProductModel[]>("http://localhost:3001/api/products");
            const products = responseProducts.data;
            this.setState({ products });
        }
        catch (err) {
            console.log(err)
            console.log(err.message);
            alert("Error!");
        }
    }

    public render(): JSX.Element {
        return (
            <div className="ProductsList">
                <h2>Products</h2>

                {/* select box */}
                <form className="SelectBox">
                    <label>Choose Category:</label>
                    <select name="categoryId" value="0" onChange={this.setCategoryHandler}>
                        <option value="0" disabled>Choose from the menu</option>
                        {this.state.categories.map(c => <option key={c.categoryId} value={c.categoryId}>{c.category}</option>)}
                    </select>
                </form>
                <br /><br />

                <div className="TableContainer">
                    <table>
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Produce Date & Time</th>
                                <th>Expiry Date & Time</th>
                                <th>Price</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.products.map(p =>
                                <tr key={p.productId}>
                                    <td>{p.productId}</td>
                                    <td>{p.productName}</td>
                                    <td>{p.category}</td>
                                    <td>{new Date(p.produceDate).toLocaleString()}</td>
                                    <td>{new Date(p.expireDate).toLocaleString()}</td>
                                    <td>{p.productPrice} ILS</td>
                                    <td><button value={p.productId} className="RemoveButton" onClick={this.setProductHandler}>X</button></td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>

            </div>
        );
    }
}

export default ProductsList;
