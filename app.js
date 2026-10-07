/* Ryze Club — clickable prototype. Exploratory: example data, nothing is saved to a server. */
(() => {
  const KEY = 'ryze-proto-v1';
  const AREAS = ['Marina', 'JVC', 'Dubai Hills', 'Downtown', 'Jumeirah', 'Palm', 'Mirdif'];
  const SPORTS = { running: 'Running', padel: 'Padel', yoga: 'Yoga & pilates' };
  const LEVELS = { new: 'New to it', some: 'Some experience', regular: 'Regular' };
  const DAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const DAYL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const PEOPLE = ['Layla H.', 'Omar S.', 'Sana K.', 'Jonas P.', 'Mei L.', 'Farah A.', 'Tom R.', 'Aisha N.', 'Diego M.', 'Priya V.'];
  const NOUN = { running: 'run', padel: 'padel', yoga: 'session' };

  // Example clubs. None of these are real.
  const CLUBS = [
    { id: 'mdr', name: 'Marina Dawn Runners', sport: 'running', area: 'Marina', levels: ['new', 'some', 'regular'], cost: 'Free', level: 'Pace groups from 5:00 to 7:00 per km', photos: 3, confirmed: 4,
      desc: 'Three early runs a week along Marina Walk, with a slow group that nobody gets dropped from. Coffee after on Saturdays.', bring: 'Water. Lights are on along the route.',
      sched: [{ d: 2, t: '05:45', type: 'Intervals', note: 'All paces', place: 'Marina Walk, by Pier 7' }, { d: 4, t: '05:45', type: '5 km easy', note: '6:30–7:00 per km', place: 'Marina Walk, by Pier 7' }, { d: 6, t: '06:30', type: 'Long run', note: '10–16 km', place: 'Marina Walk, by Pier 7' }],
      top: [['Layla H.', 12], ['Omar S.', 11], ['Sana K.', 9], ['Jonas P.', 8], ['Mei L.', 8]], active: 41 },
    { id: 'pbr', name: 'Palm Boardwalk Run Crew', sport: 'running', area: 'Palm', levels: ['some', 'regular'], cost: 'Free', level: '5:00–6:00 per km', photos: 3, confirmed: 9,
      desc: 'Out-and-back runs on the Palm boardwalk at a steady pace. Best if you can already run 5 km without stopping.', bring: 'Water and a head torch for evening runs.',
      sched: [{ d: 1, t: '19:30', type: '8 km steady', note: '5:30 per km', place: 'Boardwalk, west entrance' }, { d: 5, t: '06:15', type: '10 km', note: 'Two pace groups', place: 'Boardwalk, west entrance' }],
      top: [['Tom R.', 12], ['Aisha N.', 10], ['Diego M.', 7]], active: 26 },
    { id: 'dbr', name: 'Downtown Boulevard Runners', sport: 'running', area: 'Downtown', levels: ['new', 'some'], cost: 'Free', level: 'Walk-run and easy pace', photos: 2, confirmed: 2,
      desc: 'A friendly loop of the Boulevard. The Wednesday session has a walk-run group for people starting out.', bring: 'Water.',
      sched: [{ d: 3, t: '06:00', type: 'Walk-run', note: 'Beginners', place: 'Boulevard, by the fountain steps' }, { d: 0, t: '06:30', type: '5 km social', note: 'Easy pace', place: 'Boulevard, by the fountain steps' }],
      top: [['Priya V.', 11], ['Farah A.', 9], ['Jonas P.', 6]], active: 33 },
    { id: 'hpr', name: 'Hills Park Run Social', sport: 'running', area: 'Dubai Hills', levels: ['new', 'some', 'regular'], cost: 'Free', level: 'All paces', photos: 3, confirmed: 6, cancelNext: true,
      desc: 'Saturday laps of the park loop followed by breakfast. Buggies and dogs welcome.', bring: 'Water.',
      sched: [{ d: 6, t: '06:30', type: 'Park laps', note: 'All paces', place: 'Dubai Hills Park, main gate' }, { d: 2, t: '18:30', type: 'Sunset 5 km', note: 'Easy', place: 'Dubai Hills Park, main gate' }],
      top: [['Mei L.', 12], ['Tom R.', 9]], active: 29 },
    { id: 'jps', name: 'JVC Padel Social', sport: 'padel', area: 'JVC', levels: ['new', 'some'], cost: 'Court share, about AED 60', level: 'Beginner to lower intermediate', photos: 3, confirmed: 5,
      desc: 'Rotating doubles so you play with everyone. Come alone; partners are mixed on the night.', bring: 'A racket if you have one. Spares are available.',
      sched: [{ d: 0, t: '19:00', type: 'Social mixer', note: 'Mixed level', place: 'JVC Community Courts, court 3', cap: 16 }, { d: 3, t: '20:00', type: 'Beginner night', note: 'New players', place: 'JVC Community Courts, court 3', cap: 12 }],
      top: [['Diego M.', 11], ['Aisha N.', 10], ['Sana K.', 8]], active: 38 },
    { id: 'jpm', name: 'Jumeirah Padel Mixers', sport: 'padel', area: 'Jumeirah', levels: ['some', 'regular'], cost: 'Court share, about AED 70', level: 'Intermediate', photos: 2, confirmed: 12, fullNext: true,
      desc: 'Competitive but friendly doubles. Winners move up a court.', bring: 'Your own racket.',
      sched: [{ d: 2, t: '20:00', type: 'King of the court', note: 'Intermediate', place: 'Beach Road Padel, courts 1–3', cap: 12 }, { d: 5, t: '18:00', type: 'Friday ladder', note: 'Intermediate', place: 'Beach Road Padel, courts 1–3', cap: 12 }],
      top: [['Omar S.', 12], ['Layla H.', 9]], active: 22 },
    { id: 'mpb', name: 'Mirdif Padel Beginners', sport: 'padel', area: 'Mirdif', levels: ['new'], cost: 'Court share, about AED 50', level: 'Never played is fine', photos: 2, confirmed: 8,
      desc: 'A patient group for first-timers. The first 20 minutes cover the basics.', bring: 'Trainers. Rackets provided.',
      sched: [{ d: 5, t: '18:00', type: 'Learn and play', note: 'First-timers', place: 'Mirdif Sports Hub, court 2', cap: 12 }],
      top: [['Farah A.', 10], ['Priya V.', 7]], active: 19 },
    { id: 'kbf', name: 'Kite Beach Sunrise Flow', sport: 'yoga', area: 'Jumeirah', levels: ['new', 'some', 'regular'], cost: 'Free', level: 'Open level', photos: 3, confirmed: 3,
      desc: 'An hour of yoga on the sand as the sun comes up. Bring a towel if you do not have a mat.', bring: 'Mat or towel, water.',
      sched: [{ d: 6, t: '06:45', type: 'Sunrise flow', note: 'Open level', place: 'Kite Beach, north end by the showers' }, { d: 3, t: '06:30', type: 'Stretch and breathe', note: 'Gentle', place: 'Kite Beach, north end by the showers' }],
      top: [['Aisha N.', 12], ['Mei L.', 11], ['Sana K.', 8]], active: 35 },
    { id: 'mpp', name: 'Marina Mat Pilates in the Park', sport: 'yoga', area: 'Marina', levels: ['new', 'some'], cost: 'AED 20 towards the instructor', level: 'Beginner friendly', photos: 2, confirmed: 71,
      desc: 'Mat pilates on the grass with a small speaker and a patient teacher.', bring: 'Mat, water.',
      sched: [{ d: 1, t: '18:30', type: 'Mat pilates', note: 'Beginner friendly', place: 'Marina Promenade lawn' }],
      top: [['Priya V.', 6]], active: 9 },
    { id: 'hsy', name: 'Hills Sunset Yoga', sport: 'yoga', area: 'Dubai Hills', levels: ['new', 'some', 'regular'], cost: 'Free', level: 'Open level', photos: 0, confirmed: 1,
      desc: 'A new group that started this month. Slow evening practice on the park lawn.', bring: 'Mat, water.',
      sched: [{ d: 4, t: '18:00', type: 'Sunset practice', note: 'Open level', place: 'Dubai Hills Park, east lawn' }],
      top: [], active: 6 }
  ];

  const MS = [
    { id: 's1', b: '1st', t: 'First session', k: 'total', n: 1, line: 'First session done. Welcome to the club.' },
    { id: 'w4', b: '4w', t: '4 weeks in a row', k: 'streak', n: 4, line: 'Four weeks in a row. It is becoming a routine.' },
    { id: 'w12', b: '12w', t: '12 weeks in a row', k: 'streak', n: 12, line: '12 weeks in a row. That’s a habit.' },
    { id: 'w26', b: '26w', t: '26 weeks in a row', k: 'streak', n: 26, line: 'Half a year of showing up.' },
    { id: 'w52', b: '52w', t: '52 weeks in a row', k: 'streak', n: 52, line: 'A full year. Every single week.' },
    { id: 'w104', b: '2y', t: '104 weeks in a row', k: 'streak', n: 104, line: 'Two years without missing a week.' },
    { id: 't25', b: '25', t: '25 sessions', k: 'total', n: 25, line: '25 sessions with your clubs.' },
    { id: 't100', b: '100', t: '100 sessions', k: 'total', n: 100, line: '100 sessions. You are part of the furniture.' },
    { id: 't250', b: '250', t: '250 sessions', k: 'total', n: 250, line: '250 sessions.' },
    { id: 't500', b: '500', t: '500 sessions', k: 'total', n: 500, line: '500 sessions.' }
  ];

  const fresh = () => ({ user: null, quiz: {}, rsvps: [], follows: [], att: {}, streak: 0, longest: 0, total: 0, weekDone: false, prot: true, sinceProt: 0, badges: [], posts: {}, untag: {}, offset: 0, clubWeeks: {}, set: { standings: true, tagging: true, email: true, wa: false }, note: '' });
  let S = fresh();
  try { const raw = localStorage.getItem(KEY); if (raw) S = Object.assign(fresh(), JSON.parse(raw)); } catch (e) { /* storage unavailable */ }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* ignore */ } };

  // view state (not saved)
  let route = { v: 'home' };
  let stack = [];
  let overlay = null;
  let toast = null;
  let toastTimer = null;
  let filt = { sport: '', area: '', day: '', level: '' };

  // ---------- helpers ----------
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const now = () => new Date(Date.now() + S.offset);
  const ymd = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const hash = (s) => { let h = 7; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 100003; return h; };
  const club = (id) => CLUBS.find((c) => c.id === id);
  const day0 = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const weekStart = (d) => { const x = day0(d); x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); return x; };
  const sameWeek = (a, b) => weekStart(a).getTime() === weekStart(b).getTime();
  const dateShort = (d) => `${DAY[d.getDay()]} ${d.getDate()} ${MON[d.getMonth()]}`;
  const dayWord = (d) => { const diff = Math.round((day0(d) - day0(now())) / 864e5); return diff === 0 ? 'Today' : diff === 1 ? 'Tomorrow' : dateShort(d); };
  const initials = (n) => n.split(' ').map((p) => p[0]).join('').slice(0, 2);
  const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;

  function mk(c, d, s) {
    const [h, m] = s.t.split(':').map(Number);
    return Object.assign({ id: `${c.id}|${ymd(d)}|${s.t}`, club: c, at: new Date(d.getFullYear(), d.getMonth(), d.getDate(), h, m) }, s);
  }
  function sessions(c, from = -8, to = 14) {
    const out = []; const n = now();
    for (let i = from; i <= to; i++) {
      const d = new Date(n.getFullYear(), n.getMonth(), n.getDate() + i);
      c.sched.forEach((s) => { if (s.d === d.getDay()) out.push(mk(c, d, s)); });
    }
    return out.sort((a, b) => a.at - b.at);
  }
  function byId(id) {
    const [cid, date, t] = id.split('|'); const c = club(cid); if (!c) return null;
    const [y, mo, da] = date.split('-').map(Number); const d = new Date(y, mo - 1, da);
    const s = c.sched.find((x) => x.t === t && x.d === d.getDay());
    return s ? mk(c, d, s) : null;
  }
  const future = (c) => sessions(c, 0, 14).filter((s) => s.at > now());
  const past = (c) => sessions(c, -8, 0).filter((s) => s.at <= now()).reverse();
  const isCancelled = (s) => { if (!s.club.cancelNext || has(s.id)) return false; const f = future(s.club)[0]; return !!f && f.id === s.id; };
  const has = (id) => S.rsvps.includes(id);
  function going(s) {
    const base = 8 + (hash(s.id) % 15);
    if (s.cap) {
      const f = future(s.club)[0];
      if (s.club.fullNext && f && f.id === s.id && !has(s.id)) return s.cap;
      return Math.min(s.cap, Math.min(base, s.cap - 2) + (has(s.id) ? 1 : 0));
    }
    return base + (has(s.id) ? 1 : 0);
  }
  const isFull = (s) => !!s.cap && going(s) >= s.cap && !has(s.id);
  const nextOpen = (c) => future(c).find((s) => !isCancelled(s));
  const people = (s, n) => { const k = hash(s.id); return Array.from({ length: n }, (_, i) => PEOPLE[(k + i * 3) % PEOPLE.length]); };
  const ended = (s) => now() - s.at > 2 * 36e5;
  const stale = (c) => c.confirmed >= 60;
  const confirmedOn = (c) => { const d = now(); d.setDate(d.getDate() - c.confirmed); return `${d.getDate()} ${MON[d.getMonth()]}`; };
  const nounFor = (s) => `${DAYL[s.at.getDay()]}’s ${NOUN[s.club.sport]}`;

  function say(msg, undo) { toast = { msg, undo }; clearTimeout(toastTimer); toastTimer = setTimeout(() => { toast = null; render(); }, 4500); }
  function go(v, p = {}, replace = false) { if (!replace) stack.push(route); route = Object.assign({ v }, p); overlay = null; render(); window.scrollTo(0, 0); }
  function back() { route = stack.pop() || { v: S.user ? 'me' : 'home' }; overlay = null; render(); }

  // ---------- pieces ----------
  const photo = (g, label = 'photo', extra = '') => `<span class="ph g${g}" ${extra}>${esc(label)}</span>`;
  function clubCard(c, why) {
    const n = nextOpen(c);
    const head = c.photos ? `<span class="ph g${1 + (hash(c.id) % 6)}">photo</span>` : `<span class="fallback"><span class="cap">${SPORTS[c.sport]} · ${c.area}</span></span>`;
    return `<button class="card" data-act="club" data-id="${c.id}">${head}<span class="body">
      <span class="disp" style="font-size:14px;font-weight:700">${c.name}</span>
      ${why ? `<span class="why sm">${why}</span>` : `<span class="mut sm">${SPORTS[c.sport]} · ${c.area} · ${c.cost === 'Free' ? 'Free' : 'Paid'}</span>`}
      <span class="sm">${n ? `Next: ${dayWord(n.at)} ${n.t} · ${going(n)} going` : 'No session scheduled'}</span>
    </span></button>`;
  }
  function sessionRow(s, showClub) {
    let tag = '';
    if (isCancelled(s)) tag = '<span class="tag warn">Cancelled</span>';
    else if (has(s.id)) tag = '<span class="tag go">Going</span>';
    else if (isFull(s)) tag = '<span class="tag">Full</span>';
    else tag = '<span class="tag">RSVP</span>';
    return `<button class="item" data-act="session" data-id="${s.id}">
      <span class="when"><b>${dayWord(s.at) === 'Today' || dayWord(s.at) === 'Tomorrow' ? dayWord(s.at) : DAY[s.at.getDay()] + ' ' + s.at.getDate()}</b><span class="mut sm">${s.t}</span></span>
      <span class="grow"><b>${showClub ? s.club.name : s.type}</b><br><span class="mut sm">${showClub ? s.type + ' · ' : ''}${s.note}</span></span>${tag}</button>`;
  }
  function avatars(names) { return `<span class="avs">${names.map((n) => `<span class="av">${initials(n)}</span>`).join('')}</span>`; }

  function match() {
    const q = S.quiz; const pool = CLUBS.filter((c) => c.sport === q.sport);
    const scored = pool.map((c) => {
      const a = !q.area || q.area === 'Anywhere in Dubai' || c.area === q.area; const l = c.levels.includes(q.level);
      const bits = [];
      bits.push(a ? (q.area && q.area !== 'Anywhere in Dubai' ? `In ${c.area}` : c.area) : `${c.area}, a drive away`);
      bits.push(l ? (q.level === 'new' ? 'Beginners welcome' : q.level === 'some' ? 'Suits some experience' : 'Regulars train here') : (c.levels.includes('new') ? 'Mostly beginners' : 'More experienced group'));
      return { c, a, l, score: (a ? 2 : 0) + (l ? 2 : 0), why: bits.join(' · ') };
    }).sort((x, y) => y.score - x.score);
    return { exact: scored.filter((x) => x.a && x.l), all: scored };
  }

  // ---------- member logic ----------
  function doRsvp(id) {
    if (!has(id)) S.rsvps.push(id);
    const cid = id.split('|')[0]; if (!S.follows.includes(cid)) S.follows.push(cid);
    save();
  }
  function pending() {
    return S.rsvps.map(byId).filter((s) => s && ended(s) && !S.att[s.id] && now() - s.at < 7 * 864e5).sort((a, b) => a.at - b.at);
  }
  function comingUp() {
    const mine = S.rsvps.map(byId).filter((s) => s && !ended(s));
    const ids = new Set(mine.map((s) => s.id));
    const others = S.follows.flatMap((cid) => sessions(club(cid), 0, 7)).filter((s) => s.at > now() && !ids.has(s.id));
    return mine.concat(others).sort((a, b) => a.at - b.at).slice(0, 6);
  }
  function wentThisWeek() { return Object.keys(S.att).filter((id) => S.att[id] === 'went').map(byId).filter((s) => s && sameWeek(s.at, now())); }
  function confirmWent(id) {
    const s = byId(id); if (!s) return;
    const firstAtClubThisWeek = !wentThisWeek().some((x) => x.club.id === s.club.id);
    S.att[id] = 'went'; S.total += 1;
    if (firstAtClubThisWeek) S.clubWeeks[s.club.id] = (S.clubWeeks[s.club.id] || 0) + 1;
    let weekJustDone = false;
    if (!S.weekDone) { S.weekDone = true; S.streak += 1; S.sinceProt += 1; weekJustDone = true; if (!S.prot && S.sinceProt >= 4) S.prot = true; }
    S.longest = Math.max(S.longest, S.streak);
    const earned = MS.filter((m) => !S.badges.includes(m.id) && (m.k === 'total' ? S.total >= m.n : S.streak >= m.n));
    earned.forEach((m) => S.badges.push(m.id));
    S.note = ''; save();
    go('result', { id, weekJustDone }, true);
    if (earned.length) { overlay = { t: 'milestone', id: earned[earned.length - 1].id, club: s.club.name }; render(); }
  }
  function endWeek() {
    const n = now(); const nextMon = weekStart(n); nextMon.setDate(nextMon.getDate() + 7); nextMon.setHours(8, 0, 0, 0);
    S.offset += nextMon - n;
    if (S.weekDone) { S.note = ''; }
    else if (S.streak > 0 && S.prot) { S.prot = false; S.sinceProt = 0; S.note = `Your protection covered last week. Streak safe at ${S.streak}. It returns after 4 weeks in a row.`; }
    else if (S.streak > 0) { S.note = `Your streak ended at ${plural(S.streak, 'week')}. A new one starts with your next session.`; S.streak = 0; S.sinceProt = 0; }
    S.weekDone = false; save();
  }

  // ---------- views ----------
  const V = {};

  V.home = () => `<main>
    <div class="stack"><h1>Find your people. Keep showing up.</h1>
      <p class="mut">Free community clubs across Dubai for running, padel, yoga and pilates. Answer three questions and see the ones that fit you.</p></div>
    <div class="stack"><button class="btn block" data-act="quiz">Find my club</button>
      <button class="btn ghost block" data-act="browse">Browse all clubs</button></div>
    <div class="stack"><span class="cap">This week in Dubai</span>${[club('mdr'), club('jps'), club('kbf')].map((c) => clubCard(c)).join('')}</div>
    <p class="note">This is a prototype. The clubs, people and photos are examples, and nothing you do here is sent anywhere. Use <b>Demo</b> at the top to skip ahead in time.</p>
    <p class="center sm"><button class="link" data-act="soon" data-what="Tools for club organisers come in the next version of this prototype.">List your club</button></p>
  </main>`;

  V.quiz = () => {
    const step = route.step || 0;
    const head = `<div class="row sp"><button class="link" data-act="${step ? 'quizback' : 'back'}">Back</button><span class="mut sm">${step + 1} of 3</span></div>`;
    if (step === 0) return `<main>${head}<h1>What gets you moving?</h1><div class="quiz-opts">
      <button class="quiz-opt g1" data-act="q" data-k="sport" data-val="running">Running</button>
      <button class="quiz-opt g2" data-act="q" data-k="sport" data-val="padel">Padel</button>
      <button class="quiz-opt g4" data-act="q" data-k="sport" data-val="yoga">Yoga &amp; pilates</button></div>
      <p class="mut sm center">No account needed.</p></main>`;
    if (step === 1) return `<main>${head}<h1>Where are you based?</h1><div class="quiz-opts">
      ${AREAS.concat(['Anywhere in Dubai']).map((a) => `<button class="quiz-opt plain" data-act="q" data-k="area" data-val="${a}">${a}</button>`).join('')}</div></main>`;
    return `<main>${head}<h1>How would you describe yourself?</h1><div class="quiz-opts">
      ${Object.keys(LEVELS).map((k) => `<button class="quiz-opt plain" data-act="q" data-k="level" data-val="${k}">${LEVELS[k]}</button>`).join('')}</div></main>`;
  };

  V.results = () => {
    const m = match(); const q = S.quiz;
    const top = m.exact.slice(0, 3);
    const near = m.all.filter((x) => !top.includes(x)).slice(0, 3 - top.length);
    const title = top.length ? `${top.length} ${top.length === 1 ? 'club fits' : 'clubs fit'} you` : 'No clubs match all three yet';
    return `<main><div class="row sp"><button class="link" data-act="quiz">Change answers</button></div>
      <div class="stack tight"><h1>${title}</h1><p class="mut">${SPORTS[q.sport]} · ${q.area} · ${LEVELS[q.level]}</p>
      ${m.exact.length ? '' : '<p class="note">These are the nearest. Each one says how it differs from what you asked for.</p>'}</div>
      ${top.length ? `<div class="stack">${top.map((x) => clubCard(x.c, x.why)).join('')}</div>` : ''}
      ${near.length ? `<div class="stack">${top.length ? '<span class="cap">Close, but not an exact fit</span>' : ''}${near.map((x) => clubCard(x.c, x.why)).join('')}</div>` : ''}
      <button class="btn ghost block" data-act="browse" data-sport="${q.sport}">See all ${SPORTS[q.sport].toLowerCase()} clubs</button></main>`;
  };

  V.browse = () => {
    const list = CLUBS.filter((c) => (!filt.sport || c.sport === filt.sport) && (!filt.area || c.area === filt.area) && (!filt.level || c.levels.includes(filt.level)) && (filt.day === '' || c.sched.some((s) => String(s.d) === filt.day)));
    const opt = (v, l, cur) => `<option value="${v}" ${String(cur) === String(v) ? 'selected' : ''}>${l}</option>`;
    return `<main class="${S.user ? 'pad-nav' : ''}"><h1>All clubs</h1>
      <div class="wrap">${[['', 'All']].concat(Object.entries(SPORTS)).map(([k, l]) => `<button class="chip ${filt.sport === k ? 'on' : ''}" data-act="filt" data-k="sport" data-val="${k}">${l}</button>`).join('')}</div>
      <div class="wrap">
        <select id="f-area" data-filt="area" aria-label="Area">${opt('', 'Any area', filt.area)}${AREAS.map((a) => opt(a, a, filt.area)).join('')}</select>
        <select id="f-day" data-filt="day" aria-label="Day">${opt('', 'Any day', filt.day)}${[1, 2, 3, 4, 5, 6, 0].map((d) => opt(d, DAYL[d], filt.day)).join('')}</select>
        <select id="f-level" data-filt="level" aria-label="Level">${opt('', 'Any level', filt.level)}${Object.entries(LEVELS).map(([k, l]) => opt(k, l, filt.level)).join('')}</select>
      </div>
      <div class="stack">${list.length ? list.map((c) => clubCard(c)).join('') : `<p class="note">Nothing matches those filters yet.</p><button class="btn ghost" data-act="clearfilt">Clear filters</button>`}</div></main>`;
  };

  V.club = () => {
    const c = club(route.id); const n = nextOpen(c); const fut = future(c).slice(0, 4); const recaps = past(c).slice(0, 2);
    const k = hash(c.id); const following = S.follows.includes(c.id);
    const head = c.photos ? `<div class="mosaic">${[0, 1, 2].map((i) => `<button class="ph g${1 + ((k + i) % 6)}" data-act="photo" data-g="${1 + ((k + i) % 6)}" data-by="${PEOPLE[(k + i) % 10]}" data-club="${c.id}">${i === 0 && recaps[0] ? dateShort(recaps[0].at) : 'photo'}</button>`).join('')}</div>`
      : `<div class="fallback"><span class="cap">${SPORTS[c.sport]} · ${c.area}</span><span class="disp" style="font-size:18px;font-weight:700">${n ? `${dayWord(n.at)} ${n.t}` : 'No session scheduled'}</span><span class="mut sm">No photos yet. They appear here after the first session.</span></div>`;
    const who = n ? (S.user ? `${avatars(people(n, 4))}<span class="sm"><b>${people(n, 2).map((p) => p.split(' ')[0]).join(', ')}</b> and ${going(n) - 2} others are going ${dayWord(n.at)}</span>` : `<span class="sm"><b>${going(n)} going</b> ${dayWord(n.at)} · sign in to see who</span>`) : '';
    const recapHtml = recaps.map((s, i) => {
      const mine = (S.posts[s.id] || []).flatMap((p) => p.g.map((g) => ({ g, by: 'You', cap: p.cap, mine: true })));
      const ex = c.photos ? [0, 1, 2].slice(0, c.photos).map((j) => ({ g: 1 + ((k + i * 2 + j + 3) % 6), by: PEOPLE[(k + j + i) % 10] })) : [];
      const all = mine.concat(ex).slice(0, 6);
      return `<div class="stack tight"><div class="row sp sm"><b>${dateShort(s.at)} · ${s.type}</b><span class="mut">${all.length ? plural(all.length, 'photo') + ' · ' : ''}${going(s) - 1} came</span></div>
        ${all.length ? `<div class="strip">${all.map((p) => `<button class="ph g${p.g}" data-act="photo" data-g="${p.g}" data-by="${p.by}" data-sid="${s.id}" ${p.mine ? 'data-mine="1"' : ''}>${p.mine ? 'yours' : 'photo'}</button>`).join('')}</div>` : '<p class="mut sm">No photos from this one.</p>'}</div>`;
    }).join('');
    const top = c.top.length ? `<div class="stack tight"><span class="cap">Most consistent · last 12 weeks</span><p class="sm mut">${c.active} members showed up in the last 4 weeks.</p>
      ${S.user ? `<div>${c.top.map((r, i) => `<div class="rank"><b>${i + 1}</b><span>${r[0]}</span><span>${r[1]} weeks</span></div>`).join('')}${S.clubWeeks[c.id] ? `<div class="rank me"><b>·</b><span>You${S.set.standings ? '' : ' (hidden from others)'}</span><span>${plural(S.clubWeeks[c.id], 'week')}</span></div>` : ''}</div>` : '<p class="note">Sign in to see the standings.</p>'}</div>` : '';
    let bar;
    if (!n) bar = `<div class="info"><b>No session scheduled</b><br><span class="mut sm">Follow to hear when one is added</span></div><button class="btn" data-act="follow" data-id="${c.id}">${following ? 'Following' : 'Follow'}</button>`;
    else if (has(n.id)) bar = `<button class="info" data-act="session" data-id="${n.id}"><b>${dayWord(n.at)} · ${n.t}</b><br><span class="mut sm">${n.place}</span></button><button class="btn quiet" data-act="session" data-id="${n.id}">You're going</button>`;
    else if (isFull(n)) { const after = future(c).find((s) => s.id !== n.id && !isCancelled(s)); bar = `<button class="info" data-act="session" data-id="${n.id}"><b>${dayWord(n.at)} · ${n.t}</b><br><span class="mut sm">Full · ${n.cap} of ${n.cap}</span></button>${after ? `<button class="btn ghost" data-act="session" data-id="${after.id}">See next session</button>` : ''}`; }
    else bar = `<button class="info" data-act="session" data-id="${n.id}"><b>${dayWord(n.at)} · ${n.t}</b><br><span class="mut sm">${n.place}</span></button><button class="btn" data-act="rsvp" data-id="${n.id}">I'm in</button>`;
    return `<main class="flush pad-bar">${head}
      <div class="stack tight"><h1 style="font-size:21px">${c.name}</h1><p class="mut sm">${SPORTS[c.sport]} · ${c.area} · ${c.cost}${c.levels.includes('new') ? ' · Beginners welcome' : ''}</p>
        ${stale(c) ? `<p class="notice">This page hasn't been confirmed since ${confirmedOn(c)}. Check with the club before you go.</p>` : ''}</div>
      ${who ? `<div class="row">${who}</div>` : ''}
      <div class="row"><button class="btn small ${following ? 'quiet' : 'ghost'}" data-act="follow" data-id="${c.id}">${following ? 'Following' : 'Follow this club'}</button></div>
      <div class="stack tight"><p>${c.desc}</p><p class="sm mut">${c.level}. Bring: ${c.bring}</p></div>
      <div class="stack tight"><span class="cap">Coming up</span><div>${fut.map((s) => sessionRow(s)).join('') || '<p class="mut sm">Nothing scheduled.</p>'}</div></div>
      ${recapHtml ? `<div class="stack"><span class="cap">Recent sessions</span>${recapHtml}</div>` : ''}
      ${top}
      <div class="stack tight sm"><div class="wrap"><button class="link" data-act="soon" data-what="This would open the club's Instagram.">Instagram</button><button class="link" data-act="soon" data-what="This would open the club's WhatsApp group.">WhatsApp group</button></div>
        <span class="mut">Last confirmed by the organiser on ${confirmedOn(c)}</span>
        <span><button class="link" data-act="soon" data-what="Thanks. In the real product this goes to the Ryze Club curator.">Report a problem with this page</button> · <button class="link" data-act="soon" data-what="Organiser tools come in the next version of this prototype.">Is this your club?</button></span></div>
    </main><div class="bar">${bar}</div>`;
  };

  V.confirm = () => {
    const s = byId(route.id);
    return `<main><div class="stack tight"><h1>You're in.</h1><p class="mut">${s.club.name}</p></div>
      <dl class="facts"><dt>When</dt><dd>${dayWord(s.at)} at ${s.t}</dd><dt>Where</dt><dd>${s.place}</dd><dt>What</dt><dd>${s.type} · ${s.note}</dd><dt>Going</dt><dd>${going(s)} people</dd></dl>
      <div><label class="switch" for="set-email"><span>Remind me by email</span><input type="checkbox" id="set-email" data-set="email" ${S.set.email ? 'checked' : ''}></label>
        <label class="switch" for="set-wa"><span>Remind me on WhatsApp<br><span class="mut sm">We'll only message you about sessions you've joined. Turn it off any time.</span></span><input type="checkbox" id="set-wa" data-set="wa" ${S.set.wa ? 'checked' : ''}></label></div>
      <p class="note">First time? Arrive 10 minutes early and say hi to the organiser. You'll get a reminder ${s.at.getHours() < 10 ? 'at 19:00 the evening before' : 'three hours before'}.</p>
      <div class="stack"><button class="btn block" data-act="me">Go to my week</button><button class="btn ghost block" data-act="club" data-id="${s.club.id}">Back to the club</button></div></main>`;
  };

  V.me = () => {
    const u = S.user; const n = now(); const ws = weekStart(n); const went = wentThisWeek(); const pend = pending(); const up = comingUp();
    const days = [0, 1, 2, 3, 4, 5, 6].map((i) => { const d = new Date(ws); d.setDate(d.getDate() + i); const f = went.some((s) => ymd(s.at) === ymd(d)); const t = ymd(d) === ymd(n); return `<span class="${f ? 'f' : ''} ${t ? 't' : ''}" aria-label="${DAYL[d.getDay()]}${f ? ', attended' : ''}"><i></i>${DAY[d.getDay()][0]}</span>`; }).join('');
    const left = up.filter((s) => sameWeek(s.at, n) && !isCancelled(s)).length;
    let status;
    if (S.weekDone) status = `This week is safe. ${went.length === 1 ? 'One session' : went.length + ' sessions'} done.`;
    else if (S.total === 0 && S.streak === 0) status = 'Your streak starts with your first session.';
    else if (left > 0) status = S.streak > 0 ? `One session keeps your streak. ${left} left this week.` : `${plural(left, 'session')} left this week in your clubs.`;
    else if (S.streak > 0 && S.prot) status = "Your protection will cover this week if you can't make it.";
    else status = 'No sessions left this week in your clubs.';
    const ask = pend.length ? `<div class="ask"><div><b class="disp" style="font-size:16px">Did you go to ${nounFor(pend[0])}?</b><br><span class="mut sm">${pend[0].club.name} · ${dateShort(pend[0].at)} ${pend[0].t}${pend.length > 1 ? ` · ${pend.length - 1} more to confirm` : ''}</span></div>
      <div class="row"><button class="btn grow" data-act="went" data-id="${pend[0].id}">I went</button><button class="btn ghost grow" data-act="missed" data-id="${pend[0].id}">I missed it</button></div></div>` : '';
    const showNum = S.total > 0 || S.streak > 0;
    return `<main class="pad-nav">${ask}
      ${S.note ? `<p class="note">${S.note}</p>` : ''}
      <div class="stack"><span class="cap">Hi ${esc(u.name)}</span>
        ${showNum ? `<button class="streak" data-act="profile" style="background:none;border:0;padding:0;text-align:left"><span class="n">${S.streak}</span><span><b class="disp" style="font-size:18px">week streak</b><br><span class="mut sm">${S.prot ? 'Protection available' : 'Protection used'} · ${plural(S.total, 'session')}</span></span></button>` : ''}
        <div class="days">${days}</div><p><b>${status}</b></p></div>
      <div class="stack tight"><span class="cap">Coming up</span>
        ${up.length ? `<div>${up.map((s) => sessionRow(s, true)).join('')}</div>` : (S.follows.length ? '<p class="mut">Nothing booked this week.</p>' : '<p class="mut">Follow a club to see your week.</p><button class="btn" data-act="quiz">Find my club</button>')}</div>
      ${S.follows.length ? `<div class="stack tight"><span class="cap">From your clubs</span><div class="strip">${S.follows.slice(0, 3).map((id) => `<button class="ph g${1 + (hash(id) % 6)}" data-act="club" data-id="${id}">${club(id).name.split(' ')[0]}</button>`).join('')}</div></div>` : ''}
    </main>`;
  };

  V.result = () => {
    const s = byId(route.id); const c = s.club; const next = nextOpen(c); const k = hash(s.id);
    const newcomer = (S.clubWeeks[c.id] || 0) <= 3; const mine = (S.posts[s.id] || []).flatMap((p) => p.g);
    const tagged = !S.untag[s.id];
    const offer = next ? `<div class="stack"><span class="cap">${newcomer ? 'Same time next week?' : 'Next session'}</span><div class="row sp"><span><b>${dayWord(next.at)} ${next.t}</b><br><span class="mut sm">${next.type} · ${going(next)} going</span></span>
      ${has(next.id) ? '<span class="tag go">Going</span>' : `<button class="btn" data-act="rsvp" data-id="${next.id}">I'm in</button>`}</div></div>` : '';
    const photos = `<div class="stack tight"><div class="row sp"><span class="cap">Photos from ${nounFor(s)}</span><button class="btn small ghost" data-act="post" data-id="${s.id}">Add yours</button></div>
      <div class="strip">${mine.map((g) => `<button class="ph g${g}" data-act="photo" data-g="${g}" data-by="You" data-sid="${s.id}" data-mine="1">yours</button>`).join('')}
        ${tagged ? `<button class="ph g${1 + (k % 6)}" data-act="photo" data-g="${1 + (k % 6)}" data-by="Layla H." data-sid="${s.id}" data-tagged="1">you're tagged</button>` : ''}
        <button class="ph g${1 + ((k + 2) % 6)}" data-act="photo" data-g="${1 + ((k + 2) % 6)}" data-by="Omar S." data-sid="${s.id}">photo</button></div></div>`;
    return `<main class="pad-nav"><div class="stack tight"><h1>${route.weekJustDone ? `Week ${S.streak} done.` : 'Nice. That one counts too.'}</h1>
      <p class="mut">${c.name} · ${dateShort(s.at)}. ${plural(S.total, 'session')} in total.</p></div>
      ${newcomer ? offer + photos : photos + offer}
      <button class="btn ghost block" data-act="me">Back to my week</button></main>`;
  };

  V.missed = () => {
    const s = byId(route.id); const next = nextOpen(s.club);
    return `<main class="pad-nav"><div class="stack tight"><h1>No problem.</h1><p class="mut">${next ? `${DAYL[next.at.getDay()]}'s the next one.` : 'There is nothing scheduled yet.'}</p></div>
      ${next ? `<div class="row sp"><span><b>${dayWord(next.at)} ${next.t}</b><br><span class="mut sm">${s.club.name} · ${next.type}</span></span>${has(next.id) ? '<span class="tag go">Going</span>' : `<button class="btn" data-act="rsvp" data-id="${next.id}">I'm in</button>`}</div>` : ''}
      <button class="btn ghost block" data-act="me">Back to my week</button></main>`;
  };

  V.clubs = () => `<main class="pad-nav"><h1>My clubs</h1>
    ${S.follows.length ? `<div class="stack">${S.follows.map((id) => { const c = club(id); const n = nextOpen(c); return `<button class="card" data-act="club" data-id="${c.id}"><span class="body"><span class="disp" style="font-size:14px;font-weight:700">${c.name}</span><span class="mut sm">${SPORTS[c.sport]} · ${c.area}</span><span class="sm">${n ? `Next: ${dayWord(n.at)} ${n.t}` : 'No session scheduled'} · you: ${plural(S.clubWeeks[c.id] || 0, 'week')}</span></span></button>`; }).join('')}</div>` : '<p class="mut">You are not following any clubs yet.</p>'}
    <button class="btn ghost block" data-act="quiz">Find another club</button></main>`;

  V.profile = () => `<main class="pad-nav"><div class="stack tight"><h1>${esc(S.user.name)}</h1><p class="mut">Only you can see your streak and history.</p></div>
    <dl class="facts"><dt>Current streak</dt><dd>${plural(S.streak, 'week')}</dd><dt>Longest streak</dt><dd>${plural(S.longest, 'week')}</dd><dt>Sessions</dt><dd>${S.total}</dd><dt>Protection</dt><dd>${S.prot ? 'Available' : `Used. Returns after ${plural(Math.max(0, 4 - S.sinceProt), 'more week')} in a row`}</dd></dl>
    <div class="stack"><span class="cap">Milestones</span><div class="badges">${MS.map((m) => `<span class="badge ${S.badges.includes(m.id) ? 'on' : ''}" title="${m.t}" aria-label="${m.t}${S.badges.includes(m.id) ? ', earned' : ', not yet earned'}">${m.b}</span>`).join('')}</div>
      ${S.streak > 0 ? '<button class="btn ghost" data-act="share">Share my streak</button>' : ''}</div>
    <div><span class="cap">Settings</span>
      <label class="switch" for="p-st"><span>Show me in club standings</span><input type="checkbox" id="p-st" data-set="standings" ${S.set.standings ? 'checked' : ''}></label>
      <label class="switch" for="p-tg"><span>Let people tag me in photos</span><input type="checkbox" id="p-tg" data-set="tagging" ${S.set.tagging ? 'checked' : ''}></label>
      <label class="switch" for="p-em"><span>Email reminders</span><input type="checkbox" id="p-em" data-set="email" ${S.set.email ? 'checked' : ''}></label>
      <label class="switch" for="p-wa"><span>WhatsApp reminders</span><input type="checkbox" id="p-wa" data-set="wa" ${S.set.wa ? 'checked' : ''}></label></div>
    <button class="btn quiet block" data-act="signout">Sign out</button></main>`;

  // ---------- overlays ----------
  const O = {};
  O.signin = () => `<div class="sheet"><h2>Sign in to save your spot</h2><p class="mut sm">In the real product this is Google sign-in. Here, type any first name.</p>
    <label for="si-name">First name</label><input type="text" id="si-name" value="Alex" maxlength="20" autocomplete="off">
    <button class="btn block" data-act="dosignin">Continue with Google</button><button class="btn quiet block" data-act="close">Not now</button></div>`;
  O.session = () => {
    const s = byId(overlay.id); const cancelled = isCancelled(s); const full = isFull(s); const mine = has(s.id); const over = ended(s);
    let act;
    if (over) act = S.att[s.id] ? `<p class="note">You said you ${S.att[s.id] === 'went' ? 'went' : 'missed it'}.</p>` : '<p class="note">This session has finished.</p>';
    else if (cancelled) act = '<p class="notice">This session is cancelled.</p>';
    else if (mine) act = `<p class="note">You're going. Reminder ${s.at.getHours() < 10 ? 'at 19:00 the evening before' : 'three hours before'}.</p><button class="btn ghost block" data-act="unrsvp" data-id="${s.id}">Can't make it</button><button class="btn quiet block" data-act="soon" data-what="This would add the session to your phone's calendar.">Add to calendar</button>`;
    else if (full) act = `<p class="notice">Full · ${s.cap} of ${s.cap}. There is no waiting list.</p>`;
    else act = `<button class="btn block" data-act="rsvp" data-id="${s.id}">I'm in</button>`;
    return `<div class="sheet"><div class="stack tight"><span class="cap">${s.club.name}</span><h2>${dayWord(s.at)} · ${s.t}</h2></div>
      <dl class="facts"><dt>Date</dt><dd>${DAYL[s.at.getDay()]} ${s.at.getDate()} ${MON[s.at.getMonth()]}</dd><dt>Where</dt><dd>${s.place}</dd><dt>What</dt><dd>${s.type}</dd><dt>Level</dt><dd>${s.note}</dd><dt>Bring</dt><dd>${s.club.bring}</dd><dt>Going</dt><dd>${going(s)}${s.cap ? ' of ' + s.cap : ''}${S.user ? ' · ' + people(s, 3).map((p) => p.split(' ')[0]).join(', ') + '…' : ''}</dd></dl>
      ${act}<button class="btn quiet block" data-act="close">Close</button></div>`;
  };
  O.milestone = () => { const m = MS.find((x) => x.id === overlay.id); return `<div class="sheet full" style="justify-content:center;text-align:center;align-items:center">
    <span class="badge on" style="width:120px;font-size:26px">${m.b}</span><span class="cap">New milestone</span><h1>${m.t}</h1><p>${m.line}</p><p class="mut sm">with ${overlay.club}</p>
    <div class="stack" style="width:100%"><button class="btn block" data-act="share">Share</button><button class="btn quiet block" data-act="close">Done</button></div></div>`; };
  O.share = () => { const c = S.follows[0] ? club(S.follows[0]).name : 'Ryze Club'; return `<div class="sheet"><div class="sharecard g1"><span class="disp" style="font-size:12px;font-weight:700">ryze club</span><span class="n">${S.streak}</span><b style="font-size:18px">${S.streak === 1 ? 'week' : 'weeks'} in a row</b><span>with ${c}</span><span id="sc-name">${overlay.hide ? '' : esc(S.user.name)}</span></div>
    <label class="switch" for="sc-show"><span>Show my name</span><input type="checkbox" id="sc-show" data-sharename="1" ${overlay.hide ? '' : 'checked'}></label>
    <button class="btn block" data-act="soon" data-what="This would open your phone's share menu with the image.">Share</button><button class="btn ghost block" data-act="soon" data-what="This would save the image to your phone.">Save image</button><button class="btn quiet block" data-act="close">Close</button></div>`; };
  O.post = () => { const s = byId(overlay.id); const sel = overlay.sel || []; return `<div class="sheet"><div class="stack tight"><h2>Add photos</h2><p class="mut sm">${nounFor(s)} · ${s.club.name}</p></div>
    <p class="note">On a phone this opens your photo library. Here, pick from these examples (up to 6).</p>
    <div class="pick">${[1, 2, 3, 4, 5, 6].map((g) => `<button class="ph g${g} ${sel.includes(g) ? 'on' : ''}" data-act="pick" data-g="${g}" aria-pressed="${sel.includes(g)}">${sel.includes(g) ? 'chosen' : 'photo'}</button>`).join('')}</div>
    <label for="po-cap">Caption (optional)</label><input type="text" id="po-cap" maxlength="140" value="${esc(overlay.cap || '')}">
    <p class="mut xs">Photos here are public. Only post people who are happy to be seen.</p>
    <button class="btn block" data-act="dopost">Post</button><button class="btn quiet block" data-act="close">Cancel</button></div>`; };
  O.photo = () => { const p = overlay; const s = p.sid ? byId(p.sid) : null;
    const acts = p.confirmDel ? `<p><b>Delete this photo? This can't be undone.</b></p><div class="row"><button class="btn quiet grow" data-act="keep">Keep</button><button class="btn grow" data-act="delphoto">Delete</button></div>`
      : p.report ? `<span class="cap">Why are you reporting this?</span>${['I’m in this and want it removed', 'It’s not from this session', 'It’s inappropriate'].map((r) => `<button class="btn ghost block" data-act="sendreport">${r}</button>`).join('')}`
      : `${p.tagged ? '<button class="btn block" data-act="untag">Remove my tag</button>' : ''}${p.mine ? '<button class="btn ghost block" data-act="askdel">Delete</button>' : '<button class="btn ghost block" data-act="report">Report</button>'}`;
    return `<div class="sheet"><span class="ph g${p.g} photo-big">${p.tagged ? "you're tagged" : 'photo'}</span>
      <p class="sm">${S.user || p.mine ? `Posted by <b>${esc(p.by)}</b>` : 'Sign in to see who posted this'}${s ? ` · ${nounFor(s)}` : ''}</p>
      ${acts}<button class="btn quiet block" data-act="close">Close</button></div>`; };
  O.demo = () => { const n = now(); return `<div class="sheet"><div class="stack tight"><h2>Demo controls</h2><p class="mut sm">Prototype time: ${DAYL[n.getDay()]} ${n.getDate()} ${MON[n.getMonth()]}, ${String(n.getHours()).padStart(2, '0')}:${String(n.getMinutes()).padStart(2, '0')}</p></div>
    <button class="btn ghost block" data-act="d-after">Skip to after my next session</button>
    <button class="btn ghost block" data-act="d-week">End this week</button>
    <button class="btn ghost block" data-act="d-11">Give me an 11-week streak</button>
    <button class="btn ghost block" data-act="d-reset">Reset the prototype</button>
    <p class="mut xs">"Skip" needs an RSVP first. After an 11-week streak, your next "I went" earns the 12-week milestone.</p>
    <button class="btn quiet block" data-act="close">Close</button></div>`; };

  // ---------- actions ----------
  const A = {
    home: () => go(S.user ? 'me' : 'home'), me: () => go('me'), back, quiz: () => go('quiz', { step: 0 }),
    quizback: () => { route.step -= 1; render(); },
    q: (d) => { S.quiz[d.k] = d.val; save(); if ((route.step || 0) < 2) { route.step = (route.step || 0) + 1; render(); window.scrollTo(0, 0); } else go('results', {}, true); },
    browse: (d) => { if (d.sport) filt = { sport: d.sport, area: '', day: '', level: '' }; go('browse'); },
    filt: (d) => { filt[d.k] = d.val; render(); }, clearfilt: () => { filt = { sport: '', area: '', day: '', level: '' }; render(); },
    club: (d) => go('club', { id: d.id }), clubs: () => go('clubs'), profile: () => go('profile'),
    session: (d) => { overlay = { t: 'session', id: d.id }; render(); },
    close: () => { overlay = null; render(); },
    soon: (d) => { say(d.what); render(); },
    demo: () => { overlay = { t: 'demo' }; render(); },
    rsvp: (d) => {
      if (!S.user) { overlay = { t: 'signin', then: { act: 'rsvp', id: d.id } }; render(); return; }
      doRsvp(d.id); overlay = null; say("You're going."); render();
    },
    follow: (d) => {
      if (!S.user) { overlay = { t: 'signin', then: { act: 'follow', id: d.id } }; render(); return; }
      const i = S.follows.indexOf(d.id); if (i >= 0) { S.follows.splice(i, 1); say('Unfollowed. Your history is kept.'); } else { S.follows.push(d.id); say('Following.'); }
      save(); render();
    },
    dosignin: () => {
      const el = document.getElementById('si-name'); const name = (el && el.value.trim()) || 'Alex'; const then = overlay.then;
      S.user = { name }; save(); overlay = null;
      if (then && then.act === 'rsvp') { doRsvp(then.id); stack = []; go('confirm', { id: then.id }); }
      else if (then && then.act === 'follow') { if (!S.follows.includes(then.id)) S.follows.push(then.id); save(); say('Following.'); render(); }
      else go('me');
    },
    signin: () => { overlay = { t: 'signin' }; render(); },
    signout: () => { S.user = null; save(); stack = []; go('home', {}, true); },
    unrsvp: (d) => { S.rsvps = S.rsvps.filter((x) => x !== d.id); save(); overlay = null; say('Removed. The club has been told.', () => { doRsvp(d.id); toast = null; render(); }); render(); },
    went: (d) => confirmWent(d.id),
    missed: (d) => { S.att[d.id] = 'missed'; save(); go('missed', { id: d.id }, true); },
    share: () => { overlay = { t: 'share' }; render(); },
    post: (d) => { overlay = { t: 'post', id: d.id, sel: [] }; render(); },
    pick: (d) => { const g = Number(d.g); const el = document.getElementById('po-cap'); overlay.cap = el ? el.value : ''; overlay.sel = overlay.sel.includes(g) ? overlay.sel.filter((x) => x !== g) : overlay.sel.concat(g); render(); },
    dopost: () => {
      const el = document.getElementById('po-cap'); if (!overlay.sel.length) { say('Choose at least one photo.'); render(); return; }
      const s = byId(overlay.id); (S.posts[s.id] = S.posts[s.id] || []).push({ g: overlay.sel, cap: el ? el.value : '' }); save(); overlay = null; say(`Posted to ${s.club.name}.`); render();
    },
    photo: (d) => { overlay = { t: 'photo', g: Number(d.g), by: d.by, sid: d.sid, mine: !!d.mine, tagged: !!d.tagged }; render(); },
    untag: () => { const sid = overlay.sid; S.untag[sid] = true; save(); overlay = null; say('Tag removed.', () => { delete S.untag[sid]; save(); toast = null; render(); }); render(); },
    report: () => { overlay.report = true; render(); }, sendreport: () => { overlay = null; say("Sent. We'll tell you what happens."); render(); },
    askdel: () => { overlay.confirmDel = true; render(); }, keep: () => { overlay.confirmDel = false; render(); },
    delphoto: () => { const p = overlay; const list = S.posts[p.sid] || []; for (const post of list) { const i = post.g.indexOf(p.g); if (i >= 0) { post.g.splice(i, 1); break; } } S.posts[p.sid] = list.filter((x) => x.g.length); save(); overlay = null; say('Photo deleted.'); render(); },
    'd-after': () => { const nx = S.rsvps.map(byId).filter((s) => s && !ended(s)).sort((a, b) => a.at - b.at)[0]; if (!nx) { overlay = null; say('RSVP to a session first.'); render(); return; } S.offset += (nx.at.getTime() + 2 * 36e5 + 6e4) - now().getTime(); save(); stack = []; go('me', {}, true); },
    'd-week': () => { if (!S.user) { overlay = null; say('Sign in first by tapping "I\'m in" on a session.'); render(); return; } endWeek(); stack = []; go('me', {}, true); },
    'd-11': () => { if (!S.user) { overlay = null; say('Sign in first by tapping "I\'m in" on a session.'); render(); return; } S.streak = 11; S.longest = Math.max(S.longest, 11); S.total = Math.max(S.total, 22); S.weekDone = false; ['s1', 'w4'].forEach((b) => { if (!S.badges.includes(b)) S.badges.push(b); }); save(); stack = []; go('me', {}, true); },
    'd-reset': () => { S = fresh(); save(); stack = []; filt = { sport: '', area: '', day: '', level: '' }; go('home', {}, true); }
  };

  // ---------- render ----------
  function render() {
    const app = document.getElementById('app'); if (!app) return;
    if (!S.user && ['me', 'clubs', 'profile', 'result', 'missed', 'confirm'].includes(route.v)) route = { v: 'home' };
    const sub = !['home', 'me'].includes(route.v);
    const top = `<header class="top"><div class="r">${sub && stack.length ? '<button class="pill" data-act="back" aria-label="Back">←</button>' : ''}<button class="logo" data-act="home">ryze club</button></div>
      <div class="r"><button class="pill" data-act="demo">Demo</button>${S.user ? '' : '<button class="pill" data-act="signin">Sign in</button>'}</div></header>`;
    const showNav = S.user && route.v !== 'club' && route.v !== 'quiz';
    const tab = (v, l, on) => `<button data-act="${v}" class="${on ? 'on' : ''}">${l}</button>`;
    const nav = showNav ? `<nav class="nav" aria-label="Main">${tab('me', 'My week', ['me', 'result', 'missed'].includes(route.v))}${tab('browse', 'Find', ['browse', 'results'].includes(route.v))}${tab('clubs', 'My clubs', route.v === 'clubs')}${tab('profile', 'Profile', route.v === 'profile')}</nav>` : '';
    const ov = overlay ? `<div class="veil" data-veil="1">${O[overlay.t]()}</div>` : '';
    const ts = toast ? `<div class="toast" role="status"><div><span>${esc(toast.msg)}</span>${toast.undo ? '<button data-act="undo">Undo</button>' : ''}</div></div>` : '';
    app.innerHTML = top + (V[route.v] || V.home)() + nav + ov + ts;
  }

  document.addEventListener('click', (e) => {
    const veil = e.target.closest('[data-veil]');
    const el = e.target.closest('[data-act]');
    if (!el) { if (veil && e.target === veil) { overlay = null; render(); } return; }
    const act = el.dataset.act;
    if (act === 'undo') { if (toast && toast.undo) toast.undo(); return; }
    if (A[act]) A[act](el.dataset);
  });
  document.addEventListener('change', (e) => {
    const t = e.target;
    if (t.dataset.filt) { filt[t.dataset.filt] = t.value; render(); }
    else if (t.dataset.set) { S.set[t.dataset.set] = t.checked; save(); if (t.dataset.set === 'wa' && t.checked) { say('In the real product this asks for your phone number.'); render(); } }
    else if (t.dataset.sharename) { overlay.hide = !t.checked; render(); }
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && overlay) { overlay = null; render(); } });

  route = { v: S.user ? 'me' : 'home' };
  render();
})();
