import React, { useState } from "react";

import Tab from "../CalendarEvents/CalendarTabSection/Tab";
import Appearance from "./Appearance";
import Integrations from "./Integrations";

const tabSection = {
  Appearance: <Appearance />,
  Integrations: <Integrations />,
};

const Setting = ({ setIsSettingPageOpen }) => {
  const [tabActive, setTabActive] = useState("Appearance");

  const handleTab = (tabName) => {
    setTabActive(tabName);
  };

  return (
    <div className="w-full">
      <div className="-mx-[12.8px]">
        <div className="w-full px-4 pb-[0.8px] border-b border-gray-200 flex dark:border-slate-700 overflow-x-scroll">
          <Tab
            label="Appearance"
            className="px-5"
            handleTab={handleTab}
            tabActive={tabActive}
            layoutId="settings"
          />
          <Tab
            label="Account Settings"
            className="px-5"
            handleTab={handleTab}
            tabActive={tabActive}
            layoutId="settings"
          />
          <Tab
            label="Integrations"
            className="px-5"
            handleTab={handleTab}
            tabActive={tabActive}
            layoutId="settings"
          />
        </div>
      </div>

      <div>{tabSection[tabActive]}</div>
    </div>
  );
};

export default Setting;
