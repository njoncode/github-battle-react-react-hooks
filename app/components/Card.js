import React from 'react';
import PropTypes from 'prop-types';
import ThemeContext from '../contexts/theme';

export default function Card({
  header,
  subheader,
  avatar,
  href,
  name,
  children,
}) {
  const theme = React.useContext(ThemeContext);

  return (
    <div className={`card bg-${theme}`}>
      <h4 className="header-lg center-text">{header}</h4>
      <img className="avatar" src={avatar} alt={`Avatar for ${name}`} />
      {subheader && <h4 className="center-text">{subheader}</h4>}
      <h2 className="center-text">
        <a className="link" href={href}>
          {name}
        </a>
      </h2>
      {children}
    </div>
  );
}

Card.propTypes = {
  header: PropTypes.string.isRequired,
  subheader: PropTypes.string,
  avatar: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

/**
 *  children in React

Props are how we pass data into components. We pass data to components just like we’d set attributes on regular HTML elements.

<a href='/' class='link'>Home</a>

<Clock time='12:49' period='AM' />

Now thinking more about regular HTML elements (span, div, etc), is there any other way that we’re able to pass information to the element? What about the text Home in our a tag above? As part of the API for almost every HTML element, you can pass data via the opening and closing tag of the element.
 * Now, instead of passing data (props) into the component via setting attributes as we usually would, we’re passing data into the components via the opening and closing tags.
 * How would we go about implementing those?
 * And more specifically, how would we get access to the data inside of the opening and closing tag of the element?
 * React makes this simple.
 * Whatever is between the opening and closing tag of an element will be accessible inside of the component via props.children.
 */
