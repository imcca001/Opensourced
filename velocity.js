function Voronoi() {
    this.vertices = null, this.edges = null, this.cells = null, this.toRecycle = null, this.beachsectionJunkyard = [], this.circleEventJunkyard = [], this.vertexJunkyard = [], this.edgeJunkyard = [], this.cellJunkyard = []
}
var Delaunay;
Voronoi.prototype.reset = function() {
        if (this.beachline || (this.beachline = new this.RBTree), this.beachline.root)
            for (var e = this.beachline.getFirst(this.beachline.root); e;) this.beachsectionJunkyard.push(e), e = e.rbNext;
        this.beachline.root = null, this.circleEvents || (this.circleEvents = new this.RBTree), this.circleEvents.root = this.firstCircleEvent = null, this.vertices = [], this.edges = [], this.cells = []
    }, Voronoi.prototype.sqrt = Math.sqrt, Voronoi.prototype.abs = Math.abs, Voronoi.prototype.EpsilonThing = Voronoi.EpsilonThing = 1e-9, Voronoi.prototype.invEpsilonThing = Voronoi.invEpsilonThing = 1 / Voronoi.EpsilonThing, Voronoi.prototype.equalWithEpsilon = function(e, t) {
        return this.abs(e - t) < 1e-9
    }, Voronoi.prototype.greaterThanWithEpsilon = function(e, t) {
        return e - t > 1e-9
    }, Voronoi.prototype.greaterThanOrEqualWithEpsilon = function(e, t) {
        return t - e < 1e-9
    }, Voronoi.prototype.lessThanWithEpsilon = function(e, t) {
        return t - e > 1e-9
    }, Voronoi.prototype.lessThanOrEqualWithEpsilon = function(e, t) {
        return e - t < 1e-9
    }, Voronoi.prototype.RBTree = function() {
        this.root = null
    }, Voronoi.prototype.RBTree.prototype.rbInsertSuccessor = function(e, t) {
        var r, i, o;
        if (e) {
            if (t.rbPrevious = e, t.rbNext = e.rbNext, e.rbNext && (e.rbNext.rbPrevious = t), e.rbNext = t, e.rbRight) {
                for (e = e.rbRight; e.rbLeft;) e = e.rbLeft;
                e.rbLeft = t
            } else e.rbRight = t;
            r = e
        } else this.root ? (e = this.getFirst(this.root), t.rbPrevious = null, t.rbNext = e, e.rbPrevious = t, e.rbLeft = t, r = e) : (t.rbPrevious = t.rbNext = null, this.root = t, r = null);
        for (t.rbLeft = t.rbRight = null, t.rbParent = r, t.rbRed = !0, e = t; r && r.rbRed;) r === (i = r.rbParent).rbLeft ? (o = i.rbRight) && o.rbRed ? (r.rbRed = o.rbRed = !1, i.rbRed = !0, e = i) : (e === r.rbRight && (this.rbRotateLeft(r), r = (e = r).rbParent), r.rbRed = !1, i.rbRed = !0, this.rbRotateRight(i)) : (o = i.rbLeft) && o.rbRed ? (r.rbRed = o.rbRed = !1, i.rbRed = !0, e = i) : (e === r.rbLeft && (this.rbRotateRight(r), r = (e = r).rbParent), r.rbRed = !1, i.rbRed = !0, this.rbRotateLeft(i)), r = e.rbParent;
        this.root.rbRed = !1
    }, Voronoi.prototype.RBTree.prototype.rbRemoveNode = function(e) {
        e.rbNext && (e.rbNext.rbPrevious = e.rbPrevious), e.rbPrevious && (e.rbPrevious.rbNext = e.rbNext), e.rbNext = e.rbPrevious = null;
        var t, r, i = e.rbParent,
            o = e.rbLeft,
            n = e.rbRight;
        if (t = o ? n ? this.getFirst(n) : o : n, i ? i.rbLeft === e ? i.rbLeft = t : i.rbRight = t : this.root = t, o && n ? (r = t.rbRed, t.rbRed = e.rbRed, t.rbLeft = o, o.rbParent = t, t !== n ? (i = t.rbParent, t.rbParent = e.rbParent, e = t.rbRight, i.rbLeft = e, t.rbRight = n, n.rbParent = t) : (t.rbParent = i, i = t, e = t.rbRight)) : (r = e.rbRed, e = t), e && (e.rbParent = i), !r)
            if (e && e.rbRed) e.rbRed = !1;
            else {
                var s;
                do {
                    if (e === this.root) break;
                    if (e === i.rbLeft) {
                        if ((s = i.rbRight).rbRed && (s.rbRed = !1, i.rbRed = !0, this.rbRotateLeft(i), s = i.rbRight), s.rbLeft && s.rbLeft.rbRed || s.rbRight && s.rbRight.rbRed) {
                            s.rbRight && s.rbRight.rbRed || (s.rbLeft.rbRed = !1, s.rbRed = !0, this.rbRotateRight(s), s = i.rbRight), s.rbRed = i.rbRed, i.rbRed = s.rbRight.rbRed = !1, this.rbRotateLeft(i), e = this.root;
                            break
                        }
                    } else if ((s = i.rbLeft).rbRed && (s.rbRed = !1, i.rbRed = !0, this.rbRotateRight(i), s = i.rbLeft), s.rbLeft && s.rbLeft.rbRed || s.rbRight && s.rbRight.rbRed) {
                        s.rbLeft && s.rbLeft.rbRed || (s.rbRight.rbRed = !1, s.rbRed = !0, this.rbRotateLeft(s), s = i.rbLeft), s.rbRed = i.rbRed, i.rbRed = s.rbLeft.rbRed = !1, this.rbRotateRight(i), e = this.root;
                        break
                    }
                    s.rbRed = !0, e = i, i = i.rbParent
                } while (!e.rbRed);
                e && (e.rbRed = !1)
            }
    }, Voronoi.prototype.RBTree.prototype.rbRotateLeft = function(e) {
        var t = e,
            r = e.rbRight,
            i = t.rbParent;
        i ? i.rbLeft === t ? i.rbLeft = r : i.rbRight = r : this.root = r, r.rbParent = i, t.rbParent = r, t.rbRight = r.rbLeft, t.rbRight && (t.rbRight.rbParent = t), r.rbLeft = t
    }, Voronoi.prototype.RBTree.prototype.rbRotateRight = function(e) {
        var t = e,
            r = e.rbLeft,
            i = t.rbParent;
        i ? i.rbLeft === t ? i.rbLeft = r : i.rbRight = r : this.root = r, r.rbParent = i, t.rbParent = r, t.rbLeft = r.rbRight, t.rbLeft && (t.rbLeft.rbParent = t), r.rbRight = t
    }, Voronoi.prototype.RBTree.prototype.getFirst = function(e) {
        for (; e.rbLeft;) e = e.rbLeft;
        return e
    }, Voronoi.prototype.RBTree.prototype.getLast = function(e) {
        for (; e.rbRight;) e = e.rbRight;
        return e
    }, Voronoi.prototype.Diagram = function(e) {
        this.site = e
    }, Voronoi.prototype.Cell = function(e) {
        this.site = e, this.halfedges = [], this.closeMe = !1
    }, Voronoi.prototype.Cell.prototype.init = function(e) {
        return this.site = e, this.halfedges = [], this.closeMe = !1, this
    }, Voronoi.prototype.createCell = function(e) {
        var t = this.cellJunkyard.pop();
        return t ? t.init(e) : new this.Cell(e)
    }, Voronoi.prototype.Cell.prototype.prepareHalfedges = function() {
        for (var e, t = this.halfedges, r = t.length; r--;)(e = t[r].edge).vb && e.va || t.splice(r, 1);
        return t.sort(function(e, t) {
            return t.angle - e.angle
        }), t.length
    }, Voronoi.prototype.Cell.prototype.getNeighborIds = function() {
        for (var e, t = [], r = this.halfedges.length; r--;) null !== (e = this.halfedges[r].edge).lSite && e.lSite.voronoiId != this.site.voronoiId ? t.push(e.lSite.voronoiId) : null !== e.rSite && e.rSite.voronoiId != this.site.voronoiId && t.push(e.rSite.voronoiId);
        return t
    }, Voronoi.prototype.Cell.prototype.getBbox = function() {
        for (var e, t, r, i = this.halfedges, o = i.length, n = 1 / 0, s = 1 / 0, a = -1 / 0, c = -1 / 0; o--;)(t = (e = i[o].getStartpoint()).x) < n && (n = t), (r = e.y) < s && (s = r), t > a && (a = t), r > c && (c = r);
        return {
            x: n,
            y: s,
            width: a - n,
            height: c - s
        }
    }, Voronoi.prototype.Cell.prototype.pointIntersection = function(e, t) {
        for (var r, i, o, n, s = this.halfedges, a = s.length; a--;) {
            if (i = (r = s[a]).getStartpoint(), o = r.getEndpoint(), !(n = (t - i.y) * (o.x - i.x) - (e - i.x) * (o.y - i.y))) return 0;
            if (n > 0) return -1
        }
        return 1
    }, Voronoi.prototype.Vertex = function(e, t) {
        this.x = e, this.y = t
    }, Voronoi.prototype.Edge = function(e, t) {
        this.lSite = e, this.rSite = t, this.va = this.vb = null
    }, Voronoi.prototype.Halfedge = function(e, t, r) {
        if (this.site = t, this.edge = e, r) this.angle = Math.atan2(r.y - t.y, r.x - t.x);
        else {
            var i = e.va,
                o = e.vb;
            this.angle = e.lSite === t ? Math.atan2(o.x - i.x, i.y - o.y) : Math.atan2(i.x - o.x, o.y - i.y)
        }
    }, Voronoi.prototype.createHalfedge = function(e, t, r) {
        return new this.Halfedge(e, t, r)
    }, Voronoi.prototype.Halfedge.prototype.getStartpoint = function() {
        return this.edge.lSite === this.site ? this.edge.va : this.edge.vb
    }, Voronoi.prototype.Halfedge.prototype.getEndpoint = function() {
        return this.edge.lSite === this.site ? this.edge.vb : this.edge.va
    }, Voronoi.prototype.createVertex = function(e, t) {
        var r = this.vertexJunkyard.pop();
        return r ? (r.x = e, r.y = t) : r = new this.Vertex(e, t), this.vertices.push(r), r
    }, Voronoi.prototype.createEdge = function(e, t, r, i) {
        var o = this.edgeJunkyard.pop();
        return o ? (o.lSite = e, o.rSite = t, o.va = o.vb = null) : o = new this.Edge(e, t), this.edges.push(o), r && this.setEdgeStartpoint(o, e, t, r), i && this.setEdgeEndpoint(o, e, t, i), this.cells[e.voronoiId].halfedges.push(this.createHalfedge(o, e, t)), this.cells[t.voronoiId].halfedges.push(this.createHalfedge(o, t, e)), o
    }, Voronoi.prototype.createBorderEdge = function(e, t, r) {
        var i = this.edgeJunkyard.pop();
        return i ? (i.lSite = e, i.rSite = null) : i = new this.Edge(e, null), i.va = t, i.vb = r, this.edges.push(i), i
    }, Voronoi.prototype.setEdgeStartpoint = function(e, t, r, i) {
        e.va || e.vb ? e.lSite === r ? e.vb = i : e.va = i : (e.va = i, e.lSite = t, e.rSite = r)
    }, Voronoi.prototype.setEdgeEndpoint = function(e, t, r, i) {
        this.setEdgeStartpoint(e, r, t, i)
    }, Voronoi.prototype.Beachsection = function() {}, Voronoi.prototype.createBeachsection = function(e) {
        var t = this.beachsectionJunkyard.pop();
        return t || (t = new this.Beachsection), t.site = e, t
    }, Voronoi.prototype.leftBreakPoint = function(e, t) {
        var r = e.site,
            i = r.x,
            o = r.y,
            n = o - t;
        if (!n) return i;
        var s = e.rbPrevious;
        if (!s) return -1 / 0;
        var a = (r = s.site).x,
            c = r.y,
            h = c - t;
        if (!h) return a;
        var l = a - i,
            u = 1 / n - 1 / h,
            f = l / h;
        return u ? (-f + this.sqrt(f * f - 2 * u * (l * l / (-2 * h) - c + h / 2 + o - n / 2))) / u + i : (i + a) / 2
    }, Voronoi.prototype.rightBreakPoint = function(e, t) {
        var r = e.rbNext;
        if (r) return this.leftBreakPoint(r, t);
        var i = e.site;
        return i.y === t ? i.x : 1 / 0
    }, Voronoi.prototype.detachBeachsection = function(e) {
        this.detachCircleEvent(e), this.beachline.rbRemoveNode(e), this.beachsectionJunkyard.push(e)
    }, Voronoi.prototype.removeBeachsection = function(e) {
        var t = e.circleEvent,
            r = t.x,
            i = t.ycenter,
            o = this.createVertex(r, i),
            n = e.rbPrevious,
            s = e.rbNext,
            a = [e],
            c = Math.abs;
        this.detachBeachsection(e);
        for (var h = n; h.circleEvent && c(r - h.circleEvent.x) < 1e-9 && c(i - h.circleEvent.ycenter) < 1e-9;) n = h.rbPrevious, a.unshift(h), this.detachBeachsection(h), h = n;
        a.unshift(h), this.detachCircleEvent(h);
        for (var l = s; l.circleEvent && c(r - l.circleEvent.x) < 1e-9 && c(i - l.circleEvent.ycenter) < 1e-9;) s = l.rbNext, a.push(l), this.detachBeachsection(l), l = s;
        a.push(l), this.detachCircleEvent(l);
        var u, f = a.length;
        for (u = 1; u < f; u++) l = a[u], h = a[u - 1], this.setEdgeStartpoint(l.edge, h.site, l.site, o);
        h = a[0], (l = a[f - 1]).edge = this.createEdge(h.site, l.site, void 0, o), this.attachCircleEvent(h), this.attachCircleEvent(l)
    }, Voronoi.prototype.addBeachsection = function(e) {
        for (var t, r, i, o, n = e.x, s = e.y, a = this.beachline.root; a;)
            if ((i = this.leftBreakPoint(a, s) - n) > 1e-9) a = a.rbLeft;
            else {
                if (!((o = n - this.rightBreakPoint(a, s)) > 1e-9)) {
                    i > -1e-9 ? (t = a.rbPrevious, r = a) : o > -1e-9 ? (t = a, r = a.rbNext) : t = r = a;
                    break
                }
                if (!a.rbRight) {
                    t = a;
                    break
                }
                a = a.rbRight
            } var c = this.createBeachsection(e);
        if (this.beachline.rbInsertSuccessor(t, c), t || r) {
            if (t === r) return this.detachCircleEvent(t), r = this.createBeachsection(t.site), this.beachline.rbInsertSuccessor(c, r), c.edge = r.edge = this.createEdge(t.site, c.site), this.attachCircleEvent(t), void this.attachCircleEvent(r);
            if (!t || r) {
                if (t !== r) {
                    this.detachCircleEvent(t), this.detachCircleEvent(r);
                    var h = t.site,
                        l = h.x,
                        u = h.y,
                        f = e.x - l,
                        p = e.y - u,
                        d = r.site,
                        b = d.x - l,
                        g = d.y - u,
                        y = 2 * (f * g - p * b),
                        v = f * f + p * p,
                        x = b * b + g * g,
                        R = this.createVertex((g * v - p * x) / y + l, (f * x - b * v) / y + u);
                    return this.setEdgeStartpoint(r.edge, h, d, R), c.edge = this.createEdge(h, e, void 0, R), r.edge = this.createEdge(e, d, void 0, R), this.attachCircleEvent(t), void this.attachCircleEvent(r)
                }
            } else c.edge = this.createEdge(t.site, c.site)
        }
    }, Voronoi.prototype.CircleEvent = function() {
        this.arc = null, this.rbLeft = null, this.rbNext = null, this.rbParent = null, this.rbPrevious = null, this.rbRed = !1, this.rbRight = null, this.site = null, this.x = this.y = this.ycenter = 0
    }, Voronoi.prototype.attachCircleEvent = function(e) {
        var t = e.rbPrevious,
            r = e.rbNext;
        if (t && r) {
            var i = t.site,
                o = e.site,
                n = r.site;
            if (i !== n) {
                var s = o.x,
                    a = o.y,
                    c = i.x - s,
                    h = i.y - a,
                    l = n.x - s,
                    u = n.y - a,
                    f = 2 * (c * u - h * l);
                if (!(f >= -2e-12)) {
                    var p = c * c + h * h,
                        d = l * l + u * u,
                        b = (u * p - h * d) / f,
                        g = (c * d - l * p) / f,
                        y = g + a,
                        v = this.circleEventJunkyard.pop();
                    v || (v = new this.CircleEvent), v.arc = e, v.site = o, v.x = b + s, v.y = y + this.sqrt(b * b + g * g), v.ycenter = y, e.circleEvent = v;
                    for (var x = null, R = this.circleEvents.root; R;)
                        if (v.y < R.y || v.y === R.y && v.x <= R.x) {
                            if (!R.rbLeft) {
                                x = R.rbPrevious;
                                break
                            }
                            R = R.rbLeft
                        } else {
                            if (!R.rbRight) {
                                x = R;
                                break
                            }
                            R = R.rbRight
                        } this.circleEvents.rbInsertSuccessor(x, v), x || (this.firstCircleEvent = v)
                }
            }
        }
    }, Voronoi.prototype.detachCircleEvent = function(e) {
        var t = e.circleEvent;
        t && (t.rbPrevious || (this.firstCircleEvent = t.rbNext), this.circleEvents.rbRemoveNode(t), this.circleEventJunkyard.push(t), e.circleEvent = null)
    }, Voronoi.prototype.connectEdge = function(e, t) {
        var r = e.vb;
        if (r) return !0;
        var i, o, n = e.va,
            s = t.xl,
            a = t.xr,
            c = t.yt,
            h = t.yb,
            l = e.lSite,
            u = e.rSite,
            f = l.x,
            p = l.y,
            d = u.x,
            b = u.y,
            g = (f + d) / 2,
            y = (p + b) / 2;
        if (this.cells[l.voronoiId].closeMe = !0, this.cells[u.voronoiId].closeMe = !0, b !== p && (o = y - (i = (f - d) / (b - p)) * g), void 0 === i) {
            if (g < s || g >= a) return !1;
            if (f > d) {
                if (!n || n.y < c) n = this.createVertex(g, c);
                else if (n.y >= h) return !1;
                r = this.createVertex(g, h)
            } else {
                if (!n || n.y > h) n = this.createVertex(g, h);
                else if (n.y < c) return !1;
                r = this.createVertex(g, c)
            }
        } else if (i < -1 || i > 1)
            if (f > d) {
                if (!n || n.y < c) n = this.createVertex((c - o) / i, c);
                else if (n.y >= h) return !1;
                r = this.createVertex((h - o) / i, h)
            } else {
                if (!n || n.y > h) n = this.createVertex((h - o) / i, h);
                else if (n.y < c) return !1;
                r = this.createVertex((c - o) / i, c)
            }
        else if (p < b) {
            if (!n || n.x < s) n = this.createVertex(s, i * s + o);
            else if (n.x >= a) return !1;
            r = this.createVertex(a, i * a + o)
        } else {
            if (!n || n.x > a) n = this.createVertex(a, i * a + o);
            else if (n.x < s) return !1;
            r = this.createVertex(s, i * s + o)
        }
        return e.va = n, e.vb = r, !0
    }, Voronoi.prototype.clipEdge = function(e, t) {
        var r = e.va.x,
            i = e.va.y,
            o = 0,
            n = 1,
            s = e.vb.x - r,
            a = e.vb.y - i,
            c = r - t.xl;
        if (0 === s && c < 0) return !1;
        var h = -c / s;
        if (s < 0) {
            if (h < o) return !1;
            h < n && (n = h)
        } else if (s > 0) {
            if (h > n) return !1;
            h > o && (o = h)
        }
        if (c = t.xr - r, 0 === s && c < 0) return !1;
        if (h = c / s, s < 0) {
            if (h > n) return !1;
            h > o && (o = h)
        } else if (s > 0) {
            if (h < o) return !1;
            h < n && (n = h)
        }
        if (c = i - t.yt, 0 === a && c < 0) return !1;
        if (h = -c / a, a < 0) {
            if (h < o) return !1;
            h < n && (n = h)
        } else if (a > 0) {
            if (h > n) return !1;
            h > o && (o = h)
        }
        if (c = t.yb - i, 0 === a && c < 0) return !1;
        if (h = c / a, a < 0) {
            if (h > n) return !1;
            h > o && (o = h)
        } else if (a > 0) {
            if (h < o) return !1;
            h < n && (n = h)
        }
        return o > 0 && (e.va = this.createVertex(r + o * s, i + o * a)), n < 1 && (e.vb = this.createVertex(r + n * s, i + n * a)), (o > 0 || n < 1) && (this.cells[e.lSite.voronoiId].closeMe = !0, this.cells[e.rSite.voronoiId].closeMe = !0), !0
    }, Voronoi.prototype.clipEdges = function(e) {
        for (var t, r = this.edges, i = r.length, o = Math.abs; i--;) t = r[i], (!this.connectEdge(t, e) || !this.clipEdge(t, e) || o(t.va.x - t.vb.x) < 1e-9 && o(t.va.y - t.vb.y) < 1e-9) && (t.va = t.vb = null, r.splice(i, 1))
    }, Voronoi.prototype.closeCells = function(e) {
        for (var t, r, i, o, n, s, a, c, h, l = e.xl, u = e.xr, f = e.yt, p = e.yb, d = this.cells, b = d.length, g = Math.abs; b--;)
            if ((t = d[b]).prepareHalfedges() && t.closeMe) {
                for (o = (i = t.halfedges).length, r = 0; r < o;) {
                    if (s = i[r].getEndpoint(), c = i[(r + 1) % o].getStartpoint(), g(s.x - c.x) >= 1e-9 || g(s.y - c.y) >= 1e-9) switch (!0) {
                        case this.equalWithEpsilon(s.x, l) && this.lessThanWithEpsilon(s.y, p):
                            if (h = this.equalWithEpsilon(c.x, l), a = this.createVertex(l, h ? c.y : p), n = this.createBorderEdge(t.site, s, a), r++, i.splice(r, 0, this.createHalfedge(n, t.site, null)), o++, h) break;
                            s = a;
                        case this.equalWithEpsilon(s.y, p) && this.lessThanWithEpsilon(s.x, u):
                            if (h = this.equalWithEpsilon(c.y, p), a = this.createVertex(h ? c.x : u, p), n = this.createBorderEdge(t.site, s, a), r++, i.splice(r, 0, this.createHalfedge(n, t.site, null)), o++, h) break;
                            s = a;
                        case this.equalWithEpsilon(s.x, u) && this.greaterThanWithEpsilon(s.y, f):
                            if (h = this.equalWithEpsilon(c.x, u), a = this.createVertex(u, h ? c.y : f), n = this.createBorderEdge(t.site, s, a), r++, i.splice(r, 0, this.createHalfedge(n, t.site, null)), o++, h) break;
                            s = a;
                        case this.equalWithEpsilon(s.y, f) && this.greaterThanWithEpsilon(s.x, l):
                            if (h = this.equalWithEpsilon(c.y, f), a = this.createVertex(h ? c.x : l, f), n = this.createBorderEdge(t.site, s, a), r++, i.splice(r, 0, this.createHalfedge(n, t.site, null)), o++, h) break;
                            if (s = a, h = this.equalWithEpsilon(c.x, l), a = this.createVertex(l, h ? c.y : p), n = this.createBorderEdge(t.site, s, a), r++, i.splice(r, 0, this.createHalfedge(n, t.site, null)), o++, h) break;
                            if (s = a, h = this.equalWithEpsilon(c.y, p), a = this.createVertex(h ? c.x : u, p), n = this.createBorderEdge(t.site, s, a), r++, i.splice(r, 0, this.createHalfedge(n, t.site, null)), o++, h) break;
                            if (s = a, h = this.equalWithEpsilon(c.x, u), a = this.createVertex(u, h ? c.y : f), n = this.createBorderEdge(t.site, s, a), r++, i.splice(r, 0, this.createHalfedge(n, t.site, null)), o++, h) break;
                        default:
                            throw "Voronoi.closeCells() > this makes no sense!"
                    }
                    r++
                }
                t.closeMe = !1
            }
    }, Voronoi.prototype.quantizeSites = function(e) {
        for (var t, r = this.EpsilonThing, i = e.length; i--;)(t = e[i]).x = Math.floor(t.x / r) * r, t.y = Math.floor(t.y / r) * r
    }, Voronoi.prototype.recycle = function(e) {
        if (e) {
            if (!(e instanceof this.Diagram)) throw "Voronoi.recycleDiagram() > Need a Diagram object.";
            this.toRecycle = e
        }
    }, Voronoi.prototype.compute = function(e, t) {
        var r = new Date;
        this.reset(), this.toRecycle && (this.vertexJunkyard = this.vertexJunkyard.concat(this.toRecycle.vertices), this.edgeJunkyard = this.edgeJunkyard.concat(this.toRecycle.edges), this.cellJunkyard = this.cellJunkyard.concat(this.toRecycle.cells), this.toRecycle = null);
        var i = e.slice(0);
        i.sort(function(e, t) {
            var r = t.y - e.y;
            return r || t.x - e.x
        });
        for (var o, n, s, a = i.pop(), c = 0, h = this.cells;;)
            if (s = this.firstCircleEvent, a && (!s || a.y < s.y || a.y === s.y && a.x < s.x)) a.x === o && a.y === n || (h[c] = this.createCell(a), a.voronoiId = c++, this.addBeachsection(a), n = a.y, o = a.x), a = i.pop();
            else {
                if (!s) break;
                this.removeBeachsection(s.arc)
            } this.clipEdges(t), this.closeCells(t);
        var l = new Date,
            u = new this.Diagram;
        return u.cells = this.cells, u.edges = this.edges, u.vertices = this.vertices, u.execTime = l.getTime() - r.getTime(), this.reset(), u
    },
    function() {
        "use strict";

        function e(e, t, i, o) {
            var n, s, a, c, h, l, u, f, p, d, b = e[t][0],
                g = e[t][1],
                y = e[i][0],
                v = e[i][1],
                x = e[o][0],
                R = e[o][1],
                _ = Math.abs(g - v),
                E = Math.abs(v - R);
            if (_ < r && E < r) throw new Error("Eek! Coincident points!");
            return _ < r ? s = (c = -(x - y) / (R - v)) * ((n = (y + b) / 2) - (l = (y + x) / 2)) + (f = (v + R) / 2) : E < r ? s = (a = -(y - b) / (v - g)) * ((n = (x + y) / 2) - (h = (b + y) / 2)) + (u = (g + v) / 2) : (n = ((a = -(y - b) / (v - g)) * (h = (b + y) / 2) - (c = -(x - y) / (R - v)) * (l = (y + x) / 2) + (f = (v + R) / 2) - (u = (g + v) / 2)) / (a - c), s = _ > E ? a * (n - h) + u : c * (n - l) + f), {
                i: t,
                j: i,
                k: o,
                x: n,
                y: s,
                r: (p = y - n) * p + (d = v - s) * d
            }
        }

        function t(e) {
            var t, r, i, o, n, s;
            for (r = e.length; r;)
                for (o = e[--r], i = e[--r], t = r; t;)
                    if (s = e[--t], i === (n = e[--t]) && o === s || i === s && o === n) {
                        e.splice(r, 2), e.splice(t, 2);
                        break
                    }
        }
        var r = 1 / 1048576;
        Delaunay = {
            triangulate: function(i, o) {
                var n, s, a, c, h, l, u, f, p, d, b, g, y = i.length;
                if (y < 3) return [];
                if (i = i.slice(0), o)
                    for (n = y; n--;) i[n] = i[n][o];
                for (a = new Array(y), n = y; n--;) a[n] = n;
                for (a.sort(function(e, t) {
                        return i[t][0] - i[e][0]
                    }), c = function(e) {
                        var t, r, i, o, n, s, a = Number.POSITIVE_INFINITY,
                            c = Number.POSITIVE_INFINITY,
                            h = Number.NEGATIVE_INFINITY,
                            l = Number.NEGATIVE_INFINITY;
                        for (t = e.length; t--;) e[t][0] < a && (a = e[t][0]), e[t][0] > h && (h = e[t][0]), e[t][1] < c && (c = e[t][1]), e[t][1] > l && (l = e[t][1]);
                        return i = l - c, [
                            [(n = a + .5 * (r = h - a)) - 20 * (o = Math.max(r, i)), (s = c + .5 * i) - o],
                            [n, s + 20 * o],
                            [n + 20 * o, s - o]
                        ]
                    }(i), i.push(c[0], c[1], c[2]), h = [e(i, y + 0, y + 1, y + 2)], l = [], u = [], n = a.length; n--; u.length = 0) {
                    for (g = a[n], s = h.length; s--;)(f = i[g][0] - h[s].x) > 0 && f * f > h[s].r ? (l.push(h[s]), h.splice(s, 1)) : f * f + (p = i[g][1] - h[s].y) * p - h[s].r > r || (u.push(h[s].i, h[s].j, h[s].j, h[s].k, h[s].k, h[s].i), h.splice(s, 1));
                    for (t(u), s = u.length; s;) b = u[--s], d = u[--s], h.push(e(i, d, b, g))
                }
                for (n = h.length; n--;) l.push(h[n]);
                for (h.length = 0, n = l.length; n--;) l[n].i < y && l[n].j < y && l[n].k < y && h.push(l[n].i, l[n].j, l[n].k);
                return h
            },
            contains: function(e, t) {
                if (t[0] < e[0][0] && t[0] < e[1][0] && t[0] < e[2][0] || t[0] > e[0][0] && t[0] > e[1][0] && t[0] > e[2][0] || t[1] < e[0][1] && t[1] < e[1][1] && t[1] < e[2][1] || t[1] > e[0][1] && t[1] > e[1][1] && t[1] > e[2][1]) return null;
                var r = e[1][0] - e[0][0],
                    i = e[2][0] - e[0][0],
                    o = e[1][1] - e[0][1],
                    n = e[2][1] - e[0][1],
                    s = r * n - i * o;
                if (0 === s) return null;
                var a = (n * (t[0] - e[0][0]) - i * (t[1] - e[0][1])) / s,
                    c = (r * (t[1] - e[0][1]) - o * (t[0] - e[0][0])) / s;
                return a < 0 || c < 0 || a + c > 1 ? null : [a, c]
            }
        }, "undefined" != typeof module && (module.exports = Delaunay)
    }(),
    function(e) {
        if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
        else if ("function" == typeof define && define.amd) define([], e);
        else {
            ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).Particles = e()
        }
    }(function() {
        return function e(t, r, i) {
            function o(s, a) {
                if (!r[s]) {
                    if (!t[s]) {
                        var c = "function" == typeof require && require;
                        if (!a && c) return c(s, !0);
                        if (n) return n(s, !0);
                        var h = new Error("Cannot find module '" + s + "'");
                        throw h.code = "MODULE_NOT_FOUND", h
                    }
                    var l = r[s] = {
                        exports: {}
                    };
                    t[s][0].call(l.exports, function(e) {
                        var r = t[s][1][e];
                        return o(r || e)
                    }, l, l.exports, e, t, r, i)
                }
                return r[s].exports
            }
            for (var n = "function" == typeof require && require, s = 0; s < i.length; s++) o(i[s]);
            return o
        }({
            1: [function(e, t, r) {
                e("../../modules/es6.string.iterator"), e("../../modules/es6.array.from"), t.exports = e("../../modules/_core").Array.from
            }, {
                "../../modules/_core": 8,
                "../../modules/es6.array.from": 55,
                "../../modules/es6.string.iterator": 57
            }],
            2: [function(e, t, r) {
                e("../../modules/es6.object.assign"), t.exports = e("../../modules/_core").Object.assign
            }, {
                "../../modules/_core": 8,
                "../../modules/es6.object.assign": 56
            }],
            3: [function(e, t, r) {
                t.exports = function(e) {
                    if ("function" != typeof e) throw TypeError(e + " is not a function!");
                    return e
                }
            }, {}],
            4: [function(e, t, r) {
                var i = e("./_is-object");
                t.exports = function(e) {
                    if (!i(e)) throw TypeError(e + " is not an object!");
                    return e
                }
            }, {
                "./_is-object": 24
            }],
            5: [function(e, t, r) {
                var i = e("./_to-iobject"),
                    o = e("./_to-length"),
                    n = e("./_to-index");
                t.exports = function(e) {
                    return function(t, r, s) {
                        var a, c = i(t),
                            h = o(c.length),
                            l = n(s, h);
                        if (e && r != r) {
                            for (; h > l;)
                                if ((a = c[l++]) != a) return !0
                        } else
                            for (; h > l; l++)
                                if ((e || l in c) && c[l] === r) return e || l || 0;
                        return !e && -1
                    }
                }
            }, {
                "./_to-index": 46,
                "./_to-iobject": 48,
                "./_to-length": 49
            }],
            6: [function(e, t, r) {
                var i = e("./_cof"),
                    o = e("./_wks")("toStringTag"),
                    n = "Arguments" == i(function() {
                        return arguments
                    }());
                t.exports = function(e) {
                    var t, r, s;
                    return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof(r = function(e, t) {
                        try {
                            return e[t]
                        } catch (e) {}
                    }(t = Object(e), o)) ? r : n ? i(t) : "Object" == (s = i(t)) && "function" == typeof t.callee ? "Arguments" : s
                }
            }, {
                "./_cof": 7,
                "./_wks": 53
            }],
            7: [function(e, t, r) {
                var i = {}.toString;
                t.exports = function(e) {
                    return i.call(e).slice(8, -1)
                }
            }, {}],
            8: [function(e, t, r) {
                var i = t.exports = {
                    version: "2.4.0"
                };
                "number" == typeof __e && (__e = i)
            }, {}],
            9: [function(e, t, r) {
                "use strict";
                var i = e("./_object-dp"),
                    o = e("./_property-desc");
                t.exports = function(e, t, r) {
                    t in e ? i.f(e, t, o(0, r)) : e[t] = r
                }
            }, {
                "./_object-dp": 33,
                "./_property-desc": 40
            }],
            10: [function(e, t, r) {
                var i = e("./_a-function");
                t.exports = function(e, t, r) {
                    if (i(e), void 0 === t) return e;
                    switch (r) {
                        case 1:
                            return function(r) {
                                return e.call(t, r)
                            };
                        case 2:
                            return function(r, i) {
                                return e.call(t, r, i)
                            };
                        case 3:
                            return function(r, i, o) {
                                return e.call(t, r, i, o)
                            }
                    }
                    return function() {
                        return e.apply(t, arguments)
                    }
                }
            }, {
                "./_a-function": 3
            }],
            11: [function(e, t, r) {
                t.exports = function(e) {
                    if (null == e) throw TypeError("Can't call method on  " + e);
                    return e
                }
            }, {}],
            12: [function(e, t, r) {
                t.exports = !e("./_fails")(function() {
                    return 7 != Object.defineProperty({}, "a", {
                        get: function() {
                            return 7
                        }
                    }).a
                })
            }, {
                "./_fails": 16
            }],
            13: [function(e, t, r) {
                var i = e("./_is-object"),
                    o = e("./_global").document,
                    n = i(o) && i(o.createElement);
                t.exports = function(e) {
                    return n ? o.createElement(e) : {}
                }
            }, {
                "./_global": 17,
                "./_is-object": 24
            }],
            14: [function(e, t, r) {
                t.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
            }, {}],
            15: [function(e, t, r) {
                var i = e("./_global"),
                    o = e("./_core"),
                    n = e("./_hide"),
                    s = e("./_redefine"),
                    a = e("./_ctx"),
                    c = function(e, t, r) {
                        var h, l, u, f, p = e & c.F,
                            d = e & c.G,
                            b = e & c.S,
                            g = e & c.P,
                            y = e & c.B,
                            v = d ? i : b ? i[t] || (i[t] = {}) : (i[t] || {}).prototype,
                            x = d ? o : o[t] || (o[t] = {}),
                            R = x.prototype || (x.prototype = {});
                        for (h in d && (r = t), r) u = ((l = !p && v && void 0 !== v[h]) ? v : r)[h], f = y && l ? a(u, i) : g && "function" == typeof u ? a(Function.call, u) : u, v && s(v, h, u, e & c.U), x[h] != u && n(x, h, f), g && R[h] != u && (R[h] = u)
                    };
                i.core = o, c.F = 1, c.G = 2, c.S = 4, c.P = 8, c.B = 16, c.W = 32, c.U = 64, c.R = 128, t.exports = c
            }, {
                "./_core": 8,
                "./_ctx": 10,
                "./_global": 17,
                "./_hide": 19,
                "./_redefine": 41
            }],
            16: [function(e, t, r) {
                t.exports = function(e) {
                    try {
                        return !!e()
                    } catch (e) {
                        return !0
                    }
                }
            }, {}],
            17: [function(e, t, r) {
                var i = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
                "number" == typeof __g && (__g = i)
            }, {}],
            18: [function(e, t, r) {
                var i = {}.hasOwnProperty;
                t.exports = function(e, t) {
                    return i.call(e, t)
                }
            }, {}],
            19: [function(e, t, r) {
                var i = e("./_object-dp"),
                    o = e("./_property-desc");
                t.exports = e("./_descriptors") ? function(e, t, r) {
                    return i.f(e, t, o(1, r))
                } : function(e, t, r) {
                    return e[t] = r, e
                }
            }, {
                "./_descriptors": 12,
                "./_object-dp": 33,
                "./_property-desc": 40
            }],
            20: [function(e, t, r) {
                t.exports = e("./_global").document && document.documentElement
            }, {
                "./_global": 17
            }],
            21: [function(e, t, r) {
                t.exports = !e("./_descriptors") && !e("./_fails")(function() {
                    return 7 != Object.defineProperty(e("./_dom-create")("div"), "a", {
                        get: function() {
                            return 7
                        }
                    }).a
                })
            }, {
                "./_descriptors": 12,
                "./_dom-create": 13,
                "./_fails": 16
            }],
            22: [function(e, t, r) {
                var i = e("./_cof");
                t.exports = Object("z").propertyIsEnumerable(0) ? Object : function(e) {
                    return "String" == i(e) ? e.split("") : Object(e)
                }
            }, {
                "./_cof": 7
            }],
            23: [function(e, t, r) {
                var i = e("./_iterators"),
                    o = e("./_wks")("iterator"),
                    n = Array.prototype;
                t.exports = function(e) {
                    return void 0 !== e && (i.Array === e || n[o] === e)
                }
            }, {
                "./_iterators": 29,
                "./_wks": 53
            }],
            24: [function(e, t, r) {
                t.exports = function(e) {
                    return "object" == typeof e ? null !== e : "function" == typeof e
                }
            }, {}],
            25: [function(e, t, r) {
                var i = e("./_an-object");
                t.exports = function(e, t, r, o) {
                    try {
                        return o ? t(i(r)[0], r[1]) : t(r)
                    } catch (t) {
                        var n = e.return;
                        throw void 0 !== n && i(n.call(e)), t
                    }
                }
            }, {
                "./_an-object": 4
            }],
            26: [function(e, t, r) {
                "use strict";
                var i = e("./_object-create"),
                    o = e("./_property-desc"),
                    n = e("./_set-to-string-tag"),
                    s = {};
                e("./_hide")(s, e("./_wks")("iterator"), function() {
                    return this
                }), t.exports = function(e, t, r) {
                    e.prototype = i(s, {
                        next: o(1, r)
                    }), n(e, t + " Iterator")
                }
            }, {
                "./_hide": 19,
                "./_object-create": 32,
                "./_property-desc": 40,
                "./_set-to-string-tag": 42,
                "./_wks": 53
            }],
            27: [function(e, t, r) {
                "use strict";
                var i = e("./_library"),
                    o = e("./_export"),
                    n = e("./_redefine"),
                    s = e("./_hide"),
                    a = e("./_has"),
                    c = e("./_iterators"),
                    h = e("./_iter-create"),
                    l = e("./_set-to-string-tag"),
                    u = e("./_object-gpo"),
                    f = e("./_wks")("iterator"),
                    p = !([].keys && "next" in [].keys()),
                    d = function() {
                        return this
                    };
                t.exports = function(e, t, r, b, g, y, v) {
                    h(r, t, b);
                    var x, R, _, E = function(e) {
                            if (!p && e in w) return w[e];
                            switch (e) {
                                case "keys":
                                case "values":
                                    return function() {
                                        return new r(this, e)
                                    }
                            }
                            return function() {
                                return new r(this, e)
                            }
                        },
                        m = t + " Iterator",
                        S = "values" == g,
                        P = !1,
                        w = e.prototype,
                        k = w[f] || w["@@iterator"] || g && w[g],
                        V = k || E(g),
                        j = g ? S ? E("entries") : V : void 0,
                        L = "Array" == t && w.entries || k;
                    if (L && (_ = u(L.call(new e))) !== Object.prototype && (l(_, m, !0), i || a(_, f) || s(_, f, d)), S && k && "values" !== k.name && (P = !0, V = function() {
                            return k.call(this)
                        }), i && !v || !p && !P && w[f] || s(w, f, V), c[t] = V, c[m] = d, g)
                        if (x = {
                                values: S ? V : E("values"),
                                keys: y ? V : E("keys"),
                                entries: j
                            }, v)
                            for (R in x) R in w || n(w, R, x[R]);
                        else o(o.P + o.F * (p || P), t, x);
                    return x
                }
            }, {
                "./_export": 15,
                "./_has": 18,
                "./_hide": 19,
                "./_iter-create": 26,
                "./_iterators": 29,
                "./_library": 30,
                "./_object-gpo": 36,
                "./_redefine": 41,
                "./_set-to-string-tag": 42,
                "./_wks": 53
            }],
            28: [function(e, t, r) {
                var i = e("./_wks")("iterator"),
                    o = !1;
                try {
                    var n = [7][i]();
                    n.return = function() {
                        o = !0
                    }, Array.from(n, function() {
                        throw 2
                    })
                } catch (e) {}
                t.exports = function(e, t) {
                    if (!t && !o) return !1;
                    var r = !1;
                    try {
                        var n = [7],
                            s = n[i]();
                        s.next = function() {
                            return {
                                done: r = !0
                            }
                        }, n[i] = function() {
                            return s
                        }, e(n)
                    } catch (e) {}
                    return r
                }
            }, {
                "./_wks": 53
            }],
            29: [function(e, t, r) {
                t.exports = {}
            }, {}],
            30: [function(e, t, r) {
                t.exports = !1
            }, {}],
            31: [function(e, t, r) {
                "use strict";
                var i = e("./_object-keys"),
                    o = e("./_object-gops"),
                    n = e("./_object-pie"),
                    s = e("./_to-object"),
                    a = e("./_iobject"),
                    c = Object.assign;
                t.exports = !c || e("./_fails")(function() {
                    var e = {},
                        t = {},
                        r = Symbol(),
                        i = "abcdefghijklmnopqrst";
                    return e[r] = 7, i.split("").forEach(function(e) {
                        t[e] = e
                    }), 7 != c({}, e)[r] || Object.keys(c({}, t)).join("") != i
                }) ? function(e, t) {
                    for (var r = s(e), c = arguments.length, h = 1, l = o.f, u = n.f; c > h;)
                        for (var f, p = a(arguments[h++]), d = l ? i(p).concat(l(p)) : i(p), b = d.length, g = 0; b > g;) u.call(p, f = d[g++]) && (r[f] = p[f]);
                    return r
                } : c
            }, {
                "./_fails": 16,
                "./_iobject": 22,
                "./_object-gops": 35,
                "./_object-keys": 38,
                "./_object-pie": 39,
                "./_to-object": 50
            }],
            32: [function(e, t, r) {
                var i = e("./_an-object"),
                    o = e("./_object-dps"),
                    n = e("./_enum-bug-keys"),
                    s = e("./_shared-key")("IE_PROTO"),
                    a = function() {},
                    c = function() {
                        var t, r = e("./_dom-create")("iframe"),
                            i = n.length;
                        for (r.style.display = "none", e("./_html").appendChild(r), r.src = "javascript:", (t = r.contentWindow.document).open(), t.write("<script>document.F=Object<\/script>"), t.close(), c = t.F; i--;) delete c.prototype[n[i]];
                        return c()
                    };
                t.exports = Object.create || function(e, t) {
                    var r;
                    return null !== e ? (a.prototype = i(e), r = new a, a.prototype = null, r[s] = e) : r = c(), void 0 === t ? r : o(r, t)
                }
            }, {
                "./_an-object": 4,
                "./_dom-create": 13,
                "./_enum-bug-keys": 14,
                "./_html": 20,
                "./_object-dps": 34,
                "./_shared-key": 43
            }],
            33: [function(e, t, r) {
                var i = e("./_an-object"),
                    o = e("./_ie8-dom-define"),
                    n = e("./_to-primitive"),
                    s = Object.defineProperty;
                r.f = e("./_descriptors") ? Object.defineProperty : function(e, t, r) {
                    if (i(e), t = n(t, !0), i(r), o) try {
                        return s(e, t, r)
                    } catch (e) {}
                    if ("get" in r || "set" in r) throw TypeError("Accessors not supported!");
                    return "value" in r && (e[t] = r.value), e
                }
            }, {
                "./_an-object": 4,
                "./_descriptors": 12,
                "./_ie8-dom-define": 21,
                "./_to-primitive": 51
            }],
            34: [function(e, t, r) {
                var i = e("./_object-dp"),
                    o = e("./_an-object"),
                    n = e("./_object-keys");
                t.exports = e("./_descriptors") ? Object.defineProperties : function(e, t) {
                    o(e);
                    for (var r, s = n(t), a = s.length, c = 0; a > c;) i.f(e, r = s[c++], t[r]);
                    return e
                }
            }, {
                "./_an-object": 4,
                "./_descriptors": 12,
                "./_object-dp": 33,
                "./_object-keys": 38
            }],
            35: [function(e, t, r) {
                r.f = Object.getOwnPropertySymbols
            }, {}],
            36: [function(e, t, r) {
                var i = e("./_has"),
                    o = e("./_to-object"),
                    n = e("./_shared-key")("IE_PROTO"),
                    s = Object.prototype;
                t.exports = Object.getPrototypeOf || function(e) {
                    return e = o(e), i(e, n) ? e[n] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? s : null
                }
            }, {
                "./_has": 18,
                "./_shared-key": 43,
                "./_to-object": 50
            }],
            37: [function(e, t, r) {
                var i = e("./_has"),
                    o = e("./_to-iobject"),
                    n = e("./_array-includes")(!1),
                    s = e("./_shared-key")("IE_PROTO");
                t.exports = function(e, t) {
                    var r, a = o(e),
                        c = 0,
                        h = [];
                    for (r in a) r != s && i(a, r) && h.push(r);
                    for (; t.length > c;) i(a, r = t[c++]) && (~n(h, r) || h.push(r));
                    return h
                }
            }, {
                "./_array-includes": 5,
                "./_has": 18,
                "./_shared-key": 43,
                "./_to-iobject": 48
            }],
            38: [function(e, t, r) {
                var i = e("./_object-keys-internal"),
                    o = e("./_enum-bug-keys");
                t.exports = Object.keys || function(e) {
                    return i(e, o)
                }
            }, {
                "./_enum-bug-keys": 14,
                "./_object-keys-internal": 37
            }],
            39: [function(e, t, r) {
                r.f = {}.propertyIsEnumerable
            }, {}],
            40: [function(e, t, r) {
                t.exports = function(e, t) {
                    return {
                        enumerable: !(1 & e),
                        configurable: !(2 & e),
                        writable: !(4 & e),
                        value: t
                    }
                }
            }, {}],
            41: [function(e, t, r) {
                var i = e("./_global"),
                    o = e("./_hide"),
                    n = e("./_has"),
                    s = e("./_uid")("src"),
                    a = Function.toString,
                    c = ("" + a).split("toString");
                e("./_core").inspectSource = function(e) {
                    return a.call(e)
                }, (t.exports = function(e, t, r, a) {
                    var h = "function" == typeof r;
                    h && (n(r, "name") || o(r, "name", t)), e[t] !== r && (h && (n(r, s) || o(r, s, e[t] ? "" + e[t] : c.join(String(t)))), e === i ? e[t] = r : a ? e[t] ? e[t] = r : o(e, t, r) : (delete e[t], o(e, t, r)))
                })(Function.prototype, "toString", function() {
                    return "function" == typeof this && this[s] || a.call(this)
                })
            }, {
                "./_core": 8,
                "./_global": 17,
                "./_has": 18,
                "./_hide": 19,
                "./_uid": 52
            }],
            42: [function(e, t, r) {
                var i = e("./_object-dp").f,
                    o = e("./_has"),
                    n = e("./_wks")("toStringTag");
                t.exports = function(e, t, r) {
                    e && !o(e = r ? e : e.prototype, n) && i(e, n, {
                        configurable: !0,
                        value: t
                    })
                }
            }, {
                "./_has": 18,
                "./_object-dp": 33,
                "./_wks": 53
            }],
            43: [function(e, t, r) {
                var i = e("./_shared")("keys"),
                    o = e("./_uid");
                t.exports = function(e) {
                    return i[e] || (i[e] = o(e))
                }
            }, {
                "./_shared": 44,
                "./_uid": 52
            }],
            44: [function(e, t, r) {
                var i = e("./_global"),
                    o = i["__core-js_shared__"] || (i["__core-js_shared__"] = {});
                t.exports = function(e) {
                    return o[e] || (o[e] = {})
                }
            }, {
                "./_global": 17
            }],
            45: [function(e, t, r) {
                var i = e("./_to-integer"),
                    o = e("./_defined");
                t.exports = function(e) {
                    return function(t, r) {
                        var n, s, a = String(o(t)),
                            c = i(r),
                            h = a.length;
                        return c < 0 || c >= h ? e ? "" : void 0 : (n = a.charCodeAt(c)) < 55296 || n > 56319 || c + 1 === h || (s = a.charCodeAt(c + 1)) < 56320 || s > 57343 ? e ? a.charAt(c) : n : e ? a.slice(c, c + 2) : s - 56320 + (n - 55296 << 10) + 65536
                    }
                }
            }, {
                "./_defined": 11,
                "./_to-integer": 47
            }],
            46: [function(e, t, r) {
                var i = e("./_to-integer"),
                    o = Math.max,
                    n = Math.min;
                t.exports = function(e, t) {
                    return (e = i(e)) < 0 ? o(e + t, 0) : n(e, t)
                }
            }, {
                "./_to-integer": 47
            }],
            47: [function(e, t, r) {
                var i = Math.ceil,
                    o = Math.floor;
                t.exports = function(e) {
                    return isNaN(e = +e) ? 0 : (e > 0 ? o : i)(e)
                }
            }, {}],
            48: [function(e, t, r) {
                var i = e("./_iobject"),
                    o = e("./_defined");
                t.exports = function(e) {
                    return i(o(e))
                }
            }, {
                "./_defined": 11,
                "./_iobject": 22
            }],
            49: [function(e, t, r) {
                var i = e("./_to-integer"),
                    o = Math.min;
                t.exports = function(e) {
                    return e > 0 ? o(i(e), 9007199254740991) : 0
                }
            }, {
                "./_to-integer": 47
            }],
            50: [function(e, t, r) {
                var i = e("./_defined");
                t.exports = function(e) {
                    return Object(i(e))
                }
            }, {
                "./_defined": 11
            }],
            51: [function(e, t, r) {
                var i = e("./_is-object");
                t.exports = function(e, t) {
                    if (!i(e)) return e;
                    var r, o;
                    if (t && "function" == typeof(r = e.toString) && !i(o = r.call(e))) return o;
                    if ("function" == typeof(r = e.valueOf) && !i(o = r.call(e))) return o;
                    if (!t && "function" == typeof(r = e.toString) && !i(o = r.call(e))) return o;
                    throw TypeError("Can't convert object to primitive value")
                }
            }, {
                "./_is-object": 24
            }],
            52: [function(e, t, r) {
                var i = 0,
                    o = Math.random();
                t.exports = function(e) {
                    return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++i + o).toString(36))
                }
            }, {}],
            53: [function(e, t, r) {
                var i = e("./_shared")("wks"),
                    o = e("./_uid"),
                    n = e("./_global").Symbol,
                    s = "function" == typeof n;
                (t.exports = function(e) {
                    return i[e] || (i[e] = s && n[e] || (s ? n : o)("Symbol." + e))
                }).store = i
            }, {
                "./_global": 17,
                "./_shared": 44,
                "./_uid": 52
            }],
            54: [function(e, t, r) {
                var i = e("./_classof"),
                    o = e("./_wks")("iterator"),
                    n = e("./_iterators");
                t.exports = e("./_core").getIteratorMethod = function(e) {
                    if (null != e) return e[o] || e["@@iterator"] || n[i(e)]
                }
            }, {
                "./_classof": 6,
                "./_core": 8,
                "./_iterators": 29,
                "./_wks": 53
            }],
            55: [function(e, t, r) {
                "use strict";
                var i = e("./_ctx"),
                    o = e("./_export"),
                    n = e("./_to-object"),
                    s = e("./_iter-call"),
                    a = e("./_is-array-iter"),
                    c = e("./_to-length"),
                    h = e("./_create-property"),
                    l = e("./core.get-iterator-method");
                o(o.S + o.F * !e("./_iter-detect")(function(e) {
                    Array.from(e)
                }), "Array", {
                    from: function(e) {
                        var t, r, o, u, f = n(e),
                            p = "function" == typeof this ? this : Array,
                            d = arguments.length,
                            b = d > 1 ? arguments[1] : void 0,
                            g = void 0 !== b,
                            y = 0,
                            v = l(f);
                        if (g && (b = i(b, d > 2 ? arguments[2] : void 0, 2)), null == v || p == Array && a(v))
                            for (r = new p(t = c(f.length)); t > y; y++) h(r, y, g ? b(f[y], y) : f[y]);
                        else
                            for (u = v.call(f), r = new p; !(o = u.next()).done; y++) h(r, y, g ? s(u, b, [o.value, y], !0) : o.value);
                        return r.length = y, r
                    }
                })
            }, {
                "./_create-property": 9,
                "./_ctx": 10,
                "./_export": 15,
                "./_is-array-iter": 23,
                "./_iter-call": 25,
                "./_iter-detect": 28,
                "./_to-length": 49,
                "./_to-object": 50,
                "./core.get-iterator-method": 54
            }],
            56: [function(e, t, r) {
                var i = e("./_export");
                i(i.S + i.F, "Object", {
                    assign: e("./_object-assign")
                })
            }, {
                "./_export": 15,
                "./_object-assign": 31
            }],
            57: [function(e, t, r) {
                "use strict";
                var i = e("./_string-at")(!0);
                e("./_iter-define")(String, "String", function(e) {
                    this._t = String(e), this._i = 0
                }, function() {
                    var e, t = this._t,
                        r = this._i;
                    return r >= t.length ? {
                        value: void 0,
                        done: !0
                    } : (e = i(t, r), this._i += e.length, {
                        value: e,
                        done: !1
                    })
                })
            }, {
                "./_iter-define": 27,
                "./_string-at": 45
            }],
            58: [function(e, t, r) {
                function i() {
                    this.vertices = null, this.edges = null, this.cells = null, this.toRecycle = null, this.beachsectionJunkyard = [], this.circleEventJunkyard = [], this.vertexJunkyard = [], this.edgeJunkyard = [], this.cellJunkyard = []
                }
                i.prototype.reset = function() {
                    if (this.beachline || (this.beachline = new this.RBTree), this.beachline.root)
                        for (var e = this.beachline.getFirst(this.beachline.root); e;) this.beachsectionJunkyard.push(e), e = e.rbNext;
                    this.beachline.root = null, this.circleEvents || (this.circleEvents = new this.RBTree), this.circleEvents.root = this.firstCircleEvent = null, this.vertices = [], this.edges = [], this.cells = []
                }, i.prototype.sqrt = Math.sqrt, i.prototype.abs = Math.abs, i.prototype.ε = i.ε = 1e-9, i.prototype.invε = i.invε = 1 / i.ε, i.prototype.equalWithEpsilon = function(e, t) {
                    return this.abs(e - t) < 1e-9
                }, i.prototype.greaterThanWithEpsilon = function(e, t) {
                    return e - t > 1e-9
                }, i.prototype.greaterThanOrEqualWithEpsilon = function(e, t) {
                    return t - e < 1e-9
                }, i.prototype.lessThanWithEpsilon = function(e, t) {
                    return t - e > 1e-9
                }, i.prototype.lessThanOrEqualWithEpsilon = function(e, t) {
                    return e - t < 1e-9
                }, i.prototype.RBTree = function() {
                    this.root = null
                }, i.prototype.RBTree.prototype.rbInsertSuccessor = function(e, t) {
                    var r, i, o;
                    if (e) {
                        if (t.rbPrevious = e, t.rbNext = e.rbNext, e.rbNext && (e.rbNext.rbPrevious = t), e.rbNext = t, e.rbRight) {
                            for (e = e.rbRight; e.rbLeft;) e = e.rbLeft;
                            e.rbLeft = t
                        } else e.rbRight = t;
                        r = e
                    } else this.root ? (e = this.getFirst(this.root), t.rbPrevious = null, t.rbNext = e, e.rbPrevious = t, e.rbLeft = t, r = e) : (t.rbPrevious = t.rbNext = null, this.root = t, r = null);
                    for (t.rbLeft = t.rbRight = null, t.rbParent = r, t.rbRed = !0, e = t; r && r.rbRed;) r === (i = r.rbParent).rbLeft ? (o = i.rbRight) && o.rbRed ? (r.rbRed = o.rbRed = !1, i.rbRed = !0, e = i) : (e === r.rbRight && (this.rbRotateLeft(r), r = (e = r).rbParent), r.rbRed = !1, i.rbRed = !0, this.rbRotateRight(i)) : (o = i.rbLeft) && o.rbRed ? (r.rbRed = o.rbRed = !1, i.rbRed = !0, e = i) : (e === r.rbLeft && (this.rbRotateRight(r), r = (e = r).rbParent), r.rbRed = !1, i.rbRed = !0, this.rbRotateLeft(i)), r = e.rbParent;
                    this.root.rbRed = !1
                }, i.prototype.RBTree.prototype.rbRemoveNode = function(e) {
                    e.rbNext && (e.rbNext.rbPrevious = e.rbPrevious), e.rbPrevious && (e.rbPrevious.rbNext = e.rbNext), e.rbNext = e.rbPrevious = null;
                    var t, r, i = e.rbParent,
                        o = e.rbLeft,
                        n = e.rbRight;
                    if (t = o ? n ? this.getFirst(n) : o : n, i ? i.rbLeft === e ? i.rbLeft = t : i.rbRight = t : this.root = t, o && n ? (r = t.rbRed, t.rbRed = e.rbRed, t.rbLeft = o, o.rbParent = t, t !== n ? (i = t.rbParent, t.rbParent = e.rbParent, e = t.rbRight, i.rbLeft = e, t.rbRight = n, n.rbParent = t) : (t.rbParent = i, i = t, e = t.rbRight)) : (r = e.rbRed, e = t), e && (e.rbParent = i), !r)
                        if (e && e.rbRed) e.rbRed = !1;
                        else {
                            var s;
                            do {
                                if (e === this.root) break;
                                if (e === i.rbLeft) {
                                    if ((s = i.rbRight).rbRed && (s.rbRed = !1, i.rbRed = !0, this.rbRotateLeft(i), s = i.rbRight), s.rbLeft && s.rbLeft.rbRed || s.rbRight && s.rbRight.rbRed) {
                                        s.rbRight && s.rbRight.rbRed || (s.rbLeft.rbRed = !1, s.rbRed = !0, this.rbRotateRight(s), s = i.rbRight), s.rbRed = i.rbRed, i.rbRed = s.rbRight.rbRed = !1, this.rbRotateLeft(i), e = this.root;
                                        break
                                    }
                                } else if ((s = i.rbLeft).rbRed && (s.rbRed = !1, i.rbRed = !0, this.rbRotateRight(i), s = i.rbLeft), s.rbLeft && s.rbLeft.rbRed || s.rbRight && s.rbRight.rbRed) {
                                    s.rbLeft && s.rbLeft.rbRed || (s.rbRight.rbRed = !1, s.rbRed = !0, this.rbRotateLeft(s), s = i.rbLeft), s.rbRed = i.rbRed, i.rbRed = s.rbLeft.rbRed = !1, this.rbRotateRight(i), e = this.root;
                                    break
                                }
                                s.rbRed = !0, e = i, i = i.rbParent
                            } while (!e.rbRed);
                            e && (e.rbRed = !1)
                        }
                }, i.prototype.RBTree.prototype.rbRotateLeft = function(e) {
                    var t = e,
                        r = e.rbRight,
                        i = t.rbParent;
                    i ? i.rbLeft === t ? i.rbLeft = r : i.rbRight = r : this.root = r, r.rbParent = i, t.rbParent = r, t.rbRight = r.rbLeft, t.rbRight && (t.rbRight.rbParent = t), r.rbLeft = t
                }, i.prototype.RBTree.prototype.rbRotateRight = function(e) {
                    var t = e,
                        r = e.rbLeft,
                        i = t.rbParent;
                    i ? i.rbLeft === t ? i.rbLeft = r : i.rbRight = r : this.root = r, r.rbParent = i, t.rbParent = r, t.rbLeft = r.rbRight, t.rbLeft && (t.rbLeft.rbParent = t), r.rbRight = t
                }, i.prototype.RBTree.prototype.getFirst = function(e) {
                    for (; e.rbLeft;) e = e.rbLeft;
                    return e
                }, i.prototype.RBTree.prototype.getLast = function(e) {
                    for (; e.rbRight;) e = e.rbRight;
                    return e
                }, i.prototype.Diagram = function(e) {
                    this.site = e
                }, i.prototype.Cell = function(e) {
                    this.site = e, this.halfedges = [], this.closeMe = !1
                }, i.prototype.Cell.prototype.init = function(e) {
                    return this.site = e, this.halfedges = [], this.closeMe = !1, this
                }, i.prototype.createCell = function(e) {
                    var t = this.cellJunkyard.pop();
                    return t ? t.init(e) : new this.Cell(e)
                }, i.prototype.Cell.prototype.prepareHalfedges = function() {
                    for (var e, t = this.halfedges, r = t.length; r--;)(e = t[r].edge).vb && e.va || t.splice(r, 1);
                    return t.sort(function(e, t) {
                        return t.angle - e.angle
                    }), t.length
                }, i.prototype.Cell.prototype.getNeighborIds = function() {
                    for (var e, t = [], r = this.halfedges.length; r--;) null !== (e = this.halfedges[r].edge).lSite && e.lSite.voronoiId != this.site.voronoiId ? t.push(e.lSite.voronoiId) : null !== e.rSite && e.rSite.voronoiId != this.site.voronoiId && t.push(e.rSite.voronoiId);
                    return t
                }, i.prototype.Cell.prototype.getBbox = function() {
                    for (var e, t, r, i = this.halfedges, o = i.length, n = 1 / 0, s = 1 / 0, a = -1 / 0, c = -1 / 0; o--;)(t = (e = i[o].getStartpoint()).x) < n && (n = t), (r = e.y) < s && (s = r), t > a && (a = t), r > c && (c = r);
                    return {
                        x: n,
                        y: s,
                        width: a - n,
                        height: c - s
                    }
                }, i.prototype.Cell.prototype.pointIntersection = function(e, t) {
                    for (var r, i, o, n, s = this.halfedges, a = s.length; a--;) {
                        if (i = (r = s[a]).getStartpoint(), o = r.getEndpoint(), !(n = (t - i.y) * (o.x - i.x) - (e - i.x) * (o.y - i.y))) return 0;
                        if (n > 0) return -1
                    }
                    return 1
                }, i.prototype.Vertex = function(e, t) {
                    this.x = e, this.y = t
                }, i.prototype.Edge = function(e, t) {
                    this.lSite = e, this.rSite = t, this.va = this.vb = null
                }, i.prototype.Halfedge = function(e, t, r) {
                    if (this.site = t, this.edge = e, r) this.angle = Math.atan2(r.y - t.y, r.x - t.x);
                    else {
                        var i = e.va,
                            o = e.vb;
                        this.angle = e.lSite === t ? Math.atan2(o.x - i.x, i.y - o.y) : Math.atan2(i.x - o.x, o.y - i.y)
                    }
                }, i.prototype.createHalfedge = function(e, t, r) {
                    return new this.Halfedge(e, t, r)
                }, i.prototype.Halfedge.prototype.getStartpoint = function() {
                    return this.edge.lSite === this.site ? this.edge.va : this.edge.vb
                }, i.prototype.Halfedge.prototype.getEndpoint = function() {
                    return this.edge.lSite === this.site ? this.edge.vb : this.edge.va
                }, i.prototype.createVertex = function(e, t) {
                    var r = this.vertexJunkyard.pop();
                    return r ? (r.x = e, r.y = t) : r = new this.Vertex(e, t), this.vertices.push(r), r
                }, i.prototype.createEdge = function(e, t, r, i) {
                    var o = this.edgeJunkyard.pop();
                    return o ? (o.lSite = e, o.rSite = t, o.va = o.vb = null) : o = new this.Edge(e, t), this.edges.push(o), r && this.setEdgeStartpoint(o, e, t, r), i && this.setEdgeEndpoint(o, e, t, i), this.cells[e.voronoiId].halfedges.push(this.createHalfedge(o, e, t)), this.cells[t.voronoiId].halfedges.push(this.createHalfedge(o, t, e)), o
                }, i.prototype.createBorderEdge = function(e, t, r) {
                    var i = this.edgeJunkyard.pop();
                    return i ? (i.lSite = e, i.rSite = null) : i = new this.Edge(e, null), i.va = t, i.vb = r, this.edges.push(i), i
                }, i.prototype.setEdgeStartpoint = function(e, t, r, i) {
                    e.va || e.vb ? e.lSite === r ? e.vb = i : e.va = i : (e.va = i, e.lSite = t, e.rSite = r)
                }, i.prototype.setEdgeEndpoint = function(e, t, r, i) {
                    this.setEdgeStartpoint(e, r, t, i)
                }, i.prototype.Beachsection = function() {}, i.prototype.createBeachsection = function(e) {
                    var t = this.beachsectionJunkyard.pop();
                    return t || (t = new this.Beachsection), t.site = e, t
                }, i.prototype.leftBreakPoint = function(e, t) {
                    var r = e.site,
                        i = r.x,
                        o = r.y,
                        n = o - t;
                    if (!n) return i;
                    var s = e.rbPrevious;
                    if (!s) return -1 / 0;
                    var a = (r = s.site).x,
                        c = r.y,
                        h = c - t;
                    if (!h) return a;
                    var l = a - i,
                        u = 1 / n - 1 / h,
                        f = l / h;
                    return u ? (-f + this.sqrt(f * f - 2 * u * (l * l / (-2 * h) - c + h / 2 + o - n / 2))) / u + i : (i + a) / 2
                }, i.prototype.rightBreakPoint = function(e, t) {
                    var r = e.rbNext;
                    if (r) return this.leftBreakPoint(r, t);
                    var i = e.site;
                    return i.y === t ? i.x : 1 / 0
                }, i.prototype.detachBeachsection = function(e) {
                    this.detachCircleEvent(e), this.beachline.rbRemoveNode(e), this.beachsectionJunkyard.push(e)
                }, i.prototype.removeBeachsection = function(e) {
                    var t = e.circleEvent,
                        r = t.x,
                        i = t.ycenter,
                        o = this.createVertex(r, i),
                        n = e.rbPrevious,
                        s = e.rbNext,
                        a = [e],
                        c = Math.abs;
                    this.detachBeachsection(e);
                    for (var h = n; h.circleEvent && c(r - h.circleEvent.x) < 1e-9 && c(i - h.circleEvent.ycenter) < 1e-9;) n = h.rbPrevious, a.unshift(h), this.detachBeachsection(h), h = n;
                    a.unshift(h), this.detachCircleEvent(h);
                    for (var l = s; l.circleEvent && c(r - l.circleEvent.x) < 1e-9 && c(i - l.circleEvent.ycenter) < 1e-9;) s = l.rbNext, a.push(l), this.detachBeachsection(l), l = s;
                    a.push(l), this.detachCircleEvent(l);
                    var u, f = a.length;
                    for (u = 1; u < f; u++) l = a[u], h = a[u - 1], this.setEdgeStartpoint(l.edge, h.site, l.site, o);
                    h = a[0], (l = a[f - 1]).edge = this.createEdge(h.site, l.site, void 0, o), this.attachCircleEvent(h), this.attachCircleEvent(l)
                }, i.prototype.addBeachsection = function(e) {
                    for (var t, r, i, o, n = e.x, s = e.y, a = this.beachline.root; a;)
                        if ((i = this.leftBreakPoint(a, s) - n) > 1e-9) a = a.rbLeft;
                        else {
                            if (!((o = n - this.rightBreakPoint(a, s)) > 1e-9)) {
                                i > -1e-9 ? (t = a.rbPrevious, r = a) : o > -1e-9 ? (t = a, r = a.rbNext) : t = r = a;
                                break
                            }
                            if (!a.rbRight) {
                                t = a;
                                break
                            }
                            a = a.rbRight
                        } var c = this.createBeachsection(e);
                    if (this.beachline.rbInsertSuccessor(t, c), t || r) {
                        if (t === r) return this.detachCircleEvent(t), r = this.createBeachsection(t.site), this.beachline.rbInsertSuccessor(c, r), c.edge = r.edge = this.createEdge(t.site, c.site), this.attachCircleEvent(t), void this.attachCircleEvent(r);
                        if (!t || r) {
                            if (t !== r) {
                                this.detachCircleEvent(t), this.detachCircleEvent(r);
                                var h = t.site,
                                    l = h.x,
                                    u = h.y,
                                    f = e.x - l,
                                    p = e.y - u,
                                    d = r.site,
                                    b = d.x - l,
                                    g = d.y - u,
                                    y = 2 * (f * g - p * b),
                                    v = f * f + p * p,
                                    x = b * b + g * g,
                                    R = this.createVertex((g * v - p * x) / y + l, (f * x - b * v) / y + u);
                                return this.setEdgeStartpoint(r.edge, h, d, R), c.edge = this.createEdge(h, e, void 0, R), r.edge = this.createEdge(e, d, void 0, R), this.attachCircleEvent(t), void this.attachCircleEvent(r)
                            }
                        } else c.edge = this.createEdge(t.site, c.site)
                    }
                }, i.prototype.CircleEvent = function() {
                    this.arc = null, this.rbLeft = null, this.rbNext = null, this.rbParent = null, this.rbPrevious = null, this.rbRed = !1, this.rbRight = null, this.site = null, this.x = this.y = this.ycenter = 0
                }, i.prototype.attachCircleEvent = function(e) {
                    var t = e.rbPrevious,
                        r = e.rbNext;
                    if (t && r) {
                        var i = t.site,
                            o = e.site,
                            n = r.site;
                        if (i !== n) {
                            var s = o.x,
                                a = o.y,
                                c = i.x - s,
                                h = i.y - a,
                                l = n.x - s,
                                u = n.y - a,
                                f = 2 * (c * u - h * l);
                            if (!(f >= -2e-12)) {
                                var p = c * c + h * h,
                                    d = l * l + u * u,
                                    b = (u * p - h * d) / f,
                                    g = (c * d - l * p) / f,
                                    y = g + a,
                                    v = this.circleEventJunkyard.pop();
                                v || (v = new this.CircleEvent), v.arc = e, v.site = o, v.x = b + s, v.y = y + this.sqrt(b * b + g * g), v.ycenter = y, e.circleEvent = v;
                                for (var x = null, R = this.circleEvents.root; R;)
                                    if (v.y < R.y || v.y === R.y && v.x <= R.x) {
                                        if (!R.rbLeft) {
                                            x = R.rbPrevious;
                                            break
                                        }
                                        R = R.rbLeft
                                    } else {
                                        if (!R.rbRight) {
                                            x = R;
                                            break
                                        }
                                        R = R.rbRight
                                    } this.circleEvents.rbInsertSuccessor(x, v), x || (this.firstCircleEvent = v)
                            }
                        }
                    }
                }, i.prototype.detachCircleEvent = function(e) {
                    var t = e.circleEvent;
                    t && (t.rbPrevious || (this.firstCircleEvent = t.rbNext), this.circleEvents.rbRemoveNode(t), this.circleEventJunkyard.push(t), e.circleEvent = null)
                }, i.prototype.connectEdge = function(e, t) {
                    var r = e.vb;
                    if (r) return !0;
                    var i, o, n = e.va,
                        s = t.xl,
                        a = t.xr,
                        c = t.yt,
                        h = t.yb,
                        l = e.lSite,
                        u = e.rSite,
                        f = l.x,
                        p = l.y,
                        d = u.x,
                        b = u.y,
                        g = (f + d) / 2,
                        y = (p + b) / 2;
                    if (this.cells[l.voronoiId].closeMe = !0, this.cells[u.voronoiId].closeMe = !0, b !== p && (o = y - (i = (f - d) / (b - p)) * g), void 0 === i) {
                        if (g < s || g >= a) return !1;
                        if (f > d) {
                            if (!n || n.y < c) n = this.createVertex(g, c);
                            else if (n.y >= h) return !1;
                            r = this.createVertex(g, h)
                        } else {
                            if (!n || n.y > h) n = this.createVertex(g, h);
                            else if (n.y < c) return !1;
                            r = this.createVertex(g, c)
                        }
                    } else if (i < -1 || i > 1)
                        if (f > d) {
                            if (!n || n.y < c) n = this.createVertex((c - o) / i, c);
                            else if (n.y >= h) return !1;
                            r = this.createVertex((h - o) / i, h)
                        } else {
                            if (!n || n.y > h) n = this.createVertex((h - o) / i, h);
                            else if (n.y < c) return !1;
                            r = this.createVertex((c - o) / i, c)
                        }
                    else if (p < b) {
                        if (!n || n.x < s) n = this.createVertex(s, i * s + o);
                        else if (n.x >= a) return !1;
                        r = this.createVertex(a, i * a + o)
                    } else {
                        if (!n || n.x > a) n = this.createVertex(a, i * a + o);
                        else if (n.x < s) return !1;
                        r = this.createVertex(s, i * s + o)
                    }
                    return e.va = n, e.vb = r, !0
                }, i.prototype.clipEdge = function(e, t) {
                    var r = e.va.x,
                        i = e.va.y,
                        o = 0,
                        n = 1,
                        s = e.vb.x - r,
                        a = e.vb.y - i,
                        c = r - t.xl;
                    if (0 === s && c < 0) return !1;
                    var h = -c / s;
                    if (s < 0) {
                        if (h < o) return !1;
                        h < n && (n = h)
                    } else if (s > 0) {
                        if (h > n) return !1;
                        h > o && (o = h)
                    }
                    if (c = t.xr - r, 0 === s && c < 0) return !1;
                    if (h = c / s, s < 0) {
                        if (h > n) return !1;
                        h > o && (o = h)
                    } else if (s > 0) {
                        if (h < o) return !1;
                        h < n && (n = h)
                    }
                    if (c = i - t.yt, 0 === a && c < 0) return !1;
                    if (h = -c / a, a < 0) {
                        if (h < o) return !1;
                        h < n && (n = h)
                    } else if (a > 0) {
                        if (h > n) return !1;
                        h > o && (o = h)
                    }
                    if (c = t.yb - i, 0 === a && c < 0) return !1;
                    if (h = c / a, a < 0) {
                        if (h > n) return !1;
                        h > o && (o = h)
                    } else if (a > 0) {
                        if (h < o) return !1;
                        h < n && (n = h)
                    }
                    return o > 0 && (e.va = this.createVertex(r + o * s, i + o * a)), n < 1 && (e.vb = this.createVertex(r + n * s, i + n * a)), (o > 0 || n < 1) && (this.cells[e.lSite.voronoiId].closeMe = !0, this.cells[e.rSite.voronoiId].closeMe = !0), !0
                }, i.prototype.clipEdges = function(e) {
                    for (var t, r = this.edges, i = r.length, o = Math.abs; i--;) t = r[i], (!this.connectEdge(t, e) || !this.clipEdge(t, e) || o(t.va.x - t.vb.x) < 1e-9 && o(t.va.y - t.vb.y) < 1e-9) && (t.va = t.vb = null, r.splice(i, 1))
                }, i.prototype.closeCells = function(e) {
                    for (var t, r, i, o, n, s, a, c, h, l = e.xl, u = e.xr, f = e.yt, p = e.yb, d = this.cells, b = d.length, g = Math.abs; b--;)
                        if ((t = d[b]).prepareHalfedges() && t.closeMe) {
                            for (o = (i = t.halfedges).length, r = 0; r < o;) {
                                if (s = i[r].getEndpoint(), c = i[(r + 1) % o].getStartpoint(), g(s.x - c.x) >= 1e-9 || g(s.y - c.y) >= 1e-9) switch (!0) {
                                    case this.equalWithEpsilon(s.x, l) && this.lessThanWithEpsilon(s.y, p):
                                        if (h = this.equalWithEpsilon(c.x, l), a = this.createVertex(l, h ? c.y : p), n = this.createBorderEdge(t.site, s, a), r++, i.splice(r, 0, this.createHalfedge(n, t.site, null)), o++, h) break;
                                        s = a;
                                    case this.equalWithEpsilon(s.y, p) && this.lessThanWithEpsilon(s.x, u):
                                        if (h = this.equalWithEpsilon(c.y, p), a = this.createVertex(h ? c.x : u, p), n = this.createBorderEdge(t.site, s, a), r++, i.splice(r, 0, this.createHalfedge(n, t.site, null)), o++, h) break;
                                        s = a;
                                    case this.equalWithEpsilon(s.x, u) && this.greaterThanWithEpsilon(s.y, f):
                                        if (h = this.equalWithEpsilon(c.x, u), a = this.createVertex(u, h ? c.y : f), n = this.createBorderEdge(t.site, s, a), r++, i.splice(r, 0, this.createHalfedge(n, t.site, null)), o++, h) break;
                                        s = a;
                                    case this.equalWithEpsilon(s.y, f) && this.greaterThanWithEpsilon(s.x, l):
                                        if (h = this.equalWithEpsilon(c.y, f), a = this.createVertex(h ? c.x : l, f), n = this.createBorderEdge(t.site, s, a), r++, i.splice(r, 0, this.createHalfedge(n, t.site, null)), o++, h) break;
                                        if (s = a, h = this.equalWithEpsilon(c.x, l), a = this.createVertex(l, h ? c.y : p), n = this.createBorderEdge(t.site, s, a), r++, i.splice(r, 0, this.createHalfedge(n, t.site, null)), o++, h) break;
                                        if (s = a, h = this.equalWithEpsilon(c.y, p), a = this.createVertex(h ? c.x : u, p), n = this.createBorderEdge(t.site, s, a), r++, i.splice(r, 0, this.createHalfedge(n, t.site, null)), o++, h) break;
                                        if (s = a, h = this.equalWithEpsilon(c.x, u), a = this.createVertex(u, h ? c.y : f), n = this.createBorderEdge(t.site, s, a), r++, i.splice(r, 0, this.createHalfedge(n, t.site, null)), o++, h) break;
                                    default:
                                        throw "Voronoi.closeCells() > this makes no sense!"
                                }
                                r++
                            }
                            t.closeMe = !1
                        }
                }, i.prototype.quantizeSites = function(e) {
                    for (var t, r = this.ε, i = e.length; i--;)(t = e[i]).x = Math.floor(t.x / r) * r, t.y = Math.floor(t.y / r) * r
                }, i.prototype.recycle = function(e) {
                    if (e) {
                        if (!(e instanceof this.Diagram)) throw "Voronoi.recycleDiagram() > Need a Diagram object.";
                        this.toRecycle = e
                    }
                }, i.prototype.compute = function(e, t) {
                    var r = new Date;
                    this.reset(), this.toRecycle && (this.vertexJunkyard = this.vertexJunkyard.concat(this.toRecycle.vertices), this.edgeJunkyard = this.edgeJunkyard.concat(this.toRecycle.edges), this.cellJunkyard = this.cellJunkyard.concat(this.toRecycle.cells), this.toRecycle = null);
                    var i = e.slice(0);
                    i.sort(function(e, t) {
                        var r = t.y - e.y;
                        return r || t.x - e.x
                    });
                    for (var o, n, s, a = i.pop(), c = 0, h = this.cells;;)
                        if (s = this.firstCircleEvent, a && (!s || a.y < s.y || a.y === s.y && a.x < s.x)) a.x === o && a.y === n || (h[c] = this.createCell(a), a.voronoiId = c++, this.addBeachsection(a), n = a.y, o = a.x), a = i.pop();
                        else {
                            if (!s) break;
                            this.removeBeachsection(s.arc)
                        } this.clipEdges(t), this.closeCells(t);
                    var l = new Date,
                        u = new this.Diagram;
                    return u.cells = this.cells, u.edges = this.edges, u.vertices = this.vertices, u.execTime = l.getTime() - r.getTime(), this.reset(), u
                }, void 0 !== t && (t.exports = i)
            }, {}],
            59: [function(e, t, r) {
                var i = e("voronoi");
                e("core-js/fn/object/assign"), e("core-js/fn/array/from"), t.exports = function e(t, r) {
                    void 0 === r && (r = {}), r = Object.assign({
                        edgeLightUpSpeed: .002,
                        edgeFadeSpeed: .001,
                        edgeLightUpBrightness: .2,
                        eraseAlpha: .5,
                        trailSize: 25,
                        pulseChance: .06,
                        maxPulsesPerSpawn: 1,
                        maxPulses: 10,
                        minVertexRadius: 1,
                        minPulseSpeed: .03 / 2.25,
                        pulseSpeedVariation: .04 / 2.25,
                        vertexRadiusVariation: 1,
                        spacing: 80,
                        bg: [71, 125, 194],
                        fg: [128, 198, 255]
                    }, r);
                    var o = 2 * Math.PI,
                        n = window.devicePixelRatio,
                        s = t.getContext("2d"),
                        a = t.getBoundingClientRect(),
                        c = a.width * n,
                        h = a.height * n,
                        l = [],
                        u = !1,
                        f = function(e, t) {
                            for (var r = 0; r < e; r++) t(r)
                        };

                    function p(e, t, r, i) {
                        e.beginPath(), e.arc(t * n, r * n, i * n, 0, o), e.closePath()
                    }

                    function d(e, t, r) {
                        this.r = e, this.g = t, this.b = r
                    }
                    d.prototype = {
                        r: 0,
                        g: 0,
                        b: 0,
                        interpolate: function(e, t) {
                            var r = e.r - this.r,
                                i = e.g - this.g,
                                o = e.b - this.b;
                            return new d(this.r + r * t, this.g + i * t, this.b + o * t)
                        },
                        toString: function() {
                            return "rgb(" + Math.round(this.r) + "," + Math.round(this.g) + "," + Math.round(this.b) + ")"
                        }
                    };
                    var b = {
                            bg: new d(r.bg[0], r.bg[1], r.bg[2]),
                            fg: new d(r.fg[0], r.fg[1], r.fg[2])
                        },
                        g = function(e) {
                            return b.bg.interpolate(b.fg, e).toString()
                        };

                    function y(e) {
                        e.pulses = [], e.pulse = function(t, i) {
                                var o = new x(t, i);
                                return o.speed = r.minPulseSpeed + r.pulseSpeedVariation * Math.random(), e.pulses.length < r.maxPulses ? (t.lightUp(), e.pulses.push(o), t.diagram.edges.find(function(e) {
                                    return e.va == t && e.vb == i || e.vb == t && e.va == i
                                }).lightUp(), o) : null
                            },
                            function(e) {
                                e.vertices.forEach(function(t) {
                                    var i = Math.random();
                                    t.diagram = e, t.clockSpeed = .002 * Math.random() - .001, t.clock = Math.random() * o, t.originX = t.x, t.originY = t.y, t.clockIntensity = 0 + 0 * Math.pow(i, 3), t.depth = i, t.radius = r.minVertexRadius + i * r.vertexRadiusVariation, t.color = 0, t.colorFadeSpeed = .01, t.blips = [], t.blipSpeed = .04, t.blipRadius = 3.5 * t.radius + Math.random() * t.radius * 1, t.forceStrength = 4, t.forces = [], t.neighbors = function(e, t, r) {
                                        return void 0 === r && (r = null), e.edges.filter(function(e) {
                                            return (e.va == t || e.vb == t) && e.va != r && e.vb != r
                                        }).reduce(function(e, t) {
                                            return e.concat(t.va, t.vb)
                                        }, []).filter(function(e) {
                                            return e != t
                                        })
                                    }(e, t), t.getRandomNeighbor = function(e) {
                                        void 0 === e && (e = null);
                                        var t = this.neighbors.filter(function(t) {
                                            return t != e
                                        });
                                        if (0 == t.length) return null;
                                        var r = t[Math.round(Math.random() * (t.length - 1))];
                                        return r
                                    }, t.lightUp = function() {
                                        this.color = 1
                                    }, t.blip = function() {
                                        this.blips.push(1)
                                    }, t.applyForces = function() {
                                        for (var e = {
                                                x: 0,
                                                y: 0
                                            }, r = t.forces.length - 1; r >= 0; r--) {
                                            var i = t.forces[r],
                                                o = Math.pow(i.power, 3);
                                            e.x += i.cosAngle * o * i.strength, e.y += i.sinAngle * o * i.strength, i.update(), i.dead && t.forces.splice(r, 1)
                                        }
                                        return e
                                    }, t.update = function() {
                                        var e = this;
                                        this.color > 0 && (this.color -= this.colorFadeSpeed, this.color < 0 && (this.color = 0)), this.blips = this.blips.map(function(t) {
                                            return t -= e.blipSpeed
                                        }).filter(function(e) {
                                            return e > 0
                                        })
                                    }
                                })
                            }(e),
                            function(e) {
                                e.edges.forEach(function(e) {
                                    e.color = 0, e.colorTo = 0, e.lightUp = function() {
                                        e.colorTo = r.edgeLightUpBrightness, e.color = Math.max(e.color, 1e-4)
                                    }, e.update = function() {
                                        e.colorTo > 0 ? (e.color += r.edgeLightUpSpeed, e.colorTo -= r.edgeLightUpSpeed, e.colorTo < 0 && (e.colorTo = 0)) : e.color > 0 && (e.color -= r.edgeFadeSpeed, e.color < 0 && (e.color = 0))
                                    }
                                })
                            }(e), e.outerVertices = e.vertices.filter(function(t) {
                                return t.y <= 0 || t.y >= e.height
                            })
                    }

                    function v(e, t) {
                        this.angle = e, this.power = 1, this.strength = t, this.cosAngle = Math.cos(e), this.sinAngle = Math.sin(e)
                    }

                    function x(e, t) {
                        this.origin = e, this.dest = t, this.lastPos = []
                    }

                    function R(e, t, i, o, s) {
                        Math.random() < r.pulseChance && f(Math.random() * r.maxPulsesPerSpawn, function(t) {
                            var r = e.outerVertices[Math.round(Math.random() * (e.outerVertices.length - 1))],
                                i = r.getRandomNeighbor();
                            if (l.length > 0 && (null == i || Math.random() < .1)) {
                                if (null == (i = (r = l[Math.round(Math.random() * (l.length - 1))]).getRandomNeighbor())) return
                            } else if (null == i) return;
                            if (null != e.pulse(r, i)) {
                                var o = i.x - r.x,
                                    n = i.y - r.y;
                                Math.atan2(n, o), Math.PI
                            }
                        }), t.fillStyle = g(0), t.globalAlpha = r.eraseAlpha, t.fillRect(0, 0, i, o), t.globalAlpha = 1, t.fillStyle = g(.2), t.strokeStyle = g(.15), t.lineCap = "round", e.edges.forEach(function(e) {
                            e.color <= 0 || (t.beginPath(), t.moveTo(e.va.x * n, e.va.y * n), t.lineTo(e.vb.x * n, e.vb.y * n), t.strokeStyle = g(e.color), t.globalAlpha = 1, t.lineWidth = 1 * n, t.stroke(), e.update())
                        }), e.pulses.forEach(function(e) {
                            if (e.getPos(), e.update(s), t.beginPath(), t.moveTo(e.lastPos[0].x * n, e.lastPos[0].y * n), e.lastPos.slice(1).forEach(function(e) {
                                    t.lineTo(e.x * n, e.y * n)
                                }), t.strokeStyle = g(1), t.globalAlpha = .7, t.lineWidth = 1 * n, t.stroke(), e.lastPos.length >= 2 && !e.dying) {
                                t.lineWidth = 5 * n, t.globalAlpha = .7, t.beginPath();
                                var r = e.lastPos.length - 2,
                                    i = e.lastPos.length - 1;
                                t.moveTo(e.lastPos[r].x * n, e.lastPos[r].y * n), t.lineTo(e.lastPos[i].x * n, e.lastPos[i].y * n), t.strokeStyle = g(1), t.stroke()
                            }
                        }), e.vertices.forEach(function(e) {
                            var r = e.applyForces();
                            if (e.x = e.originX + r.x, e.y = e.originY + r.y, e.color > 0) {
                                var i = e.depth,
                                    o = g(0 + 1 * Math.min(1, e.color));
                                t.fillStyle = o, t.globalAlpha = 1 - .35 * (1 - i),
                                    function(e, t, r, i) {
                                        p(e, t, r, i), e.fill()
                                    }(t, e.x, e.y, e.radius)
                            }
                            e.blips.forEach(function(r) {
                                var i = 1 - r,
                                    o = e.radius + e.blipRadius * Math.pow(i, .5),
                                    s = 1 * r;
                                t.globalAlpha = s, t.lineWidth = 1 * n, t.strokeStyle = g(1),
                                    function(e, t, r, i) {
                                        p(e, t, r, i), e.stroke()
                                    }(t, e.x, e.y, o)
                            }), e.update()
                        }), e.pulses = e.pulses.filter(function(e) {
                            return !e.dead
                        })
                    }
                    v.prototype = {
                            angle: 0,
                            power: 0,
                            dead: !1,
                            cosAngle: 0,
                            sinAngle: 0,
                            update: function() {
                                this.power -= .03, this.power <= 0 && (this.dead = !0)
                            }
                        }, x.prototype = {
                            origin: null,
                            dest: null,
                            v: 0,
                            speed: .03 + .05 * Math.random(),
                            angle: 0,
                            dying: !1,
                            dyingCounter: r.trailSize,
                            dead: !1,
                            lastPos: null,
                            sparkRandom: .2,
                            update: function(e) {
                                var t = this;
                                if (void 0 === e && (e = 1), this.dying) return this.dyingCounter--, void(this.dyingCounter <= 0 && (this.dead = !0));
                                if (this.v >= 1) {
                                    this.dying = !0;
                                    var r = Math.round(2.45 * Math.random()),
                                        i = 0,
                                        o = [];
                                    r > 0 && f(r, function(e) {
                                        var r = t.dest.getRandomNeighbor(t.origin);
                                        if (null != r)
                                            if (o.indexOf(r) > -1) i++;
                                            else {
                                                var n = t.dest.diagram.pulse(t.dest, r);
                                                null != n ? (o.push(r), n.speed = t.speed, n.lastPos = t.lastPos.slice(t.lastPos.length - 4)) : i++
                                            }
                                        else i++
                                    });
                                    var n = 1 + 1 * Math.random();
                                    (0 == r || i >= r) && (this.dest.blip(), l = [this.dest].concat(l.slice(0, 20)), this.dest.lightUp(), n = 7.5 + 6 * this.dest.depth);
                                    var s = this.dest.x - this.origin.x,
                                        a = this.dest.y - this.origin.y,
                                        c = Math.atan2(a, s);
                                    this.dest.forces.push(new v(c, n))
                                }
                                this.v += this.speed * e, this.v > 1 && (this.v = 1)
                            },
                            getPos: function() {
                                var e = {
                                    x: 0,
                                    y: 0
                                };
                                if (this.dying) e = this.lastPos[this.lastPos.length - 1];
                                else {
                                    var t = this.dest.x - this.origin.x,
                                        i = this.dest.y - this.origin.y,
                                        o = Math.sqrt(t * t + i * i),
                                        n = Math.atan2(i, t);
                                    this.angle = n, e = {
                                        x: this.origin.x + Math.cos(n) * (o * this.v),
                                        y: this.origin.y + Math.sin(n) * (o * this.v)
                                    };
                                    var s = this.sparkRandom;
                                    e.x += -s / 2 + Math.random() * s, e.y += -s / 2 + Math.random() * s
                                }
                                return this.lastPos = this.lastPos.slice(this.lastPos.length - r.trailSize).concat(e), e
                            }
                        }, window.addEventListener("resize", function i() {
                            window.removeEventListener("resize", i), u = !0, e(t, r)
                        }), t.setAttribute("width", c), t.setAttribute("height", h),
                        function(e, t, o) {
                            var s = function(e, t, r) {
                                var o, n = Math.ceil(e / r) + 1,
                                    s = Math.ceil(t / r) + 1,
                                    a = n * s;
                                o = Array.from(Array(a)).map(function(e, t) {
                                    var i = t % n,
                                        o = Math.floor(t / n);
                                    return {
                                        x: r * i + (o % 2 == 0 ? r / 2 : 0),
                                        y: o * r
                                    }
                                });
                                var c = {
                                    xl: -20,
                                    xr: e + 20,
                                    yt: -20,
                                    yb: t + 20
                                };
                                return (new i).compute(o, c)
                            }(t / n, o / n, r.spacing);
                            s.width = t / n, s.height = o / n, y(s),
                                function r(i) {
                                    if (!u) {
                                        var n = (i - 0) / .06;
                                        n > 1.5 && (n = 1.5), R(s, e, t, o, n), requestAnimationFrame(r)
                                    }
                                }()
                        }(s, c, h)
                }
            }, {
                "core-js/fn/array/from": 1,
                "core-js/fn/object/assign": 2,
                voronoi: 58
            }]
        }, {}, [59])(59)
    }),
    function() {
        const e = {
            element: null,
            event: "click",
            width: 105,
            height: 115,
            paddingTop: -2,
            paddingBottom: 30,
            color: ["yellow", "rgb(40, 109, 190)", "rgb(0, 145, 250)"],
            startingPos: -57,
            posSpeed: 9.5,
            posSpeedDecay: .8675,
            startingStretch: 1,
            stretchSpeed: -0,
            stretchSpeedDecay: .93,
            drawingStart: 0,
            erasingStart: -1050,
            erasingLimit: 1250,
            drawingSpeed: 32.5,
            drawingSpeedDecay: .98,
            erasingSpeed: 27,
            erasingSpeedDecay: 1,
            fadeSpeed: .615,
            layerDelay: 135,
            stepVariation: 0,
            steps: 1,
            lineWidth: 60,
            opacity: .915
        };
        window.attachLightning = function(t = {}) {
            null != (t = Object.assign({}, e, t)).element ? ("string" == typeof t.element && (t.element = document.querySelector(t.element)), t.startingPos += t.paddingTop, t.element.addEventListener(t.event, function(e) {
                let r = 2 * window.devicePixelRatio,
                    i = document.createElement("canvas"),
                    o = i.getContext("2d"),
                    n = 400,
                    s = 400,
                    a = {
                        width: t.width,
                        height: t.height + t.paddingTop + t.paddingBottom
                    };
                i.style.width = a.width + "px", i.style.opacity = t.opacity, i.style.height = a.height + "px", i.setAttribute("width", a.width * r), i.setAttribute("height", a.height * r), e.currentTarget.getBoundingClientRect(), i.style.position = "absolute", i.style.pointerEvents = "none", document.body.appendChild(i);
                const c = e => e.reduce((e, t, r, i) => r % 2 == 1 ? e.concat([
                        [i[r - 1], t]
                    ]) : e, []),
                    h = e => (e => e.map(e => [e[0] / n * t.width, e[1] / s * t.height]))(c(e));
                let l = h([200, 20, 65, 220, 175, 220, 125, 375, 300, 160, 170, 160]),
                    u = h([200, -50, 200, 20, 65, 220, 175, 220, 125, 375]),
                    f = h([200, -50, 200, 20, 170, 160, 300, 160, 125, 375]);
                const p = (e, t, r) => Array.from(Array(e.length)).map((i, o) => [e[o][0] + (t[o][0] - e[o][0]) * r, e[o][1] + (t[o][1] - e[o][1]) * r]);
                let d = ((e, t, r) => Array.from(Array(r)).map((i, o) => p(e, t, o / r)))(u, f, t.steps);

                function b() {
                    var e;
                    o.save(), e = l, o.beginPath(), o.moveTo(e[0][0] * r, e[0][1] * r), e.slice(1).forEach(e => {
                        o.lineTo(e[0] * r, e[1] * r)
                    }), o.closePath(), o.clip()
                }
                1 == t.steps && (d = [p(u, f, .5)]), Array.from(Array(t.steps)).map(e => Math.random() * t.stepVariation), h([209, 0, 121, 187, 242, 189, 127, 375]), h([179, 42, 95, 144, 135, 210, 228, 165, 272, 233, 162, 332]), Array.isArray(t.color) || (t.color = [t.color]);
                let g = t.color.map((e, i) => (function(e, i) {
                        let n = t.startingPos,
                            s = t.startingStretch,
                            c = t.posSpeed,
                            h = t.posSpeedDecay,
                            l = t.stretchSpeed,
                            u = t.stretchSpeedDecay,
                            f = t.drawingStart - i,
                            p = t.erasingStart + i,
                            g = (t.erasingLimit, t.drawingSpeed),
                            y = t.erasingSpeed;
                        return function(i) {
                            return o.restore(), o.save(), o.scale(1, s), o.translate(0, n * r), n += c * i, c *= Math.pow(h, i), s += l * i, l *= Math.pow(u, i), b(), o.save(), o.lineWidth = t.lineWidth * r, o.lineCap = "round", o.strokeStyle = e, o.fillStyle = e, d.forEach((e, i) => {
                                o.save(), o.rotate(-.2);
                                let n = t.paddingTop + p;
                                o.fillRect(0, n * r, a.width * r, (-n + f) * r), o.restore()
                            }), f += g * i, p += y * i, g *= Math.pow(t.drawingSpeedDecay, i), y *= Math.pow(t.erasingSpeedDecay, i), o.restore(), o.restore(), p
                        }
                    })(e, i * t.layerDelay)),
                    y = Date.now();
                ! function e(n) {
                    let s = n - y;
                    y = n;
                    let c = s / (1e3 / 60);
                    isNaN(c) && (c = 1), c = Math.min(2, c), 1 == t.fadeSpeed ? o.clearRect(0, 0, a.width * r, a.height * r) : (o.save(), o.globalAlpha = t.fadeSpeed, o.globalCompositeOperation = "destination-out", o.fillRect(0, 0, a.width * r, a.height * r), o.restore()), g.map(e => e(c))[0] > t.erasingLimit ? i.remove() : requestAnimationFrame(e)
                }()
            })) : console.error('Lightning: Please select an element, by the "element" option. You can pass either a selector or a DOM Node')
        }
    }(), "function" != typeof Object.assign && (Object.assign = function(e) {
        "use strict";
        if (null == e) throw new TypeError("Cannot convert undefined or null to object");
        e = Object(e);
        for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            if (null != r)
                for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (e[i] = r[i])
        }
        return e
    }), Array.from || (Array.from = function() {
        var e = Object.prototype.toString,
            t = function(t) {
                return "function" == typeof t || "[object Function]" === e.call(t)
            },
            r = Math.pow(2, 53) - 1,
            i = function(e) {
                var t = function(e) {
                    var t = Number(e);
                    return isNaN(t) ? 0 : 0 !== t && isFinite(t) ? (t > 0 ? 1 : -1) * Math.floor(Math.abs(t)) : t
                }(e);
                return Math.min(Math.max(t, 0), r)
            };
        return function(e) {
            var r = Object(e);
            if (null == e) throw new TypeError("Array.from requires an array-like object - not null or undefined");
            var o, n = arguments.length > 1 ? arguments[1] : void 0;
            if (void 0 !== n) {
                if (!t(n)) throw new TypeError("Array.from: when provided, the second argument must be a function");
                arguments.length > 2 && (o = arguments[2])
            }
            for (var s, a = i(r.length), c = t(this) ? Object(new this(a)) : new Array(a), h = 0; h < a;) s = r[h], c[h] = n ? void 0 === o ? n(s, h) : n.call(o, s, h) : s, h += 1;
            return c.length = a, c
        }
    }()), Particles(document.getElementById("header_canvas"), {
        edgeLightUpSpeed: .002,
        edgeFadeSpeed: .001,
        edgeLightUpBrightness: .2,
        eraseAlpha: .5,
        trailSize: 25,
        pulseChance: .06,
        maxPulsesPerSpawn: 1,
        maxPulses: 10,
        minVertexRadius: 1,
        minPulseSpeed: .03 / 2.25,
        pulseSpeedVariation: .04 / 2.25,
        vertexRadiusVariation: 1,
        spacing: 80,
        bg: [255, 255, 255],
        fg: [128, 198, 255]
    }), attachLightning({
        element: ".email-form-button-container",
        opacity: .9
    });
