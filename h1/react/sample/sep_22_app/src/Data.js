import React, { Component } from "react";
import axios from "axios";
import Add_to_cart from "./Add_to_cart";

class Data extends Component {
  state = {
    products: [],
    cart: [],
  };
  
  Additeam(() => {

  })

  componentDidMount() {
    // Fetch data from the API
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        this.setState({ products: response.data });
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }

  render() {
    const { products } = this.state;

    return (
      <div className="container mt-5">
        <h1>Product List</h1>
        <div className="row">
          {products.map((product) => (
            <div className="col-md-4 mb-4" key={product.id}>
              <div className="card">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">${product.price}</p>
                  <button class="btn btn-primary" type="submit" onClick={Additeam()}>
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Data;
