import React from "react";

import { motion } from "framer-motion";

import AccentColor from "./AccentColor";
import Animation from "./Animation";
import Languages from "./Languages";
import ScrollWithTime from "./ScrollWithTime";
import Themes from "./Themes";

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
      <ScrollWithTime />
      <Languages />
      <div>
        <button></button>
        <button></button>
      </div>
    </motion.div>
  );
};

export default Appearance;
