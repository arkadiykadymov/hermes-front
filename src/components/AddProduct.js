import React from 'react';
import axios from 'axios';

export default class AddProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            price: '',
            storageCount: '',
            categories: [],
            selectedFile: '',
            isRegistered: false,
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleStorageCountChange = this.handleStorageCountChange.bind(this);
        this.handleCatsChange = this.handleCatsChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleSubmitProd = this.handleSubmitProd.bind(this);

    };
    handleNameChange(e) {
        this.setState({ name: e.target.value })
    }
    handleDescriptionChange(e) {
        this.setState({ description: e.target.value })
    }
    handlePriceChange(e) {
        this.setState({ price: e.target.value })
    }
    handleStorageCountChange(e) {
        this.setState({ storageCount: e.target.value })
    }
    handleCatsChange(e) {
        var options = e.target.options;
        var value = [];
        for (var i = 0; i < options.length; i++) {
            if (options[i].selected) {
                value.push(options[i].value)
            }
        }
        this.setState({ categories: value })
    }

    handleFileChange(e) {
        this.setState({ selectedFile: e.target.files[0] })
    }


    handleSubmitProd(event) {
        console.log(this.state)
        const data = new FormData();
        data.append('name', this.state.name);
        data.append('description', this.state.description);
        data.append('price', this.state.price);
        data.append('storageCount', this.state.storageCount);
        data.append('categories', this.state.categories);
        data.append('file', this.state.selectedFile);
        axios.post('http://127.0.0.1:8000/api/v1/products/addProduct',
            data, {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'bearer ' + localStorage.getItem("access_token")
        }
        ).then((response) => {
            console.log(response);
            // if (response.data.response) {
            //     this.setState({ isRegistered: true })
            // }
            // this.render();
        });
    }


    render() {
        return (
            <div>
                {this.state.isRegistered ? (
                    <div class="mmmm" tabIndex="1" role="dialog">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-body">
                                    <p>product added sucsseccfully</p>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                        <div/>
                    )}
                <form>
                    <div class="form-group">
                        <label for="exampleInputUsername">Product name</label>
                        <input type="text" class="form-control" id="exInName" placeholder="Product name" onChange={this.handleNameChange} />
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Product description</label>
                        <textarea cols="40" rows="5" class="form-control" id="exInDescription" aria-describedby="Desc" placeholder="Enter description" onChange={this.handleDescriptionChange} />
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Product price</label>
                        <input type="number" step="0.01" class="form-control" id="exInPrice" placeholder="Enter price" onChange={this.handlePriceChange} />
                    </div>
                    <div class="form-group">
                        <label for="exampleInputName">Product Storage Count</label>
                        <input type="number" class="form-control" id="exInSc" placeholder="Enter Storage Count" onChange={this.handleStorageCountChange} />
                    </div>
                    <div>
                        <label for="exampleInputName">Select categories</label>
                        <select class="custom-select" multiple value={this.state.categories} onChange={this.handleCatsChange}>
                            <option value="Phones">Phones</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Home">Home</option>
                            <option value="PC">PC</option>
                            <option value="Clothes">Clothes</option>
                        </select>
                    </div>
                    <div>
                        <label for="exampleScFile">Select file</label>
                        <div class="custom-file">
                            <input type="file" class="custom-file-input" id="customFile" onChange={this.handleFileChange}/>
                            <label class="custom-file-label" for="customFile">Choose file</label>
                        </div>
                    </div>
                    <div>
                        <button type="button" class="btn btn-primary" onClick={this.handleSubmitProd}>Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}