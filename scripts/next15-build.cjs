const { Worker } = require("node:worker_threads");

const originalPostMessage = Worker.prototype.postMessage;
const buildCallbackKeys = new Set([
  "exportPathMap",
  "generateBuildId",
  "webpack",
]);

function removeBuildCallbacks(value, seen = new WeakSet()) {
  if (!value || typeof value !== "object" || seen.has(value)) {
    return;
  }

  seen.add(value);

  for (const key of Object.keys(value)) {
    if (buildCallbackKeys.has(key) && typeof value[key] === "function") {
      delete value[key];
      continue;
    }

    removeBuildCallbacks(value[key], seen);
  }
}

Worker.prototype.postMessage = function postMessage(value, transferList) {
  removeBuildCallbacks(value);
  return originalPostMessage.call(this, value, transferList);
};

process.argv = [process.execPath, "next", "build"];
require("next/dist/bin/next");
