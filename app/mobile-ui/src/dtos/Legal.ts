import { ResponseDto } from "./ResponseDto";

export enum LegalContentType {
  TermsAndConditions,
  DataPrivacy,
}

export type LegalDataDto = {
  title: string;
  content: string[];
};

export type LegalDetailsResponseDto = ResponseDto<
  { termsAndConditions: LegalDataDto[]; dataPrivacy: LegalDataDto[] }
>;
