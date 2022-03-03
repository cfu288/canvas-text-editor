export const defaultTheme: ColorTheme = {
  name: "Dracula",
  background: "#282a36",
  foreground: "#f8f8f2",
  line: "#44475a",
  keyword: "#ff79c6",
  title: "#50fa7b",
  text: "#f8f8f2",
  link: "#8be9fd",
  string: "#f1fa8c",
  cursor: "#8be9fd",
  comment: "#6272a4",
  number: "#bd93f9",
};

export interface ColorTheme {
  name: string; // name of the theme
  background: string;
  foreground: string;
  line: string;
  keyword: string;
  title: string;
  text: string;
  link: string;
  cursor: string;
  string: string;
  comment: string;
  number: string;
}
