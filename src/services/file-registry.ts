// import { fs, dialog, BaseDirectory } from "@tauri-apps/api";

import { TextContent } from "../models/text-content";

export namespace FileRegistry {
  export function getFileContents(file: File): Promise<string> {
    return file.text();
  }

  export async function saveFileContents(name: string, tc: TextContent) {
    // create a new handle
    const newHandle = await window.showSaveFilePicker({ suggestedName: name });

    // create a FileSystemWritableFileStream to write to
    const writableStream = await newHandle.createWritable();

    // write our file
    await writableStream.write(tc.toArrayBuffer());

    // close the file and write the contents to disk.
    return await writableStream.close();
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
