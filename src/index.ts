let targetStack:any = [];

export const isGesturable = (target:any) => {
  if (targetStack.length == 0) return true;
  for (let item of targetStack) {
    if (target == item ||  item.contains(target)) {
      return true;
    }
  }

  return false;
}

export const scope = (target:any) => {
  targetStack.push(target);
}

export const descope = (target?:any) => {
  if (!target) targetStack.pop();
  else {
    let index = targetStack.indexOf(target);
    if (index > -1) targetStack.splice(index, 1);
  }
}

export const descopeAll = () => {
  targetStack = [];
}

export const gesture = (box: EventTarget, handle: any = {}) => {
  let sx: number, sy: number, st: number;
  // let isDragging = false;

  const minDist = handle?.options?.minDist || 0; // px
  const maxDuration = handle?.options?.maxDuration || 280; // ms
  const minVelocity = handle?.options?.minVelocity || 0.5; // px/ms

  // ==== HANDLERS ==== //
  const onDown:any = (e: PointerEvent) => {
    if (handle?.beforeEvent && !handle.beforeEvent(e)) return;
    sx = e.clientX;
    sy = e.clientY;
    st = performance.now();
    if (handle.down) handle.down({ sx, sy, st, e });
    handle?.afterEvent && handle.afterEvent(e);
  };

  const onMove:any = (e: PointerEvent) => {
    if (handle?.beforeEvent && !handle.beforeEvent(e)) return;
    
    const dx = e.clientX - sx;
    const dy = e.clientY - sy;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);

    // normal up
    let d: "left" | "right" | "up" | "down" | undefined;
    if (absX >= 0 || absY >= 0) {
      if (absX > absY) {
        d = dx > 0 ? "right" : "left";
      } else {
        d = dy > 0 ? "down" : "up";
      }
    }

    if (handle.move) {
      handle.move({
        d,
        ex: e.clientX,
        ey: e.clientY,
        e,
        sx,
        sy,
        dx,
        dy,
      });
    }

    handle?.afterEvent && handle.afterEvent(e);
  };

  const onUp:any = (e: PointerEvent) => {
    if (handle?.beforeEvent && !handle.beforeEvent(e)) return;

    const ex = e.clientX;
    const ey = e.clientY;
    const et = performance.now();

    const dx = ex - sx;
    const dy = ey - sy;
    const dt = et - st;

    const absX = Math.abs(dx);
    const absY = Math.abs(dy);

    // fast swipe
    if (handle.fast && dt <= maxDuration && (absX >= minDist || absY >= minDist)) {
      const vx = absX / dt;
      const vy = absY / dt;

      if (vx >= minVelocity || vy >= minVelocity) {
        let d: "left" | "right" | "up" | "down";
        if (absX > absY) {
          d = dx > 0 ? "right" : "left";
        } else {
          d = dy > 0 ? "down" : "up";
        }
        handle.fast({
          e,
          d,
          dx,
          dy,
          dt,
          vx,
          vy,
        });
        handle?.afterEvent && handle.afterEvent(e);
        return;
      }
    }

    // normal up
    let d: "left" | "right" | "up" | "down" | undefined;
    if (absX >= 0 || absY >= 0) {
      if (absX > absY) {
        d = dx > 0 ? "right" : "left";
      } else {
        d = dy > 0 ? "down" : "up";
      }
    }

    if (handle.up) {
      handle.up({
        d,
        e,
        ex,
        ey,
        sx,
        sy,
        dx,
        dy,
      });
    }

    handle?.afterEvent && handle.afterEvent(e);
  };

  const onCancel:any = (e: PointerEvent) => {
    if (handle?.beforeEvent && !handle.beforeEvent(e)) return;
    if (handle.cancel) handle.cancel();
    handle?.afterEvent && handle.afterEvent(e);
  };

  // ==== BIND EVENTS ==== //
  box.addEventListener("pointerdown", onDown);
  box.addEventListener("pointermove", onMove);
  box.addEventListener("pointerup", onUp);
  box.addEventListener("pointercancel", onCancel);

  // ==== API để cleanup ==== //
  const destroy = () => {
    box.removeEventListener("pointerdown", onDown);
    box.removeEventListener("pointermove", onMove);
    box.removeEventListener("pointerup", onUp);
    box.removeEventListener("pointercancel", onCancel);
  };

  const cancel = () => {
    // isDragging = false;
    if (handle.cancel) handle.cancel();
  }

  return {destroy, cancel};
};
