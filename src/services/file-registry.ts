// import { fs, dialog, BaseDirectory } from "@tauri-apps/api";

export namespace FileRegistry {
  export function getFileContents(file: File): Promise<string> {
    return file.text();
  }

  /**
   * Opens file select prompt and returns the selected file object
   * @returns File object
   */
  export async function promptFileSelect(): Promise<File> {
    const fileHandlerList = await window.showOpenFilePicker({
      multiple: false,
    });
    const file = await fileHandlerList[0].getFile();
    return file;
  }
}
