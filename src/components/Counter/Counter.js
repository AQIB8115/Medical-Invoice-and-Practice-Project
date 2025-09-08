// import React, { useState } from 'react';

// function Counter() {
//   const [count, setCount] = useState(0); // count starts at 0

//   return (
//     <div>
//       <p>You clicked {count} times</p>
//       <button onClick={() => setCount(count + 1)}>
//         Click Me
//       </button>
//     </div>
//   );
// }
// export default Counter;

import React, { useState } from 'react';
import './Counter.scss';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => (prev > 0 ? prev - 1 : 0));
  const reset = () => setCount(0);

  return (
    <div className="counter-container">
      <h2>Simple Counter</h2>
      <p>You clicked <span>{count}</span> times</p>
      <div className="btn-group">
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default Counter;
