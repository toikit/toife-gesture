let s = [];
const A = (n) => {
  if (s.length == 0) return !0;
  for (let t of s)
    if (n == t || t.contains(n))
      return !0;
  return !1;
}, C = (n) => {
  s.push(n);
}, G = (n) => {
  if (!n) s.pop();
  else {
    let t = s.indexOf(n);
    t > -1 && s.splice(t, 1);
  }
}, O = () => {
  s = [];
}, S = (n, t = {}) => {
  let i, c, a;
  const y = t?.options?.minDist || 0, x = t?.options?.maxDuration || 280, L = t?.options?.minVelocity || 0.5, l = (e) => {
    t?.beforeEvent && !t.beforeEvent(e) || (i = e.clientX, c = e.clientY, a = performance.now(), t.down && t.down({ sx: i, sy: c, st: a, e }), t?.afterEvent && t.afterEvent(e));
  }, X = (e) => {
    if (t?.beforeEvent && !t.beforeEvent(e)) return;
    const f = e.clientX - i, v = e.clientY - c, u = Math.abs(f), r = Math.abs(v);
    let o;
    (u >= 0 || r >= 0) && (u > r ? o = f > 0 ? "right" : "left" : o = v > 0 ? "down" : "up"), t.move && t.move({
      d: o,
      ex: e.clientX,
      ey: e.clientY,
      e,
      sx: i,
      sy: c,
      dx: f,
      dy: v
    }), t?.afterEvent && t.afterEvent(e);
  }, Y = (e) => {
    if (t?.beforeEvent && !t.beforeEvent(e)) return;
    const f = e.clientX, v = e.clientY, u = performance.now(), r = f - i, o = v - c, m = u - a, p = Math.abs(r), E = Math.abs(o);
    if (t.fast && m <= x && (p >= y || E >= y)) {
      const M = p / m, g = E / m;
      if (M >= L || g >= L) {
        let w;
        p > E ? w = r > 0 ? "right" : "left" : w = o > 0 ? "down" : "up", t.fast({
          e,
          d: w,
          dx: r,
          dy: o,
          dt: m,
          vx: M,
          vy: g
        }), t?.afterEvent && t.afterEvent(e);
        return;
      }
    }
    let b;
    (p >= 0 || E >= 0) && (p > E ? b = r > 0 ? "right" : "left" : b = o > 0 ? "down" : "up"), t.up && t.up({
      d: b,
      e,
      ex: f,
      ey: v,
      sx: i,
      sy: c,
      dx: r,
      dy: o
    }), t?.afterEvent && t.afterEvent(e);
  }, D = (e) => {
    t?.beforeEvent && !t.beforeEvent(e) || (t.cancel && t.cancel(), t?.afterEvent && t.afterEvent(e));
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
  A as isGesturable,
  C as scope
};
