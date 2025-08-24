import React from "react";
import { motion } from "framer-motion";
import logo from "../../assets/klu_logos/klu__logo.png";
import "./Header.css";

export default function Header() {
  // Animation variants
  const logoVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1 } },
  };

  const titleVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: .5, delay: 0.8 } },
  };

  return (
    <div className="header-container">
      <motion.img
        src={logo}
        alt="KLU Logo"
        className="klu-logo"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={logoVariants}
      />
      <motion.h1
        className="header-title"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={logoVariants}
      >
        QUIZ
      </motion.h1>
      <motion.span className="klu-text"
        
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={titleVariants}>-KLU</motion.span>
    </div>
  );
}
