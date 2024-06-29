import { useSensor, useSensors } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { MouseSensor, TouchSensor } from "@dnd-kit/core";

export function useMountStatus() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 500);
    return () => clearTimeout(timeout);
  }, []);
  return isMounted;
}

export function useSensorsCustome() {
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  return { sensors };
}
