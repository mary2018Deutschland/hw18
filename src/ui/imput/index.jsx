import React, { forwardRef } from 'react';
import styles from './styles.module.scss';

const Input = forwardRef(
  ({ styleImp, type, placeholder, onChange,  onKeyDown,...rest }, ref) => {
    return (
      <input
        ref={ref} // Присваиваем реф
        type={type}
        style={styleImp}
        className={styles.inputCont}
        onChange={onChange}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        {...rest}
        required
      />
    );
  }
);

export default Input;
