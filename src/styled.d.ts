import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    color: {
      main: string;
      mainFontColor: string;
      active: string;
      darkColor: string;
      whiteColor: string;
      yellowColor: string;
      black: string;
      bgColor: string;
      navbarColor: string;
    };
  }
}
