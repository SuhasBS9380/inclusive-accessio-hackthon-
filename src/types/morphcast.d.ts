
interface MphToolsType {
  CameraPrivacyPopup: {
    setText: (text: {
      title: string;
      description: string;
      url: string;
    }) => void;
  };
}

interface CYModules {
  FACE_EMOTION: {
    name: string;
  };
  EVENT_BARRIER: {
    eventName: string;
  };
  [key: string]: any;
}

interface CYLoader {
  licenseKey: (key: string) => CYLoader;
  addModule: (name: string, options?: any) => CYLoader;
  load: () => Promise<{
    start: () => void;
    stop: () => void;
  }>;
}

interface CYType {
  loader: () => CYLoader;
  modules: () => CYModules;
}

declare global {
  interface Window {
    MphTools: MphToolsType;
    CY: CYType;
  }
}

export {};
