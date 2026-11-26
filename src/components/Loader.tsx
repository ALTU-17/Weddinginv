import { Moon } from "lucide-react";

export default function Loader({ done }: { done: boolean }) {
  return (
    <div id="loader" className={done ? "off" : ""} aria-hidden={done}>
      <Moon />
      <p>ROYAL NOOR</p>
    </div>
  );
}
