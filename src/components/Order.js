import React from 'react';
import axios from 'axios';
const api_url = 'http://localhost:8000/api/v1';


export default class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            name: '',
            phone: ''
        };
        // this.createOrder = this.createOrder.bind(this);
        this.handleChangeAddress = this.handleChangeAddress.bind(this);
        this.handleChangePhone = this.handleChangePhone.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
    };



    handleChangeAddress(e) {
        this.setState({
            address: e.taeget.value
        })
    }

    handleChangePhone(e) {
        this.setState({
            name: e.taeget.value
        })
    }

    handleChangeName(e) {
        this.setState({
            phone: e.taeget.value
        })
    }

    render() {
        return (
            <div>
                Pleas fill the delivery field down below.
                <hr />
                <form>
                    <div class="form-group">
                        <label for="exampleInputAddress">Home address</label>
                        <input type="text" class="form-control" id="exampleInputAddress" aria-describedby="addressHelp" placeholder="Home email" />
                        <small id="addressHelp" class="form-text text-muted">We'll never share your homeaddress with anyone else.</small>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputName">How can we call you?</label>
                        <input type="text" class="form-control" id="exampleInputName" placeholder="Name" />
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPhone">Phone number</label>
                        <input type="text" class="form-control" id="exampleInputPhone" placeholder="Phone" />
                    </div>
                    <fieldset class="form-group">
                        <div class="row">
                            <legend class="col-form-label col-sm-2 pt-0">Choose payment method</legend>
                            <div class="col-sm-10">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked />
                                    <label class="form-check-label" for="gridRadios1">Cash</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2" />
                                    <label class="form-check-label" for="gridRadios2">Bank account</label>
                                </div>
                                <div class="form-check disabled">
                                    <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="option3" />
                                    <label class="form-check-label" for="gridRadios3">Paypal</label>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <div class="form-group row">
                        <div class="col-sm-10">
                            <button type="submit" class="btn btn-primary">Checkout</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}