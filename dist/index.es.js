let i = [];
const m = (n, t = !1) => {
  if (i.length == 0) return !0;
  if (t) {
    let r = i[i.length - 1];
    return n.target === r || r.contains(n.target);
  }
  for (let r of i)
    if (n.target === r || r.contains(n.target))
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
  let r, c, l;
  const y = t?.options?.minDist || 0, x = t?.options?.maxDuration || 280, g = t?.options?.minVelocity || 0.5, L = (e) => {
    m(e) && (t?.beforeEvent && !t.beforeEvent(e) || (r = e.clientX, c = e.clientY, l = performance.now(), t.down && t.down({ sx: r, sy: c, st: l, e }), t?.afterEvent && t.afterEvent(e)));
  }, X = (e) => {
    if (!m(e) || t?.beforeEvent && !t.beforeEvent(e)) return;
    const f = e.clientX - r, v = e.clientY - c, E = Math.abs(f), s = Math.abs(v);
    let o;
    (E >= 0 || s >= 0) && (E > s ? o = f > 0 ? "right" : "left" : o = v > 0 ? "down" : "up"), t.move && t.move({
      d: o,
      ex: e.clientX,
      ey: e.clientY,
      e,
      sx: r,
      sy: c,
      dx: f,
      dy: v
    }), t?.afterEvent && t.afterEvent(e);
  }, Y = (e) => {
    if (!m(e) || t?.beforeEvent && !t.beforeEvent(e)) return;
    const f = e.clientX, v = e.clientY, E = performance.now(), s = f - r, o = v - c, a = E - l, u = Math.abs(s), p = Math.abs(o);
    if (t.fast && a <= x && (u >= y || p >= y)) {
      const D = u / a, M = p / a;
      if (D >= g || M >= g) {
        let w;
        u > p ? w = s > 0 ? "right" : "left" : w = o > 0 ? "down" : "up", t.fast({
          e,
          d: w,
          dx: s,
          dy: o,
          dt: a,
          vx: D,
          vy: M
        }), t?.afterEvent && t.afterEvent(e);
        return;
      }
    }
    let b;
    (u >= 0 || p >= 0) && (u > p ? b = s > 0 ? "right" : "left" : b = o > 0 ? "down" : "up"), t.up && t.up({
      d: b,
      e,
      ex: f,
      ey: v,
      sx: r,
      sy: c,
      dx: s,
      dy: o
    }), t?.afterEvent && t.afterEvent(e);
  }, k = (e) => {
    m(e) && (t?.beforeEvent && !t.beforeEvent(e) || (t.cancel && t.cancel(), t?.afterEvent && t.afterEvent(e)));
  };
  return n.addEventListener("pointerdown", L), n.addEventListener("pointermove", X), n.addEventListener("pointerup", Y), n.addEventListener("pointercancel", k), { destroy: () => {
    n.removeEventListener("pointerdown", L), n.removeEventListener("pointermove", X), n.removeEventListener("pointerup", Y), n.removeEventListener("pointercancel", k);
  }, cancel: () => {
    t.cancel && t.cancel();
  } };
};
export {
  S as gesture,
  m as isGesturable,
  C as lock,
  G as unlock,
  O as unlockAll
};
