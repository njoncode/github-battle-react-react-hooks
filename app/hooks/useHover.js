import React from 'react';

export default function useHover() {
  const [hovering, setHovering] = React.useState(false);

  const mouseOver = () => setHovering(true);
  const mouseOut = () => setHovering(false);

  const attrs = {
    onMouseOver: mouseOver,
    onMouseOut: mouseOut,
  };

  return [hovering, attrs];
}

/**
 
 * The function we pass to onMouseOver will be invoked when the component is hovered over.
 * And the function we pass to onMouseOut will be invoked when the component is no longer being hovered over.
 * We’ll add a hovering state value to our component using the useState Hook.
 * This will trigger a re-render whenever hovering changes, showing or hiding our tooltip.
 * There’s no built-in Hook for sharing non-visual logic, instead, we can create your own custom Hooks that are decoupled from any UI.
 * Custom Hooks is just a function (and not a component), it’s not coupled to any UI and can return whatever it wants
 *
 
 * We use custom Hook - useHover for sharing our hovering logic. (Better Solution than Higher-Order Component and Render Prop)
 * 
 * In this case, we want the consumer of useHover to have two pieces of data, the hovering state and the attributes to add to the DOM node whose hovering state they want to track.

function useHover () {
  const [hovering, setHovering] = React.useState(false)

  const mouseOver = () => setHovering(true)
  const mouseOut = () => setHovering(false)

  const attrs = {    onMouseOver: mouseOver,    onMouseOut: mouseOut  }  return [hovering, attrs]}

Now we can invoke useHover directly inside of any component which renders a DOM node whose hovering state we want to track.
 * 
 */
