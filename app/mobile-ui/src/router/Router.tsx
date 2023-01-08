import * as React from "react";

import {
  WelcomeView,
  SettingsView,
  ExerciseView,
  ExerciseResultView,
  BaseView,
  HomeView,
  LegalView,
  LegalDetailsView
} from "../views";

import { Route, Routes } from "react-router-dom";
import { SupportedRoutes } from "../dtos";

export const Router = () => (
  <Routes>
    <Route path={SupportedRoutes.base} element={<BaseView />} />
    <Route path={SupportedRoutes.welcome} element={<WelcomeView />} />
    <Route path={SupportedRoutes.legal} element={<LegalView />} />
    <Route path={SupportedRoutes.home} element={<HomeView />} />
    <Route path={SupportedRoutes.settings} element={<SettingsView />} />
    <Route path={SupportedRoutes.exercise} element={<ExerciseView />} />
    <Route path={SupportedRoutes.exerciseResult} element={<ExerciseResultView />} />
    <Route path={SupportedRoutes.legalDetails} element={<LegalDetailsView/>} />
  </Routes>
);
