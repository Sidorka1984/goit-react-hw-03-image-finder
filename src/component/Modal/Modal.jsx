import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from './Modal.module.css';

export default class Modal extends Component {
  static propTypes = {
    closeModalEsc: PropTypes.func,
  }

  componentDidMount() {
    window.addEventListener("keydown", this.closeModalEsc)
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.closeModalEsc)
  }
  closeModalEsc = (e) => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  handleBackdropClick = (e) => {
   if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  
  render() {
    const { children, onClose } = this.props;
    return (
      <div className={styles.Overlay} onClick={onClose}>
        <div className={styles.Modal}>{children}</div>
      </div>
    )
  }
}

// import React, { Component } from 'react';
// import { createPortal } from 'react-dom';
// import PropTypes from 'prop-types';
// import styles from './Modal.module.css';
// 
// 
// const modalRoot = document.querySelector('#modal-root');
// 
// export default class Modal extends Component {
  // componentDidMount() {
    // console.log('Modal componentDidMount');
    // window.addEventListener('keydown', this.closeModalEsc);
  // }
  // componentWillUnmount() {
    // console.log('Modal componentWillUnmount');
    // window.removeEventListener('keydown', this.closeModalEsc);
  // }
  // closeModalEsc = (e)=> {
    // if (e.code === 'Escape') {
      // console.log('tach ESC, close modal');
      // this.props.onClose();
    // }
  // };
// 
  // heandleBackDropClick = event => {
    // console.log('click on backdrop');
    // console.log('currentTarget:', event.currentTarget);
    // console.log('target', event.target);
    // if (event.currentTarget === event.target) {
      // this.props.onClose();
    // }
  // };
// 
  // render() {
    // return createPortal(
      // <div className={styles.Overlay} onClick={this.closeModalEsc}>
        // {/* <div className={styles.Modal}>{ this.props.children }</div>  */}
      // {/* </div>,  */}
      // modalRoot
    // )
// 
  // }
// }
// 
// Modal.defaultProps = {
  // onClose: () => null,
  // children: null,
// }
// 
// Modal.propTypes = {
  // onClose: PropTypes.func,
  // children: PropTypes.node,
// }
// 