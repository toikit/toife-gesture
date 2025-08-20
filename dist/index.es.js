let i = [];
const b = (n) => {
  if (i.length == 0) return !0;
  for (let t of i)
    if (n == t || t.contains(n))
      return !0;
  return !1;
}, G = (n) => {
  i.push(n);
}, O = (n) => {
  if (!n) i.pop();
  else {
    let t = i.indexOf(n);
    t > -1 && i.splice(t, 1);
  }
}, S = () => {
  i = [];
}, U = (n, t = {}) => {
  let s, c, w;
  const E = t?.options?.minMove || 5, L = t?.options?.minDist || 60, k = t?.options?.maxDuration || 280, M = t?.options?.minVelocity || 0.5, l = (e) => {
    b(e.target) && (t?.beforeEvent && !t.beforeEvent(e) || (s = e.clientX, c = e.clientY, w = performance.now(), t.down && t.down({ sx: s, sy: c, st: w, e }), t?.afterEvent && t.afterEvent(e)));
  }, X = (e) => {
    if (!b(e.target) || t?.beforeEvent && !t.beforeEvent(e)) return;
    const f = e.clientX - s, v = e.clientY - c, m = Math.abs(f), r = Math.abs(v);
    let o;
    (m >= E || r >= E) && (m > r ? o = f > 0 ? "right" : "left" : o = v > 0 ? "down" : "up"), t.move && t.move({
      d: o,
      ex: e.clientX,
      ey: e.clientY,
      e,
      sx: s,
      sy: c,
      dx: f,
      dy: v
    }), t?.afterEvent && t.afterEvent(e);
  }, Y = (e) => {
    if (!b(e.target) || t?.beforeEvent && !t.beforeEvent(e)) return;
    const f = e.clientX, v = e.clientY, m = performance.now(), r = f - s, o = v - c, a = m - w, p = Math.abs(r), u = Math.abs(o);
    if (t.fast && a <= k && (p >= L || u >= L)) {
      const x = p / a, V = u / a;
      if (x >= M || V >= M) {
        let g;
        p > u ? g = r > 0 ? "right" : "left" : g = o > 0 ? "down" : "up", t.fast({
          e,
          d: g,
          dx: r,
          dy: o,
          dt: a,
          vx: x,
          vy: V
        }), t?.afterEvent && t.afterEvent(e);
        return;
      }
    }
    let y;
    (p >= E || u >= E) && (p > u ? y = r > 0 ? "right" : "left" : y = o > 0 ? "down" : "up"), t.up && t.up({
      d: y,
      e,
      ex: f,
      ey: v,
      sx: s,
      sy: c,
      dx: r,
      dy: o
    }), t?.afterEvent && t.afterEvent(e);
  }, D = (e) => {
    b(e.target) && (t?.beforeEvent && !t.beforeEvent(e) || (t.cancel && t.cancel(), t?.afterEvent && t.afterEvent(e)));
  };
  return n.addEventListener("pointerdown", l), n.addEventListener("pointermove", X), n.addEventListener("pointerup", Y), n.addEventListener("pointercancel", D), { destroy: () => {
    n.removeEventListener("pointerdown", l), n.removeEventListener("pointermove", X), n.removeEventListener("pointerup", Y), n.removeEventListener("pointercancel", D);
  }, cancel: () => {
    t.cancel && t.cancel();
  } };
};
export {
  O as descope,
  S as descopeAll,
  U as gesture,
  b as isGesturable,
  G as scope
};
