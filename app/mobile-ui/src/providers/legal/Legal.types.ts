import { CommonProviderProps, LegalContentType, LegalDataDto} from "../../dtos";

export type LegalContextValue = {
    legalContentType: LegalContentType;
    setLegalContentType: (next: LegalContentType) => void; 
    termsAndConditions: LegalDataDto[];
    setTermsAndConditions: (next: LegalDataDto[]) => void;
    dataPrivacy: LegalDataDto[]; 
    setDataPrivacy: (next: LegalDataDto[]) => void;
};

export type LegalProviderProps = CommonProviderProps;
