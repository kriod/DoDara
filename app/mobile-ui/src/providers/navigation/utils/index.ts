import { SupportedRoutes } from "../../../dtos";

export const extractRoute = (): SupportedRoutes => {
  const path = window.location.href;

  const match = Object.keys(SupportedRoutes).find(
    (key) => path.indexOf(key) !== -1
  );

  if (match == null) {
    return SupportedRoutes.base;
  }

  return (SupportedRoutes as any)[match];
};

export const navigationVisible = (route: SupportedRoutes) =>
  route != SupportedRoutes.base && 
  route != SupportedRoutes.welcome && 
  route != SupportedRoutes.legal &&
  route != SupportedRoutes.legalDetails && 
  route != SupportedRoutes.exerciseResult;
