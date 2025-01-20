var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.js
var main_exports = {};
__export(main_exports, {
  default: () => CFLPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");

var CFLPlugin = class extends import_obsidian.Plugin {
  async onload() {
    // Add a ribbon icon labeled "COPY LINKS"
    this.addRibbonIcon("clipboard", "COPY LINKS", async () => {
      const activeView = this.app.workspace.getActiveViewOfType(import_obsidian.ItemView);

      // Check if the active view is a canvas
      if (!activeView || activeView.getViewType() !== "canvas") {
        new import_obsidian.Notice("Please open a canvas to use the COPY LINKS button");
        return;
      }

      // Access the canvas nodes and extract file names
      const canvas = activeView.canvas;
      const nodes = canvas.getData().nodes;

      const fileNames = nodes
        .filter(node => node.type === "file")
        .map(node => `[[${node.file}]]`)
        .join("\n");

      if (!fileNames) {
        new import_obsidian.Notice("No file nodes found in the canvas");
        return;
      }

      // Copy file names to clipboard
      try {
        await navigator.clipboard.writeText(fileNames);
        new import_obsidian.Notice("File names copied to clipboard");
      } catch (error) {
        console.error("Failed to copy file names:", error);
        new import_obsidian.Notice("Error: Could not copy file names");
      }
    });

    console.log("CFL Plugin loaded successfully.");
  }

  onunload() {
    console.log("CFL Plugin unloaded.");
  }
};

