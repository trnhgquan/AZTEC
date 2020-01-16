import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'react-styleguidist/lib/client/rsg-components/Styled';
import Logo from './Logo';
import AZTECLogo from '../../images/logo.png';

const styles = ({
  space, color, fontFamily, fontSize, borderRadius,
}) => ({
  root: {
    fontFamily: fontFamily.base,
  },
  search: {
    padding: space[2],
  },
  input: {
    display: 'block',
    width: '100%',
    paddingLeft: space[2],
    paddingRight: space[2],
    paddingTop: space[1],
    paddingBottom: space[1],
    color: '#fff',
    backgroundColor: 'rgba(255,255,255, 0.4)',
    fontFamily: fontFamily.base,
    fontSize: fontSize.base,
    border: [[1, color.border, 'solid']],
    borderRadius: '20px',
    transition: 'all ease-in-out .1s',
    '&:focus': {
      isolate: false,
      backgroundColor: 'rgba(255,255,255, 0.8)',
      outline: 0,
      color: color.base,
    },
    '&::placeholder': {
      isolate: false,
      fontFamily: fontFamily.base,
      fontWeight: 200,
      fontSize: fontSize.base,
      color: '#fff',
    },
  },
});

export function TableOfContentsRenderer({
  classes, children, searchTerm, onSearchTermChange,
}) {
  return (
    <div>
      <div className={classes.root}>
        <nav>
          <Logo>
            <img width="100%" src={AZTECLogo} />
          </Logo>
          <div className={classes.search}>
            <input
              value={searchTerm}
              className={classes.input}
              placeholder="Filter by name"
              aria-label="Filter by name"
              onChange={event => onSearchTermChange(event.target.value)}
            />
          </div>
          {children}
        </nav>
      </div>
    </div>
  );
}

TableOfContentsRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  searchTerm: PropTypes.string.isRequired,
  onSearchTermChange: PropTypes.func.isRequired,
};

export default Styled(styles)(TableOfContentsRenderer);