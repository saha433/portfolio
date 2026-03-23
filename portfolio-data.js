// portfolio-data.js
// Reads data saved by admin.html from localStorage and injects it into the page.
// Include this AFTER your main HTML sections via: <script src="portfolio-data.js"></script>

(function() {
  function getData(key, fallback) {
    try {
      const raw = localStorage.getItem('portfolio_' + key);
      return raw ? JSON.parse(raw) : fallback;
    } catch(e) { return fallback; }
  }

  // ── PROJECTS ──
  const projects = getData('projects', null);
  if (projects) {
    const container = document.getElementById('projects-container');
    if (container) {
      const gradients = [
        'linear-gradient(135deg,#082a1a,#0e4a2a)',
        'linear-gradient(135deg,#0d1f40,#152e5c)',
        'linear-gradient(135deg,#2a1a0d,#4a2e0d)',
        'linear-gradient(135deg,#1a0d2a,#2e1a40)',
        'linear-gradient(135deg,#0d2a0d,#1a4a1a)',
        'linear-gradient(135deg,#2a0d0d,#4a1a1a)',
      ];
      const emojis = ['📈','🧠','📊','🤖','🗂️','🔬'];
      const barHeights = [
        [40,70,50,90,60,80],[65,45,85,55,75,95],[55,80,40,70,95,60],
        [75,50,90,65,45,85],[45,85,60,40,75,55],[60,75,45,85,50,90]
      ];
      container.innerHTML = projects.map((p, i) => {
        const g = gradients[i % gradients.length];
        const emoji = emojis[i % emojis.length];
        const bars = barHeights[i % barHeights.length];
        const imgHTML = p.image
          ? `<img src="${p.image}" style="width:100%;height:100%;object-fit:cover;border-radius:6px;">`
          : `${emoji}<div class="card-bars">${bars.map(h=>`<div class="card-bar" style="height:${h}%"></div>`).join('')}</div>`;
        const bg = p.image ? 'background:none;' : `background:${g};`;
        const onclick = p.link ? `onclick="window.open('${p.link}','_blank')"` : '';
        return `
          <div class="card" ${onclick}>
            <div class="card-img" style="${bg}">${imgHTML}</div>
            <button class="card-play"><svg viewBox="0 0 24 24"><path d="M7.05 3.606l13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"/></svg></button>
            <div class="card-title">${p.title}</div>
            <div class="card-desc">${p.desc}</div>
            <div class="card-tags">${p.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
          </div>`;
      }).join('');
    }
  }

  // ── WORK EXPERIENCE ──
  const work = getData('work', null);
  if (work) {
    const container = document.getElementById('work-container');
    if (container) {
      container.innerHTML = work.map((w, i) => `
        <div class="track ${i===0?'now':''}">
          <div class="t-num" ${i===0?'style="color:var(--green)"':''}>${i===0?'▶':i+1}</div>
          <div class="t-info">
            <div class="t-thumb" style="background:linear-gradient(135deg,#082a1a,#1DB954)">📊</div>
            <div class="t-text">
              <div class="t-name">${w.role}</div>
              <div class="t-sub">${w.company}</div>
            </div>
          </div>
          <div><span class="t-badge ${i===0?'':'gray'}">${w.type}</span></div>
          <div class="t-dur">${w.duration}</div>
          <div class="t-desc"><strong>${w.role} @ ${w.company}</strong>${w.desc}</div>
        </div>`).join('');
    }
  }

  // ── EDUCATION ──
  const education = getData('education', null);
  if (education) {
    const container = document.getElementById('education-container');
    if (container) {
      container.innerHTML = education.map((e, i) => `
        <div class="track ${i===0?'now':''}">
          <div class="t-num" ${i===0?'style="color:var(--green)"':''}>${i===0?'▶':i+1}</div>
          <div class="t-info">
            <div class="t-thumb" style="background:linear-gradient(135deg,#2a0d3a,#1DB954,#0d3a1a)">🎓</div>
            <div class="t-text">
              <div class="t-name">${e.degree}</div>
              <div class="t-sub">${e.school}</div>
            </div>
          </div>
          <div><span class="t-badge ${e.type==='Ongoing'?'':'gray'}">${e.type}</span></div>
          <div class="t-dur">${e.duration}</div>
          <div class="t-desc"><strong>${e.degree}</strong> · ${e.school}<br>${e.desc}</div>
        </div>`).join('');
    }
  }

  // ── HOBBIES ──
  const hobbies = getData('hobbies', null);
  if (hobbies) {
    const container = document.getElementById('hobbies-container');
    if (container) {
      container.innerHTML = hobbies.map(h => `
        <div class="hobby-item">
          <div class="hobby-icon">${h.icon}</div>
          <div><div class="hobby-name">${h.name}</div><div class="hobby-sub">${h.sub}</div></div>
        </div>`).join('');
    }
  }

  // ── ABOUT ──
  const about = getData('about', null);
  if (about) {
    const bio = document.getElementById('about-bio-text');
    const looking = document.getElementById('about-looking-text');
    const status = document.getElementById('about-status-text');
    const s1n = document.getElementById('stat1-num');
    const s1l = document.getElementById('stat1-lbl');
    const s2n = document.getElementById('stat2-num');
    const s2l = document.getElementById('stat2-lbl');
    if (bio) bio.innerHTML = about.bio.replace(/\n\n/g,'<br><br>');
    if (looking) looking.textContent = about.looking;
    if (status) status.textContent = about.status;
    if (s1n) s1n.textContent = about.stat1n;
    if (s1l) s1l.textContent = about.stat1l;
    if (s2n) s2n.textContent = about.stat2n;
    if (s2l) s2l.textContent = about.stat2l;
  }
})();