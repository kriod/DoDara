import * as React from "react";
import { useNavigateToHome, useNavigation } from "../../providers";

import { Button, Header, Label } from "../../components";

const LegalIllustration = require("../../assets/legal.svg");

export const LegalView = () => {
  const { toTermsAndConditions, toDataPrivacy } = useNavigation();
  const toHomeView = useNavigateToHome();

  return (
    <React.Fragment>
      <Header
        title="Data Privacy"
        meta="Our legal agreements"
        showStars={false}
      />
      <div className="flex-1 overflow-y-auto">
        <LegalIllustration.ReactComponent className="my-8" />
        <Label className="text-center text-slate-400">
          By pressing continue you confirm and accept the
          <span
            className="text-sky-500 font-bold underline cursor-pointer ml-1"
            onClick={toDataPrivacy}
          >
            data privacy agreement
          </span>{" "}
          and
          <span
            className="text-sky-500 font-bold underline cursor-pointer ml-1"
            onClick={toTermsAndConditions}
          >
            terms and conditions
          </span>{" "}
          of the app.
        </Label>
      </div>
      <div className="basis-12">
        <Button className="w-full" variant="primary" onClick={toHomeView}>
          Continue
        </Button>
      </div>
    </React.Fragment>
  );
};
