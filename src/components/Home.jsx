import React from 'react';

import { ProductBlock } from '../components';

function Home({ items }) {
  return (
    <div>
      <ul className="card-columns">
        {items.map((obj) => (
          <ProductBlock key={obj.id} {...obj} />
        ))}
      </ul>
    </div>
  );
}

export default Home;
