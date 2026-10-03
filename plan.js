const slides = [
  { title: "Briefing", html: `<p class="kicker">Team working session</p><h1>Able Aura live group coaching — the plan, what exists, and the days left to ship a pilot.</h1><p class="lede">A subscription classroom for children with autism, cerebral palsy, and locomotor or cognitive disabilities. The main trainer leads on camera. Secondary trainers correct in private. AI watches form and speaks only to the adults.</p><div class="grid g3"><div class="card"><h3>Already in the repo</h3><p>Web desk, MySQL-ready schema, session service, WebRTC signalling, eight Priority-1 pose rules, Android TV / phone project.</p></div><div class="card"><h3>Remaining to a live pilot</h3><p class="stat">42</p><p>person-days of focused engineering after this slice. Two people in parallel: about 21 working days.</p></div><div class="card"><h3>Out of MVP</h3><p>AI voice to children, iOS, speech/emotion models, full LMS, live captions.</p></div></div>` },
  { title: "Product bet", html: `<p class="kicker">Why this exists</p><h2>The child hears a human. The AI never gets a microphone to the child.</h2><p class="lede">Able Aura already has families, courses, enrolments, and payments in MySQL on RDS. This product adds the live room on top of that database — it does not replace it.</p><div class="grid g3"><div class="card"><h3>Main trainer</h3><p>Broadcasts video and audio to every student, parent observer, phone, and television. Controls start, pause, end, and the current exercise.</p></div><div class="card"><h3>Secondary trainer</h3><p>Watches the student camera grid and AI badges. Opens a private audio line for a quiet correction. Target under 400 ms.</p></div><div class="card"><h3>On-device AI</h3><p>MediaPipe / MoveNet on the student device. Sends landmarks and metrics, not raw video. Flags and suggested cues go to trainers only.</p></div></div>` },
  { title: "Who uses it", html: `<p class="kicker">Five roles</p><h2>One product, five desks. Permissions are strict.</h2><div class="grid g2"><div class="card"><h3>Admin · Kavya</h3><p>People, courses, pose models, full audit log, billing, anything a trainer can do.</p></div><div class="card"><h3>Main trainer · Arjun</h3><p>Schedule and run sessions, change exercise, private audio, assigned reports.</p></div><div class="card"><h3>Secondary trainer · Nisha</h3><p>Join, multi-view, private audio, mark AI events reviewed. Cannot start or end class.</p></div><div class="card"><h3>Parent · Ananya</h3><p>Children, consent, enrolment request, pay. Observes the main trainer only — no student grid, no AI.</p></div><div class="card"><h3>Student · Aanya</h3><p>Phone or Android TV. Large buttons. Join with a 6-digit code. Never shown AI text or voice.</p></div><div class="card"><h3>Join gate</h3><p>Active course enrolment <b>and</b> a valid subscription window. Kabir in the seed is blocked until the due payment is paid.</p></div></div>` },
  { title: "Platforms", html: `<p class="kicker">Where it runs</p><h2>Web is the coaching desk. Android is the child’s classroom.</h2><div class="grid g3"><div class="card"><h3>Responsive web</h3><p>Trainers, parents, admins. Next.js. This is what the current preview shows. Not the student TV.</p></div><div class="card"><h3>Android phone</h3><p>Student camera + mic so trainers can see form. On-device pose. Large join pad. Kotlin / Compose in <code>android-student/</code>.</p></div><div class="card"><h3>Android TV / Google TV</h3><p>Leanback launcher, D-pad OTP and class code, full-screen trainer only. Subscribe-only — most TVs have no camera.</p></div></div><div class="card" style="margin-top:14px"><h3>Casting</h3><p>Chromecast / custom receiver at <code>/receiver</code> is a browser fallback. The native TV app is the living-room client.</p></div>` },
  { title: "Already built", html: `<p class="kicker">In the repository today</p><h2>The first slice is real — not a slide-only architecture.</h2><div class="grid g2"><div class="card"><h3>Shipped in this build</h3><ul><li>MySQL 8 RDS migrations that keep existing Able Aura tables</li><li>Phone OTP auth and the full permission matrix</li><li>Session lifecycle: draft → scheduled → live → paused → ended | cancelled</li><li>Enrolment + subscription join gate</li><li>WebRTC signalling: trainer broadcast, student cams to trainers, private audio</li><li>Eight Priority-1 movement rules</li><li>Progress reports on session end</li><li>Training-video upload, demo Razorpay</li><li>Android Gradle app: PhoneActivity + TvActivity</li></ul></div><div class="card"><h3>Honest gaps</h3><ul><li>Local preview uses SQLite; RDS is not wired here</li><li>WebRTC is mesh + STUN, not LiveKit + TURN yet</li><li>Pose on web is a stand-in until MediaPipe WASM is packaged</li><li>Android TV is source-complete, not yet run on a TV device</li><li>Razorpay, FCM, WhatsApp, and S3 are demo paths</li></ul></div></div>` },
  { title: "MySQL on RDS", html: `<p class="kicker">Data — do not rename columns</p><h2>Existing Able Aura MySQL stays the source of truth.</h2><p class="lede">Production is MySQL 8 on Amazon RDS. Apply <code>prisma/sql/*.mysql.sql</code> in order. If IDs are INT/BIGINT, skip CREATE on core tables and only add <code>students.user_id</code>.</p><div class="grid g2"><div class="card"><h3>Keep</h3><p>person_entities · users · students · courses · enrollments · student_subscriptions · payments · pending_payments</p></div><div class="card"><h3>Add</h3><p>sessions · session_participants · exercises · pose_templates · ai_analysis_events · progress_reports · training_video_uploads · parental_consents · audit_logs · private_audio_channels · otp_challenges</p></div></div><div class="card" style="margin-top:14px"><h3>Money</h3><p>Amounts are integer paise. ₹8,999 → <code>899900</code>.</p></div>` },
  { title: "Session rules", html: `<p class="kicker">Live classroom</p><h2>Lifecycle and privacy are product rules, not UI chrome.</h2><div class="grid g2"><div class="card"><h3>States</h3><p>draft → scheduled → live → paused → ended or cancelled. Only admin and the assigned main trainer move the session.</p></div><div class="card"><h3>Who sees whom</h3><p>Everyone receives the main trainer. Student cameras go only to trainers and admin. Parents observe the trainer. Students never see other children or AI badges.</p></div><div class="card"><h3>Consent</h3><p>Camera, recording, and AI processing are separate parental yeses. Audit log records private audio, AI review, and recording access.</p></div><div class="card"><h3>AI payload</h3><p>Landmarks + derived metrics by default. Raw video only if a trainer asks for a short clip.</p></div></div>` },
  { title: "Eight movements", html: `<p class="kicker">Priority-1 AI</p><h2>These eight are the MVP model set. Everything else waits.</h2><div class="grid g4">${[["1","High knees / marching"],["2","Running form"],["3","Jumping"],["4","Squat / sit-to-stand"],["5","Single-leg balance"],["6","Catching / hands-ready"],["7","Rolling"],["8","Basic throwing"]].map(([n,name])=>`<div class="card"><h3>${n}</h3><p>${name}</p></div>`).join("")}</div>` },
  { title: "Permissions", html: `<p class="kicker">Matrix</p><h2>If a cell is empty, the API rejects it — not just the menu.</h2><table><thead><tr><th>Action</th><th>Admin</th><th>Main</th><th>Secondary</th><th>Parent</th><th>Student</th></tr></thead><tbody>${[["Create users / courses",1,0,0,0,0],["Own children + consent",1,0,0,1,0],["Enroll",1,0,0,"req",0],["Billing",1,0,0,1,0],["Schedule session",1,1,0,0,0],["Start / pause / end",1,1,0,0,0],["Join / observe",1,1,1,"obs",1],["Change exercise",1,1,0,0,0],["Private audio + AI grid",1,1,1,0,0],["Upload training video",1,1,0,0,0],["Pose models + audit",1,0,0,0,0]].map(row=>`<tr><td>${row[0]}</td>${row.slice(1).map(v=>v===1?'<td class="yes">Yes</td>':v==="req"?'<td class="yes">Request</td>':v==="obs"?'<td class="yes">Observe</td>':'<td class="no">—</td>').join("")}</tr>`).join("")}</tbody></table>` },
  { title: "Effort", html: `<p class="kicker">Days mean focused engineering days</p><h2>42 person-days from this slice to a supervised pilot.</h2><p class="lede">One engineer, about 42 working days. Two engineers, about 21 working days.</p><div class="bar"><span style="width:28%;background:#0f4f46"></span><span style="width:72%;background:#c45c26"></span></div><div class="legend"><span><i class="swatch" style="background:#0f4f46"></i>Already in repo</span><span><i class="swatch" style="background:#c45c26"></i>42 days to pilot</span></div><div class="grid g4" style="margin-top:22px"><div class="card"><h3>Media</h3><p class="stat">11</p><p>LiveKit + TURN</p></div><div class="card"><h3>Android TV + phone</h3><p class="stat">10</p><p>Emulator and real device</p></div><div class="card"><h3>AI on-device</h3><p class="stat">5</p><p>MediaPipe</p></div><div class="card"><h3>RDS, pay, ops</h3><p class="stat">16</p><p>MySQL, Razorpay, S3, FCM</p></div></div>` },
  { title: "Workstreams", html: `<p class="kicker">Click a stream</p><h2>Remaining work, with days on each task.</h2><div id="workstreams"></div>` },
  { title: "Sequence", html: `<p class="kicker">If two people work in parallel</p><h2>A 21-working-day path to a 12-family Saturday pilot.</h2><div class="grid g2"><div class="card"><h3>Track A — classroom</h3><p>Days 1–3 RDS. Days 4–8 LiveKit/TURN. Days 9–13 MediaPipe. Days 14–16 recordings. Days 17–21 rehearsal.</p></div><div class="card"><h3>Track B — devices + money</h3><p>Days 1–6 Android TV. Days 7–10 phone camera. Days 11–13 Razorpay. Days 14–16 FCM + WhatsApp. Days 17–21 real Google TV.</p></div></div>` },
  { title: "Risks", html: `<p class="kicker">What can slip the days</p><h2>Call these out before we lock a Saturday date.</h2><div class="grid g2"><div class="card"><h3>RDS ID types</h3><p>If production keys are BIGINT, skip CREATE on core tables. Budget +2 days for a mapping layer.</p></div><div class="card"><h3>Indian last-mile NAT</h3><p>Mesh + STUN will fail for many homes. LiveKit + TURN unlocks class.</p></div><div class="card"><h3>TV without a camera</h3><p>TV is the display, phone is the camera.</p></div><div class="card"><h3>Consent and recording</h3><p>Legal review is parallel to the 42 days.</p></div></div>` },
  { title: "Ask", html: `<p class="kicker">Decisions this meeting</p><h2>Three calls so engineering can start the 42 days.</h2><div class="grid g3"><div class="card"><h3>1. RDS access</h3><p>Staging MySQL URL and whether IDs are strings or integers.</p></div><div class="card"><h3>2. LiveKit vs stay-mesh</h3><p>Recommend LiveKit Cloud or self-host plus TURN.</p></div><div class="card"><h3>3. Pilot Saturday</h3><p>Pick a date 21 working days after RDS + LiveKit keys land.</p></div></div>` }
];

