(function () {
  "use strict";

  document.documentElement.classList.remove("no-js");

  var root = document.querySelector(".isk-rebrand");
  if (!root) {
    return;
  }

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion) {
    document.documentElement.classList.add("reduced-motion");
  } else {
    document.documentElement.classList.add("motion-ready");
  }

  var topbar = document.querySelector(".site-topbar");
  var navToggle = document.querySelector(".nav-toggle");
  var siteNav = document.querySelector(".site-nav");

  function setScrolledState() {
    if (!topbar) {
      return;
    }
    topbar.classList.toggle("is-scrolled", window.scrollY > 16);
  }

  setScrolledState();
  window.addEventListener("scroll", setScrolledState, { passive: true });

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("isk-menu-open");
      navToggle.setAttribute("aria-expanded", String(open));
    });

    siteNav.addEventListener("click", function (event) {
      if (event.target && event.target.tagName === "A") {
        document.body.classList.remove("isk-menu-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  if (!reducedMotion && window.gsap) {
    if (window.ScrollTrigger) {
      window.gsap.registerPlugin(window.ScrollTrigger);
    }

    window.gsap.from(".hero .eyebrow, .hero-title, .hero-copy, .hero-actions, .hero-meta", {
      y: 22,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.12
    });

    window.gsap.utils.toArray("[data-reveal]").forEach(function (item) {
      window.gsap.to(item, {
        y: 0,
        opacity: 1,
        duration: 0.75,
        ease: "power2.out",
        scrollTrigger: {
          trigger: item,
          start: "top 100%",
          once: true
        }
      });
    });
  } else {
    document.querySelectorAll("[data-reveal]").forEach(function (item) {
      item.style.opacity = 1;
      item.style.transform = "none";
    });
  }

  if (!reducedMotion && window.anime) {
    window.anime({
      targets: ".kg-spark",
      translateY: [-6, 8],
      rotate: function (_el, index) {
        return index % 2 ? ["18deg", "-12deg"] : ["-10deg", "20deg"];
      },
      duration: 1600,
      direction: "alternate",
      easing: "easeInOutSine",
      loop: true,
      delay: window.anime.stagger(180)
    });

    window.anime({
      targets: ".stage-tagline li",
      scale: [0.96, 1],
      opacity: [0.78, 1],
      duration: 900,
      delay: window.anime.stagger(45),
      easing: "easeOutElastic(1, .65)"
    });
  }

  function initConstellation() {
    var canvas = document.getElementById("iskConstellation");
    if (!canvas || !window.THREE || reducedMotion) {
      return;
    }

    var THREE = window.THREE;
    var scene = new THREE.Scene();
    var renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    var camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.z = 16;

    var group = new THREE.Group();
    scene.add(group);

    var pointCount = 54;
    var positions = [];
    var colors = [];
    var palette = [
      new THREE.Color("#f1bd2f"),
      new THREE.Color("#58b9cf"),
      new THREE.Color("#ffffff"),
      new THREE.Color("#168a63")
    ];

    for (var i = 0; i < pointCount; i += 1) {
      positions.push(
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8
      );
      var color = palette[i % palette.length];
      colors.push(color.r, color.g, color.b);
    }

    var pointGeometry = new THREE.BufferGeometry();
    pointGeometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    pointGeometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    var points = new THREE.Points(
      pointGeometry,
      new THREE.PointsMaterial({
        size: 0.12,
        vertexColors: true,
        transparent: true,
        opacity: 0.9
      })
    );
    group.add(points);

    var linePositions = [];
    for (var j = 0; j < pointCount - 1; j += 2) {
      linePositions.push(
        positions[j * 3],
        positions[j * 3 + 1],
        positions[j * 3 + 2],
        positions[(j + 1) * 3],
        positions[(j + 1) * 3 + 1],
        positions[(j + 1) * 3 + 2]
      );
    }

    var lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
    var lines = new THREE.LineSegments(
      lineGeometry,
      new THREE.LineBasicMaterial({
        color: "#ffffff",
        transparent: true,
        opacity: 0.18
      })
    );
    group.add(lines);

    function resize() {
      var width = canvas.clientWidth || window.innerWidth;
      var height = canvas.clientHeight || window.innerHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
    }

    resize();
    window.addEventListener("resize", resize, { passive: true });

    var pointerX = 0;
    var pointerY = 0;
    window.addEventListener("pointermove", function (event) {
      pointerX = (event.clientX / window.innerWidth - 0.5) * 0.25;
      pointerY = (event.clientY / window.innerHeight - 0.5) * 0.18;
    }, { passive: true });

    function tick(time) {
      group.rotation.y = time * 0.00007 + pointerX;
      group.rotation.x = pointerY;
      points.rotation.z = time * 0.00004;
      renderer.render(scene, camera);
      window.requestAnimationFrame(tick);
    }

    window.requestAnimationFrame(tick);
  }

  initConstellation();
}());
