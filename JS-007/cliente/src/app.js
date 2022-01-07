import React from "react";
import ProductForm from "./components/product-form";
import ProductsList from "./components/products-list";
import './app.css';

const App = () => {
    return <main className="container">
        <ProductForm />
        <ProductsList />

    </main>

}

export default App;