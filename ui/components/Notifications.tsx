import React from 'react';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

interface prop {
  text: string | null | undefined
}

export const Notification = () => (
  <ToastContainer
    position="bottom-center"
    autoClose={5000}
    hideProgressBar
    newestOnTop
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable={false}
    pauseOnHover
  />
);

