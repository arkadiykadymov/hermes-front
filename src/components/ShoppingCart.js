import React, { Component } from 'react';



export default class ShoppingCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
        };
    };


    render(){
        return(
            <div>
                <p>Shopping Cart</p>
            </div>
        )
    }


}