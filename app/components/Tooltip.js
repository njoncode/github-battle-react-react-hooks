import React from 'react';
import PropTypes from 'prop-types';
import useHover from '../hooks/useHover';

const styles = {
  container: {
    position: 'relative',
    display: 'flex',
  },

  tooltip: {
    boxSizing: 'border-box',
    position: 'absolute',
    width: '160px',
    bottom: '100%',
    left: '50%',
    marginLeft: '-80px',
    borderRadius: '3px',
    backgroundColor: 'hsla(0, 0%, 20%, 0.9)',
    padding: '7px',
    marginBottom: '5px',
    color: '#fff',
    textAlign: 'center',
    fontSize: '14px',
  },
};

export default function Tooltip({ text, children }) {
  const [hovering, attrs] = useHover();
  return (
    <div style={styles.container} {...attrs}>
      {hovering === true && <div style={styles.tooltip}>{text}</div>}
      {children}
    </div>
  );
}

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
};

/* How to share logic throughout our application:
   Patterns for accomplishing DRY (Don't Repeat Yourself) in a React codebase.

  (1) Higher-Order Component pattern
  (2) Render Prop pattern 

Render Prop Pattern is better than Higher-Order Component pattern for sharing logic throughout our application.

HOCs have some pitfalls. The biggest one is with inversion of control and naming collisions. 
Because we have to pass our component over to the Higher-Order component, we have no control over how it’s rendered. 

With Render Props, instead of handing over the component, we hand over a function. 
Then, when that function is invoked, it’ll be passed the data we need — no inversion of control and no naming collisions since we can decide how the component is rendered.
*/
