import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Popular from './components/Popular';
import Battle from './components/Battle';
import Results from './components/Results';
import Nav from './components/Nav';
import { ThemeProvider } from './contexts/theme';

function App() {
  const [theme, setTheme] = React.useState('light');

  const toggleTheme = () => {
    setTheme((theme) => (theme === 'light' ? 'dark' : 'light'));
  };

  return (
    <Router>
      <ThemeProvider value={theme}>
        <div className={theme}>
          {/* // classname will be set based on the theme. if theme is dark, then
          className will be dark and so dark color (from CSS) */}
          <Nav toggleTheme={toggleTheme} />
          <Switch>
            <Route exact path="/" component={Popular} />
            <Route exact path="/battle" component={Battle} />
            <Route path="/battle/results" component={Results} />
            <Route render={() => <h1>404</h1>} />
            {/**
             * We will wrap all of our routes/components inside of the switch component. 
             * If we leave of the path, then this route is always gonna render.   
               //  <Route render={() => <h1>404</h1>} />
              Here, we have left of the path, so this route is always gonna render. So we are wrapping evertyhing in a switch, this will only render if none of the
               above 3 routes match. 
             * Switch will make sure that only the first path that matches, only that componet is rendered.
             * If we have two routes that both match, only render the first one.
          
            */}
          </Switch>
        </div>
      </ThemeProvider>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));

/**
    Router
    
 * When the app’s location matches a certain path, Route will render a specified component, when it doesn’t, it will render null. 
   So say for example we had a Home component that we wanted to render when our app was at the index path /
        
              <Route path='/' component={Home} />

  If we were at the index page (/), we would see the Home component. If we weren’t, we wouldn’t see anything (because Route would have rendered null).

      *      <Route path='/' component={Home} />
             <Route path='/about' component={About} />
  
  One caveat -  if we run the app and we head to the /about path, we’ll notice that both the About component and the Home component are rendered. This is because even though / doesn’t match the location exactly, it’s still considered a partial match so the Home component is rendered. 
  To get around this, we simply need to add an exact prop to the / Route to specify that we only want it to match when the location matches exactly.

            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/>
   


 * 
 * 
 */
