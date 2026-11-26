export const toast = (msg: string) => window.dispatchEvent(new CustomEvent("noor-toast", { detail: msg }));
