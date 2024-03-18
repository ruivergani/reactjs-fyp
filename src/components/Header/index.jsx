// CSS Module Import
import styles from './Header.module.css'; 
// Components
import Menu from '../Menu';
// Properties Validation Import
import PropTypes from 'prop-types';
export function Header({onButtonClick}){
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div>
          <h1 className={styles.title}>
            ReactJS
          </h1>
          <p className={styles.subtitle}>Algorithm to calculate DOM Operations and display benchmark results</p>
        </div>
        <div className={styles.navigation}>
          {/* Menu */}
          <Menu onButtonClick={onButtonClick}/>
        </div>
      </div>
    </header>
  );
}
Header.propTypes = {
  onButtonClick: PropTypes.func.isRequired // onButtonClick is type function
};