const work = [
  { name: "RDS MySQL cutover", days: 3, items: [["Confirm ID types",1],["Apply 002–04 on staging",1],["Seed mapping + rollback note",1]] },
  { name: "Production media (LiveKit + TURN)", days: 5, items: [["LiveKit room tokens",2],["TURN for home NAT",1],["Replace mesh with SFU",2]] },
  { name: "Degrade + private audio quality", days: 2, items: [["360p fallback on 4G",1],["Private-audio RTT",1]] },
  { name: "MediaPipe on phone + web", days: 5, items: [["WASM on student web",2],["MediaPipe on PhoneActivity",2],["Cloud only on weak devices",1]] },
  { name: "Android TV to a living room", days: 6, items: [["TV AVD and D-pad focus",2],["LAN server screen",1],["Soak on a real Google TV",3]] },
  { name: "Android phone camera path", days: 4, items: [["Permissions and front camera",2],["Publish only to trainers",2]] },
  { name: "Razorpay on existing tables", days: 3, items: [["Orders + webhook",2],["Parent billing desk",1]] },
  { name: "Consent, recordings, S3", days: 5, items: [["Consent copy",2],["S3 recordings + audit",3]] },
  { name: "FCM + WhatsApp", days: 5, items: [["Session reminder push",2],["WhatsApp OTP / class code",3]] },
  { name: "Staging pilot rehearsal", days: 4, items: [["12-family dry run",2],["Incident checklist",2]] }
];

