import React, { useState } from 'react';

import Header from './Header';
import InnerBody from './InnerBody';

function Home() {
  // const [menustate, setMenustate] = useState('Minactive');

  return (
      <div>
          <Header />
          <InnerBody  />
    </div>
  )
}

export default Home