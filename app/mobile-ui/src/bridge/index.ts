type IdFunction = (next: string) => void;

declare global {
  interface Window {
    SERVICE_URL: string;
    receivedIsInitialised: VoidFunction;
    requestExercise: VoidFunction;
    receivedId: IdFunction;
    receivedNetworkUpdate: (next: boolean) => void;
    bridge?: {
      uiLoadedSuccessfully: VoidFunction;
      prepareExercise: VoidFunction;
      saveId: IdFunction;
    };
  }
}

export const isMobileDevice = () => window.bridge != null;

export const isDesktop = () => window.bridge == null; 

export const prepareExercise = () => {
  window.bridge && window.bridge.prepareExercise();
};

export const saveId = (next: string) => {
  window.bridge && window.bridge.saveId(next);
}

export const uiLoadedSuccessfully = () => {
  window.bridge && window.bridge.uiLoadedSuccessfully();
}
