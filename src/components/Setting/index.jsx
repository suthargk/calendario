import React, { useState } from "react";
import PageHeader from "../common/EventDetailOverlay/EventDetailOverlayHeader";
import Tab from "../CalendarEvents/CalendarTabSection/Tab";
import Appearance from "./Appearance";
import Integrations from "./Integrations";

const tabSection = {
  Appearance: <Appearance />,
  Integratons: <Integrations />,
};

const Setting = ({ setIsSettingPageOpen }) => {
  const [tabActive, setTabActive] = useState("Appearance");

  const handleTab = (tabName) => {
    setTabActive(tabName);
  };

  return (
    <div className="">
      {/* <PageHeader setIsEventDetailOverlayOpen={setIsSettingPageOpen} /> */}
      <div className="border-b border-gray-200 flex mx-[-12.8px]">
        <Tab
          label="Appearance"
          handleTab={handleTab}
          tabActive={tabActive}
          layoutId="settings"
          underLineColor="bg-pink-500"
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
