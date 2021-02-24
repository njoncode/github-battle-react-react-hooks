import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*
  The dynamic-import-syntax allows us import modules dynamically.
  Reactlazy allows us to render a dynamic import just as a regular component.
  So we combine those two ideas, we create these regular components, pass those as components to React Routers Route component.
  And now Popular won't be loaded until we are at the Popular path,
  Battle won't be loaded until we are at '/Battle' & 
  Results won't be loaded until we are at '/Battle/Results'.

  So using dynamic import syntax, React.lazy & React.Suspense, we can delay importing a specific module & all of the modules 
  that that module depends on, until the user actually needs that code.

*/

// We can write components like this. Instead of having a constructor, we can add properties to our state just by having the syntax right here.
// Arrow function methods allow the components to prevent having to bind the method in the constructor.
class App extends React.Component {
  /**
   * We are updating the current state based on the previous state, so we pass a function to the setSate.
   * If the theme is light, then we we are gonna change it to dark and vice-versa.
   */

  render() {
    return <div>REACT APP: via hookss</div>;
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

/*
 <Route Path='/' component={Popular} />    
    Whenever the user is at the index page, the component we want to render is the Popular Component.
              
 <Route Path='/battle' component={Battle} />  
    Whenever the user is at Battle, the component that we want the react router to render is the Battle component.
              
*/

/* 
  exact prop allows us to render only the Popular component when we are exactly on the home page no other nested pages. 
*/
