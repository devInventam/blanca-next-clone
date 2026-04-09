import React from "react";
import "./Preloader.css";
import { motion as Montion } from "framer-motion";

const Preloader = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <Montion.div
      className="preloader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 4, ease: "easeInOut" }}
    >
      <div className="preloader-inner">
        <img src="/images/logos/favicon.png" alt="Horse Loader" className="horse-loader" />
      </div>
    </Montion.div>
  );
};

export default Preloader;
