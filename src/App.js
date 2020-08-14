import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import { Products, ShoppingCart, Order, Header, Home, SortPopup } from './components';
import Categories from './components/Categories.jsx';
import Axios from 'axios';

const api_url = 'http://localhost:8000/api/v1';

const sortIems = [
  { name: 'популярности', type: 'popular', order: 'desc' },
  { name: 'цене', type: 'price', order: 'desc' },
  { name: 'алфавит', type: 'name', order: 'asc' },
];

function App() {
  const [products, setProducts] = React.useState([]);
  React.useEffect(() => {
    Axios.get(api_url + '/products/all/1').then((response) => {
      setProducts(response.data.response.content);
    });
  }, []);

  return (
    <div className="container-fluid">
      <Header />
      <div className="row">
        <div className="col col-lg-2">
          <Categories
            onClickItem={(name) => console.log(name)}
            items={['Phones', 'Electronics', 'Home', 'PC', 'Clothes']}
          />
        </div>
        <div className="col">
          <div className="row">
            <SortPopup items={sortIems} />
          </div>
          <div className="row">
            <div className="col">
              <Route path="/" render={() => <Home items={products} />}></Route>
            </div>
          </div>
        </div>

        {/* <Router>
          <div className="col col-lg-2">
            { <CategoriesList categories={this.state.categories} /> }
          </div>
          <div className="col">
            <div>
              <hr />
              <Switch>
                <Route exact path="/all">
                  <Products category={'all'} />
                </Route>
                <Route path="/Phones">
                  <Products category={'Phones'} />
                </Route>
                <Route path="/Electronics">
                  <Products category={'Electronics'} />
                </Route>
                <Route path="/Home">
                  <Products category={'Home'} />
                </Route>
                <Route path="/PC">
                  <Products category={'PC'} />
                </Route>
                <Route path="/Clothes">
                  <Products category={'Clothes'} />
                </Route>
                <Route path="/sc">
                  <ShoppingCart />
                </Route>
                <Route path="/order">
                  <Order />
                </Route>
              </Switch>
            </div>
          </div>
        </Router> */}
      </div>
    </div>
  );
}

export default App;
