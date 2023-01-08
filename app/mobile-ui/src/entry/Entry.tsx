import * as React from "react";

import { HashRouter } from "react-router-dom";

import { Router } from "../router";
import { Composer, Layout } from "../components";
import {
  ResizeProvider,
  NavigationProvider,
  IdProvider,
  LoadingProvider,
  NetworkProvider,
  ExerciseProvider,
  LegalProvider,
  OverviewProvider,
  InitialiseProvider,
} from "../providers";

export const Entry = () => (
  <React.StrictMode>
    <HashRouter>
      <Composer
        components={[
          InitialiseProvider,
          LoadingProvider,
          ResizeProvider,
          IdProvider,
          LegalProvider,
          ExerciseProvider,
          OverviewProvider,
          NetworkProvider,
          NavigationProvider,
        ]}
      >
        <Layout className="">
          <Router />
        </Layout>
      </Composer>
    </HashRouter>
  </React.StrictMode>
);
