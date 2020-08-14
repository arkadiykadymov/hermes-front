import React from 'react';

function SortPopup({ items }) {
  return (
    <div>
      <div class="dropdown">
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false">
          Dropdown button
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          {items.map((item, index) => (
            <a class="dropdown-item" href="#" key={`${item.type}_${index}`}>
              {item.name}
            </a>
          ))}
        </div>
      </div>
      ;
    </div>
  );
}

export default SortPopup;
