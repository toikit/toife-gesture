const V = (o, t = {}) => {
  let i, s, m;
  const E = t?.options?.minMove || 5, b = t?.options?.minDist || 60, I = t?.options?.maxDuration || 280, L = t?.options?.minVelocity || 0.5, g = (e) => {
    e.target.setPointerCapture(e.pointerId), !(t?.beforeEvent && !t.beforeEvent(e)) && (i = e.clientX, s = e.clientY, m = performance.now(), t.down && t.down({ sx: i, sy: s, st: m, e }), t?.afterEvent && t.afterEvent(e));
  }, M = (e) => {
    if (t?.beforeEvent && !t.beforeEvent(e)) return;
    const c = e.clientX - i, f = e.clientY - s, u = Math.abs(c), r = Math.abs(f);
    let n;
    (u >= E || r >= E) && (u > r ? n = c > 0 ? "right" : "left" : n = f > 0 ? "down" : "up"), t.move && t.move({
      d: n,
      ex: e.clientX,
      ey: e.clientY,
      e,
      sx: i,
      sy: s,
      dx: c,
      dy: f
    }), t?.afterEvent && t.afterEvent(e);
  }, X = (e) => {
    if (e.target.releasePointerCapture(e.pointerId), t?.beforeEvent && !t.beforeEvent(e)) return;
    const c = e.clientX, f = e.clientY, u = performance.now(), r = c - i, n = f - s, a = u - m, v = Math.abs(r), p = Math.abs(n);
    if (t.fast && a <= I && (v >= b || p >= b)) {
      const D = v / a, C = p / a;
      if (D >= L || C >= L) {
        let y;
        v > p ? y = r > 0 ? "right" : "left" : y = n > 0 ? "down" : "up", t.fast({
          e,
          d: y,
          dx: r,
          dy: n,
          dt: a,
          vx: D,
          vy: C
        }), t?.afterEvent && t.afterEvent(e);
        return;
      }
    }
    let w;
    (v >= E || p >= E) && (v > p ? w = r > 0 ? "right" : "left" : w = n > 0 ? "down" : "up"), t.up && t.up({
      d: w,
      e,
      ex: c,
      ey: f,
      sx: i,
      sy: s,
      dx: r,
      dy: n
    }), t?.afterEvent && t.afterEvent(e);
  }, Y = (e) => {
    e.target.releasePointerCapture(e.pointerId), !(t?.beforeEvent && !t.beforeEvent(e)) && (t.cancel && t.cancel(), t?.afterEvent && t.afterEvent(e));
  };
  return o.addEventListener("pointerdown", g), o.addEventListener("pointermove", M), o.addEventListener("pointerup", X), o.addEventListener("pointercancel", Y), { destroy: () => {
    o.removeEventListener("pointerdown", g), o.removeEventListener("pointermove", M), o.removeEventListener("pointerup", X), o.removeEventListener("pointercancel", Y);
  }, cancel: () => {
    t.cancel && t.cancel();
  } };
};
export {
  V as gesture
};
