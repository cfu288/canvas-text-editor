import { ColorTheme, defaultTheme } from "../configuration/colors";

export class ThemeProvider {
  private _theme: ColorTheme = defaultTheme;
  constructor(theme?: ColorTheme) {
    this._theme = theme || defaultTheme;
  }

  get theme() {
    return this._theme;
  }
}
