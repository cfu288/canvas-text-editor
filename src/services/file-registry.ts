import { TextContent } from "../models";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace FileRegistry {
  export function getFileContents(file: File): Promise<string> {
    return file.text();
  }

  /**
   * Save a file to a user's file system. Chrome only
   * @param name Name of the file to use
   * @param tc Text content to write to disk
   * @returns Promise<void>
   */
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
   * Opens file select prompt and returns the selected file object. Chrome only
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
