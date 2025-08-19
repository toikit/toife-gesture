let s = [];
const A = (n, t = !1) => {
  if (s.length == 0) return !0;
  if (t) {
    let o = s[s.length - 1];
    return n === o || o.contains(n);
  }
  for (let o of s)
    if (n === o || o.contains(n))
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
  let o, c, a;
  const w = t?.options?.minDist || 0, g = t?.options?.maxDuration || 280, y = t?.options?.minVelocity || 0.5, L = (e) => {
    t?.beforeEvent && !t.beforeEvent(e) || (o = e.clientX, c = e.clientY, a = performance.now(), t.down && t.down({ sx: o, sy: c, st: a, e }), t?.afterEvent && t.afterEvent(e));
  }, X = (e) => {
    if (t?.beforeEvent && !t.beforeEvent(e)) return;
    const f = e.clientX - o, v = e.clientY - c, u = Math.abs(f), i = Math.abs(v);
    let r;
    (u >= 0 || i >= 0) && (u > i ? r = f > 0 ? "right" : "left" : r = v > 0 ? "down" : "up"), t.move && t.move({
      d: r,
      ex: e.clientX,
      ey: e.clientY,
      e,
      sx: o,
      sy: c,
      dx: f,
      dy: v
    }), t?.afterEvent && t.afterEvent(e);
  }, Y = (e) => {
    if (t?.beforeEvent && !t.beforeEvent(e)) return;
    const f = e.clientX, v = e.clientY, u = performance.now(), i = f - o, r = v - c, m = u - a, p = Math.abs(i), E = Math.abs(r);
    if (t.fast && m <= g && (p >= w || E >= w)) {
      const M = p / m, x = E / m;
      if (M >= y || x >= y) {
        let b;
        p > E ? b = i > 0 ? "right" : "left" : b = r > 0 ? "down" : "up", t.fast({
          e,
          d: b,
          dx: i,
          dy: r,
          dt: m,
          vx: M,
          vy: x
        }), t?.afterEvent && t.afterEvent(e);
        return;
      }
    }
    let l;
    (p >= 0 || E >= 0) && (p > E ? l = i > 0 ? "right" : "left" : l = r > 0 ? "down" : "up"), t.up && t.up({
      d: l,
      e,
      ex: f,
      ey: v,
      sx: o,
      sy: c,
      dx: i,
      dy: r
    }), t?.afterEvent && t.afterEvent(e);
  }, D = (e) => {
    t?.beforeEvent && !t.beforeEvent(e) || (t.cancel && t.cancel(), t?.afterEvent && t.afterEvent(e));
  };
  return n.addEventListener("pointerdown", L), n.addEventListener("pointermove", X), n.addEventListener("pointerup", Y), n.addEventListener("pointercancel", D), { destroy: () => {
    n.removeEventListener("pointerdown", L), n.removeEventListener("pointermove", X), n.removeEventListener("pointerup", Y), n.removeEventListener("pointercancel", D);
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