const root = document.getElementById("slides");
const dots = document.getElementById("dots");
const toc = document.getElementById("toc");
const label = document.getElementById("slideLabel");
let i = 0;
slides.forEach((slide, idx) => {
  const el = document.createElement("section");
  el.className = "slide" + (idx === 0 ? " active" : "");
  el.innerHTML = slide.html;
  root.appendChild(el);
  const dot = document.createElement("button");
  dot.className = "dot" + (idx === 0 ? " on" : "");
  dot.type = "button";
  dot.title = slide.title;
  dot.onclick = () => go(idx);
  dots.appendChild(dot);
  const item = document.createElement("button");
  item.type = "button";
  item.textContent = `${idx + 1}. ${slide.title}`;
  item.onclick = () => { go(idx); toc.classList.remove("open"); };
  toc.appendChild(item);
});
const ws = document.getElementById("workstreams");
if (ws) {
  work.forEach((stream) => {
    const btn = document.createElement("button");
    btn.className = "work";
    btn.type = "button";
    btn.innerHTML = `<header><strong>${stream.name}</strong><span class="days">${stream.days} days</span></header><ul class="tasks">${stream.items.map(([t,d])=>`<li><span>${t}</span><span class="days soft">${d}d</span></li>`).join("")}</ul>`;
    btn.onclick = () => btn.classList.toggle("open");
    ws.appendChild(btn);
  });
}
function go(n) {
  i = (n + slides.length) % slides.length;
  [...root.children].forEach((el, idx) => el.classList.toggle("active", idx === i));
  [...dots.children].forEach((el, idx) => el.classList.toggle("on", idx === i));
  [...toc.children].forEach((el, idx) => el.classList.toggle("on", idx === i));
  label.textContent = `${i + 1} / ${slides.length} · ${slides[i].title}`;
}
document.getElementById("next").onclick = () => go(i + 1);
document.getElementById("prev").onclick = () => go(i - 1);
document.getElementById("tocBtn").onclick = () => toc.classList.toggle("open");
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" || event.key === " ") { event.preventDefault(); go(i + 1); }
  if (event.key === "ArrowLeft") go(i - 1);
  if (event.key === "Escape") toc.classList.remove("open");
});
