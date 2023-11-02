import React from "react";
import Themes from "./Themes";
import AccentColor from "./AccentColor";
import Languages from "./Languages";
import Animation from "./Animation";

const Appearance = () => {
  return (
    <div className="p-2 pt-4 divide-y space-y-3">
      <Themes />
      <AccentColor />
      <Animation />
      <Languages />
    </div>
  );
};

export default Appearance;
