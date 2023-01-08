import * as React from "react";

import { useLegal, useNavigation } from "../../providers";
import { Button, HeaderLabel, Label } from "../../components";
import { LegalContentType, SupportedRoutes } from "../../dtos";

export const LegalDetailsView = () => {
  const { previousRoute, toSettingsView, toLegalView } = useNavigation();
  const { legalContentType, termsAndConditions, dataPrivacy } = useLegal();

  const title = React.useMemo(() => {
    return legalContentType === LegalContentType.DataPrivacy
      ? "Data Privacy"
      : "Terms and Conditions";
  }, [legalContentType, termsAndConditions, dataPrivacy]);

  const content = React.useMemo(() => {
    return legalContentType === LegalContentType.DataPrivacy
      ? dataPrivacy
      : termsAndConditions;
  }, [legalContentType, termsAndConditions, dataPrivacy]);

  const handleBack = React.useCallback(() => {
    previousRoute === SupportedRoutes.settings
      ? toSettingsView()
      : toLegalView();
  }, [previousRoute]);

  return (
    <React.Fragment>
      <div className="">
        <Label className="text-slate-400">We are transparent</Label>
        <HeaderLabel className="mt-2">{title}</HeaderLabel>
      </div>
      <div className="flex-1 overflow-x-hidden overflow-y-auto space-y-6">
        {(content || []).map((c, index) => (
          <div
            key={`legal-content-type-${index}`}
            className="text-slate-400"
          >
            {c.title && <Label className="font-bold my-5">{c.title}</Label>}
            {c.content ||
              (c.content || []).map((c, i) => (
                <Label key={`legal-content-data-${i}`}>{c}</Label>
              ))}
          </div>
        ))}
      </div>
      <div className="basis-12">
        <Button className="w-full" variant="primary" onClick={handleBack}>
          Back
        </Button>
      </div>
    </React.Fragment>
  );
};
