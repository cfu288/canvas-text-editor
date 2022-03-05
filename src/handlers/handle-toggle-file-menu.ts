export function handleToggleFileMenu() {
  if (document.getElementById("fileMenu").classList.contains("hidden")) {
    document.getElementById("fileMenu").classList.remove("hidden");
    return;
  }
  document.getElementById("fileMenu").classList.add("hidden");
}
