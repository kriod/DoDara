import * as React from "react";
import { useNavigation } from "../../providers";

import { Label, Button, Header } from "../../components";

const LegalIllustration = require("../../assets/welcome.svg");

export const WelcomeView = () => {
  const { toLegalView } = useNavigation();

  return (
    <React.Fragment>
            <Header
        title="Collect Stars"
        meta="Solve daily exercises"
        showStars={false}
      />
      <div className="flex-1 overflow-y-auto">
        <LegalIllustration.ReactComponent className="my-8" />
        <Label className="text-center text-slate-400">
          By solving exercises correctly you will be rewarded with stars 
        </Label>
      </div>
      <div className="basis-12">
        <Button className="w-full" variant="primary" onClick={toLegalView}>
          Get Started
        </Button>
      </div>
    </React.Fragment>
  );
};
