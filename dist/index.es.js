const j = (o, t = {}) => {
  let i, s, a;
  const p = t?.options?.minMove || 5, b = t?.options?.minDist || 60, V = t?.options?.maxDuration || 280, L = t?.options?.minVelocity || 0.5, M = (e) => {
    t?.beforeEvent && !t.beforeEvent(e) || (i = e.clientX, s = e.clientY, a = performance.now(), t.down && t.down({ sx: i, sy: s, st: a, e }), t?.afterEvent && t.afterEvent(e));
  }, X = (e) => {
    if (t?.beforeEvent && !t.beforeEvent(e)) return;
    const c = e.clientX - i, f = e.clientY - s, m = Math.abs(c), r = Math.abs(f);
    let n;
    (m >= p || r >= p) && (m > r ? n = c > 0 ? "right" : "left" : n = f > 0 ? "down" : "up"), t.move && t.move({
      d: n,
      ex: e.clientX,
      ey: e.clientY,
      e,
      sx: i,
      sy: s,
      dx: c,
      dy: f
    }), t?.afterEvent && t.afterEvent(e);
  }, Y = (e) => {
    if (t?.beforeEvent && !t.beforeEvent(e)) return;
    const c = e.clientX, f = e.clientY, m = performance.now(), r = c - i, n = f - s, u = m - a, v = Math.abs(r), E = Math.abs(n);
    if (t.fast && u <= V && (v >= b || E >= b)) {
      const g = v / u, x = E / u;
      if (g >= L || x >= L) {
        let y;
        v > E ? y = r > 0 ? "right" : "left" : y = n > 0 ? "down" : "up", t.fast({
          e,
          d: y,
          dx: r,
          dy: n,
          dt: u,
          vx: g,
          vy: x
        }), t?.afterEvent && t.afterEvent(e);
        return;
      }
    }
    let w;
    (v >= p || E >= p) && (v > E ? w = r > 0 ? "right" : "left" : w = n > 0 ? "down" : "up"), t.up && t.up({
      d: w,
      e,
      ex: c,
      ey: f,
      sx: i,
      sy: s,
      dx: r,
      dy: n
    }), t?.afterEvent && t.afterEvent(e);
  }, D = (e) => {
    t?.beforeEvent && !t.beforeEvent(e) || (t.cancel && t.cancel(), t?.afterEvent && t.afterEvent(e));
  };
  return o.addEventListener("pointerdown", M), o.addEventListener("pointermove", X), o.addEventListener("pointerup", Y), o.addEventListener("pointercancel", D), { destroy: () => {
    o.removeEventListener("pointerdown", M), o.removeEventListener("pointermove", X), o.removeEventListener("pointerup", Y), o.removeEventListener("pointercancel", D);
  }, cancel: () => {
    t.cancel && t.cancel();
  } };
};
export {
  j as gesture
};
