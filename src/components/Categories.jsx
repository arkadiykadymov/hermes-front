import React, { useState } from 'react';

function Categories({ items }) {
  const [state, setActiveItem] = useState(null);

  const onSelectItem = (index) => {
    setActiveItem(index);
  };
  return (
    <div>
      <div className="list-group">
        <a
          // href="/all"
          className={
            state === null
              ? 'list-group-item list-group-item-action active'
              : 'list-group-item list-group-item-action'
          }
          onClick={() => onSelectItem(null)}>
          All
        </a>
        {items.map((name, index) => (
          <a
            // href={`/${name}`}
            className={
              state === index
                ? 'list-group-item list-group-item-action active'
                : 'list-group-item list-group-item-action'
            }
            onClick={() => onSelectItem(index)}
            key={`${name}_${index}`}>
            {name}
          </a>
        ))}
      </div>
    </div>
  );
}

export default Categories;
