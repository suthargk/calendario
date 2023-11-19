import React from "react";

import { motion } from "framer-motion";

import GoogleIcon from "../../../assets/icons/GoogleIcon";
import OutlookIcon from "../../../assets/icons/OutlookIcon";
import Integration from "./Integration";

const Integrations = ({ tabActive }) => {
  return (
    <motion.div
      key={tabActive}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="p-2 pt-4 space-y-3"
    >
      <div>
        <h2 className="text-sm dark:text-slate-50">Integrations</h2>
        <p className="text-xs text-gray-600 dark:text-slate-400">
          The various integrations available to your calendar
        </p>
      </div>

      <div className="space-y-2">
        <Integration
          icon={<GoogleIcon width={24} height={24} />}
          title="Google"
          id="google"
          description="Sync calendar data between App and Google"
        />
        <Integration
          className="opacity-60 cursor-not-allowed"
          icon={<OutlookIcon width={24} height={24} />}
          title="Outlook"
          id="outlook"
          description="Sync calendar data between App and Outlook"
          disabled
        />
      </div>
    </motion.div>
  );
};

export default Integrations;
