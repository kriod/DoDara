import * as React from "react";

import {
  HiArrowRightCircle
} from "react-icons/hi2";

import { Header, Label, QrCodeComponent } from "../../components";
import { useId, useNavigation } from "../../providers";
import { REQUEST_PAYOUT } from "../../url";

export const SettingsView = () => {
  const { id } = useId();
  const { toDataPrivacy, toTermsAndConditions } = useNavigation();

  const qrcodeContent = React.useMemo(() => `${REQUEST_PAYOUT}?id=${id}`, [id])

  return (
    <React.Fragment>
      <Header
        title="User ID"
        meta="Your unique"
        showStars={true}
      />
      <div className="flex-1 overflow-y-auto space-y-14">
        <div className="flex-1 flex flex-col items-center space-y-4">
          <div className="relative w-56 basis-56 mt-4">
            <QrCodeComponent width={224} height={224} className="" content={qrcodeContent} />
          </div>
        </div>
        <div className="flex-1 flex flex-col space-y-4">
          <div onClick={toTermsAndConditions}>
            <Label className="bg-slate-200 bg-opacity-50 text-slate-400 p-4 rounded-2xl flex flex-row space-x-1 items-center">
              <div className="flex-1">Terms and conditions</div>
              <HiArrowRightCircle className="w-10 h-10" />
            </Label>
          </div>
          <div onClick={toDataPrivacy}>
            <Label className="bg-slate-200 bg-opacity-50 text-slate-400 p-4 rounded-2xl flex flex-row space-x-1 items-center">
              <div className="flex-1">Data Privacy</div>
              <HiArrowRightCircle className="w-10 h-10" />
            </Label>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
