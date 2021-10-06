export const addressLength = 42;

export const zeroAddress = "0x0000000000000000000000000000000000000000";

/* NFTE @contextart/nfte */

export function toTrimmedAddress(value: string) {
  if (!value) return "";
  return `${value.substr(0, 6)}…${value.substr(value.length - 4, value.length)}`;
}

export function isAddress(value: string) {
  return value?.startsWith("0x") && value?.length === addressLength;
}

export function cx(classNames: unknown[]) {
  return classNames.filter(Boolean).join(" ");
}

export function tsFormat(value: string) {
  // eslint-disable-next-line radix
  const dateObj = new Date(parseInt(value) * 1000);
  const year = dateObj.getUTCFullYear();
  const month = dateObj.getUTCMonth() + 1;
  const date = dateObj.getUTCDate();
  const hour = dateObj.getUTCHours();
  const mins = dateObj.getUTCMinutes();
  return `${String(date).padStart(2, "0")}/${String(month).padStart(2, "0")}/${year} ${String(
    hour
  ).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
}

/* NFTE @contextart/nfte */

export function keyDownA11y(handler: () => void) {
  return function onKeyDown(event: React.KeyboardEvent) {
    if (["keydown", "keypress"].includes(event.type) && ["Enter", " "].includes(event.key)) {
      handler();
    }
  };
}
