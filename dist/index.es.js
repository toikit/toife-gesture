let E = null;
const a = (n) => E ? n.target === E || E.contains(n.target) : !0, G = (n) => {
  E = n;
}, U = () => {
  E = null;
}, j = (n, t = {}) => {
  let i, s, b;
  const L = t?.options?.minDist || 0, x = t?.options?.maxDuration || 280, l = t?.options?.minVelocity || 0.5, g = (e) => {
    a(e) && (t?.beforeEvent && !t.beforeEvent(e) || (i = e.clientX, s = e.clientY, b = performance.now(), t.down && t.down({ sx: i, sy: s, st: b, e }), t?.afterEvent && t.afterEvent(e)));
  }, X = (e) => {
    if (!a(e) || t?.beforeEvent && !t.beforeEvent(e)) return;
    const c = e.clientX - i, f = e.clientY - s, p = Math.abs(c), o = Math.abs(f);
    let r;
    (p >= 0 || o >= 0) && (p > o ? r = c > 0 ? "right" : "left" : r = f > 0 ? "down" : "up"), t.move && t.move({
      d: r,
      ex: e.clientX,
      ey: e.clientY,
      e,
      sx: i,
      sy: s,
      dx: c,
      dy: f
    }), t?.afterEvent && t.afterEvent(e);
  }, Y = (e) => {
    if (!a(e) || t?.beforeEvent && !t.beforeEvent(e)) return;
    const c = e.clientX, f = e.clientY, p = performance.now(), o = c - i, r = f - s, m = p - b, v = Math.abs(o), u = Math.abs(r);
    if (t.fast && m <= x && (v >= L || u >= L)) {
      const M = v / m, k = u / m;
      if (M >= l || k >= l) {
        let y;
        v > u ? y = o > 0 ? "right" : "left" : y = r > 0 ? "down" : "up", t.fast({
          e,
          d: y,
          dx: o,
          dy: r,
          dt: m,
          vx: M,
          vy: k
        }), t?.afterEvent && t.afterEvent(e);
        return;
      }
    }
    let w;
    (v >= 0 || u >= 0) && (v > u ? w = o > 0 ? "right" : "left" : w = r > 0 ? "down" : "up"), t.up && t.up({
      d: w,
      e,
      ex: c,
      ey: f,
      sx: i,
      sy: s,
      dx: o,
      dy: r
    }), t?.afterEvent && t.afterEvent(e);
  }, D = (e) => {
    a(e) && (t?.beforeEvent && !t.beforeEvent(e) || (t.cancel && t.cancel(), t?.afterEvent && t.afterEvent(e)));
  };
  return n.addEventListener("pointerdown", g), n.addEventListener("pointermove", X), n.addEventListener("pointerup", Y), n.addEventListener("pointercancel", D), { destroy: () => {
    n.removeEventListener("pointerdown", g), n.removeEventListener("pointermove", X), n.removeEventListener("pointerup", Y), n.removeEventListener("pointercancel", D);
  }, cancel: () => {
    t.cancel && t.cancel();
  } };
};
export {
  j as gesture,
  a as isGesturable,
  G as lock,
  U as unlock
};
