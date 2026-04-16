/* 
   ISK Enhanced Animations
   GSAP + ScrollTrigger + Anime.js + Three.js
   
    */
(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /*  Loading screen  */
  function initLoader() {
    var loader = document.querySelector(".isk-loader");
    if (!loader) return;
    window.addEventListener("load", function () {
      setTimeout(function () {
        loader.classList.add("loaded");
        setTimeout(function () { loader.remove(); }, 600);
      }, 800);
    });
  }
  initLoader();

  /*  Scroll progress bar  */
  function initScrollProgress() {
    var bar = document.querySelector(".scroll-progress");
    if (!bar) return;
    window.addEventListener("scroll", function () {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      var pct = h > 0 ? window.scrollY / h : 0;
      bar.style.transform = "scaleX(" + pct + ")";
    }, { passive: true });
  }
  initScrollProgress();

  /*  Cursor glow  */
  function initCursorGlow() {
    if (reducedMotion || window.innerWidth < 860) return;
    var glow = document.querySelector(".cursor-glow");
    if (!glow) return;
    var mx = 0, my = 0, cx = 0, cy = 0;
    document.addEventListener("mousemove", function (e) {
      mx = e.clientX; my = e.clientY;
    }, { passive: true });
    function tick() {
      cx += (mx - cx) * 0.08;
      cy += (my - cy) * 0.08;
      glow.style.left = cx + "px";
      glow.style.top = cy + "px";
      requestAnimationFrame(tick);
    }
    tick();
  }
  initCursorGlow();

  /*  Magnetic buttons  */
  function initMagneticButtons() {
    if (reducedMotion || window.innerWidth < 860) return;
    document.querySelectorAll(".btn-magnetic").forEach(function (btn) {
      btn.addEventListener("mousemove", function (e) {
        var rect = btn.getBoundingClientRect();
        var x = (e.clientX - rect.left - rect.width / 2) * 0.15;
        var y = (e.clientY - rect.top - rect.height / 2) * 0.15;
        btn.style.transform = "translate(" + x + "px, " + y + "px) translateY(-2px)";
      });
      btn.addEventListener("mouseleave", function () {
        btn.style.transform = "";
      });
    });
  }
  initMagneticButtons();

  /*  Counter animation  */
  function initCounters() {
    var counters = document.querySelectorAll("[data-count]");
    if (!counters.length) return;

    function animateCounter(el) {
      var target = parseInt(el.getAttribute("data-count"), 10);
      var suffix = el.getAttribute("data-suffix") || "";
      var prefix = el.getAttribute("data-prefix") || "";
      var duration = 2000;
      var start = Date.now();

      function step() {
        var now = Date.now();
        var elapsed = Math.min(now - start, duration);
        var progress = elapsed / duration;
        var eased = 1 - Math.pow(1 - progress, 4);
        var current = Math.round(target * eased);
        el.textContent = prefix + current + suffix;
        if (elapsed < duration) requestAnimationFrame(step);
      }
      step();
    }

    if (window.IntersectionObserver) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });
      counters.forEach(function (c) { obs.observe(c); });
    } else {
      counters.forEach(animateCounter);
    }
  }
  initCounters();

  /*  GSAP Enhanced Animations  */
  function initGSAPEnhanced() {
    if (reducedMotion || !window.gsap) return;
    var gsap = window.gsap;
    var ST = window.ScrollTrigger;
    if (ST) gsap.registerPlugin(ST);

    /* Staggered card reveals */
    gsap.utils.toArray(".glass-card, .stage-card-3d, .person-card-enhanced, .counter-stat").forEach(function (card, i) {
      gsap.from(card, {
        y: 60,
        opacity: 0,
        scale: 0.92,
        rotateX: 8,
        duration: 0.9,
        ease: "power3.out",
        delay: i * 0.08,
        scrollTrigger: ST ? {
          trigger: card,
          start: "top 90%",
          once: true
        } : undefined
      });
    });

    gsap.utils.toArray(".programme-node, .process-step, .test-card, .score-module, .infographic-panel").forEach(function (item, i) {
      gsap.from(item, {
        y: 34,
        scale: 0.96,
        duration: 0.65,
        delay: i * 0.045,
        ease: "power2.out",
        scrollTrigger: ST ? {
          trigger: item,
          start: "top 90%",
          once: true
        } : undefined
      });
    });

    /* Section label slide in */
    gsap.utils.toArray(".section-label").forEach(function (label) {
      gsap.from(label, {
        x: -40,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: ST ? {
          trigger: label,
          start: "top 92%",
          once: true
        } : undefined
      });
    });

    /* Parallax floating shapes */
    if (ST) {
      gsap.utils.toArray(".float-shape").forEach(function (shape) {
        gsap.to(shape, {
          y: -80,
          rotation: 15,
          ease: "none",
          scrollTrigger: {
            trigger: shape.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5
          }
        });
      });

      /* Horizontal marquee speed control */
      gsap.utils.toArray(".marquee-track").forEach(function (track) {
        gsap.to(track, {
          x: function () { return -track.scrollWidth / 2; },
          ease: "none",
          duration: 30,
          repeat: -1
        });
      });
    }

    /* Timetable grid stagger */
    gsap.utils.toArray(".timetable-cell").forEach(function (cell, i) {
      gsap.from(cell, {
        scale: 0.8,
        opacity: 0,
        duration: 0.4,
        delay: i * 0.02,
        ease: "back.out(1.7)",
        scrollTrigger: ST ? {
          trigger: cell.closest(".timetable-grid"),
          start: "top 85%",
          once: true
        } : undefined
      });
    });

    /* Map section reveal */
    var mapContainer = document.querySelector(".map-container");
    if (mapContainer) {
      gsap.from(mapContainer, {
        scale: 0.85,
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: ST ? {
          trigger: mapContainer,
          start: "top 85%",
          once: true
        } : undefined
      });
    }

    /* Organisation tree nodes */
    gsap.utils.toArray(".org-tree-node").forEach(function (node, i) {
      gsap.from(node, {
        y: 40,
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
        delay: i * 0.12,
        ease: "power3.out",
        scrollTrigger: ST ? {
          trigger: node.closest(".org-tree") || node,
          start: "top 88%",
          once: true
        } : undefined
      });
    });

    /* Hero parallax depth */
    if (ST) {
      var heroImg = document.querySelector(".hero-bg img, .page-hero .hero-bg img");
      if (heroImg) {
        gsap.to(heroImg, {
          scale: 1.15,
          ease: "none",
          scrollTrigger: {
            trigger: heroImg.closest(".hero, .page-hero"),
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });
      }
    }

    /* Timeline items */
    gsap.utils.toArray(".timeline-item").forEach(function (item, i) {
      gsap.from(item, {
        x: i % 2 === 0 ? -60 : 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: ST ? {
          trigger: item,
          start: "top 88%",
          once: true
        } : undefined
      });
    });

    /* Person grid stagger */
    gsap.utils.toArray(".person-grid .person-card, .profile-grid .profile-card").forEach(function (card, i) {
      gsap.from(card, {
        y: 50,
        opacity: 0,
        rotateY: 10,
        duration: 0.7,
        delay: i * 0.1,
        ease: "power3.out",
        scrollTrigger: ST ? {
          trigger: card.closest(".person-grid, .profile-grid"),
          start: "top 85%",
          once: true
        } : undefined
      });
    });
  }

  /*  Anime.js Enhanced  */
  function initAnimeEnhanced() {
    if (reducedMotion || !window.anime) return;

    /* Floating background shapes */
    window.anime({
      targets: ".bg-shape",
      translateY: function () { return window.anime.random(-30, 30); },
      translateX: function () { return window.anime.random(-20, 20); },
      scale: [1, 1.1],
      duration: function () { return window.anime.random(4000, 8000); },
      direction: "alternate",
      easing: "easeInOutSine",
      loop: true,
      delay: window.anime.stagger(300)
    });

    /* House badges bounce */
    window.anime({
      targets: ".house-badge",
      translateY: [-3, 3],
      duration: 2000,
      direction: "alternate",
      easing: "easeInOutQuad",
      loop: true,
      delay: window.anime.stagger(200)
    });

    /* Value strip items */
    var valueItems = document.querySelectorAll(".value-strip li");
    if (valueItems.length) {
      window.anime({
        targets: valueItems,
        scale: [0.95, 1],
        opacity: [0.7, 1],
        duration: 800,
        easing: "easeOutElastic(1, .6)",
        delay: window.anime.stagger(60),
        loop: false
      });
    }

    /* Timetable cell hover ripple */
    document.querySelectorAll(".timetable-cell").forEach(function (cell) {
      cell.addEventListener("mouseenter", function () {
        window.anime({
          targets: cell,
          scale: [1, 1.06, 1.03],
          duration: 400,
          easing: "easeOutElastic(1, .5)"
        });
      });
    });

    /* Counter stat pulse */
    window.anime({
      targets: ".counter-stat",
      boxShadow: [
        "0 0 0px rgba(79,179,255,0)",
        "0 0 20px rgba(79,179,255,0.1)",
        "0 0 0px rgba(79,179,255,0)"
      ],
      duration: 3000,
      easing: "easeInOutSine",
      loop: true,
      delay: window.anime.stagger(400)
    });
  }

  /*  Three.js Interactive Globe  */
  function initGlobe() {
    var canvas = document.getElementById("globe-canvas");
    if (!canvas || !window.THREE || reducedMotion) return;

    var THREE = window.THREE;
    var scene = new THREE.Scene();

    var renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    var camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 3.5;

    /* Globe sphere */
    var globeGeometry = new THREE.SphereGeometry(1.2, 64, 64);
    var globeMaterial = new THREE.MeshPhongMaterial({
      color: 0x0b4ea2,
      emissive: 0x061b35,
      specular: 0x4fb3ff,
      shininess: 15,
      transparent: true,
      opacity: 0.85,
      wireframe: false
    });
    var globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);

    /* Wireframe overlay */
    var wireGeo = new THREE.SphereGeometry(1.21, 32, 32);
    var wireMat = new THREE.MeshBasicMaterial({
      color: 0x4fb3ff,
      wireframe: true,
      transparent: true,
      opacity: 0.12
    });
    var wireGlobe = new THREE.Mesh(wireGeo, wireMat);
    scene.add(wireGlobe);

    /* Atmosphere glow - outer ring */
    var atmosGeo = new THREE.SphereGeometry(1.35, 64, 64);
    var atmosMat = new THREE.MeshBasicMaterial({
      color: 0x4fb3ff,
      transparent: true,
      opacity: 0.06,
      side: THREE.BackSide
    });
    scene.add(new THREE.Mesh(atmosGeo, atmosMat));

    /* Location marker - Kuantan (3.816N, 103.287E) */
    var lat = 3.816 * (Math.PI / 180);
    var lon = (103.287 - 90) * (Math.PI / 180);
    var markerRadius = 1.22;
    var mx = markerRadius * Math.cos(lat) * Math.cos(lon);
    var my = markerRadius * Math.sin(lat);
    var mz = markerRadius * Math.cos(lat) * Math.sin(lon);

    var markerGeo = new THREE.SphereGeometry(0.03, 16, 16);
    var markerMat = new THREE.MeshBasicMaterial({ color: 0xf1bd2f });
    var marker = new THREE.Mesh(markerGeo, markerMat);
    marker.position.set(mx, my, mz);
    scene.add(marker);

    /* Marker pulse ring */
    var ringGeo = new THREE.RingGeometry(0.04, 0.065, 32);
    var ringMat = new THREE.MeshBasicMaterial({
      color: 0xf1bd2f,
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide
    });
    var ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.copy(marker.position);
    ring.lookAt(0, 0, 0);
    scene.add(ring);

    /* Stars background */
    var starCount = 200;
    var starPositions = [];
    for (var i = 0; i < starCount; i++) {
      starPositions.push(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40
      );
    }
    var starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.Float32BufferAttribute(starPositions, 3));
    var stars = new THREE.Points(starGeo, new THREE.PointsMaterial({
      size: 0.05,
      color: 0xffffff,
      transparent: true,
      opacity: 0.6
    }));
    scene.add(stars);

    /* Lights */
    scene.add(new THREE.AmbientLight(0x4fb3ff, 0.4));
    var dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 3, 5);
    scene.add(dirLight);

    /* Mouse interaction */
    var pointerX = 0, pointerY = 0;
    var section = canvas.closest(".globe-section");
    if (section) {
      section.addEventListener("mousemove", function (e) {
        var rect = section.getBoundingClientRect();
        pointerX = ((e.clientX - rect.left) / rect.width - 0.5) * 0.5;
        pointerY = ((e.clientY - rect.top) / rect.height - 0.5) * 0.3;
      }, { passive: true });
    }

    function resize() {
      var w = canvas.clientWidth || 400;
      var h = canvas.clientHeight || 400;
      renderer.setSize(w, h, false);
      camera.aspect = w / Math.max(h, 1);
      camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener("resize", resize, { passive: true });

    var pulseScale = 1;
    function tick(time) {
      globe.rotation.y = time * 0.0001 + pointerX * 0.5;
      globe.rotation.x = pointerY * 0.3;
      wireGlobe.rotation.y = globe.rotation.y;
      wireGlobe.rotation.x = globe.rotation.x;

      /* Pulse marker */
      pulseScale = 1 + 0.3 * Math.sin(time * 0.003);
      ring.scale.set(pulseScale, pulseScale, 1);
      ringMat.opacity = 0.6 * (1 - (pulseScale - 1) / 0.3);

      /* Rotate marker with globe */
      marker.position.set(mx, my, mz);
      marker.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), globe.rotation.y);
      ring.position.copy(marker.position);
      ring.lookAt(0, 0, 0);

      stars.rotation.y = time * 0.00002;
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /*  Leaflet Interactive Map  */
  function initLeafletMap() {
    var mapEl = document.getElementById("isk-map");
    if (!mapEl || !window.L) return;

    var map = window.L.map("isk-map", {
      scrollWheelZoom: false,
      zoomControl: true
    }).setView([3.8160, 103.2870], 15);

    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19
    }).addTo(map);

    var iskIcon = window.L.divIcon({
      html: '<div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#0b4ea2,#4fb3ff);display:grid;place-items:center;box-shadow:0 4px 20px rgba(11,78,162,0.4);border:3px solid #fff;"><span style="color:#fff;font-weight:900;font-size:14px;">ISK</span></div>',
      iconSize: [40, 40],
      iconAnchor: [20, 20],
      popupAnchor: [0, -24],
      className: "isk-map-marker"
    });

    window.L.marker([3.8160, 103.2870], { icon: iskIcon })
      .addTo(map)
      .bindPopup(
        '<div style="text-align:center;padding:0.5rem;">' +
        '<strong style="font-size:1rem;">International School of Kuantan</strong><br>' +
        '<span style="color:#536a86;font-size:0.85rem;">Jalan IM 7/9, Bandar Indera Mahkota<br>25200 Kuantan, Pahang</span><br>' +
        '<a href="https://maps.google.com/?q=3.8160,103.2870" target="_blank" rel="noopener" ' +
        'style="display:inline-block;margin-top:0.5rem;padding:0.4rem 0.8rem;background:#0b4ea2;color:#fff;border-radius:8px;text-decoration:none;font-weight:700;font-size:0.82rem;">Get Directions</a>' +
        '</div>',
        { maxWidth: 250 }
      );

    /* Animated zoom-in on scroll */
    if (window.IntersectionObserver) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            map.flyTo([3.8160, 103.2870], 16, { duration: 2 });
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });
      obs.observe(mapEl);
    }
  }

  /*  Interactive Timetable  */
  function initTimetable() {
    var tabs = document.querySelectorAll(".timetable-tab");
    var grids = document.querySelectorAll(".timetable-content");
    if (!tabs.length || !grids.length) return;

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var target = tab.getAttribute("data-tab");

        tabs.forEach(function (t) { t.classList.remove("active"); });
        tab.classList.add("active");

        grids.forEach(function (grid) {
          var isTarget = grid.getAttribute("data-content") === target;
          grid.style.display = isTarget ? "grid" : "none";

          if (isTarget && window.gsap) {
            var cells = grid.querySelectorAll(".timetable-cell");
            window.gsap.from(cells, {
              scale: 0.8,
              opacity: 0,
              duration: 0.3,
              stagger: 0.015,
              ease: "back.out(1.7)"
            });
          }
        });
      });
    });
  }
  initTimetable();

  /*  3D Card Tilt  */
  function initCardTilt() {
    if (reducedMotion || window.innerWidth < 860) return;
    document.querySelectorAll(".card-3d").forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var rect = card.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width - 0.5;
        var y = (e.clientY - rect.top) / rect.height - 0.5;
        var inner = card.querySelector(".card-3d-inner") || card;
        inner.style.transform =
          "rotateY(" + (x * 12) + "deg) rotateX(" + (-y * 12) + "deg) translateZ(10px)";
      });
      card.addEventListener("mouseleave", function () {
        var inner = card.querySelector(".card-3d-inner") || card;
        inner.style.transform = "";
      });
    });
  }
  initCardTilt();

  /*  Text typing effect  */
  function initTypeWriter() {
    var el = document.querySelector("[data-typewriter]");
    if (!el) return;
    var text = el.getAttribute("data-typewriter");
    var speed = 50;
    el.textContent = "";
    var i = 0;
    function type() {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }

    if (window.IntersectionObserver) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { type(); obs.unobserve(entry.target); }
        });
      }, { threshold: 0.5 });
      obs.observe(el);
    } else {
      type();
    }
  }
  initTypeWriter();

  /*  Page transition  */
  function initPageTransition() {
    var overlay = document.querySelector(".page-transition");
    if (!overlay || !window.gsap) return;

    document.querySelectorAll('a[href]:not([href^="#"]):not([href^="mailto"]):not([href^="tel"]):not([target="_blank"])').forEach(function (link) {
      link.addEventListener("click", function (e) {
        var href = link.getAttribute("href");
        if (!href || href === "#") return;
        e.preventDefault();
        window.gsap.to(overlay, {
          scaleY: 1,
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: function () {
            window.location.href = href;
          }
        });
      });
    });

    /* Reveal on page load */
    window.gsap.fromTo(overlay,
      { scaleY: 1, transformOrigin: "top" },
      { scaleY: 0, duration: 0.5, ease: "power2.inOut", delay: 0.1 }
    );
  }

  /*  Particle system for hero  */
  function initHeroParticles() {
    var container = document.querySelector(".hero-particles");
    if (!container || reducedMotion) return;

    var particleCount = 30;
    for (var i = 0; i < particleCount; i++) {
      var particle = document.createElement("span");
      particle.style.cssText =
        "position:absolute;" +
        "width:" + (Math.random() * 4 + 2) + "px;" +
        "height:" + (Math.random() * 4 + 2) + "px;" +
        "background:rgba(79,179,255," + (Math.random() * 0.4 + 0.1) + ");" +
        "border-radius:50%;" +
        "left:" + (Math.random() * 100) + "%;" +
        "top:" + (Math.random() * 100) + "%;" +
        "pointer-events:none;";
      container.appendChild(particle);
    }

    if (window.anime) {
      window.anime({
        targets: container.children,
        translateY: function () { return window.anime.random(-40, 40); },
        translateX: function () { return window.anime.random(-30, 30); },
        opacity: [0.2, 0.8],
        scale: [0.5, 1.5],
        duration: function () { return window.anime.random(3000, 6000); },
        direction: "alternate",
        easing: "easeInOutSine",
        loop: true,
        delay: window.anime.stagger(100)
      });
    }
  }
  initHeroParticles();

  /*  Smooth reveal for profile cards  */
  function initProfileCardHover() {
    document.querySelectorAll(".person-card-enhanced, .profile-card").forEach(function (card) {
      card.addEventListener("mouseenter", function () {
        if (window.anime) {
          window.anime({
            targets: card.querySelector(".person-avatar, .role-tag"),
            scale: [1, 1.1],
            duration: 400,
            easing: "easeOutElastic(1, .5)"
          });
        }
      });
      card.addEventListener("mouseleave", function () {
        if (window.anime) {
          window.anime({
            targets: card.querySelector(".person-avatar, .role-tag"),
            scale: 1,
            duration: 300,
            easing: "easeOutQuad"
          });
        }
      });
    });
  }
  initProfileCardHover();

  /*  Fee Stage Tabs  */
  function initFeeTabs() {
    var tabs = document.querySelectorAll('.fee-stage-tab');
    var panels = document.querySelectorAll('.fee-detail-panel');
    if (!tabs.length) return;

    /* summary bar data keyed by tab id */
    var summaryData = {
      yr12:   { tuition: 'RM 18,000', electives: 'RM 5,800', exams: '', total: 'RM 27,600' },
      yr345:  { tuition: 'RM 21,000', electives: 'RM 5,900', exams: '', total: 'RM 30,700' },
      yr6:    { tuition: 'RM 21,000', electives: 'RM 5,900', exams: 'RM 1,436.40', total: 'RM 32,136.40' },
      yr7:    { tuition: 'RM 27,000', electives: 'RM 5,900', exams: '', total: 'RM 46,700' },
      yr8:    { tuition: 'RM 28,500', electives: 'RM 5,900', exams: '', total: 'RM 48,200' },
      yr9:    { tuition: 'RM 30,000', electives: 'RM 5,900', exams: 'RM 2,052', total: 'RM 51,752' },
      yr10:   { tuition: 'RM 31,500', electives: 'RM 5,500', exams: 'RM 3,319.92', total: 'RM 54,119.92' },
      yr11:   { tuition: 'RM 33,000', electives: 'RM 5,500', exams: 'RM 2,213.28', total: 'RM 54,513.28' },
      alevel: { tuition: 'RM 39,000', electives: 'RM 5,000', exams: 'RM 3,549.20', total: 'RM 61,349.20' }
    };

    function updateSummaryBar(key) {
      var d = summaryData[key];
      if (!d) return;
      var elT = document.getElementById('feeSumTuition');
      var elE = document.getElementById('feeSumElectives');
      var elX = document.getElementById('feeSumExams');
      var elTot = document.getElementById('feeSumTotal');
      if (elT) elT.textContent = d.tuition;
      if (elE) elE.textContent = d.electives;
      if (elX) elX.textContent = d.exams;
      if (elTot) elTot.textContent = d.total;
    }

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
        var key = tab.getAttribute('data-fee');
        panels.forEach(function (p) { p.style.display = 'none'; });
        var target = document.querySelector('[data-fee-content="' + key + '"]');
        if (target) target.style.display = 'block';
        updateSummaryBar(key);
      });
    });
  }

  /*  Module Card Expand  */
  function initModuleCards() {
    var cards = document.querySelectorAll('.module-card');
    if (!cards.length) return;
    cards.forEach(function (card) {
      card.addEventListener('click', function () {
        var isOpen = card.classList.contains('open');
        cards.forEach(function (c) { c.classList.remove('open'); });
        if (!isOpen) card.classList.add('open');
      });
    });
  }

  /*  Pathway Node Expand  */
  function initPathwayNodes() {
    var nodes = document.querySelectorAll('.pathway-node');
    if (!nodes.length) return;
    nodes.forEach(function (node) {
      function toggle() {
        var isOpen = node.classList.contains('open');
        nodes.forEach(function (n) { n.classList.remove('open'); });
        if (!isOpen) node.classList.add('open');
      }
      node.addEventListener('click', toggle);
      node.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
      });
    });
  }

  /*  Graduate Region Tabs  */
  function initGradTabs() {
    var tabs = document.querySelectorAll('.grad-tab');
    var regions = document.querySelectorAll('.grad-region-content');
    if (!tabs.length) return;
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
        var key = tab.getAttribute('data-region');
        regions.forEach(function (r) { r.classList.remove('active'); });
        var target = document.querySelector('[data-region-content="' + key + '"]');
        if (target) target.classList.add('active');
      });
    });
  }

  /*  Graduates Dark Map  */
  function initGraduatesMap() {
    var el = document.getElementById('graduates-map');
    if (!el || typeof L === 'undefined') return;
    var map = L.map('graduates-map', { scrollWheelZoom: false, zoomControl: true }).setView([20, 60], 2);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: ' OpenStreetMap  CARTO', maxZoom: 18
    }).addTo(map);
    var iskPos = [3.8077, 103.326];
    var universities = [
      { name: 'Monash University Malaysia', lat: 3.065, lng: 101.601 },
      { name: 'Taylor\'s University', lat: 3.152, lng: 101.628 },
      { name: 'Universiti Teknologi Malaysia', lat: 1.559, lng: 103.637 },
      { name: 'Universiti Malaya', lat: 3.121, lng: 101.656 },
      { name: 'Asia Pacific University', lat: 3.054, lng: 101.693 },
      { name: 'UCSI University', lat: 3.073, lng: 101.732 },
      { name: 'Dartmouth College', lat: 43.704, lng: -72.289 },
      { name: 'NYU', lat: 40.729, lng: -73.996 },
      { name: 'San Francisco State University', lat: 37.723, lng: -122.478 },
      { name: 'Deakin University', lat: -37.847, lng: 145.115 },
      { name: 'University of Adelaide', lat: -34.921, lng: 138.604 },
      { name: 'Monash University', lat: -37.911, lng: 145.135 },
      { name: 'University of Canterbury', lat: -43.523, lng: 172.584 },
      { name: 'RMIT', lat: -37.808, lng: 144.963 },
      { name: 'Qatar University', lat: 25.377, lng: 51.491 },
      { name: 'University of London', lat: 51.524, lng: -0.131 },
      { name: 'Concordia University', lat: 45.497, lng: -73.579 },
      { name: 'Trent University', lat: 44.36, lng: -78.29 }
    ];
    var iskIcon = L.divIcon({ className: 'grad-map-isk', html: '<div style="width:14px;height:14px;background:#1d71c9;border-radius:50%;box-shadow:0 0 12px rgba(29,113,201,.5);"></div>', iconSize: [14, 14] });
    L.marker(iskPos, { icon: iskIcon }).addTo(map).bindPopup('<strong>ISK</strong>');
    var uniIcon = L.divIcon({ className: 'grad-map-uni', html: '<div style="width:10px;height:10px;background:#4fb3ff;border-radius:50%;box-shadow:0 0 10px rgba(79,179,255,.5);"></div>', iconSize: [10, 10] });
    universities.forEach(function (u) {
      L.marker([u.lat, u.lng], { icon: uniIcon }).addTo(map).bindPopup(u.name);
      L.polyline([iskPos, [u.lat, u.lng]], { color: '#4fb3ff', weight: 1, opacity: 0.35, dashArray: '4 6' }).addTo(map);
    });
  }

  /*  Init all on DOM ready  */
  function initAll() {
    initGSAPEnhanced();
    initAnimeEnhanced();
    initGlobe();
    initLeafletMap();
    initPageTransition();
    initCardTilt();
    initTypeWriter();
    initProfileCardHover();
    initFeeTabs();
    initModuleCards();
    initPathwayNodes();
    initGradTabs();
    initGraduatesMap();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }
}());
