import * as React from "react";

import { LegalContentType, LegalDataDto } from "../../dtos/Legal";
import { LegalContextValue, LegalProviderProps } from "./Legal.types";
import { TermsAndConditionData, DataPrivacyData} from "./LegalData";

export const LegalContext = React.createContext<LegalContextValue | null>(null);

export const LegalProvider = ({ children }: LegalProviderProps) => {
    const [legalContentType, setLegalContentType] = React.useState<LegalContentType>(LegalContentType.TermsAndConditions);
    const [termsAndConditions, setTermsAndConditions] = React.useState<LegalDataDto[]>(TermsAndConditionData);
    const [dataPrivacy, setDataPrivacy] = React.useState<LegalDataDto[]>(DataPrivacyData);

    return <LegalContext.Provider value={{
        legalContentType,
        setLegalContentType,
        termsAndConditions,
        dataPrivacy,
        setTermsAndConditions,
        setDataPrivacy
    }}>
        {children}
    </LegalContext.Provider>
}