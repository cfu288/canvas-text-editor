import { textContent, requestRender, fontContext } from "../app";
import { FileRegistry } from "../services";
import { handleToggleNavMenu } from "./handle-toggle-nav-menu";

export function setupNavBarHandlers() {
  document
    .getElementById("fileMenuButton")
    ?.addEventListener("click", () => handleToggleNavMenu("fileMenu"));
  document
    .getElementById("preferencesMenuButton")
    ?.addEventListener("click", () => handleToggleNavMenu("preferencesMenu"));

  document.getElementById("openFileButton")?.addEventListener("click", () => {
    FileRegistry.promptFileSelect().then((file) =>
      FileRegistry.getFileContents(file).then((data) => {
        textContent.readFromFile(file.name, data);
        requestRender();
      })
    );
    handleToggleNavMenu("fileMenu");
  });
  document.getElementById("saveFileButton")?.addEventListener("click", () => {
    FileRegistry.saveFileContents(textContent.name, textContent).then(() => {
      alert(`${textContent.name} saved`);
    });
    handleToggleNavMenu("fileMenu");
  });
  document
    .getElementById("loadSampleFileButton")
    ?.addEventListener("click", () => {
      fetch(
        "https://raw.githubusercontent.com/cfu288/canvas-text-editor/main/src/UTF8TextFile.txt"
      ).then((res) => {
        res.text().then((data) => {
          textContent.readFromFile("UTF8TextFile.txt", data);
        });
      });

      handleToggleNavMenu("fileMenu");
    });

  // Font button handlers
  document
    .getElementById("font-item-courier-new")
    ?.addEventListener("click", () => {
      fontContext
        .selectFont("Courier New")
        .then(() => {
          requestRender();
          handleToggleNavMenu("preferencesMenu");
        })
        .catch((e) => {
          console.error(`Unable to load new font: ${e}`);
        });
    });
  document
    .getElementById("font-item-fira-code")
    ?.addEventListener("click", () => {
      fontContext
        .selectFont("Fira Code")
        .then(() => {
          requestRender();
          handleToggleNavMenu("preferencesMenu");
        })
        .catch((e) => {
          console.error(`Unable to load new font: ${e}`);
        });
    });
  document
    .getElementById("font-item-cascadia-code")
    ?.addEventListener("click", () => {
      fontContext
        .selectFont("Cascadia Code")
        .then(() => {
          requestRender();
          handleToggleNavMenu("preferencesMenu");
        })
        .catch((e) => {
          console.error(`Unable to load new font: ${e}`);
        });
    });
}
