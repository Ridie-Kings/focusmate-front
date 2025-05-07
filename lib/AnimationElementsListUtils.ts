import { useRef } from "react";

export default function AnimationElementsListUtils({
  listRef,
}: {
  listRef: React.RefObject<HTMLDivElement | null>;
}) {
  const positions = useRef<Map<string, DOMRect>>(new Map());

  const capturePositions = () => {
    if (!listRef.current) return;
    const newPositions = new Map<string, DOMRect>();
    for (const child of listRef.current.children) {
      const el = child as HTMLElement;
      const id = el.dataset.id!;
      newPositions.set(id, el.getBoundingClientRect());
    }
    positions.current = newPositions;
  };

  const animateFLIP = () => {
    if (!listRef.current) return;

    for (const child of listRef.current.children) {
      const el = child as HTMLElement;
      const id = el.dataset.id!;
      const prev = positions.current.get(id);
      const next = el.getBoundingClientRect();
      if (!prev || !next) continue;

      const dx = prev.left - next.left;
      const dy = prev.top - next.top;

      if (dx !== 0 || dy !== 0) {
        el.animate(
          [
            { transform: `translate(${dx}px, ${dy}px)` },
            {
              transform: `translate(${-dx * 0.05}px, ${-dy * 0.05}px) `,
              offset: 0.7,
            },
            { transform: "translate(0, 0)" },
          ],
          {
            duration: 1000,
            easing: "cubic-bezier(0.25, 1, 0.5, 1)",
          }
        );
      }
    }
  };

  return {
    capturePositions,
    animateFLIP,
  };
}
