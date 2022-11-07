declare module 'emotion-theming' {
  export function useTheme<T = Theme>(): T;

  export interface Theme {
    breakpoints: string[];
    colors: Colors;
    fonts: Fonts;
    radii: Radii;
    fontSizes: number[];
    fontWeights: FontWeights;
    lineHeights: LineHeights;
    shadows: Shadows;
    space: number[];
    text: {
      h1: any;
      h2: any;
      h3: any;
      h4: any;
      h5: any;
      h6: any;
      body: any;
      ['body-small']: any;
      caption: any;
      ['caption-small']: any;
    };
    styles: any;
    variants: any;
  }

  export interface Colors {
    themePrimary: string;
    themeSecondary: string;
    themeTertiary: string;
    themeDark: string;
    themeDarker: string;
    themeDarkAlt: string;
    themeLight: string;
    themeLighter: string;
    themeLighterAlt: string;
    neutralPrimary: string;
    neutralPrimaryAlt: string;
    neutralSecondary: string;
    neutralTertiary: string;
    neutralTertiaryAlt: string;
    neutralQuaternary: string;
    neutralQuaternaryAlt: string;
    neutralLight: string;
    neutralLighter: string;
    neutralLighterAlt: string;
    neutralDark: string;
    black: string;
    white: string;
    primaryBackground: string;
    primaryText: string;
    bodyBackground: string;
    bodyText: string;
    disabledBackground: string;
    disabledText: string;
    accent1: string;
    accent2: string;
    accent3: string;
    accent4: string;
    statusError: string;
    statusErrorFill: string;
    statusSevereWarning: string;
    statusSevereWarningFill: string;
    statusSuccess: string;
    statusSuccessFill: string;
    statusWarning: string;
    statusWarningFill: string;
  }

  export interface Fonts {
    body: string;
    heading: string;
    monospace: string;
  }

  export interface Radii {
    default: number;
  }

  export interface FontWeights {
    regular: number;
    semibold: number;
    bold: number;
  }

  export interface LineHeights {
    body: number;
    heading: number;
  }

  export interface Shadows {
    depth0: string;
    depth4: string;
    depth8: string;
    depth16: string;
    depth64: string;
  }
}
