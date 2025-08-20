let i = [];
const m = (n) => {
  if (i.length == 0) return !0;
  for (let t of i)
    if (n == t || t.contains(n))
      return !0;
  return !1;
}, C = (n) => {
  i.push(n);
}, G = (n) => {
  if (!n) i.pop();
  else {
    let t = i.indexOf(n);
    t > -1 && i.splice(t, 1);
  }
}, O = () => {
  i = [];
}, S = (n, t = {}) => {
  let s, c, b;
  const g = t?.options?.minDist || 0, V = t?.options?.maxDuration || 280, L = t?.options?.minVelocity || 0.5, l = (e) => {
    m(e.target) && (t?.beforeEvent && !t.beforeEvent(e) || (s = e.clientX, c = e.clientY, b = performance.now(), t.down && t.down({ sx: s, sy: c, st: b, e }), t?.afterEvent && t.afterEvent(e)));
  }, X = (e) => {
    if (!m(e.target) || t?.beforeEvent && !t.beforeEvent(e)) return;
    const f = e.clientX - s, v = e.clientY - c, E = Math.abs(f), o = Math.abs(v);
    let r;
    (E >= 0 || o >= 0) && (E > o ? r = f > 0 ? "right" : "left" : r = v > 0 ? "down" : "up"), t.move && t.move({
      d: r,
      ex: e.clientX,
      ey: e.clientY,
      e,
      sx: s,
      sy: c,
      dx: f,
      dy: v
    }), t?.afterEvent && t.afterEvent(e);
  }, Y = (e) => {
    if (!m(e.target) || t?.beforeEvent && !t.beforeEvent(e)) return;
    const f = e.clientX, v = e.clientY, E = performance.now(), o = f - s, r = v - c, a = E - b, p = Math.abs(o), u = Math.abs(r);
    if (t.fast && a <= V && (p >= g || u >= g)) {
      const M = p / a, x = u / a;
      if (M >= L || x >= L) {
        let y;
        p > u ? y = o > 0 ? "right" : "left" : y = r > 0 ? "down" : "up", t.fast({
          e,
          d: y,
          dx: o,
          dy: r,
          dt: a,
          vx: M,
          vy: x
        }), t?.afterEvent && t.afterEvent(e);
        return;
      }
    }
    let w;
    (p >= 0 || u >= 0) && (p > u ? w = o > 0 ? "right" : "left" : w = r > 0 ? "down" : "up"), t.up && t.up({
      d: w,
      e,
      ex: f,
      ey: v,
      sx: s,
      sy: c,
      dx: o,
      dy: r
    }), t?.afterEvent && t.afterEvent(e);
  }, D = (e) => {
    m(e.target) && (t?.beforeEvent && !t.beforeEvent(e) || (t.cancel && t.cancel(), t?.afterEvent && t.afterEvent(e)));
  };
  return n.addEventListener("pointerdown", l), n.addEventListener("pointermove", X), n.addEventListener("pointerup", Y), n.addEventListener("pointercancel", D), { destroy: () => {
    n.removeEventListener("pointerdown", l), n.removeEventListener("pointermove", X), n.removeEventListener("pointerup", Y), n.removeEventListener("pointercancel", D);
  }, cancel: () => {
    t.cancel && t.cancel();
  } };
};
export {
  G as descope,
  O as descopeAll,
  S as gesture,
  m as isGesturable,
  C as scope
};
