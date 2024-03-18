// Properties Validation Import
import PropTypes from 'prop-types';
// CSS Imports
import styles from './Menu.module.css'
// Components
import { Button } from '../Button';
export function Menu({onButtonClick}){
  // Create Variables to be used as props
  return(
    <div className={styles.menuContainer}>
      <Button onClick={() => onButtonClick('Delete')} title="Delete All Data" />
      <Button onClick={() => onButtonClick('Read')} title="Read All Data"/>
      <Button onClick={() => onButtonClick('Update')} title="Update Data"/>
      <Button onClick={() => onButtonClick('Create')} title="Create 1 row"/>
      <Button onClick={() => onButtonClick('Create1000')} title="Create 1,000 rows"/>
      <Button onClick={() => onButtonClick('Create10000')} title="Create 10,000 rows*"/>
    </div>
  )
}
export default Menu;
Menu.propTypes = {
  onButtonClick: PropTypes.func, // onButtonClick is type function
};