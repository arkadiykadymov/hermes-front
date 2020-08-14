import React from 'react';

var filepath =
  'https://www.technodom.kz/media/catalog/product/cache/1366e688ed42c99cd6439df4031862c6/b/f/bfaf0180d095b0ecfd9bba68eef5711a97f0ea69_178298_5thy.jpg';

var p = {
  product: {
    name: '123',
    description: '1231',
    price: '1231',
  },
};
var state = [];

console.log(p);
function ProductBlock(props) {
  return (
    <div>
      <div className="card my-3" style={{ width: '18rem' }}>
        <img src={filepath} className="card-img" style={{ maxHigh: '100px', maxWidth: '260px' }} />
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <hr />
          <p className="card-text">{props.description}</p>
          <hr />
          <p className="card-text">Price - {props.price} $</p>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="1" /*onChange={handleQuantity}*/
          />
          <p className="card-text">
            <small className="text-muted">Storage counter - {props.storageCount}</small>
          </p>
          <button
            type="button"
            className="btn btn-warning"
            style={{ marginRight: '10px' }}
            /*onClick={addToCart}*/
          >
            Add to cart
          </button>
          <div
            className="modal fade"
            id="addtocartModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="addtocartModalLabel"
            aria-hidden="true"></div>
          {localStorage.getItem('isAdmin') ? (
            <button type="button" className="btn btn-primary" /*onClick={deleteProduct}*/>
              Delete product
            </button>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      {state.isAddedAlert ? (
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
          <strong>Holy guacamole!</strong> Product was added to cart.
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      ) : (
        <div></div>
      )}
      {/* <div className="card my-3" style={{ width: '18rem' }}>
        <img
          src={filepath}
          className="card-img"
          // style={{ maxHigh: '100px', maxWidth: '100px' }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <hr />
          <p className="card-text">{props.description}</p>
          <hr />
          <p className="card-text">Price - {props.price} $</p>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            onChange={handleQuantity}
          />
          <p className="card-text">
            <small className="text-muted">
              Storage counter - {props.storageCount}
            </small>
          </p>
          <button
            type="button"
            className="btn btn-warning"
            style={{ marginRight: '10px' }}
            onClick={addToCart}>
            Add to cart
          </button>
          <div
            className="modal fade"
            id="addtocartModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="addtocartModalLabel"
            aria-hidden="true"></div>
          {localStorage.getItem('isAdmin') ? (
            <button type="button" className="btn btn-primary" onClick={deleteProduct}>
              Delete product
            </button>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      {state.isAddedAlert ? (
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
          <strong>Holy guacamole!</strong> Product was added to cart.
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      ) : (
        <div></div>
      )} */}
    </div>
  );
}

export default ProductBlock;
