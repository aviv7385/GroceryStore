import { BrowserRouter, NavLink, Redirect, Route, Switch } from "react-router-dom";
import AddProduct from "../../ProductsArea/AddProduct/AddProduct";
import ProductsList from "../../ProductsArea/ProductsList/ProductsList";
import "./Layout.css";

function Layout(): JSX.Element {
    return (
        <BrowserRouter>

            <div className="Layout">
                <h1>AM:PM</h1>
                <hr />

                {/* Menu */}
                <nav>
                    <NavLink to="/products" exact> Products</NavLink>
                    <span> &nbsp; | &nbsp;</span>
                    <NavLink to="/add-product">Add Product</NavLink>
                </nav>

                {/* Routing */}
                <Switch>
                    <Route path="/products" component={ProductsList} />
                    <Route path="/add-product" component={AddProduct} />
                    <Redirect from="/" to="/products" exact />
                </Switch>
            </div>

        </BrowserRouter>
    );
}

export default Layout;
