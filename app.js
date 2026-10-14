/* Ryze Club — clickable prototype. Exploratory: example data, nothing is saved to a server. */
(() => {
  const KEY = 'ryze-proto-v1';
  const AREAS = ['Marina', 'JVC', 'Dubai Hills', 'Downtown', 'Jumeirah', 'Palm', 'Mirdif'];
  const SPORTS = { running: 'Running', padel: 'Padel', yoga: 'Yoga & pilates', volleyball: 'Volleyball', squash: 'Squash', cycling: 'Cycling' };
  const LEVELS = { new: 'New to it', some: 'Some experience', regular: 'Regular' };
  const DAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const DAYL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const PEOPLE = ['Layla H.', 'Omar S.', 'Sana K.', 'Jonas P.', 'Mei L.', 'Farah A.', 'Tom R.', 'Aisha N.', 'Diego M.', 'Priya V.', 'Hassan B.', 'Chloe D.', 'Ravi T.', 'Noor E.', 'Sam W.', 'Yuki O.', 'Maria G.', 'Khalid Z.', 'Anna F.', 'Luca C.', 'Zara I.', 'Ben J.', 'Reem Q.', 'Ivan U.'];
  const NOUN = { running: 'run', padel: 'padel', yoga: 'session', volleyball: 'volleyball', squash: 'squash', cycling: 'ride' };

  // Stock photos from Unsplash, loaded from their servers. They stand in for members' photos.
  // Volleyball, squash and cycling have none yet, so they show the colour gradient instead.
  const IMG = {
    running: ['1590333748338-d629e4564ad9', '1552674605-db6ffd4facb5', '1613936360976-8f35cf0e5461', '1540539234-c14a20fb7c7b', '1602263515015-dd72f8e9f301', '1551927336-09d50efd69cd', '1667781838690-5f32ea0ccea6', '1739368732843-800f36a9b7d0', '1716573094354-e4c3226ba887', '1759674861540-afed9f86f94a'],
    padel: ['1646649852033-7e0f3d679f8b', '1646651105426-e8c8ee9badde', '1646649851780-d9701b7c3c04', '1646649853703-7645147474ba', '1646649851800-48dba35edc76', '1646649852046-b758d2d573f3', '1658723826297-fe4d1b1e6600', '1612534847738-b3af9bc31f0c', '1657704358775-ed705c7388d2', '1526888935184-a82d2a4b7e67'],
    yoga: ['1723406251847-168ea7a02077', '1687436874174-977fdd9e2cb8', '1636619297905-54f124aa90b2', '1687180948630-2780c8b3f7f6', '1543858828-7cf1a9beb95c', '1545205597-3d9d02c29597', '1564282350350-a8355817fd2e', '1687875495230-96dfea96d9da', '1758797315487-b3b225dff7d8', '1758274535230-3641d0632878']
  };
  const im = (sp, i) => { const a = IMG[sp]; if (!a) return ''; const n = ((Number(i) % a.length) + a.length) % a.length; return ` style="--img:url('https://images.unsplash.com/photo-${a[n]}?w=800&q=70&auto=format&fit=crop')"`; };

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
      top: [], active: 6 },
    { id: 'kbv', name: 'Kite Beach Volleyball Social', sport: 'volleyball', area: 'Jumeirah', levels: ['new', 'some', 'regular'], cost: 'Free', level: 'Mixed level', photos: 3, confirmed: 5,
      desc: 'Beach volleyball on the public courts at sunset. Teams are mixed on the night, so come alone or bring friends.', bring: 'Water and sunscreen. Balls provided.',
      sched: [{ d: 3, t: '18:30', type: 'Sunset games', note: 'Mixed level', place: 'Kite Beach, volleyball courts by the skate park', cap: 24 }, { d: 6, t: '08:00', type: 'Morning 4s', note: 'Some experience', place: 'Kite Beach, volleyball courts by the skate park', cap: 16 }],
      top: [['Ravi T.', 11], ['Chloe D.', 9], ['Ben J.', 7]], active: 34 },
    { id: 'mbv', name: 'Marina Beach Volley Beginners', sport: 'volleyball', area: 'Marina', levels: ['new', 'some'], cost: 'Free', level: 'Never played is fine', photos: 2, confirmed: 3,
      desc: 'A relaxed group for people learning the basics. The first half hour is drills, then easy games.', bring: 'Water. Bare feet on the sand.',
      sched: [{ d: 1, t: '18:00', type: 'Learn and play', note: 'First-timers', place: 'JBR Beach, courts by The Walk', cap: 18 }],
      top: [['Zara I.', 8], ['Luca C.', 6]], active: 21 },
    { id: 'dsq', name: 'Downtown Squash Ladder', sport: 'squash', area: 'Downtown', levels: ['some', 'regular'], cost: 'Court share, about AED 40', level: 'Club level and up', photos: 2, confirmed: 7,
      desc: 'A weekly ladder with matches set by level. Win and you move up; everyone plays at least three games.', bring: 'Your own racket, non-marking shoes and eye protection.',
      sched: [{ d: 2, t: '19:30', type: 'Ladder night', note: 'Club level', place: 'Downtown Sports Club, courts 1–4', cap: 8 }, { d: 0, t: '07:00', type: 'Early rallies', note: 'Some experience', place: 'Downtown Sports Club, courts 1–4', cap: 8 }],
      top: [['Hassan B.', 12], ['Anna F.', 10], ['Khalid Z.', 8]], active: 18 },
    { id: 'jsq', name: 'JVC Squash Starters', sport: 'squash', area: 'JVC', levels: ['new'], cost: 'Court share, about AED 35', level: 'Never played is fine', photos: 2, confirmed: 10,
      desc: 'A patient group for first-timers. A volunteer coach covers the basics before friendly games.', bring: 'Non-marking shoes. Rackets, balls and eye protection provided.',
      sched: [{ d: 4, t: '19:00', type: 'Learn and play', note: 'First-timers', place: 'JVC Community Courts, squash court 2', cap: 6 }],
      top: [['Noor E.', 9], ['Sam W.', 6]], active: 12 },
    { id: 'aqr', name: 'Al Qudra Dawn Riders', sport: 'cycling', area: 'JVC', levels: ['some', 'regular'], cost: 'Free', level: 'Steady 28–32 km/h', photos: 3, confirmed: 4,
      desc: 'Road rides on the Al Qudra track before the heat. One loop at a steady pace, with a regroup at the halfway shade stop.', bring: 'Road bike, helmet, lights and two bottles of water.',
      sched: [{ d: 6, t: '05:30', type: 'Long loop', note: '50 km, steady', place: 'Al Qudra Cycle Track, Bab Al Shams start' }, { d: 3, t: '05:45', type: 'Midweek spin', note: '30 km, social pace', place: 'Al Qudra Cycle Track, Bab Al Shams start' }],
      top: [['Diego M.', 13], ['Khalid Z.', 10], ['Mei L.', 8]], active: 31 },
    { id: 'nsr', name: 'Nad Al Sheba Night Riders', sport: 'cycling', area: 'Mirdif', levels: ['new', 'some'], cost: 'Free, bike hire on site', level: 'No-drop, easy pace', photos: 2, confirmed: 3,
      desc: 'Evening laps on the lit, car-free cycle park. No one gets dropped, and the ride leader waits at every lap.', bring: 'Helmet and water. Hire bikes are available at the park.',
      sched: [{ d: 2, t: '19:30', type: 'Evening laps', note: 'Easy pace', place: 'Nad Al Sheba Cycle Park, main entrance' }],
      top: [['Farah A.', 9], ['Tom R.', 6]], active: 19 }
  ];
  const ORIG = JSON.parse(JSON.stringify(CLUBS));

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

  const fresh = () => ({ user: null, quiz: {}, rsvps: [], follows: [], att: {}, streak: 0, longest: 0, total: 0, weekDone: false, prot: true, sinceProt: 0, badges: [], posts: {}, untag: {}, offset: 0, clubWeeks: {}, set: { standings: true, tagging: true, email: true, wa: false }, note: '',
    manage: [], claims: {}, edits: {}, conf: {}, cancelled: {}, orgAtt: {}, hidden: {}, pin: {}, check: {}, ci: {}, mode: 'member', orgClub: '', thanks: {}, nudged: {} });
  let S = fresh();
  try { const raw = localStorage.getItem(KEY); if (raw) S = Object.assign(fresh(), JSON.parse(raw)); } catch (e) { /* storage unavailable */ }
  // Drop saved references to clubs and sports that have since been removed from the prototype.
  { const ok = (id) => CLUBS.some((c) => c.id === id.split('|')[0]);
    S.rsvps = S.rsvps.filter(ok); S.follows = S.follows.filter(ok); S.manage = S.manage.filter(ok);
    if (S.quiz.sport && !SPORTS[S.quiz.sport]) S.quiz = {}; }
  // The organiser app lives at #organiser; everything else is the member app. Both share the same saved data.
  S.mode = location.hash === '#organiser' ? 'org' : 'member';
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* ignore */ } };

  // view state (not saved)
  let route = { v: 'home' };
  let stack = [];
  let overlay = null;
  let toast = null;
  let toastTimer = null;
  let filt = { sport: '', area: '', day: '', level: '', price: '' };

  // ---------- helpers ----------
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const now = () => new Date(Date.now() + S.offset);
  const ymd = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const hash = (s) => { let h = 7; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 100003; return h; };
  const club = (id) => CLUBS.find((c) => c.id === id);
  // Price: "Free..." is free; otherwise the first AED amount, if there is one.
  const isFree = (c) => /^free/i.test(c.cost);
  const aed = (c) => { const m = c.cost.match(/AED\s*(\d+)/i); return m ? Number(m[1]) : null; };
  const priceShort = (c) => (isFree(c) ? 'Free' : aed(c) !== null ? `About AED ${aed(c)}` : 'Paid');
  // Photos: members can post once they've been to 5 sessions with a club. Organisers always can.
  const PHOTO_MIN = 5;
  const sessionsAt = (c) => Math.max(Object.keys(S.att).filter((id) => S.att[id] === 'went' && id.split('|')[0] === c.id).length, S.clubWeeks[c.id] || 0);
  const canPost = (c) => S.manage.includes(c.id) || sessionsAt(c) >= PHOTO_MIN;
  const postNote = (c) => `<p class="note">Members can post photos after ${PHOTO_MIN} sessions with ${esc(c.name)}. You've been to ${Math.min(sessionsAt(c), PHOTO_MIN)} of ${PHOTO_MIN}.</p>`;
  const applyEdits = () => { CLUBS.forEach((c, i) => Object.assign(c, JSON.parse(JSON.stringify(ORIG[i])), S.edits[c.id] || {})); };
  const day0 = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const weekStart = (d) => { const x = day0(d); x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); return x; };
  const sameWeek = (a, b) => weekStart(a).getTime() === weekStart(b).getTime();
  const dateShort = (d) => `${DAY[d.getDay()]} ${d.getDate()} ${MON[d.getMonth()]}`;
  const dayWord = (d) => { const diff = Math.round((day0(d) - day0(now())) / 864e5); return diff === 0 ? 'Today' : diff === 1 ? 'Tomorrow' : dateShort(d); };
  const whenShort = (d) => { const w = dayWord(d); return w === 'Today' || w === 'Tomorrow' ? w : `${DAY[d.getDay()]} ${d.getDate()}`; };
  const initials = (n) => n.split(' ').map((p) => p[0]).join('').slice(0, 2);
  // Inline icons: signifiers for navigation and actions. Decorative; the text label always carries the meaning.
  const ICONS = {
    week: '<rect x="3" y="4.5" width="18" height="16" rx="3"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/>',
    find: '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/>',
    clubs: '<circle cx="9" cy="8" r="3.2"/><path d="M3 19.5c.6-3.3 3-5 6-5s5.4 1.7 6 5"/><circle cx="17" cy="9" r="2.4"/><path d="M16.5 14.3c2.4.2 4 1.8 4.5 4.7"/>',
    me: '<circle cx="12" cy="8" r="3.6"/><path d="M4.5 20c.8-3.8 3.7-5.8 7.5-5.8s6.7 2 7.5 5.8"/>',
    right: '<path d="M5 12h14M13 6l6 6-6 6"/>', left: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    chev: '<path d="m9 5 7 7-7 7"/>', check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>', x: '<path d="M6 6l12 12M18 6 6 18"/>',
    edit: '<path d="M4 20h4L19 9l-4-4L4 16z"/>', flag: '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>', plus: '<path d="M12 5v14M5 12h14"/>',
    share: '<path d="M12 15V3M7 8l5-5 5 5"/><path d="M5 13v6.5h14V13"/>',
    photo: '<rect x="3" y="5" width="18" height="15" rx="3"/><circle cx="9" cy="10.5" r="1.8"/><path d="m21 16-5-5-8 9"/>'
  };
  const ic = (n, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ICONS[n]}</svg>`;
  const plural = (n, w) => (w === 'person' ? (n === 1 ? '1 person' : `${n} people`) : `${n} ${w}${n === 1 ? '' : 's'}`);

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
  const has = (id) => S.rsvps.includes(id);
  const future = (c) => sessions(c, 0, 14).filter((s) => s.at > now());
  const past = (c) => sessions(c, -8, 0).filter((s) => s.at <= now()).reverse();
  const isCancelled = (s) => { if (S.cancelled[s.id]) return true; if (!s.club.cancelNext || has(s.id) || S.manage.includes(s.club.id)) return false; const f = future(s.club)[0]; return !!f && f.id === s.id; };
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
  const people = (s, n) => { const k = hash(s.id); return Array.from({ length: Math.min(n, PEOPLE.length) }, (_, i) => PEOPLE[(k + i * 5) % PEOPLE.length]); };
  const ended = (s) => now() - s.at > 2 * 36e5;
  const stale = (c) => !S.conf[c.id] && c.confirmed >= 60;
  const confirmedOn = (c) => { let d; if (S.conf[c.id]) d = new Date(S.conf[c.id]); else { d = now(); d.setDate(d.getDate() - c.confirmed); } return `${d.getDate()} ${MON[d.getMonth()]}`; };
  const nounFor = (s) => `${DAYL[s.at.getDay()]}’s ${NOUN[s.club.sport]}`;
  const meetDays = (c) => [...new Set(c.sched.slice().sort((a, b) => ((a.d + 6) % 7) - ((b.d + 6) % 7)).map((s) => DAY[s.d]))].join(', ');

  // photos: example photos per club and session, with organiser hide and pin applied
  function leadPhotos(c, all) {
    const k = hash(c.id);
    const base = [0, 1, 2].map((i) => ({ key: `${c.id}:m${i}`, sp: c.sport, i: k + i, g: 1 + ((k + i) % 6), by: PEOPLE[(k + i) % PEOPLE.length] }));
    const shown = all ? base : base.filter((p) => !S.hidden[p.key]);
    const pin = S.pin[c.id];
    return pin && !all ? [pin].concat(shown.filter((p) => p.key !== pin.key)).slice(0, 3) : shown;
  }
  function exPhotos(c, s, idx, all) {
    const k = hash(c.id);
    const list = [0, 1, 2].slice(0, c.photos).map((j) => ({ key: `${s.id}:${j}`, sp: c.sport, i: k + idx * 2 + j + 3, g: 1 + ((k + idx * 2 + j + 3) % 6), by: PEOPLE[(k + j + idx * 4 + 2) % PEOPLE.length], sid: s.id }));
    return all ? list : list.filter((p) => !S.hidden[p.key]);
  }
  const myPhotos = (s) => (S.posts[s.id] || []).flatMap((p) => p.g.map((g) => ({ sp: s.club.sport, i: g - 1, g, by: 'You', sid: s.id, mine: true })));
  function tile(p, label = '') {
    return `<button class="ph g${p.g}"${im(p.sp, p.i)} data-act="photo" data-sp="${p.sp}" data-i="${p.i}" data-g="${p.g}" data-by="${p.by}"${p.sid ? ` data-sid="${p.sid}"` : ''}${p.mine ? ' data-mine="1"' : ''}${p.tagged ? ' data-tagged="1"' : ''} aria-label="Photo by ${p.by}">${label}</button>`;
  }

  // session recaps on the club page: one lead photo, who posted it, and who came
  const CAPS = {
    running: ['Sunrise over the Marina. Worth the alarm.', 'New PB for three of us today.', 'Coffee was earned.', 'Slow group stuck together the whole way.'],
    padel: ['Americano done, rematch on Thursday.', 'Best rallies of the month.', 'Two first-timers won their first game.', 'Lights, sweat, smiles.'],
    yoga: ['Calm start to the week.', 'Sunset flow by the water.', 'Mats out, phones away.', 'Three newcomers today. Welcome.'],
    volleyball: ['Sand everywhere. Worth it.', 'Mixed teams, no egos.', 'Sunset game went to 25–23.', 'Ten new faces this week.'],
    squash: ['Ladder shake-up: two new names in the top four.', 'Long rallies tonight.', 'First-timers already hitting the back wall.', 'Good games, cold drinks.'],
    cycling: ['50 km before the heat.', 'Nobody dropped, as promised.', 'Spotted gazelles at Al Qudra.', 'Fastest regroup yet.']
  };
  const captionFor = (s) => { const a = CAPS[s.club.sport] || CAPS.running; return a[hash(s.id) % a.length]; };
  function recap(c, s, i) {
    const all = myPhotos(s).concat(exPhotos(c, s, i)); const came = going(s) - 1; const lead = all[0];
    const inIt = has(s.id) || S.att[s.id] === 'went';
    let media;
    if (!IMG[c.sport]) media = `<div class="ph poster g${1 + (hash(s.id) % 6)}"><span class="mut-on">${DAYL[s.at.getDay()]} ${s.at.getDate()} ${MON[s.at.getMonth()]}</span><span class="pt">${esc(s.type)}</span><span>${plural(came, 'person')} came${all.length ? ' · ' + plural(all.length, 'photo') : ''}</span></div>`;
    else if (all.length) { const shown = all.slice(0, 3); const more = all.length - shown.length;
      media = `<div class="rc-media n${shown.length}">${shown.map((p, j) => tile(p, j === shown.length - 1 && more > 0 ? `<span class="more">+${more}</span>` : p.mine ? 'yours' : '')).join('')}</div>`; }
    else media = '';
    const by = lead ? `<div class="rc-by">${face(lead.mine ? S.user.name : lead.by, lead.mine ? myPro().photo : '')}<p class="sm"><b>${lead.mine ? 'You' : esc(lead.by)}</b> ${lead.mine ? 'posted photos' : `“${esc(captionFor(s))}”`}</p></div>` : '';
    const head = IMG[c.sport] ? `<div class="rc-head"><b class="disp">${dateShort(s.at)} · ${esc(s.type)}</b><span class="mut sm">${plural(came, 'person')} came</span></div>` : '';
    return `<article class="recap">${head}
      ${media}${by}
      ${!all.length && IMG[c.sport] ? '<p class="mut sm">No photos from this one yet.</p>' : ''}
      ${inIt ? (canPost(c) ? `<button class="btn small ghost" data-act="post" data-id="${s.id}">Add your photos</button>` : postNote(c)) : ''}</article>`;
  }

  // organiser: the attendee list for a session
  function roster(s) {
    const n = going(s) - (has(s.id) ? 1 : 0); const over = S.orgAtt[s.id] || {};
    return people(s, n).map((name) => { const h = hash(name + s.id); const def = h % 10 < 7 ? 'came' : h % 10 < 9 ? 'no' : 'wait'; return { name, first: h % 6 === 0, st: ended(s) ? (over[name] || def) : 'going' }; });
  }

  function say(msg, undo) { toast = { msg, undo }; clearTimeout(toastTimer); toastTimer = setTimeout(() => { toast = null; const el = document.querySelector('.toast'); if (el) el.remove(); }, 4500); }
  function go(v, p = {}, replace = false) { if (!replace) stack.push(route); route = Object.assign({ v }, p); overlay = null; render(); window.scrollTo(0, 0); }
  function back() { route = stack.pop() || { v: S.mode === 'org' ? 'o-week' : S.user ? 'me' : 'home' }; overlay = null; render(); }

  // ---------- pieces ----------
  function clubCard(c, why) {
    const n = nextOpen(c); const lead = leadPhotos(c)[0];
    const head = c.photos && lead ? `<span class="ph g${lead.g}"${im(lead.sp, lead.i)}></span>` : `<span class="fallback"><span class="cap">${SPORTS[c.sport]} · ${c.area}</span></span>`;
    return `<button class="card" data-act="club" data-id="${c.id}">${head}<span class="body">
      <span class="disp" style="font-size:14px;font-weight:700">${esc(c.name)}</span>
      ${why ? `<span class="why sm">${why}</span>` : `<span class="mut sm">${SPORTS[c.sport]} · ${c.area} · ${priceShort(c)}</span>`}
      <span class="sm">${n ? `Next: ${dayWord(n.at)} ${n.t} · ${going(n)} going` : 'No session scheduled'}</span>
      <span class="go">View club ${ic('right')}</span>
    </span></button>`;
  }
  function sessionRow(s, showClub) {
    let tag = '';
    if (isCancelled(s)) tag = '<span class="tag warn">Cancelled</span>';
    else if (has(s.id)) tag = `<span class="tag go">${ic('check')}Going</span>`;
    else if (isFull(s)) tag = '<span class="tag">Full</span>';
    else tag = `<span class="tag cta">RSVP ${ic('chev')}</span>`;
    return `<button class="item" data-act="session" data-id="${s.id}">
      <span class="when"><b>${whenShort(s.at)}</b><span class="mut sm">${s.t}</span></span>
      <span class="grow"><b>${showClub ? esc(s.club.name) : s.type}</b><br><span class="mut sm">${showClub ? s.type + ' · ' : ''}${s.note}</span></span>${tag}</button>`;
  }
  function avatars(names) { return `<span class="avs">${names.map((n) => `<span class="av">${initials(n)}</span>`).join('')}</span>`; }

  // Member profiles. Only people going to the same session, and that club's organisers, can see them.
  const WORK = ['Nurse', 'Works in marketing', 'Teacher', 'Software engineer', 'Architect', 'Cabin crew', 'Works in finance', 'Physiotherapist', 'Student', 'Works in hospitality', 'Designer', 'Lawyer'];
  const HOBBY = ['Coffee and brunch spots', 'Photography', 'Padel on weekends', 'Cooking', 'Hiking in Hatta', 'Reading', 'Live music', 'Learning Arabic', 'Board games', 'Diving', 'Yoga', 'Travel'];
  const memberPro = (name) => {
    const h = hash(name); const first = name.split(' ')[0].toLowerCase();
    return { name, area: AREAS[h % AREAS.length], level: Object.keys(LEVELS)[h % 3], work: WORK[h % WORK.length], hobbies: `${HOBBY[h % HOBBY.length]}, ${HOBBY[(h + 5) % HOBBY.length].toLowerCase()}`, ig: h % 4 === 0 ? '' : `${first}.${['runs', 'moves', 'dxb', 'outdoors'][h % 4]}` };
  };
  const myPro = () => Object.assign({ photo: '', area: '', level: '', ig: '', work: '', hobbies: '' }, (S.user && S.user.pro) || {});
  const face = (name, photo, big) => `<span class="av${big ? ' big' : ''}"${photo ? ` style="background-image:url('${photo}')"` : ''} aria-hidden="true">${photo ? '' : initials(name)}</span>`;
  const canSeeWho = (s) => has(s.id) || S.manage.includes(s.club.id);

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
  // Everything on one day from the member's clubs: followed, RSVPed or attended.
  function dayList(date) {
    const ids = new Set(S.follows.concat(S.rsvps.map((x) => x.split('|')[0]), Object.keys(S.att).map((x) => x.split('|')[0])));
    return [...ids].map(club).filter(Boolean).flatMap((c) => sessions(c, -8, 14)).filter((s) => ymd(s.at) === date).sort((a, b) => a.at - b.at);
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
      <p class="mut">Free community clubs across Dubai for running, padel, yoga and pilates, volleyball, squash and cycling. Answer three questions and see the ones that fit you.</p></div>
    <div class="stack"><button class="btn block big" data-act="quiz">Find my club ${ic('right')}</button>
      <button class="btn ghost block" data-act="browse">${ic('find')}Browse all clubs</button>
      <p class="mut sm center">Three questions. No account needed.</p></div>
    <div class="stack"><span class="cap">This week in Dubai</span>${[club('mdr'), club('jps'), club('kbf')].map((c) => clubCard(c)).join('')}</div>
    <p class="note">This is a prototype. The clubs and people are examples, the photos are stock images, and nothing you do here is sent anywhere. Use <b>Demo</b> at the top to skip ahead in time or try the organiser view.</p>
    <div class="orgcta"><span class="orgcta-ic">${ic('flag')}</span><div class="grow"><b>Run a club?</b><br><span class="sm mut">Claim its free page: RSVPs, headcounts and photos in one place.</span></div><button class="btn small ghost" data-act="browse">Find my club page</button></div>
  </main>`;

  V.quiz = () => {
    const step = route.step || 0;
    const head = `<div class="progress" role="progressbar" aria-label="Question ${step + 1} of 3" aria-valuemin="1" aria-valuemax="3" aria-valuenow="${step + 1}">${[0, 1, 2].map((i) => `<span class="${i <= step ? 'on' : ''}"></span>`).join('')}</div><span class="cap">Question ${step + 1} of 3</span>`;
    if (step === 0) return `<main>${head}<h1>What gets you moving?</h1><div class="quiz-opts">
      <button class="quiz-opt g1"${im('running', 0)} data-act="q" data-k="sport" data-val="running">Running${ic('right')}</button>
      <button class="quiz-opt g2"${im('padel', 1)} data-act="q" data-k="sport" data-val="padel">Padel${ic('right')}</button>
      <button class="quiz-opt g4"${im('yoga', 0)} data-act="q" data-k="sport" data-val="yoga">Yoga &amp; pilates${ic('right')}</button>
      <button class="quiz-opt g3" data-act="q" data-k="sport" data-val="volleyball">Volleyball${ic('right')}</button>
      <button class="quiz-opt g5" data-act="q" data-k="sport" data-val="squash">Squash${ic('right')}</button>
      <button class="quiz-opt g6" data-act="q" data-k="sport" data-val="cycling">Cycling${ic('right')}</button></div>
      <p class="mut sm center">No account needed.</p></main>`;
    if (step === 1) return `<main>${head}<h1>Where are you based?</h1><div class="quiz-opts">
      ${AREAS.concat(['Anywhere in Dubai']).map((a) => `<button class="quiz-opt plain" data-act="q" data-k="area" data-val="${a}">${a}${ic('chev')}</button>`).join('')}</div></main>`;
    return `<main>${head}<h1>How would you describe yourself?</h1><div class="quiz-opts">
      ${Object.keys(LEVELS).map((k) => `<button class="quiz-opt plain" data-act="q" data-k="level" data-val="${k}">${LEVELS[k]}${ic('chev')}</button>`).join('')}</div></main>`;
  };

  V.results = () => {
    const m = match(); const q = S.quiz;
    const top = m.exact.slice(0, 3);
    const near = m.all.filter((x) => !top.includes(x)).slice(0, 3 - top.length);
    const title = top.length ? `${top.length} ${top.length === 1 ? 'club fits' : 'clubs fit'} you` : 'No clubs match all three yet';
    return `<main>
      <div class="stack tight"><h1>${title}</h1><div class="row sp"><p class="mut">${SPORTS[q.sport]} · ${q.area} · ${LEVELS[q.level]}</p><button class="chip" data-act="quiz">${ic('edit')}Change</button></div>
      ${m.exact.length ? '' : '<p class="note">These are the nearest. Each one says how it differs from what you asked for.</p>'}</div>
      ${top.length ? `<div class="stack">${top.map((x) => clubCard(x.c, x.why)).join('')}</div>` : ''}
      ${near.length ? `<div class="stack">${top.length ? '<span class="cap">Close, but not an exact fit</span>' : ''}${near.map((x) => clubCard(x.c, x.why)).join('')}</div>` : ''}
      <button class="btn ghost block" data-act="browse" data-sport="${q.sport}">See all ${SPORTS[q.sport].toLowerCase()} clubs ${ic('right')}</button></main>`;
  };

  V.browse = () => {
    const list = CLUBS.filter((c) => (!filt.sport || c.sport === filt.sport) && (!filt.area || c.area === filt.area) && (!filt.level || c.levels.includes(filt.level)) && (filt.day === '' || c.sched.some((s) => String(s.d) === filt.day))
      && (!filt.price || (filt.price === 'free' ? isFree(c) : isFree(c) || (aed(c) !== null && aed(c) <= Number(filt.price)))));
    const opt = (v, l, cur) => `<option value="${v}" ${String(cur) === String(v) ? 'selected' : ''}>${l}</option>`;
    return `<main class="${S.user ? 'pad-nav' : ''}"><h1>All clubs</h1>
      <div class="wrap">${[['', 'All']].concat(Object.entries(SPORTS)).map(([k, l]) => `<button class="chip ${filt.sport === k ? 'on' : ''}" data-act="filt" data-k="sport" data-val="${k}">${l}</button>`).join('')}</div>
      <div class="wrap">
        <select id="f-area" data-filt="area" aria-label="Area">${opt('', 'Any area', filt.area)}${AREAS.map((a) => opt(a, a, filt.area)).join('')}</select>
        <select id="f-day" data-filt="day" aria-label="Day">${opt('', 'Any day', filt.day)}${[1, 2, 3, 4, 5, 6, 0].map((d) => opt(d, DAYL[d], filt.day)).join('')}</select>
        <select id="f-level" data-filt="level" aria-label="Level">${opt('', 'Any level', filt.level)}${Object.entries(LEVELS).map(([k, l]) => opt(k, l, filt.level)).join('')}</select>
        <select id="f-price" data-filt="price" aria-label="Price">${opt('', 'Any price', filt.price)}${opt('free', 'Free only', filt.price)}${opt('50', 'Up to AED 50', filt.price)}</select>
      </div>
      <p class="mut sm">${list.filter(isFree).length} of ${list.length} free. Paid clubs show what the money covers.</p>
      <div class="stack">${list.length ? list.map((c) => clubCard(c)).join('') : `<p class="note">Nothing matches those filters yet.</p><button class="btn ghost" data-act="clearfilt">Clear filters</button>`}</div></main>`;
  };

  V.club = () => {
    const c = club(route.id); const n = nextOpen(c); const fut = future(c).slice(0, 4); const recaps = past(c).slice(0, 2);
    const following = S.follows.includes(c.id); const mine = S.manage.includes(c.id); const lead = c.photos ? leadPhotos(c) : [];
    const head = lead.length ? `<div class="mosaic n${lead.length}">${lead.map((p, i) => tile(p, i === 0 && recaps[0] ? dateShort(recaps[0].at) : '')).join('')}</div>`
      : `<div class="fallback"><span class="cap">${SPORTS[c.sport]} · ${c.area}</span><span class="disp" style="font-size:18px;font-weight:700">${n ? `${dayWord(n.at)} ${n.t}` : 'No session scheduled'}</span><span class="mut sm">No photos yet. They appear here after the first session.</span></div>`;
    // "See who's going" is always a full-width bordered button with faces, so it reads as tappable.
    const whoBtn = (act, title, sub) => `<button class="whobtn" data-act="${act}" data-id="${n.id}">${avatars(people(n, 4))}<span class="grow"><b>${title}</b><br><span class="mut sm">${sub}</span></span>${ic('chev', 'chev')}</button>`;
    const when = n ? (['Today', 'Tomorrow'].includes(dayWord(n.at)) ? dayWord(n.at).toLowerCase() : 'on ' + dayWord(n.at)) : '';
    const who = n ? (!S.user ? whoBtn('who', `See who's going ${when}`, `${going(n)} going · sign in to see who`)
      : canSeeWho(n) ? whoBtn('who', `See who's going ${when}`, `${plural(going(n) - 1, 'other')} · tap to see their profiles`)
      : whoBtn('who', `See who's going ${when}`, `${people(n, 2).map((p) => p.split(' ')[0]).join(', ')} and ${going(n) - 2} others · say "I'm in" to see profiles`)) : '';
    const recapHtml = recaps.map((s, i) => recap(c, s, i)).join('');
    const top = c.top.length ? `<div class="stack tight"><span class="cap">Most consistent · last 12 weeks</span><p class="sm mut">${c.active} members showed up in the last 4 weeks.</p>
      ${S.user ? `<div>${c.top.map((r, i) => `<div class="rank"><b>${i + 1}</b><span>${r[0]}</span><span>${r[1]} weeks</span></div>`).join('')}${S.clubWeeks[c.id] ? `<div class="rank me"><b>·</b><span>You${S.set.standings ? '' : ' (hidden from others)'}</span><span>${plural(S.clubWeeks[c.id], 'week')}</span></div>` : ''}</div>` : '<p class="note">Sign in to see the standings.</p>'}</div>` : '';
    let bar;
    if (!n) bar = `<div class="info"><b>No session scheduled</b><br><span class="mut sm">Follow to hear when one is added</span></div><button class="btn" data-act="follow" data-id="${c.id}">${following ? 'Following' : 'Follow'}</button>`;
    else if (has(n.id)) bar = `<button class="info" data-act="session" data-id="${n.id}"><b>${dayWord(n.at)} · ${n.t}</b><br><span class="mut sm">${n.place}</span><span class="det">Session details ${ic('chev')}</span></button><button class="btn quiet" data-act="session" data-id="${n.id}">${ic('check')}You're going</button>`;
    else if (isFull(n)) { const after = future(c).find((s) => s.id !== n.id && !isCancelled(s)); bar = `<button class="info" data-act="session" data-id="${n.id}"><b>${dayWord(n.at)} · ${n.t}</b><br><span class="mut sm">Full · ${n.cap} of ${n.cap}</span><span class="det">Session details ${ic('chev')}</span></button>${after ? `<button class="btn ghost" data-act="session" data-id="${after.id}">See next session</button>` : ''}`; }
    else bar = `<button class="info" data-act="session" data-id="${n.id}"><b>${dayWord(n.at)} · ${n.t}</b><br><span class="mut sm">${n.place}</span><span class="det">Session details ${ic('chev')}</span></button><button class="btn big" data-act="rsvp" data-id="${n.id}">I'm in</button>`;
    const claim = mine ? '' : S.claims[c.id] ? '<p class="note">Your request to manage this club is with us. We\'ll confirm within 2 days.</p>' : `<div class="orgcta"><span class="orgcta-ic">${ic('flag')}</span><div class="grow"><b>Is this your club?</b><br><span class="sm mut">Claim it to keep the schedule right and see who's coming.</span></div><button class="btn small ghost" data-act="claim" data-id="${c.id}">Claim</button></div>`;
    const invite = route.invited && !following ? `<section class="invited"><p class="cap">You're invited</p><h2>Join ${esc(c.name)}</h2><p class="sm">See every session, RSVP in one tap and get a reminder before each one.${n ? ` Next: ${dayWord(n.at)} ${n.t}.` : ''}</p><button class="btn block big" data-act="follow" data-id="${c.id}">${ic('plus')}Join the club</button></section>` : '';
    return `<main class="flush pad-bar">${invite}${head}
      <div class="stack tight"><h1 style="font-size:21px">${esc(c.name)}</h1><p class="mut sm">${SPORTS[c.sport]} · ${c.area} · ${esc(c.cost)}${c.levels.includes('new') ? ' · Beginners welcome' : ''}</p>
        <p class="sm runby">${runBy(c)} · ${thanksFor(c)} thanks</p>
        ${stale(c) ? `<p class="notice">This page hasn't been confirmed since ${confirmedOn(c)}. Check with the club before you go.</p>` : ''}</div>
      ${who}
      <div class="wrap">${mine ? `<button class="btn small" data-act="manage" data-id="${c.id}">${ic('flag')}Open organiser app</button>` : ''}<button class="btn small ${following ? 'quiet' : 'ghost'}" data-act="follow" data-id="${c.id}" aria-pressed="${following}">${following ? `${ic('check')}Following` : `${ic('plus')}Follow this club`}</button></div>
      <div class="stack tight"><p>${esc(c.desc)}</p><p class="sm mut">${esc(c.level)}. Bring: ${esc(c.bring)}</p></div>
      <div class="stack tight"><span class="cap">Coming up</span><div>${fut.map((s) => sessionRow(s)).join('') || '<p class="mut sm">Nothing scheduled.</p>'}</div></div>
      ${recapHtml ? `<div class="stack"><span class="cap">Recent sessions</span>${recapHtml}</div>` : ''}
      ${top}
      <div class="stack tight sm"><div class="wrap"><button class="link" data-act="soon" data-what="This would open the club's Instagram.">Instagram</button><button class="link" data-act="soon" data-what="This would open the club's WhatsApp group.">WhatsApp group</button></div>
        <span class="mut">Last confirmed by the organiser on ${confirmedOn(c)}</span>
        <span><button class="link" data-act="soon" data-what="Thanks. In the real product this goes to the Ryze Club curator.">Report a problem with this page</button></span></div>
      ${claim}
    </main><div class="bar">${bar}</div>`;
  };

  V.confirm = () => {
    const s = byId(route.id);
    return `<main><div class="stack tight"><h1>You're in.</h1><p class="mut">${esc(s.club.name)}</p></div>
      <dl class="facts"><dt>When</dt><dd>${dayWord(s.at)} at ${s.t}</dd><dt>Where</dt><dd>${s.place}</dd><dt>What</dt><dd>${s.type} · ${s.note}</dd><dt>Going</dt><dd>${going(s)} people</dd></dl>
      <div><label class="switch" for="set-email"><span>Remind me by email</span><input type="checkbox" id="set-email" data-set="email" ${S.set.email ? 'checked' : ''}></label>
        <label class="switch" for="set-wa"><span>Remind me on WhatsApp<br><span class="mut sm">We'll only message you about sessions you've joined. Turn it off any time.</span></span><input type="checkbox" id="set-wa" data-set="wa" ${S.set.wa ? 'checked' : ''}></label></div>
      <p class="note">First time? Arrive 10 minutes early and say hi to the organiser. You'll get a reminder ${s.at.getHours() < 10 ? 'at 19:00 the evening before' : 'three hours before'}.</p>
      <div class="stack"><button class="btn block big" data-act="me">Go to my week ${ic('right')}</button><button class="btn ghost block" data-act="club" data-id="${s.club.id}">Back to the club</button></div></main>`;
  };

  V.me = () => {
    const u = S.user; const n = now(); const ws = weekStart(n); const went = wentThisWeek(); const pend = pending(); const up = comingUp();
    const days = [0, 1, 2, 3, 4, 5, 6].map((i) => {
      const d = new Date(ws); d.setDate(d.getDate() + i); const key = ymd(d);
      const w = went.find((s) => ymd(s.at) === key); const t = key === ymd(n); const list = dayList(key);
      const mine = list.some((s) => has(s.id) && !isCancelled(s)); const dot = !w && list.length ? `<b class="dot${mine ? ' mine' : ''}" aria-hidden="true"></b>` : '';
      const desc = w ? `attended ${esc(w.club.name)}` : mine ? 'you\'re going to a session' : list.length ? plural(list.length, 'session') + ' in your clubs' : 'no sessions';
      return `<button class="${w ? 'f' : ''} ${t ? 't' : ''}" data-act="day" data-date="${key}" aria-label="${DAYL[d.getDay()]} ${d.getDate()}${t ? ', today' : ''}: ${desc}. Show this day."><i class="g${w ? 1 + (hash(w.id) % 6) : ''}"${w ? im(w.club.sport, hash(w.id)) : ''}>${dot}</i>${DAY[d.getDay()][0]}</button>`; }).join('');
    const left = up.filter((s) => sameWeek(s.at, n) && !isCancelled(s)).length;
    let status;
    if (S.weekDone) status = `This week is safe. ${went.length === 1 ? 'One session' : went.length + ' sessions'} done.`;
    else if (S.total === 0 && S.streak === 0) status = 'Your streak starts with your first session.';
    else if (left > 0) status = S.streak > 0 ? `One session keeps your streak. ${left} left this week.` : `${plural(left, 'session')} left this week in your clubs.`;
    else if (S.streak > 0 && S.prot) status = "Your protection will cover this week if you can't make it.";
    else status = 'No sessions left this week in your clubs.';
    const ask = pend.length ? `<div class="ask"><div><b class="disp" style="font-size:16px">Did you go to ${nounFor(pend[0])}?</b><br><span class="mut sm">${esc(pend[0].club.name)} · ${dateShort(pend[0].at)} ${pend[0].t}${pend.length > 1 ? ` · ${pend.length - 1} more to confirm` : ''}</span></div>
      <div class="row"><button class="btn grow" data-act="went" data-id="${pend[0].id}">I went</button><button class="btn ghost grow" data-act="missed" data-id="${pend[0].id}">I missed it</button></div></div>` : '';
    const showNum = S.total > 0 || S.streak > 0;
    const org = S.manage.length ? `<div class="stack tight"><span class="cap">Clubs you manage</span>${S.manage.map((id) => `<button class="mrow" data-act="manage" data-id="${id}"><span class="orgcta-ic">${ic('flag')}</span><span class="grow"><b>${esc(club(id).name)}</b><br><span class="sm mut">Headcounts, schedule, photos</span></span><span class="go">Manage ${ic('chev')}</span></button>`).join('')}</div>` : '';
    return `<main class="pad-nav">${ask}
      ${S.note ? `<p class="note">${S.note}</p>` : ''}
      <div class="stack"><span class="cap">Hi ${esc(u.name)}</span>
        ${showNum ? `<button class="streak" data-act="profile" style="background:none;border:0;padding:0;text-align:left"><span class="n">${S.streak}</span><span><b class="disp" style="font-size:18px">week streak</b><br><span class="mut sm">${S.prot ? 'Protection available' : 'Protection used'} · ${plural(S.total, 'session')}</span><br><span class="det">Your milestones ${ic('chev')}</span></span></button>` : ''}
        <div class="days">${days}</div><p class="xs mut center">Tap a day to see its sessions</p><p><b>${status}</b></p></div>
      ${org}
      ${nextCard(up.find((s) => has(s.id) && !isCancelled(s)))}
      <div class="stack tight"><span class="cap">Coming up</span>
        ${up.length ? `<div>${up.map((s) => sessionRow(s, true)).join('')}</div>` : (S.follows.length ? '<p class="mut">Nothing booked this week.</p>' : `<p class="mut">Follow a club to see your week.</p><button class="btn" data-act="quiz">Find my club ${ic('right')}</button>`)}</div>
      ${S.follows.length ? `<div class="stack tight"><span class="cap">From your clubs</span><div class="strip">${S.follows.slice(0, 3).map((id) => { const c = club(id); const p = leadPhotos(c)[0] || { g: 1, sp: c.sport, i: 0 }; return `<button class="ph g${p.g}"${im(p.sp, p.i)} data-act="club" data-id="${id}">${esc(c.name.split(' ')[0])}</button>`; }).join('')}</div></div>` : ''}
    </main>`;
  };

  // My week: the next session you're going to, with its photo and who else is going
  function nextCard(s) {
    if (!s) return '';
    const c = s.club; const g = 1 + (hash(c.id) % 6); const others = going(s) - 1;
    return `<div class="next"><button class="nx-main" data-act="session" data-id="${s.id}"><span class="ph g${g}"${im(c.sport, hash(c.id) + 1)}><span class="nx-when">${dayWord(s.at)} · ${s.t}</span><span class="nx-what">${esc(s.type)}</span></span>
      <span class="nx-body"><b>${esc(c.name)}</b><span class="mut sm">${esc(s.place)}</span><span class="det">Session details ${ic('chev')}</span></span></button>
      <div class="nx-who"><button class="whobtn" data-act="who" data-id="${s.id}">${avatars(people(s, 4))}<span class="grow"><b>See who's going</b><br><span class="mut sm">${plural(others, 'other')} · tap to see their profiles</span></span>${ic('chev', 'chev')}</button></div></div>`;
  }

  V.result = () => {
    const s = byId(route.id); const c = s.club; const next = nextOpen(c); const k = hash(s.id);
    const newcomer = (S.clubWeeks[c.id] || 0) <= 3;
    const tagged = !S.untag[s.id];
    const offer = next ? `<div class="stack"><span class="cap">${newcomer ? 'Same time next week?' : 'Next session'}</span><div class="row sp"><span><b>${dayWord(next.at)} ${next.t}</b><br><span class="mut sm">${next.type} · ${going(next)} going</span></span>
      ${has(next.id) ? '<span class="tag go">Going</span>' : `<button class="btn" data-act="rsvp" data-id="${next.id}">I'm in</button>`}</div></div>` : '';
    const photos = `<div class="stack tight"><div class="row sp"><span class="cap">Photos from ${nounFor(s)}</span>${canPost(c) ? `<button class="btn small ghost" data-act="post" data-id="${s.id}">${ic('plus')}Add yours</button>` : ''}</div>${canPost(c) ? '' : postNote(c)}
      <div class="strip">${myPhotos(s).map((p) => tile(p, 'yours')).join('')}
        ${tagged ? tile({ sp: c.sport, i: k, g: 1 + (k % 6), by: 'Layla H.', sid: s.id, tagged: true }, "you're tagged") : ''}
        ${tile({ sp: c.sport, i: k + 2, g: 1 + ((k + 2) % 6), by: 'Omar S.', sid: s.id })}</div></div>`;
    return `<main class="pad-nav"><div class="stack tight"><h1>${route.weekJustDone ? `Week ${S.streak} done.` : 'Nice. That one counts too.'}</h1>
      <p class="mut">${esc(c.name)} · ${dateShort(s.at)}. ${plural(S.total, 'session')} in total.</p></div>
      ${newcomer ? offer + photos : photos + offer}
      ${(S.thanked || {})[s.id] ? `<p class="okline">${ic('check')}<span class="grow">You thanked ${esc(founderOf(c).split(' ')[0])}</span></p>` : `<button class="btn ghost block" data-act="thank" data-id="${c.id}" data-sid="${s.id}">Say thanks to ${esc(founderOf(c).split(' ')[0])}, who ran it</button>`}
      <button class="btn ghost block" data-act="me">${ic('left')}Back to my week</button></main>`;
  };

  V.missed = () => {
    const s = byId(route.id); const next = nextOpen(s.club);
    return `<main class="pad-nav"><div class="stack tight"><h1>No problem.</h1><p class="mut">${next ? `${DAYL[next.at.getDay()]}'s the next one.` : 'There is nothing scheduled yet.'}</p></div>
      ${next ? `<div class="row sp"><span><b>${dayWord(next.at)} ${next.t}</b><br><span class="mut sm">${esc(s.club.name)} · ${next.type}</span></span>${has(next.id) ? '<span class="tag go">Going</span>' : `<button class="btn" data-act="rsvp" data-id="${next.id}">I'm in</button>`}</div>` : ''}
      <button class="btn ghost block" data-act="me">${ic('left')}Back to my week</button></main>`;
  };

  V.clubs = () => `<main class="pad-nav"><h1>My clubs</h1>
    ${S.manage.length ? `<div class="stack tight"><span class="cap">You manage</span>${S.manage.map((id) => `<button class="mrow" data-act="manage" data-id="${id}"><span class="orgcta-ic">${ic('flag')}</span><span class="grow"><b>${esc(club(id).name)}</b><br><span class="sm mut">Headcounts, schedule, photos</span></span><span class="go">Manage ${ic('chev')}</span></button>`).join('')}</div>` : ''}
    ${S.follows.length ? `<div class="stack">${S.follows.map((id) => { const c = club(id); const n = nextOpen(c); return `<button class="card" data-act="club" data-id="${c.id}"><span class="body"><span class="disp" style="font-size:14px;font-weight:700">${esc(c.name)}</span><span class="mut sm">${SPORTS[c.sport]} · ${c.area}</span><span class="sm">${n ? `Next: ${dayWord(n.at)} ${n.t}` : 'No session scheduled'} · you: ${plural(S.clubWeeks[c.id] || 0, 'week')}</span><span class="go">View club ${ic('right')}</span></span></button>`; }).join('')}</div>` : '<p class="mut">You are not following any clubs yet.</p>'}
    <button class="btn ghost block" data-act="quiz">${ic('find')}Find another club</button></main>`;

  V.profile = () => { const m = myPro(); return `<main class="pad-nav"><div class="row">${face(S.user.name, m.photo, true)}<div class="stack tight"><h1>${esc(S.user.name)}</h1>
      <span class="mut sm">${[m.area, m.level && LEVELS[m.level], m.work].filter(Boolean).map(esc).join(' · ') || 'Add a photo and a few details so people know who to look for.'}</span>
      ${m.hobbies ? `<span class="sm">Into ${esc(m.hobbies)}</span>` : ''}${m.ig ? `<span class="sm">@${esc(m.ig)}</span>` : ''}</div></div>
    <button class="btn ghost block" data-act="editpro">${m.photo || m.work || m.hobbies || m.ig ? 'Edit profile' : 'Set up your profile'}</button>
    <p class="mut sm">People going to the same session as you can see your profile. Only you can see your streak and history.</p>
    <dl class="facts"><dt>Current streak</dt><dd>${plural(S.streak, 'week')}</dd><dt>Longest streak</dt><dd>${plural(S.longest, 'week')}</dd><dt>Sessions</dt><dd>${S.total}</dd><dt>Protection</dt><dd>${S.prot ? 'Available' : `Used. Returns after ${plural(Math.max(0, 4 - S.sinceProt), 'more week')} in a row`}</dd></dl>
    <div class="stack"><span class="cap">Milestones</span><div class="badges">${MS.map((m) => `<span class="badge ${S.badges.includes(m.id) ? 'on' : ''}" title="${m.t}" aria-label="${m.t}${S.badges.includes(m.id) ? ', earned' : ', not yet earned'}">${m.b}</span>`).join('')}</div>
      ${S.streak > 0 ? `<button class="btn ghost" data-act="share">${ic('share')}Share my streak</button>` : ''}</div>
    <div><span class="cap">Settings</span>
      <label class="switch" for="p-st"><span>Show me in club standings</span><input type="checkbox" id="p-st" data-set="standings" ${S.set.standings ? 'checked' : ''}></label>
      <label class="switch" for="p-tg"><span>Let people tag me in photos</span><input type="checkbox" id="p-tg" data-set="tagging" ${S.set.tagging ? 'checked' : ''}></label>
      <label class="switch" for="p-em"><span>Email reminders</span><input type="checkbox" id="p-em" data-set="email" ${S.set.email ? 'checked' : ''}></label>
      <label class="switch" for="p-wa"><span>WhatsApp reminders</span><input type="checkbox" id="p-wa" data-set="wa" ${S.set.wa ? 'checked' : ''}></label></div>
    <button class="btn quiet block" data-act="signout">Sign out</button></main>`; };

  // ---------- organiser views ----------
  V.manage = () => {
    const c = club(route.id); const ck = S.check[c.id] || {};
    const wk = future(c).filter((s) => s.at - now() < 7 * 864e5); const rec = past(c).slice(0, 2);
    const row = (s) => { const list = roster(s); const over = ended(s);
      const sub = isCancelled(s) ? 'Cancelled' : over ? `${list.filter((p) => p.st === 'came').length} came · ${list.filter((p) => p.st === 'no').length} didn't turn up` : `${plural(list.filter((p) => p.first).length, 'first-timer')}`;
      return `<button class="item" data-act="attend" data-id="${s.id}"><span class="when"><b>${over ? DAY[s.at.getDay()] + ' ' + s.at.getDate() : whenShort(s.at)}</b><span class="mut sm">${s.t}</span></span><span class="grow"><b>${s.type}</b><br><span class="mut sm">${sub}</span></span>${isCancelled(s) ? '<span class="tag warn">Cancelled</span>' : `<span class="big-n">${over ? list.filter((p) => p.st === 'came').length : going(s)}</span>`}${ic('chev', 'chev')}</button>`; };
    const tick = (on, label, act) => `<button class="item" data-act="${act}" data-id="${c.id}"><span class="tick ${on ? 'on' : ''}" aria-hidden="true">${on ? '✓' : ''}</span><span class="grow">${label}</span>${ic('chev', 'chev')}</button>`;
    const allDone = ck.d && ck.s && ck.p;
    return `<main class="pad-nav"><div class="stack tight"><span class="cap">${ic('flag')}Managing</span><h1 style="font-size:21px">${esc(c.name)}</h1>
        <p class="mut sm">Last confirmed ${confirmedOn(c)}</p><button class="chip" data-act="club" data-id="${c.id}">View public page ${ic('right')}</button></div>
      ${allDone ? '' : `<div class="stack tight"><span class="cap">Get set up</span><div>${tick(ck.d, 'Check your details', 'editclub')}${tick(ck.s, 'Check your weekly sessions', 'sched')}${tick(ck.p, 'Add or tidy your photos', 'mphotos')}</div></div>`}
      <div class="stack tight"><div class="row sp"><span class="cap">This week</span><span class="mut xs">tap a session for who's coming</span></div><div>${wk.map(row).join('') || '<p class="mut sm">No sessions this week.</p>'}</div></div>
      <div class="stack tight"><div class="row sp"><span class="cap">Just finished</span><span class="mut xs">came</span></div><div>${rec.map(row).join('') || '<p class="mut sm">Nothing yet.</p>'}</div></div>
      <div class="note"><b>Is ${esc(c.name)} still meeting ${meetDays(c)}?</b><div class="row" style="margin-top:10px"><button class="btn small" data-act="confirmclub" data-id="${c.id}">Yes, all correct</button><button class="btn small ghost" data-act="sched" data-id="${c.id}">Update</button></div></div>
      <div class="stack tight"><span class="cap">Your club</span><div>
        <button class="item" data-act="editclub" data-id="${c.id}"><span class="grow"><b>Club details</b><br><span class="mut sm">Description, level, cost, what to bring</span></span>${ic('chev', 'chev')}</button>
        <button class="item" data-act="sched" data-id="${c.id}"><span class="grow"><b>Schedule</b><br><span class="mut sm">${meetDays(c)} · cancel a session</span></span>${ic('chev', 'chev')}</button>
        <button class="item" data-act="mphotos" data-id="${c.id}"><span class="grow"><b>Photos</b><br><span class="mut sm">Pin the best, hide any you don't want</span></span>${ic('chev', 'chev')}</button>
        <button class="item" data-act="soon" data-what="Inviting co-organisers is not in this prototype yet."><span class="grow"><b>Organisers</b><br><span class="mut sm">Just you</span></span>${ic('chev', 'chev')}</button></div></div>
    </main>`;
  };

  V.attend = () => {
    const s = byId(route.id); const c = s.club; const list = roster(s); const over = ended(s);
    const person = (p, clickable) => `<${clickable ? 'button' : 'div'} class="item" ${clickable ? `data-act="cyc" data-id="${s.id}" data-name="${p.name}"` : ''}><span class="av">${initials(p.name)}</span><span class="grow">${p.name}</span>${p.first ? '<span class="tag ok">First time</span>' : ''}${clickable ? `<span class="mini">${p.st === 'came' ? 'Didn’t come' : `${ic('check')}Came`}</span>` : ''}</${clickable ? 'button' : 'div'}>`;
    const group = (st, title) => { const g = list.filter((p) => p.st === st); return g.length ? `<div class="stack tight"><span class="cap">${title} · ${g.length}</span><div>${g.map((p) => person(p, true)).join('')}</div></div>` : ''; };
    const head = `<div class="stack tight"><span class="cap">${esc(c.name)}</span><h1 style="font-size:21px">${DAYL[s.at.getDay()]} ${s.at.getDate()} ${MON[s.at.getMonth()]} · ${s.t}</h1><p class="mut sm">${s.type} · ${s.place}</p></div>`;
    if (isCancelled(s)) return `<main class="pad-nav">${head}<p class="notice">This session is cancelled. Everyone who was going has been told.</p></main>`;
    if (!over) return `<main class="pad-nav">${head}
      ${S.mode === 'org' ? `<button class="btn block big" data-act="ocheck" data-id="${s.id}">${ic('check')}Check people in</button>` : ''}
      <div class="row sp"><span><span class="big-n">${list.length}</span> going${s.cap ? ` of ${s.cap}` : ''}</span><button class="btn small ghost" data-act="soon" data-what="Link copied. Paste it in your WhatsApp group or Instagram.">${ic('share')}Share link</button></div>
      <p class="note">${plural(list.filter((p) => p.first).length, 'person')} coming for the first time. Say hello.</p>
      <div>${list.map((p) => person(p, false)).join('')}</div>
      <button class="btn ghost block" data-act="askcancel" data-id="${s.id}">Cancel this session</button></main>`;
    return `<main class="pad-nav">${head}
      <p class="note">Members answer "Did you go?" themselves. Tap a name to correct it.</p>
      <button class="btn block" data-act="allcame" data-id="${s.id}">${ic('check')}Mark everyone as came</button>
      ${group('came', 'Came')}${group('no', 'Didn’t turn up')}${group('wait', 'Not yet confirmed')}</main>`;
  };

  V.sched = () => {
    const c = club(route.id); const fut = future(c).slice(0, 5);
    return `<main class="pad-nav"><div class="stack tight"><span class="cap">${esc(c.name)}</span><h1 style="font-size:21px">Schedule</h1></div>
      <div class="stack tight"><span class="cap">Every week</span><div>${c.sched.map((s) => `<div class="item"><span class="when"><b>${DAY[s.d]}</b><span class="mut sm">${s.t}</span></span><span class="grow"><b>${s.type}</b><br><span class="mut sm">${s.note} · ${s.place}${s.cap ? ` · up to ${s.cap}` : ''}</span></span><button class="link sm" data-act="soon" data-what="Editing times and places is not in this prototype yet.">Edit</button></div>`).join('')}</div>
        <button class="btn small ghost" data-act="soon" data-what="Adding sessions is not in this prototype yet.">Add a session</button></div>
      <div class="stack tight"><span class="cap">Coming up</span><div>${fut.map((s) => `<div class="item"><span class="when"><b>${whenShort(s.at)}</b><span class="mut sm">${s.t}</span></span><span class="grow"><b>${s.type}</b><br><span class="mut sm">${isCancelled(s) ? 'Cancelled' : going(s) + ' going'}</span></span>${isCancelled(s) ? `<button class="link sm" data-act="uncancel" data-id="${s.id}">Restore</button>` : `<button class="link sm" data-act="askcancel" data-id="${s.id}">Cancel</button>`}</div>`).join('')}</div></div>
      <button class="btn quiet block" data-act="soon" data-what="Pausing the club (for summer or Ramadan timings) is not in this prototype yet.">Pause the club</button></main>`;
  };

  V.mphotos = () => {
    const c = club(route.id); const pin = S.pin[c.id];
    const recs = past(c).slice(0, 2).flatMap((s, i) => exPhotos(c, s, i, true));
    const all = (c.photos ? leadPhotos(c, true) : []).concat(recs);
    return `<main class="pad-nav"><div class="stack tight"><span class="cap">${esc(c.name)}</span><h1 style="font-size:21px">Photos</h1><p class="mut sm">Members post these. Pin one to lead your page, or hide any you don't want shown.</p></div>
      ${all.length ? `<div class="mgrid">${all.map((p) => { const hid = S.hidden[p.key]; const isPin = pin && pin.key === p.key; return `<div class="stack tight"><span class="ph g${p.g} ${hid ? 'dim' : ''}"${im(p.sp, p.i)}>${hid ? 'hidden' : isPin ? 'pinned' : ''}</span><span class="xs mut">by ${p.by}</span>
        <div class="row"><button class="btn small ${isPin ? '' : 'ghost'} grow" data-act="pin" data-id="${c.id}" data-key="${p.key}" data-i="${p.i}" data-g="${p.g}" data-by="${p.by}" ${hid ? 'disabled' : ''}>${isPin ? 'Pinned' : 'Pin'}</button><button class="btn small quiet grow" data-act="hide" data-id="${c.id}" data-key="${p.key}">${hid ? 'Show' : 'Hide'}</button></div></div>`; }).join('')}</div>`
        : '<p class="note">No photos yet. Add a few so newcomers can see the club.</p>'}
      <button class="btn ghost block" data-act="soon" data-what="On a phone this opens your photo library so you can seed the page.">Add photos</button></main>`;
  };

  // ---------- organiser app ----------
  // A separate app for people who run clubs: its own header, colours and tabs, built around the
  // organiser's week (PRD FR-30 to FR-35). It reads and writes the same data as the member app.
  const OV = {};
  const orgClub = () => club(S.manage.includes(S.orgClub) ? S.orgClub : S.manage[0]);
  const ckOf = (c) => (S.check[c.id] = S.check[c.id] || {});

  // Credit: every club names the people who run it, and organisers get a record built from confirmed attendance.
  // Example numbers are derived from the club so they stay the same between visits.
  const founderOf = (c) => PEOPLE[(hash(c.id) * 7) % PEOPLE.length];
  const sinceOf = (c) => { const d = new Date(2026, 9, 1); d.setMonth(d.getMonth() - (8 + (hash(c.id) % 30))); return d; };
  const organisers = (c) => (S.user && S.manage.includes(c.id) ? [S.user.name, founderOf(c)] : [founderOf(c)]);
  const runBy = (c) => { const o = organisers(c); const d = sinceOf(c); return `Run by ${o.map(esc).join(' and ')} · since ${MON[d.getMonth()]} ${d.getFullYear()}`; };
  const weeksRunning = (c) => Math.round((now() - sinceOf(c)) / (7 * 864e5));
  const thanksFor = (c) => 40 + (hash(c.id) % 260) + (S.thanks[c.id] || 0);
  function impact(c) {
    const h = hash(c.id); const sessions = weeksRunning(c) * c.sched.length;
    const newcomers = Math.round(sessions * (0.35 + (h % 20) / 100)); const stayed = Math.round(newcomers * (0.28 + (h % 15) / 100));
    return { sessions, newcomers, stayed, checkins: sessions * (9 + (h % 8)), thanks: thanksFor(c) };
  }
  // Club health for the last 4 weeks, and regulars who haven't been for 2+ weeks.
  function health(c) {
    const h = hash(c.id); const top = c.top.map((r) => r[0]);
    const pool = PEOPLE.filter((n) => !top.includes(n));
    const drifting = [0, 1, 2].map((i) => { const name = pool[(h + i * 7) % pool.length]; const hh = hash(name + c.id); return { name, weeks: 2 + (hh % 4), before: 5 + (hh % 14) }; });
    return { active: c.active, newFaces: 4 + (h % 9), cameBack: 2 + (h % 5), regulars: 8 + (h % 12), drifting };
  }
  // What lifts a club in Find: rewards good organising, not marketing.
  const visibility = (c) => [
    ['Page confirmed in the last 30 days', !!S.conf[c.id] && now() - S.conf[c.id] < 30 * 864e5, 'confirmclub', 'Confirm now'],
    ['Check-ins at most sessions', Object.keys(S.ci).some((id) => id.startsWith(c.id + '|')) || Object.keys(S.orgAtt).some((id) => id.startsWith(c.id + '|')), 'ochecks', 'Check-in'],
    ['Newcomers who come back', impact(c).stayed / Math.max(1, impact(c).newcomers) >= 0.3, 'onudgeall', 'Message drifters'],
    ['"How to find us" note for first-timers', !!c.find, 'editclub', 'Add it']
  ];
  const ticks = (s) => S.ci[s.id] || {};

  OV['o-start'] = () => {
    if (!S.user) return `<main><div class="ohero"><span class="obadge">For organisers</span><h1>Run your club in five minutes a week.</h1>
      <p>Keep your page right, see who's coming and who's new, and check people in at the session. Free for every community club in Dubai.</p></div>
      <button class="btn block big" data-act="signin" data-then="org">Sign in with Google ${ic('right')}</button>
      <p class="mut sm center">Looking for a club to join? <button class="link" data-act="tomember">Go to the member app</button></p></main>`;
    const pend = Object.keys(S.claims);
    if (pend.length) return `<main><div class="stack tight"><span class="cap">Your request</span><h1>We're checking ${esc(club(pend[0]).name)}</h1>
      <p class="mut">We'll confirm within 2 days, usually from the club's Instagram or WhatsApp group.</p></div>
      <p class="note">Prototype only: approve it now to see the organiser app.</p><button class="btn block big" data-act="d-org">Approve my request ${ic('right')}</button></main>`;
    return `<main><div class="stack tight"><span class="cap">Get started</span><h1>Which club do you run?</h1>
      <p class="mut">We've already set up a page for each club from its Instagram. Claim yours and check it.</p></div>
      <div>${CLUBS.map((c) => `<div class="item"><span class="grow"><b>${esc(c.name)}</b><br><span class="mut sm">${SPORTS[c.sport]} · ${c.area}</span></span><button class="btn small ghost" data-act="claim" data-id="${c.id}">Claim</button></div>`).join('')}</div>
      <p class="mut sm">Not listed? <button class="link" data-act="soon" data-what="This would open a short form. The Ryze Club curator sets up the page for you.">Ask us to add it</button></p></main>`;
  };

  // Organiser landing: the next session to act on, then growing the club, then the week.
  // One-off setup lives in the Club tab, with a single slim reminder here until it is done.
  const inviteUrl = (c) => `${location.href.split('#')[0]}#join/${c.id}`;
  const joinedVia = (c) => 6 + (hash(c.id) % 9) + ((S.joined || {})[c.id] || 0);
  const setupLeft = (c) => { const ck = ckOf(c); return ['d', 's', 'f'].filter((k) => !ck[k]).length; };
  OV['o-week'] = () => {
    const c = orgClub(); const wk = future(c).filter((s) => s.at - now() < 7 * 864e5);
    const live = wk.filter((s) => !isCancelled(s)); const lastWk = past(c).filter((s) => now() - s.at < 7 * 864e5);
    const cameLast = lastWk.reduce((n, s) => n + roster(s).filter((p) => p.st === 'came').length, 0);
    const next = live[0]; const soon = next && next.at - now() < 18 * 36e5;
    const firsts = (s) => roster(s).filter((p) => p.first).length;
    const hero = next ? `<section class="orgnow"><p class="onow-when">${dayWord(next.at)} · ${next.t} · ${esc(next.type)}</p>
        <p class="onow-n"><b>${going(next)}</b> going${firsts(next) ? ` · <b>${firsts(next)}</b> first time` : ''}</p>
        <p class="onow-where">${esc(next.place)}</p>
        <div class="onow-acts">${soon ? `<button class="btn" data-act="ocheck" data-id="${next.id}">${ic('check')}Check people in</button>` : `<button class="btn" data-act="osession" data-id="${next.id}">See who's coming ${ic('right')}</button>`}</div></section>`
      : `<section class="orgnow"><p class="onow-when">Nothing scheduled this week</p><div class="onow-acts"><button class="btn" data-act="osched">Add a session</button></div></section>`;
    const grow = `<section class="ogrow"><div class="ogrow-top"><span class="orgcta-ic">${ic('clubs')}</span><div class="grow"><h2>Bring your members over</h2><p class="sm mut">${joinedVia(c)} people joined from your link. Share it once in your WhatsApp group and they're in.</p></div></div>
        <div class="ogrow-acts"><button class="btn" data-act="ojoin">${ic('share')}Invite members</button><button class="btn ghost" data-act="ojoin" data-qr="1">QR code</button></div></section>`;
    const rows = wk.map((s) => { const f = firsts(s); return `<button class="item" data-act="osession" data-id="${s.id}"><span class="when"><b>${whenShort(s.at)}</b><span class="mut sm">${s.t}</span></span><span class="grow"><b>${esc(s.type)}</b><br><span class="mut sm">${isCancelled(s) ? 'Cancelled' : f ? plural(f, 'first-timer') : 'No first-timers'}</span></span>${isCancelled(s) ? '<span class="tag warn">Cancelled</span>' : `<span class="big-n">${going(s)}</span>`}${ic('chev', 'chev')}</button>`; }).join('');
    const confirmed = S.conf[c.id] && now() - S.conf[c.id] < 7 * 864e5;
    const left = setupLeft(c);
    const driftN = health(c).drifting.filter((m) => !(S.nudged[c.id] || {})[m.name]).length;
    const driftLine = driftN ? `<button class="osetup-line" data-act="omembers"><span class="grow"><b>${plural(driftN, 'regular')} haven't been back</b> · send a "We missed you"</span><span class="det">Members ${ic('chev')}</span></button>` : '';
    return `<main class="pad-nav">${hero}${driftLine}${grow}
      <section class="stack tight"><div class="row sp"><h2>This week</h2><span class="sm mut">${live.reduce((n, s) => n + going(s), 0)} RSVPs · last week ${cameLast} came</span></div>
        <div>${rows || '<p class="mut sm">No sessions in the next 7 days.</p>'}</div>
        <div class="wrap"><button class="btn small ghost" data-act="oshare">${ic('share')}Post the week to WhatsApp</button><button class="btn small quiet" data-act="osched">Change or cancel</button></div></section>
      ${confirmed ? `<p class="okline">${ic('check')}<span class="grow">Schedule confirmed ${confirmedOn(c)}</span><button class="link sm" data-act="ounconf">Undo</button></p>`
        : `<div class="oconfirm"><span class="grow"><b>Still meeting ${meetDays(c)}?</b><br><span class="sm mut">Keeps your page marked as current</span></span><button class="btn small" data-act="confirmclub" data-id="${c.id}">${ic('check')}Yes</button></div>`}
      ${left ? `<button class="osetup-line" data-act="oclub"><span class="grow"><b>Finish checking your page</b> · ${3 - left} of 3 done</span><span class="det">Club ${ic('chev')}</span></button>` : ''}
      <p class="mut xs center">You also get this every Sunday at 18:00 by email${S.set.wa ? ' and WhatsApp' : ''}.</p></main>`;
  };

  OV['o-checks'] = () => {
    const c = orgClub(); const list = sessions(c, -2, 7).filter((s) => !isCancelled(s));
    const row = (s) => { const t = Object.values(ticks(s)).filter(Boolean).length; const done = t || S.orgAtt[s.id];
      return `<button class="item" data-act="ocheck" data-id="${s.id}"><span class="when"><b>${ended(s) ? DAY[s.at.getDay()] + ' ' + s.at.getDate() : whenShort(s.at)}</b><span class="mut sm">${s.t}</span></span><span class="grow"><b>${esc(s.type)}</b><br><span class="mut sm">${done ? `${t || roster(s).filter((p) => p.st === 'came').length} checked in` : `${going(s)} going`}</span></span>${done ? `<span class="tag ok">${ic('check')}Done</span>` : `<span class="tag cta">${ended(s) ? 'Mark who came' : 'Check in'} ${ic('chev')}</span>`}</button>`; };
    const up = list.filter((s) => !ended(s)); const prev = list.filter((s) => ended(s)).reverse();
    return `<main class="pad-nav"><div class="stack tight"><h1>Check-in</h1><p class="mut sm">At the session, tap names as people arrive. It takes under a minute.</p></div>
      <div class="stack tight"><span class="cap">Coming up</span><div>${up.map(row).join('') || '<p class="mut sm">Nothing in the next week.</p>'}</div></div>
      <div class="stack tight"><span class="cap">Just finished</span><div>${prev.map(row).join('') || '<p class="mut sm">Nothing yet.</p>'}</div></div></main>`;
  };

  OV['o-checkin'] = () => {
    const s = byId(route.id); const t = ticks(s);
    const list = roster(s).sort((a, b) => (b.first - a.first) || a.name.localeCompare(b.name));
    const here = list.filter((p) => t[p.name]).length;
    return `<main class="pad-nav"><div class="stack tight"><span class="cap">${esc(s.club.name)}</span><h1 style="font-size:22px">${DAYL[s.at.getDay()]} ${s.t} · ${esc(s.type)}</h1></div>
      <div class="cihead"><span><span class="cin">${here}</span> of ${list.length} here</span><button class="btn small" data-act="ciall" data-id="${s.id}">${ic('check')}Everyone came</button></div>
      <div class="cilist">${list.map((p) => `<button class="cirow ${t[p.name] ? 'on' : ''}" data-act="ci" data-id="${s.id}" data-name="${esc(p.name)}" aria-pressed="${!!t[p.name]}"><span class="citick">${t[p.name] ? ic('check') : ''}</span><span class="grow">${esc(p.name)}</span>${p.first ? '<span class="tag ok">First time · say hi</span>' : ''}</button>`).join('')}</div>
      <p class="mut sm">Saved as you tap. People you check in aren't asked "Did you go?" and their streak counts straight away.</p>
      ${here ? `<button class="btn quiet block" data-act="ciclear" data-id="${s.id}">Clear all ticks</button>` : ''}</main>`;
  };

  OV['o-club'] = () => {
    const c = orgClub();
    const sec = (act, t, sub, ico) => `<button class="item" data-act="${act}" data-id="${c.id}">${ico ? `<span class="orgcta-ic">${ic(ico)}</span>` : ''}<span class="grow"><b>${t}</b><br><span class="mut sm">${sub}</span></span>${ic('chev', 'chev')}</button>`;
    const ck = ckOf(c); const left = setupLeft(c);
    const checklist = `<section class="stack tight"><div class="row sp"><h2>${left ? 'Check your page' : 'Your page is checked'}</h2><span class="sm mut">${3 - left} of 3</span></div><p class="sm mut">${left ? "We filled it in from your club's Instagram. Confirm each part or fix it." : 'Change anything here at any time.'}</p><div class="ocard">
      ${[['d', 'Club details', 'Description, level, cost, what to bring', 'editclub'], ['s', 'Weekly sessions', meetDays(c), 'osched'], ['f', '"How to find us" note', c.find ? `“${esc(c.find)}”` : 'Shown to first-timers in their reminder', 'editclub']].map(([k, t, sub, act]) =>
        `<div class="item"><span class="tick ${ck[k] ? 'on' : ''}" aria-hidden="true">${ck[k] ? '✓' : ''}</span><span class="grow"><b>${t}</b><br><span class="mut sm">${sub}</span></span>${ck[k] ? `<span class="oacts"><button class="btn small ghost" data-act="${act}" data-id="${c.id}">${ic('edit')}Edit</button><button class="btn small quiet" data-act="ounck" data-k="${k}">Undo</button></span>` : `<span class="oacts">${k !== 'f' ? `<button class="btn small" data-act="ock" data-k="${k}">${ic('check')}Looks right</button>` : ''}<button class="btn small ghost" data-act="${act}" data-id="${c.id}">${k === 'f' ? `${ic('plus')}Add a note` : `${ic('edit')}Edit`}</button></span>`}</div>`).join('')}</div></section>`;
    return `<main class="pad-nav"><div class="stack tight"><h1 style="font-size:22px">${esc(c.name)}</h1><p class="mut sm">Last confirmed ${confirmedOn(c)}</p></div>
      ${left ? checklist : ''}
      <button class="whobtn" data-act="ojoin"><span class="orgcta-ic">${ic('share')}</span><span class="grow"><b>Invite members</b><br><span class="mut sm">Link, QR code and WhatsApp message</span></span>${ic('chev', 'chev')}</button>
      <button class="whobtn" data-act="tomember" data-id="${c.id}"><span class="orgcta-ic">${ic('me')}</span><span class="grow"><b>See your public page</b><br><span class="mut sm">Opens it in the member app, as members see it</span></span>${ic('chev', 'chev')}</button>
      <div>${sec('editclub', 'Club details', 'Description, level, cost, what to bring', 'edit')}
        ${sec('editclub', 'How to find us', c.find ? `“${esc(c.find)}”` : 'Add a line for first-timers', 'flag')}
        ${sec('osched', 'Schedule', `${meetDays(c)} · change or cancel a session`, 'week')}
        ${sec('oinvite', 'Organisers', 'Just you · invite a co-organiser', 'clubs')}</div>
      ${left ? '' : checklist}
      <button class="btn quiet block" data-act="soon" data-what="Pausing the club (for summer or Ramadan timings) is not in this prototype yet.">Pause the club</button></main>`;
  };

  OV['o-members'] = () => {
    const c = orgClub(); const im = impact(c); const hl = health(c); const d = sinceOf(c); const vis = visibility(c); const lit = vis.filter((v) => v[1]).length;
    const nudged = S.nudged[c.id] || {};
    const drift = hl.drifting.map((m) => `<div class="item"><span>${face(m.name)}</span><span class="grow"><b>${esc(m.name)}</b><br><span class="mut sm">Came ${m.before} times · not seen for ${plural(m.weeks, 'week')}</span></span>
      ${nudged[m.name] ? `<span class="tag ok">${ic('check')}Sent</span>` : `<button class="btn small ghost" data-act="onudge" data-name="${esc(m.name)}">We missed you</button>`}</div>`).join('');
    return `<main class="pad-nav">
      <section class="oimpact"><span class="obadge">Your impact</span>
        <p class="oi-lead">Since ${MON[d.getMonth()]} ${d.getFullYear()} your club has hosted <b>${im.sessions}</b> sessions and welcomed <b>${im.newcomers}</b> newcomers. <b>${im.stayed}</b> of them came back 4 or more times.</p>
        <div class="oi-stats"><span><b>${im.checkins.toLocaleString('en')}</b>check-ins</span><span><b>${im.thanks}</b>thanks from members</span><span><b>${weeksRunning(c)}</b>weeks running</span></div>
        <button class="btn" data-act="oimpact">${ic('share')}Share your impact</button></section>
      <section class="stack tight"><div class="row sp"><h2>Last 4 weeks</h2><span class="sm mut">${hl.active} people came</span></div>
        <div class="ohealth"><span><b>${hl.newFaces}</b>new faces</span><span><b>${hl.cameBack}</b>of them came back</span><span><b>${hl.regulars}</b>regulars</span></div></section>
      <section class="stack tight"><div class="row sp"><h2>Haven't been back</h2>${Object.keys(nudged).length < hl.drifting.length ? '<button class="btn small" data-act="onudgeall">Message all</button>' : ''}</div>
        <p class="sm mut">Regulars who've missed 2 weeks or more. "We missed you" sends a short note from you with your next session.</p>
        <div>${drift}</div></section>
      <section class="stack tight"><h2>Recent thanks</h2>
        <div>${people({ id: c.id + 'thanks' }, 3).map((n, i) => `<div class="item"><span>${face(n)}</span><span class="grow"><b>${esc(n)}</b><br><span class="mut sm">Thanked you after ${i ? 'the ' + DAYL[(c.sched[i % c.sched.length] || c.sched[0]).d] + ' session' : 'yesterday\'s session'}</span></span></div>`).join('')}</div></section>
      <section class="stack tight"><div class="row sp"><h2>Your place in Find</h2><span class="sm mut">${lit} of ${vis.length}</span></div>
        <p class="sm mut">Clubs that are well run show higher when newcomers search. It's earned by organising, never bought.</p>
        <div>${vis.map(([t, on, act, cta]) => `<div class="item"><span class="tick ${on ? 'on' : ''}" aria-hidden="true">${on ? '✓' : ''}</span><span class="grow">${t}</span>${on ? '<span class="sr">Done</span>' : `<button class="btn small ghost" data-act="${act}" data-id="${c.id}">${cta}</button>`}</div>`).join('')}</div></section>
      <p class="mut xs center">${runBy(c)}. This is how your club page credits you.</p></main>`;
  };

  // ---------- overlays ----------
  const O = {};
  O.signin = () => `<div class="sheet"><h2>${overlay.then && (overlay.then.act === 'claim' || overlay.then.act === 'org') ? 'Sign in to manage your club' : overlay.then && overlay.then.act === 'who' ? 'Sign in to see who\'s going' : 'Sign in to save your spot'}</h2><p class="mut sm">In the real product this is Google sign-in. Here, type any first name.</p>
    <label for="si-name">First name</label><input type="text" id="si-name" value="Alex" maxlength="20" autocomplete="off">
    <button class="btn block" data-act="dosignin">Continue with Google</button><button class="btn quiet block" data-act="close">Not now</button></div>`;
  O.day = () => {
    const key = overlay.date; const [y, mo, da] = key.split('-').map(Number); const d = new Date(y, mo - 1, da);
    const list = dayList(key); const went = list.filter((s) => S.att[s.id] === 'went');
    const isPast = day0(d) < day0(now());
    const row = (s) => {
      let tag;
      if (isCancelled(s)) tag = '<span class="tag warn">Cancelled</span>';
      else if (S.att[s.id] === 'went') tag = `<span class="tag ok">${ic('check')}Went</span>`;
      else if (S.att[s.id] === 'missed') tag = '<span class="tag">Missed</span>';
      else if (ended(s)) tag = has(s.id) ? '<span class="tag">Not confirmed</span>' : '<span class="tag">Finished</span>';
      else if (has(s.id)) tag = `<span class="tag go">${ic('check')}Going</span>`;
      else if (isFull(s)) tag = '<span class="tag">Full</span>';
      else tag = `<span class="tag cta">RSVP ${ic('chev')}</span>`;
      const ph = S.att[s.id] === 'went' ? myPhotos(s).concat(exPhotos(s.club, s, 0)).slice(0, 3) : [];
      return `<div class="stack tight"><button class="item" data-act="session" data-id="${s.id}"><span class="when"><b>${s.t}</b><span class="mut sm">${s.type}</span></span><span class="grow"><b>${esc(s.club.name)}</b><br><span class="mut sm">${esc(s.place)}</span></span>${tag}</button>
        ${ph.length ? `<div class="strip">${ph.map((p) => tile(p, p.mine ? 'yours' : '')).join('')}</div><button class="btn small ghost" data-act="post" data-id="${s.id}">${ic('plus')}Add your photos</button>` : ''}</div>`;
    };
    const summary = went.length ? `You went to ${plural(went.length, 'session')}. This week counts towards your streak.`
      : list.some((s) => has(s.id) && !ended(s) && !isCancelled(s)) ? 'You\'re going. You\'ll get a reminder before it starts.'
      : list.length ? (isPast ? 'You didn\'t go to a session this day.' : 'Nothing booked yet. Tap a session to join it.')
      : '';
    return `<div class="sheet"><div class="stack tight"><span class="cap">${dayWord(d) === 'Today' || dayWord(d) === 'Tomorrow' ? dayWord(d) : 'Your day'}</span><h2>${DAYL[d.getDay()]} ${d.getDate()} ${MON[d.getMonth()]}</h2>${summary ? `<p class="sm">${summary}</p>` : ''}</div>
      ${list.length ? `<div>${list.map(row).join('')}</div>` : `<p class="note">${isPast ? 'None of your clubs met this day.' : 'None of your clubs meet this day.'}</p><button class="btn ghost block" data-act="browse">${ic('find')}Find a club that does</button>`}
      <button class="btn quiet block" data-act="close">Close</button></div>`;
  };
  O.session = () => {
    const s = byId(overlay.id); const cancelled = isCancelled(s); const full = isFull(s); const mine = has(s.id); const over = ended(s);
    let act;
    if (over) act = S.att[s.id] ? `<p class="note">You said you ${S.att[s.id] === 'went' ? 'went' : 'missed it'}.</p>` : '<p class="note">This session has finished.</p>';
    else if (cancelled) act = '<p class="notice">This session is cancelled.</p>';
    else if (mine) act = `<p class="note">You're going. Reminder ${s.at.getHours() < 10 ? 'at 19:00 the evening before' : 'three hours before'}.</p><button class="btn ghost block" data-act="unrsvp" data-id="${s.id}">Can't make it</button><button class="btn quiet block" data-act="soon" data-what="This would add the session to your phone's calendar.">Add to calendar</button>`;
    else if (full) act = `<p class="notice">Full · ${s.cap} of ${s.cap}. There is no waiting list.</p>`;
    else act = `<button class="btn block" data-act="rsvp" data-id="${s.id}">I'm in</button>`;
    return `<div class="sheet"><div class="stack tight"><span class="cap">${esc(s.club.name)}</span><h2>${dayWord(s.at)} · ${s.t}</h2></div>
      <dl class="facts"><dt>Date</dt><dd>${DAYL[s.at.getDay()]} ${s.at.getDate()} ${MON[s.at.getMonth()]}</dd><dt>Where</dt><dd>${s.place}</dd><dt>What</dt><dd>${s.type}</dd><dt>Level</dt><dd>${s.note}</dd><dt>Bring</dt><dd>${esc(s.club.bring)}</dd><dt>Going</dt><dd>${going(s)}${s.cap ? ' of ' + s.cap : ''}${S.user ? ' · ' + people(s, 3).map((p) => p.split(' ')[0]).join(', ') + '…' : ''}</dd></dl>
      ${act}
      ${who(s, over)}
      ${overlay.from ? `<button class="btn quiet block" data-act="day" data-date="${overlay.from}">${ic('left')}Back to ${DAYL[s.at.getDay()]}</button>` : '<button class="btn quiet block" data-act="close">Close</button>'}</div>`;
  };
  function who(s, over) {
    if (!S.user || over || isCancelled(s)) return '';
    if (!canSeeWho(s)) return `<p class="note" id="who-list">Say "I'm in" to see who's going and what they're into, so you know a face when you arrive.</p>`;
    const me = myPro(); const others = people(s, Math.min(going(s) - (has(s.id) ? 1 : 0), 8));
    const meRow = has(s.id) ? `<button class="person" data-act="editpro"><span>${face(S.user.name, me.photo)}</span><span class="grow"><b>You</b><br><span class="mut sm">${me.photo || me.work || me.hobbies ? 'Edit your profile' : 'Add a photo so people can spot you'}</span></span></button>` : '';
    return `<div class="stack tight" id="who-list"><span class="cap">Who's going · ${going(s)}</span><div>${meRow}${others.map((n) => { const m = memberPro(n); return `<button class="person" data-act="person" data-name="${esc(n)}" data-sid="${s.id}"><span>${face(n)}</span><span class="grow"><b>${esc(n)}</b><br><span class="mut sm">${esc(m.work)} · ${esc(m.area)}</span></span></button>`; }).join('')}</div>
      ${going(s) - (has(s.id) ? 1 : 0) > others.length ? `<p class="mut sm">and ${plural(going(s) - (has(s.id) ? 1 : 0) - others.length, 'other')}</p>` : ''}
      <p class="mut xs">Only people going to this session and the club's organisers can see these profiles.</p></div>`;
  }
  O.impact = () => { const c = orgClub(); const im = impact(c); const d = sinceOf(c);
    return `<div class="sheet"><div class="sharecard g${1 + (hash(c.id) % 6)}"${im ? '' : ''}><span class="disp" style="font-size:12px;font-weight:700">ryze club · organiser</span><span class="n">${im.newcomers}</span><b style="font-size:18px">newcomers welcomed</b><span>${im.sessions} sessions with ${esc(c.name)} since ${MON[d.getMonth()]} ${d.getFullYear()}</span><span>${esc(S.user.name)}</span></div>
      <button class="btn block" data-act="soon" data-what="This would open your phone's share menu with the image.">${ic('share')}Share</button><button class="btn ghost block" data-act="soon" data-what="This would save the image, for LinkedIn or your CV.">Save image</button><button class="btn quiet block" data-act="close">Close</button></div>`; };
  O.person = () => {
    const m = memberPro(overlay.name);
    return `<div class="sheet"><div class="row">${face(m.name, '', true)}<div class="stack tight"><h2>${esc(m.name)}</h2><span class="mut sm">${esc(m.area)} · ${LEVELS[m.level]}</span></div></div>
      <dl class="facts"><dt>Work</dt><dd>${esc(m.work)}</dd><dt>Into</dt><dd>${esc(m.hobbies)}</dd>${m.ig ? `<dt>Instagram</dt><dd><a href="https://instagram.com/${encodeURIComponent(m.ig)}" target="_blank" rel="noopener">@${esc(m.ig)}</a></dd>` : ''}</dl>
      <p class="note">You'll both be at ${esc(byId(overlay.sid).place)}. Say hi.</p>
      <button class="btn ghost block" data-act="session" data-id="${overlay.sid}">Back to who's going</button>
      <button class="link" data-act="soon" data-what="Thanks. In the real product this goes to the club's organisers and the Ryze Club team.">Report this profile</button></div>`;
  };
  O.editpro = () => {
    const d = overlay.d;
    return `<div class="sheet"><h2>Your profile</h2><p class="mut sm">Only people going to the same session as you, and that club's organisers, can see this. Everything except your name is optional.</p>
      <div class="row">${face(S.user.name, d.photo, true)}<div class="stack tight"><label class="btn small ghost" for="ep-photo">${d.photo ? 'Change photo' : 'Add a photo'}</label><input type="file" id="ep-photo" accept="image/*" data-photo="1" hidden>
        ${d.photo ? '<button class="link sm" data-act="rmphoto">Remove photo</button>' : '<span class="mut xs">A clear face helps people find you at the meeting point.</span>'}</div></div>
      <label for="ep-area">Area</label><select id="ep-area"><option value="">Choose</option>${AREAS.map((a) => `<option ${d.area === a ? 'selected' : ''}>${a}</option>`).join('')}</select>
      <label for="ep-level">Running level</label><select id="ep-level"><option value="">Choose</option>${Object.entries(LEVELS).map(([k, l]) => `<option value="${k}" ${d.level === k ? 'selected' : ''}>${l}</option>`).join('')}</select>
      <label for="ep-ig">Instagram</label><input type="text" id="ep-ig" maxlength="31" placeholder="@yourhandle" value="${d.ig ? '@' + esc(d.ig) : ''}" autocomplete="off" autocapitalize="off">
      <label for="ep-work">Work</label><input type="text" id="ep-work" maxlength="40" placeholder="For example: Nurse, or Works in marketing" value="${esc(d.work)}">
      <label for="ep-hob">Other things you're into</label><input type="text" id="ep-hob" maxlength="80" placeholder="For example: brunch spots, photography" value="${esc(d.hobbies)}">
      <button class="btn block" data-act="savepro">Save</button><button class="btn quiet block" data-act="${overlay.sid ? 'session' : 'close'}"${overlay.sid ? ` data-id="${overlay.sid}"` : ''}>Cancel</button></div>`;
  };
  // Keep what has been typed when the sheet re-renders (for example after picking a photo).
  const readPro = () => { const v = (id) => { const el = document.getElementById(id); return el ? el.value.trim() : undefined; }; const d = overlay.d;
    [['area', 'ep-area'], ['level', 'ep-level'], ['ig', 'ep-ig'], ['work', 'ep-work'], ['hobbies', 'ep-hob']].forEach(([k, id]) => { const x = v(id); if (x !== undefined) d[k] = k === 'ig' ? x.replace(/^@/, '') : x; }); };
  O.milestone = () => { const m = MS.find((x) => x.id === overlay.id); return `<div class="sheet full" style="justify-content:center;text-align:center;align-items:center">
    <span class="badge on" style="width:120px;font-size:26px">${m.b}</span><span class="cap">New milestone</span><h1>${m.t}</h1><p>${m.line}</p><p class="mut sm">with ${esc(overlay.club)}</p>
    <div class="stack" style="width:100%"><button class="btn block" data-act="share">Share</button><button class="btn quiet block" data-act="close">Done</button></div></div>`; };
  O.share = () => { const c = S.follows[0] ? club(S.follows[0]) : null; return `<div class="sheet"><div class="sharecard g1"${c ? im(c.sport, hash(c.id) + 1) : ''}><span class="disp" style="font-size:12px;font-weight:700">ryze club</span><span class="n">${S.streak}</span><b style="font-size:18px">${S.streak === 1 ? 'week' : 'weeks'} in a row</b><span>with ${c ? esc(c.name) : 'Ryze Club'}</span><span id="sc-name">${overlay.hide ? '' : esc(S.user.name)}</span></div>
    <label class="switch" for="sc-show"><span>Show my name</span><input type="checkbox" id="sc-show" data-sharename="1" ${overlay.hide ? '' : 'checked'}></label>
    <button class="btn block" data-act="soon" data-what="This would open your phone's share menu with the image.">Share</button><button class="btn ghost block" data-act="soon" data-what="This would save the image to your phone.">Save image</button><button class="btn quiet block" data-act="close">Close</button></div>`; };
  O.post = () => { const s = byId(overlay.id); const sel = overlay.sel || []; return `<div class="sheet"><div class="stack tight"><h2>Add photos</h2><p class="mut sm">${nounFor(s)} · ${esc(s.club.name)}</p></div>
    <p class="note">On a phone this opens your photo library. Here, pick from these examples (up to 6).</p>
    <div class="pick">${[1, 2, 3, 4, 5, 6].map((g) => `<button class="ph g${g} ${sel.includes(g) ? 'on' : ''}"${im(s.club.sport, g - 1)} data-act="pick" data-g="${g}" aria-pressed="${sel.includes(g)}" aria-label="Example photo ${g}">${sel.includes(g) ? 'chosen' : ''}</button>`).join('')}</div>
    <label for="po-cap">Caption (optional)</label><input type="text" id="po-cap" maxlength="140" value="${esc(overlay.cap || '')}">
    <p class="mut xs">Photos here are public. Only post people who are happy to be seen.</p>
    <button class="btn block" data-act="dopost">Post</button><button class="btn quiet block" data-act="close">Cancel</button></div>`; };
  O.photo = () => { const p = overlay; const s = p.sid ? byId(p.sid) : null;
    const acts = p.confirmDel ? `<p><b>Delete this photo? This can't be undone.</b></p><div class="row"><button class="btn quiet grow" data-act="keep">Keep</button><button class="btn grow" data-act="delphoto">Delete</button></div>`
      : p.report ? `<span class="cap">Why are you reporting this?</span>${['I’m in this and want it removed', 'It’s not from this session', 'It’s inappropriate'].map((r) => `<button class="btn ghost block" data-act="sendreport">${r}</button>`).join('')}`
      : `${p.tagged ? '<button class="btn block" data-act="untag">Remove my tag</button>' : ''}${p.mine ? '<button class="btn ghost block" data-act="askdel">Delete</button>' : '<button class="btn ghost block" data-act="report">Report</button>'}`;
    return `<div class="sheet"><span class="ph g${p.g} photo-big"${im(p.sp, p.i)}>${p.tagged ? "you're tagged" : ''}</span>
      <p class="sm">${S.user || p.mine ? `Posted by <b>${esc(p.by)}</b>` : 'Sign in to see who posted this'}${s ? ` · ${nounFor(s)}` : ''}</p>
      ${acts}<button class="btn quiet block" data-act="close">Close</button></div>`; };
  O.claim = () => { const c = club(overlay.id); return `<div class="sheet"><div class="stack tight"><h2>Is this your club?</h2><p class="mut sm">${esc(c.name)}. Tell us who you are and we'll check with the club.</p></div>
    <label for="cl-role">Your role</label><select id="cl-role"><option>I started it</option><option>I help run it</option><option>I coach or lead sessions</option></select>
    <label for="cl-ig">The club's Instagram or WhatsApp group link</label><input type="text" id="cl-ig" placeholder="@yourclub" autocomplete="off">
    <label for="cl-ct">Best way to reach you</label><input type="text" id="cl-ct" placeholder="Phone or email" autocomplete="off">
    <button class="btn block" data-act="sendclaim" data-id="${c.id}">Send request</button><button class="btn quiet block" data-act="close">Cancel</button></div>`; };
  O.edit = () => { const c = club(overlay.id); return `<div class="sheet"><h2>Club details</h2>
    <label for="ed-desc">Description</label><textarea id="ed-desc" rows="4" maxlength="300">${esc(c.desc)}</textarea>
    <label for="ed-level">Level or pace</label><input type="text" id="ed-level" maxlength="80" value="${esc(c.level)}">
    <label for="ed-cost">Cost</label><input type="text" id="ed-cost" maxlength="40" value="${esc(c.cost)}">
    <label for="ed-bring">What to bring</label><input type="text" id="ed-bring" maxlength="80" value="${esc(c.bring)}">
    <label for="ed-find">How to find us<br><span class="mut sm">One line for first-timers, added to their reminder</span></label><input type="text" id="ed-find" maxlength="80" placeholder="For example: Look for the orange flag by Pier 7" value="${esc(c.find || '')}">
    <p class="mut xs">Changes show on your public page straight away.</p>
    <button class="btn block" data-act="saveclub" data-id="${c.id}">Save</button><button class="btn quiet block" data-act="close">Cancel</button></div>`; };
  O.cancel = () => { const s = byId(overlay.id); return `<div class="sheet"><div class="stack tight"><h2>Cancel ${nounFor(s)}?</h2><p class="mut sm">${dateShort(s.at)} · ${s.t} · ${s.type}</p></div>
    <p class="notice"><b>${plural(going(s), 'person')} will be told.</b> Their streak still counts this week.</p>
    <label for="cn-why">Reason (optional)</label><input type="text" id="cn-why" maxlength="80" placeholder="Weather, venue closed…">
    <button class="btn block" data-act="docancel" data-id="${s.id}">Cancel session</button><button class="btn quiet block" data-act="close">Keep it</button></div>`; };
  O.oshare = () => { const c = orgClub(); const wk = future(c).filter((s) => s.at - now() < 7 * 864e5 && !isCancelled(s));
    return `<div class="sheet"><h2>Share this week</h2><p class="mut sm">Post it in your club's WhatsApp group. People RSVP from the link; chat stays in your group.</p>
      <div class="msgprev"><b>This week at ${esc(c.name)}</b><br>${wk.map((s) => `${DAY[s.at.getDay()]} ${s.t} · ${esc(s.type)} · ${going(s)} going`).join('<br>')}<br>RSVP: ryzeclub.ae/${c.id}</div>
      <button class="btn block" data-act="soon" data-what="This would open WhatsApp with the message ready to send.">Send to WhatsApp</button>
      <button class="btn ghost block" data-act="soon" data-what="This would open Instagram with a story card.">Share to Instagram</button>
      <button class="btn quiet block" data-act="soon" data-what="Copied.">Copy text</button></div>`; };
  const qrSvg = (text) => {
    if (typeof window.qrcode !== 'function') return `<div class="qrfall">The QR code needs an internet connection to draw.<br>${esc(text)}</div>`;
    try { const q = window.qrcode(0, 'M'); q.addData(text); q.make(); const n = q.getModuleCount(); let d = '';
      for (let r = 0; r < n; r++) for (let k = 0; k < n; k++) if (q.isDark(r, k)) d += `M${k + 4} ${r + 4}h1v1h-1z`;
      return `<svg class="qr" viewBox="0 0 ${n + 8} ${n + 8}" role="img" aria-label="QR code for ${esc(text)}"><rect width="100%" height="100%" fill="#FFFFFF"/><path d="${d}" fill="#2A1730"/></svg>`;
    } catch (e) { return `<div class="qrfall">${esc(text)}</div>`; }
  };
  O.ojoin = () => { const c = orgClub(); const url = inviteUrl(c); const n = nextOpen(c);
    const msg = `Hi all! We're using Ryze Club for ${c.name} now. Join here to see the schedule, RSVP and get a reminder before each session${n ? ` (next one: ${DAYL[n.at.getDay()]} ${n.t})` : ''}: ${url}`;
    return `<div class="sheet"><div class="stack tight"><h2>Invite members</h2><p class="sm mut">Anyone with the link lands on your club page with a "Join" button. Nothing to download.</p></div>
      ${overlay.qr ? `<div class="qrwrap">${qrSvg(url)}<p class="sm"><b>Show this at the meeting point</b> or print it for your flag. Phones scan it straight from the camera.</p></div>` : ''}
      <div class="linkbox"><span class="grow">${esc(url.replace(/^[a-z]+:\/\//, ''))}</span><button class="btn small" data-act="copylink" data-url="${esc(url)}">Copy</button></div>
      <button class="btn block" data-act="soon" data-what="This would open WhatsApp with the message ready for your group.">Send to your WhatsApp group</button>
      <div class="msgprev">${esc(msg)}</div>
      ${overlay.qr ? '' : `<button class="btn ghost block" data-act="ojoin" data-qr="1">Show QR code</button>`}
      <button class="btn quiet block" data-act="soon" data-what="This would copy the link for your Instagram bio.">Add to your Instagram bio</button>
      <p class="xs mut">${joinedVia(c)} people have joined from this link so far.</p></div>`; };
  O.oinvite = () => { const c = orgClub(); return `<div class="sheet"><h2>Invite a co-organiser</h2><p class="mut sm">Send this link to someone who helps run the club. The first person to open it and sign in joins as an organiser. It works once and expires in 7 days.</p>
      <div class="msgprev">Help run ${esc(c.name)} on Ryze Club: ryzeclub.ae/join/${c.id}-${hash(c.id + S.user.name) % 9000 + 1000}</div>
      <button class="btn block" data-act="soon" data-what="This would open WhatsApp with the invite ready to send.">Send by WhatsApp</button>
      <button class="btn ghost block" data-act="soon" data-what="This would open your email with the invite.">Send by email</button></div>`; };
  O.demo = () => { const n = now(); const pend = Object.keys(S.claims).length; return `<div class="sheet"><div class="stack tight"><h2>Demo controls</h2><p class="mut sm">Prototype time: ${DAYL[n.getDay()]} ${n.getDate()} ${MON[n.getMonth()]}, ${String(n.getHours()).padStart(2, '0')}:${String(n.getMinutes()).padStart(2, '0')}</p></div>
    <span class="cap">As a member</span>
    <button class="btn ghost block" data-act="d-after">Skip to after my next session</button>
    <button class="btn ghost block" data-act="d-week">End this week</button>
    <button class="btn ghost block" data-act="d-11">Give me an 11-week streak</button>
    <span class="cap">As an organiser</span>
    <button class="btn ghost block" data-act="d-org">${pend ? 'Approve my club request' : S.manage.length ? 'Open the organiser app' : 'Make me organiser of Marina Dawn Runners'}</button>
    ${S.mode === 'org' ? '<button class="btn ghost block" data-act="tomember">Switch to the member app</button>' : ''}
    <span class="cap">Start again</span>
    <button class="btn ghost block" data-act="d-reset">Reset the prototype</button>
    <p class="mut xs">"Skip" needs an RSVP first. After an 11-week streak, your next "I went" earns the 12-week milestone, and you can post photos to your first club (members need 5 sessions with a club).</p>
    <button class="btn quiet block" data-act="close">Close</button></div>`; };

  // ---------- actions ----------
  const needUser = (fn) => (d) => { if (!S.user) { overlay = null; say('Sign in first: tap "Sign in" at the top.'); render(); return; } fn(d); };
  const A = {
    home: () => go(S.user ? 'me' : 'home'), me: () => go('me'), back, quiz: () => go('quiz', { step: 0 }),
    quizback: () => { route.step -= 1; render(); },
    q: (d) => { S.quiz[d.k] = d.val; save(); if ((route.step || 0) < 2) { route.step = (route.step || 0) + 1; render(); window.scrollTo(0, 0); } else go('results', {}, true); },
    browse: (d) => { if (d.sport) filt = { sport: d.sport, area: '', day: '', level: '', price: '' }; go('browse'); },
    filt: (d) => { filt[d.k] = d.val; render(); }, clearfilt: () => { filt = { sport: '', area: '', day: '', level: '', price: '' }; render(); },
    person: (d) => { overlay = { t: 'person', name: d.name, sid: d.sid }; render(); },
    editpro: () => { const sid = overlay && overlay.t === 'session' ? overlay.id : null; overlay = { t: 'editpro', d: myPro(), sid }; render(); },
    rmphoto: () => { readPro(); overlay.d.photo = ''; render(); },
    savepro: () => {
      readPro(); const d = overlay.d;
      if (d.ig && !/^[A-Za-z0-9._]{1,30}$/.test(d.ig)) { say('Instagram handles use letters, numbers, dots and underscores only.'); render(); return; }
      S.user.pro = d; save(); const sid = overlay.sid; overlay = sid ? { t: 'session', id: sid } : null; say('Profile saved.'); render();
    },
    club: (d) => go('club', { id: d.id }), clubs: () => go('clubs'), profile: () => go('profile'),
    session: (d) => { overlay = { t: 'session', id: d.id, from: overlay && overlay.t === 'day' ? overlay.date : (overlay && overlay.from) || null }; render(); },
    day: (d) => { overlay = { t: 'day', date: d.date }; render(); },
    // Open the session and bring the attendee list into view.
    who: (d) => { if (!S.user) { overlay = { t: 'signin', then: { act: 'who', id: d.id } }; render(); return; }
      overlay = { t: 'session', id: d.id, from: null }; render(); const el = document.getElementById('who-list'); if (el) el.scrollIntoView({ block: 'start' }); },
    close: () => { overlay = null; render(); },
    soon: (d) => { say(d.what); render(); },
    demo: () => { overlay = { t: 'demo' }; render(); },
    rsvp: (d) => {
      if (!S.user) { overlay = { t: 'signin', then: { act: 'rsvp', id: d.id } }; render(); return; }
      doRsvp(d.id); overlay = null; say("You're going."); render();
    },
    follow: (d) => {
      if (!S.user) { overlay = { t: 'signin', then: { act: 'follow', id: d.id } }; render(); return; }
      const i = S.follows.indexOf(d.id); if (i >= 0) { S.follows.splice(i, 1); say('Unfollowed. Your history is kept.'); } else { S.follows.push(d.id); if (route.invited) { S.joined = S.joined || {}; S.joined[d.id] = (S.joined[d.id] || 0) + 1; say(`You've joined ${club(d.id).name}.`); } else say('Following.'); }
      save(); render();
    },
    dosignin: () => {
      const el = document.getElementById('si-name'); const name = (el && el.value.trim()) || 'Alex'; const then = overlay.then;
      S.user = { name }; save(); overlay = null;
      if (then && then.act === 'rsvp') { doRsvp(then.id); stack = []; go('confirm', { id: then.id }); }
      else if (then && then.act === 'follow') { if (!S.follows.includes(then.id)) { S.follows.push(then.id); if (route.invited) { S.joined = S.joined || {}; S.joined[then.id] = (S.joined[then.id] || 0) + 1; } } save(); say(route.invited ? `You've joined ${club(then.id).name}.` : 'Following.'); render(); }
      else if (then && then.act === 'claim') { overlay = { t: 'claim', id: then.id }; render(); }
      else if (then && then.act === 'who') { A.who({ id: then.id }); }
      else if (then && then.act === 'org') { go('o-week', {}, true); }
      else go('me');
    },
    signin: (d) => { overlay = { t: 'signin', then: d && d.then ? { act: d.then } : null }; render(); },
    signout: () => { S.user = null; save(); stack = []; go(S.mode === 'org' ? 'o-week' : 'home', {}, true); },
    unrsvp: (d) => { S.rsvps = S.rsvps.filter((x) => x !== d.id); save(); overlay = null; say('Removed. The club has been told.', () => { doRsvp(d.id); toast = null; render(); }); render(); },
    went: (d) => confirmWent(d.id),
    missed: (d) => { S.att[d.id] = 'missed'; save(); go('missed', { id: d.id }, true); },
    share: () => { overlay = { t: 'share' }; render(); },
    post: (d) => { const s = byId(d.id); if (!s || !canPost(s.club)) { say(`Photos open up after ${PHOTO_MIN} sessions with a club.`); render(); return; } overlay = { t: 'post', id: d.id, sel: [] }; render(); },
    pick: (d) => { const g = Number(d.g); const el = document.getElementById('po-cap'); overlay.cap = el ? el.value : ''; overlay.sel = overlay.sel.includes(g) ? overlay.sel.filter((x) => x !== g) : overlay.sel.concat(g); render(); },
    dopost: () => {
      const el = document.getElementById('po-cap'); if (!overlay.sel.length) { say('Choose at least one photo.'); render(); return; }
      const s = byId(overlay.id); (S.posts[s.id] = S.posts[s.id] || []).push({ g: overlay.sel, cap: el ? el.value : '' }); save(); overlay = null; say(`Posted to ${s.club.name}.`); render();
    },
    photo: (d) => { overlay = { t: 'photo', sp: d.sp, i: Number(d.i), g: Number(d.g), by: d.by, sid: d.sid, mine: !!d.mine, tagged: !!d.tagged }; render(); },
    untag: () => { const sid = overlay.sid; S.untag[sid] = true; save(); overlay = null; say('Tag removed.', () => { delete S.untag[sid]; save(); toast = null; render(); }); render(); },
    report: () => { overlay.report = true; render(); }, sendreport: () => { overlay = null; say("Sent. We'll tell you what happens."); render(); },
    askdel: () => { overlay.confirmDel = true; render(); }, keep: () => { overlay.confirmDel = false; render(); },
    delphoto: () => { const p = overlay; const list = S.posts[p.sid] || []; for (const post of list) { const i = post.g.indexOf(p.g); if (i >= 0) { post.g.splice(i, 1); break; } } S.posts[p.sid] = list.filter((x) => x.g.length); save(); overlay = null; say('Photo deleted.'); render(); },

    // organiser
    claim: (d) => { if (!S.user) { overlay = { t: 'signin', then: { act: 'claim', id: d.id } }; render(); return; } overlay = { t: 'claim', id: d.id }; render(); },
    sendclaim: (d) => { S.claims[d.id] = 'pending'; save(); overlay = null; say("Sent. We'll confirm within 2 days. (Use Demo to approve it now.)"); render(); },
    manage: (d) => A.toorg(d),
    toorg: (d) => { S.mode = 'org'; if (d && d.id && S.manage.includes(d.id)) S.orgClub = d.id; save(); history.replaceState(null, '', '#organiser'); stack = []; go('o-week', {}, true); },
    tomember: (d) => { S.mode = 'member'; save(); history.replaceState(null, '', location.pathname + location.search); stack = []; if (d && d.id) { go('club', { id: d.id }, true); } else go(S.user ? 'me' : 'home', {}, true); },
    omembers: () => { stack = []; go('o-members', {}, true); },
    oimpact: () => { overlay = { t: 'impact' }; render(); },
    onudge: (d) => { const c = orgClub(); (S.nudged[c.id] = S.nudged[c.id] || {})[d.name] = true; save(); say(`Sent to ${d.name.split(' ')[0]}, from you, with your next session.`); render(); },
    onudgeall: () => { const c = orgClub(); const n = (S.nudged[c.id] = S.nudged[c.id] || {}); health(c).drifting.forEach((m) => { n[m.name] = true; }); save(); say('Sent to everyone who hasn\'t been back.'); render(); },
    thank: (d) => { S.thanks[d.id] = (S.thanks[d.id] || 0) + 1; (S.thanked = S.thanked || {})[d.sid] = true; save(); say(`Thanks sent to ${founderOf(club(d.id)).split(' ')[0]}.`); render(); },
    oweek: () => { stack = []; go('o-week', {}, true); }, ochecks: () => { stack = []; go('o-checks', {}, true); }, oclub: () => { stack = []; go('o-club', {}, true); },
    ophotos: () => { stack = []; go('o-photos', { id: orgClub().id }, true); },
    osched: () => go('o-sched', { id: orgClub().id }), osession: (d) => go('o-session', { id: d.id }), ocheck: (d) => go('o-checkin', { id: d.id }),
    ounconf: () => { delete S.conf[orgClub().id]; save(); say('Confirmation removed.'); render(); },
    ounck: (d) => { delete ckOf(orgClub())[d.k]; save(); say('Marked as not done.'); render(); },
    osetup: () => { route.setup = !route.setup; render(); },
    ock: (d) => { ckOf(orgClub())[d.k] = true; if (d.k === 'd') S.conf[orgClub().id] = now().getTime(); save(); say('Thanks. Marked as checked.'); render(); },
    oshare: () => { overlay = { t: 'oshare' }; render(); },
    ojoin: (d) => { overlay = { t: 'ojoin', qr: !!d.qr }; render(); },
    copylink: (d) => { try { navigator.clipboard.writeText(d.url); } catch (e) { /* not available */ } say('Link copied.'); render(); }, oinvite: () => { overlay = { t: 'oinvite' }; render(); },
    ci: (d) => { const t = (S.ci[d.id] = S.ci[d.id] || {}); t[d.name] = !t[d.name]; const o = (S.orgAtt[d.id] = S.orgAtt[d.id] || {}); o[d.name] = t[d.name] ? 'came' : 'no'; save(); render(); },
    ciall: (d) => { const s = byId(d.id); const t = (S.ci[d.id] = {}); const o = (S.orgAtt[d.id] = {}); roster(s).forEach((p) => { t[p.name] = true; o[p.name] = 'came'; }); save(); say('Everyone checked in. Tap a name to untick.'); render(); },
    ciclear: (d) => { delete S.ci[d.id]; delete S.orgAtt[d.id]; save(); render(); },
    attend: (d) => go('attend', { id: d.id }),
    sched: (d) => { const id = d.id || route.id; if (S.mode === 'org') { go('o-sched', { id }); return; } (S.check[id] = S.check[id] || {}).s = true; save(); go('sched', { id }); },
    mphotos: (d) => { const id = d.id || route.id; (S.check[id] = S.check[id] || {}).p = true; save(); go('mphotos', { id }); },
    editclub: (d) => { overlay = { t: 'edit', id: d.id }; render(); },
    saveclub: (d) => {
      const val = (id) => { const el = document.getElementById(id); return el ? el.value.trim() : ''; }; const c = club(d.id);
      S.edits[d.id] = { desc: val('ed-desc') || c.desc, level: val('ed-level') || c.level, cost: val('ed-cost') || c.cost, bring: val('ed-bring') || c.bring, find: val('ed-find') };
      S.conf[d.id] = now().getTime(); const ck = (S.check[d.id] = S.check[d.id] || {}); ck.d = true; if (val('ed-find')) ck.f = true; save(); applyEdits(); overlay = null; say('Saved. Your public page is updated.'); render();
    },
    confirmclub: (d) => { S.conf[d.id] = now().getTime(); (S.check[d.id] = S.check[d.id] || {}).d = true; save(); say('Thanks. Marked as confirmed today.'); render(); },
    askcancel: (d) => { overlay = { t: 'cancel', id: d.id }; render(); },
    docancel: (d) => { const s = byId(d.id); const n = going(s); S.cancelled[d.id] = true; save(); overlay = null; say(`Cancelled. ${plural(n, 'person')} told.`); render(); },
    uncancel: (d) => { delete S.cancelled[d.id]; save(); say('Session restored.'); render(); },
    cyc: (d) => { const o = (S.orgAtt[d.id] = S.orgAtt[d.id] || {}); const cur = roster(byId(d.id)).find((p) => p.name === d.name).st; o[d.name] = cur === 'came' ? 'no' : 'came'; save(); render(); },
    allcame: (d) => { const o = (S.orgAtt[d.id] = S.orgAtt[d.id] || {}); roster(byId(d.id)).forEach((p) => { o[p.name] = 'came'; }); save(); say('Everyone marked as came. Tap a name to adjust.'); render(); },
    hide: (d) => { if (S.hidden[d.key]) { delete S.hidden[d.key]; say('Photo is showing again.'); } else { S.hidden[d.key] = true; if (S.pin[d.id] && S.pin[d.id].key === d.key) delete S.pin[d.id]; say('Hidden. The member who posted it is told.'); } save(); render(); },
    pin: (d) => { const c = club(d.id); if (S.pin[d.id] && S.pin[d.id].key === d.key) { delete S.pin[d.id]; say('Unpinned.'); } else { S.pin[d.id] = { key: d.key, sp: c.sport, i: Number(d.i), g: Number(d.g), by: d.by }; say('Pinned to the top of your page.'); } save(); render(); },

    // demo
    'd-after': () => { const nx = S.rsvps.map(byId).filter((s) => s && !ended(s)).sort((a, b) => a.at - b.at)[0]; if (!nx) { overlay = null; say('RSVP to a session first.'); render(); return; } S.offset += (nx.at.getTime() + 2 * 36e5 + 6e4) - now().getTime(); save(); stack = []; go('me', {}, true); },
    'd-week': needUser(() => { endWeek(); stack = []; go('me', {}, true); }),
    'd-11': needUser(() => { const cid = S.follows[0] || 'mdr'; S.clubWeeks[cid] = Math.max(S.clubWeeks[cid] || 0, 11); S.streak = 11; S.longest = Math.max(S.longest, 11); S.total = Math.max(S.total, 22); S.weekDone = false; ['s1', 'w4'].forEach((b) => { if (!S.badges.includes(b)) S.badges.push(b); }); save(); stack = []; go('me', {}, true); }),
    'd-org': needUser(() => { const ids = Object.keys(S.claims); const list = ids.length ? ids : S.manage.length ? [] : ['mdr']; list.forEach((id) => { if (!S.manage.includes(id)) S.manage.push(id); delete S.claims[id]; }); if (list.length) { S.orgClub = list[0]; say(`You now manage ${club(list[0]).name}.`); } A.toorg({ id: S.orgClub }); }),
    'd-reset': () => { S = fresh(); save(); applyEdits(); stack = []; filt = { sport: '', area: '', day: '', level: '', price: '' }; go('home', {}, true); }
  };

  // ---------- render ----------
  function renderOrg(app) {
    const c = S.user ? orgClub() : null;
    let v = route.v.startsWith('o-') ? route.v : 'o-week'; if (!c) v = 'o-start';
    if (v !== route.v) route = { v };
    const reuse = { 'o-sched': V.sched, 'o-photos': V.mphotos, 'o-session': V.attend };
    const body = (OV[v] || reuse[v])();
    const sub = ['o-sched', 'o-session', 'o-checkin'].includes(v);
    const top = `<header class="top otop"><div class="r">${sub ? `<button class="back" data-act="back">${ic('left')}Back</button>` : `<span class="ologo">ryze club <span class="obadge">Organiser</span></span>`}</div>
      <div class="r"><button class="pill" data-act="demo">Demo</button></div></header>`;
    const tab = (act, l, i, on) => `<button data-act="${act}" class="${on ? 'on' : ''}"${on ? ' aria-current="page"' : ''}><span class="ni">${ic(i)}</span>${l}</button>`;
    const nav = c ? `<nav class="nav onav" aria-label="Organiser">${tab('oweek', 'This week', 'week', v === 'o-week' || v === 'o-session')}${tab('ochecks', 'Check-in', 'check', v === 'o-checks' || v === 'o-checkin')}${tab('omembers', 'Members', 'clubs', v === 'o-members')}${tab('ophotos', 'Photos', 'photo', v === 'o-photos')}${tab('oclub', 'Club', 'flag', v === 'o-club' || v === 'o-sched')}</nav>` : '';
    return top + body + nav;
  }

  function render() {
    const app = document.getElementById('app'); if (!app) return;
    document.body.classList.toggle('org', S.mode === 'org');
    if (S.mode === 'org') {
      const ov = overlay ? `<div class="veil" data-veil="1">${O[overlay.t]().replace(/^(<div class="sheet[^>]*>)/, '$1<button class="sheet-x" data-act="close" aria-label="Close">' + ic('x') + '</button>').replace('<div class="sheet', '<div role="dialog" aria-modal="true" class="sheet')}</div>` : '';
      const ts = toast ? `<div class="toast${overlay ? ' over' : ''}" role="status"><div><span>${esc(toast.msg)}</span>${toast.undo ? '<button data-act="undo">Undo</button>' : ''}</div></div>` : '';
      app.innerHTML = renderOrg(app) + ov + ts; a11yOverlay(app); return;
    }
    if (route.v.startsWith('o-')) route = { v: S.user ? 'me' : 'home' };
    if (!S.user && ['me', 'clubs', 'profile', 'result', 'missed', 'confirm', 'manage', 'attend', 'sched', 'mphotos'].includes(route.v)) route = { v: 'home' };
    // Tab roots are reached from the bottom navigation, so they show the logo; every other screen shows a labelled Back.
    const roots = S.user ? ['home', 'me', 'browse', 'clubs', 'profile'] : ['home'];
    const sub = !roots.includes(route.v);
    const backAct = route.v === 'quiz' && route.step ? 'quizback' : 'back';
    const top = `<header class="top"><div class="r">${sub ? `<button class="back" data-act="${backAct}">${ic('left')}Back</button>` : '<button class="logo" data-act="home">ryze club</button>'}</div>
      <div class="r"><button class="pill" data-act="demo">Demo</button>${S.user ? '' : '<button class="btn small" data-act="signin">Sign in</button>'}</div></header>`;
    const showNav = S.user && route.v !== 'club' && route.v !== 'quiz';
    const tab = (v, l, i, on) => `<button data-act="${v}" class="${on ? 'on' : ''}"${on ? ' aria-current="page"' : ''}><span class="ni">${ic(i)}</span>${l}</button>`;
    const nav = showNav ? `<nav class="nav" aria-label="Main">${tab('me', 'My week', 'week', ['me', 'result', 'missed', 'confirm'].includes(route.v))}${tab('browse', 'Find', 'find', ['browse', 'results'].includes(route.v))}${tab('clubs', 'My clubs', 'clubs', ['clubs', 'manage', 'attend', 'sched', 'mphotos'].includes(route.v))}${tab('profile', 'Profile', 'me', route.v === 'profile')}</nav>` : '';
    const ov = overlay ? `<div class="veil" data-veil="1">${O[overlay.t]().replace(/^(<div class="sheet[^>]*>)/, '$1<button class="sheet-x" data-act="close" aria-label="Close">' + ic('x') + '</button>').replace('<div class="sheet', '<div role="dialog" aria-modal="true" class="sheet')}</div>` : '';
    const ts = toast ? `<div class="toast${overlay ? ' over' : ''}" role="status"><div><span>${esc(toast.msg)}</span>${toast.undo ? '<button data-act="undo">Undo</button>' : ''}</div></div>` : '';
    app.innerHTML = top + (V[route.v] || V.home)() + nav + ov + ts;
    a11yOverlay(app);
  }

  // Sheets behave as modal dialogs: focus moves in when one opens, the page behind can't be reached,
  // and focus returns to the control that opened it when it closes.
  let shownOverlay = null; let opener = null; let lastClick = null;
  function a11yOverlay(app) {
    const sheet = app.querySelector('.sheet');
    [...app.children].forEach((el) => { if (!el.classList.contains('veil') && !el.classList.contains('toast')) el.inert = !!sheet; });
    if (sheet) {
      const h = sheet.querySelector('h1, h2'); if (h) { h.id = 'sheet-title'; h.tabIndex = -1; sheet.setAttribute('aria-labelledby', 'sheet-title'); }
      if (overlay !== shownOverlay) { if (!shownOverlay) opener = lastClick; (h || sheet).focus({ preventScroll: true }); }
    } else if (shownOverlay && opener) {
      const back = app.querySelector(`[data-act="${opener.act}"]${opener.id ? `[data-id="${CSS.escape(opener.id)}"]` : ''}`); if (back) back.focus({ preventScroll: true });
    }
    shownOverlay = overlay;
  }

  document.addEventListener('click', (e) => {
    const veil = e.target.closest('[data-veil]');
    const el = e.target.closest('[data-act]');
    if (!el) { if (veil && e.target === veil) { overlay = null; render(); } return; }
    if (el.disabled) return;
    const act = el.dataset.act; lastClick = { act, id: el.dataset.id };
    if (act === 'undo') { if (toast && toast.undo) toast.undo(); return; }
    if (A[act]) A[act](el.dataset);
  });
  document.addEventListener('change', (e) => {
    const t = e.target;
    if (t.dataset.filt) { filt[t.dataset.filt] = t.value; render(); }
    else if (t.dataset.set) { S.set[t.dataset.set] = t.checked; save(); if (t.dataset.set === 'wa' && t.checked) { say('In the real product this asks for your phone number.'); render(); } }
    else if (t.dataset.sharename) { overlay.hide = !t.checked; render(); }
    else if (t.dataset.photo && t.files && t.files[0]) {
      readPro(); const img = new Image(); const url = URL.createObjectURL(t.files[0]);
      img.onload = () => { const n = 240; const c = document.createElement('canvas'); c.width = n; c.height = n; const k = Math.min(img.width, img.height);
        c.getContext('2d').drawImage(img, (img.width - k) / 2, (img.height - k) / 2, k, k, 0, 0, n, n); URL.revokeObjectURL(url);
        if (overlay && overlay.t === 'editpro') { overlay.d.photo = c.toDataURL('image/jpeg', 0.82); render(); } };
      img.onerror = () => { URL.revokeObjectURL(url); say("That file couldn't be read as a photo."); render(); };
      img.src = url;
    }
  });
  document.addEventListener('input', (e) => { if (overlay && overlay.t === 'editpro' && e.target.id && e.target.id.startsWith('ep-')) readPro(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && overlay) { overlay = null; render(); } });

  // An invite link (#join/<club>) opens that club in the member app with a welcome and a Join button.
  const readJoin = () => { const m = location.hash.match(/^#join\/([a-z]+)$/); return m && club(m[1]) ? m[1] : null; };
  window.addEventListener('hashchange', () => { const j = readJoin(); if (j) { S.mode = 'member'; stack = []; route = { v: 'club', id: j, invited: true }; render(); window.scrollTo(0, 0); return; }
    S.mode = location.hash === '#organiser' ? 'org' : 'member'; stack = []; route = { v: S.mode === 'org' ? 'o-week' : S.user ? 'me' : 'home' }; render(); });
  applyEdits();
  route = { v: S.mode === 'org' ? 'o-week' : S.user ? 'me' : 'home' };
  if (readJoin()) { S.mode = 'member'; route = { v: 'club', id: readJoin(), invited: true }; }
  render();
})();
