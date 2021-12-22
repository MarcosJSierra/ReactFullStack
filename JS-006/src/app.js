import React from "react";
import ProductForm from "./components/product-form";
import ProductsList from "./components/products-list";
import './app.css';

const App = () => {
    return <main className="container">
        <div>
            <h1>Inventario</h1>
        </div>
        <ProductForm />
        <ProductsList />

    </main>

}

export default App;