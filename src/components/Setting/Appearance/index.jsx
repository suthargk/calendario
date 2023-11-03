import React from "react";
import Themes from "./Themes";
import AccentColor from "./AccentColor";
import Languages from "./Languages";
import Animation from "./Animation";
import { motion } from "framer-motion";

const Appearance = ({ tabActive }) => {
  return (
    <motion.div
      key={tabActive}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="p-2 pt-4 divide-y space-y-3 dark:divide-slate-700"
    >
      <Themes />
      <AccentColor />
      <Animation />
      <Languages />
    </motion.div>
  );
};

export default Appearance;
