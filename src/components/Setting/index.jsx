import React, { useState } from "react";
import PageHeader from "../common/EventDetailOverlay/EventDetailOverlayHeader";
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
    <div className="">
      {/* <PageHeader setIsEventDetailOverlayOpen={setIsSettingPageOpen} /> */}
      <div className="border-b border-gray-200 flex mx-[-12.8px] dark:border-slate-700">
        <Tab
          label="Appearance"
          handleTab={handleTab}
          tabActive={tabActive}
          layoutId="settings"
        />
        <Tab
          label="Integrations"
          handleTab={handleTab}
          tabActive={tabActive}
          layoutId="settings"
        />
      </div>

      <div>{tabSection[tabActive]}</div>
    </div>
  );
};

export default Setting;
