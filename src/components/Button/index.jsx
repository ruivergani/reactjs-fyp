// Properties Validation Import
import PropTypes from 'prop-types';
// CSS Import
import styles from './Button.module.css';

export function Button({onClick, title}){
  return(
    <button className={styles.button} onClick={onClick}>{title}</button>
  )
}

Button.propTypes = {
  title: PropTypes.string.isRequired, // Required string (prop)
  onClick: PropTypes.func // Required a type function (prop)
};
