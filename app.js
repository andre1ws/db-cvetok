const COLUMNS = [
  { label: "Task Name", icon: '<path d="M4 6h2M4 12h2M4 18h2M9.5 6H20M9.5 12H20M9.5 18H20"/>' },
  { label: "Description", icon: '<path d="M4 7h16M4 12h16M4 17h10"/>' },
  { label: "Estimation", icon: '<rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M8 3.5v3M16 3.5v3M3.5 10h17"/>' },
  { label: "Role Type", icon: '<circle cx="12" cy="8.5" r="3.2"/><path d="M5.5 19.5a6.5 6.5 0 0 1 13 0"/>' },
  { label: "Team", icon: '<circle cx="9" cy="9" r="3"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0M15 6.4a3 3 0 0 1 0 5.2M17 19a5.5 5.5 0 0 0-2-4.3"/>' },
  { label: "KRA Progress", icon: '<path d="M4 18V9M10 18V5M16 18v-6M22 18h-20"/>' },
  { label: "Priority", icon: '<path d="M6 3.5v17M6 4.5h11l-2 3.5 2 3.5H6"/>' },
];

const AVATARS = {
  HK: "av-mint",
  JB: "av-blue",
  RS: "av-rose",
  AP: "av-plum",
  TC: "av-rose",
};

const GROUPS = [
  {
    title: "To-do",
    rows: [
      {
        name: "Design a food app",
        desc: "Create a user-friendly and visually appealing interface",
        est: "Apr 14 - May 15, 2025",
        role: { label: "UI Design", cls: "tag-design" },
        team: ["HK", "RS"],
        progress: 90,
        priority: "High",
      },
      {
        name: "UI testing (SPT)",
        desc: "Use tools like Cypress, Playwright, or Jest with React Testing Library",
        est: "Mar 19 - Apr 08, 2025",
        role: { label: "Development", cls: "tag-dev" },
        team: ["RS", "TC", "AP"],
        progress: 60,
        priority: "Medium",
      },
      {
        name: "Student Progress Tracker",
        desc: "An overview, student profiles, performance charts, attendance logs",
        est: "Feb 21 - Mar 15, 2025",
        role: { label: "UI Design", cls: "tag-design" },
        team: ["HK", "JB", "RS"],
        progress: 90,
        priority: "Low",
      },
      {
        name: "Health Tracking App",
        desc: "Ensure clarity, ease of use & trust through intuitive layouts",
        est: "Jan 25 - Feb 25, 2025",
        role: { label: "UI Design", cls: "tag-design" },
        team: ["JB", "AP"],
        progress: 90,
        priority: "Medium",
      },
    ],
  },
  {
    title: "In-progress",
    rows: [
      {
        name: "Student Progress Tracker",
        desc: "An overview, student profiles, performance charts, attendance logs",
        est: "Apr 14 - May 15, 2025",
        role: { label: "Development", cls: "tag-dev" },
        team: ["RS"],
        progress: 90,
        priority: "High",
      },
      {
        name: "Health Tracking App",
        desc: "Ensure clarity, ease of use & trust through intuitive layouts",
        est: "Apr 14 - May 15, 2025",
        role: { label: "UI Design", cls: "tag-design" },
        team: ["HK", "JB", "AP"],
        progress: 90,
        priority: "Low",
      },
      {
        name: "Onboarding research",
        desc: "Interview 8 users and map the current activation funnel",
        est: "Apr 02 - Apr 28, 2025",
        role: { label: "Research", cls: "tag-research" },
        team: ["TC", "RS"],
        progress: 45,
        priority: "Medium",
      },
    ],
  },
];

const icon = (path, size = 14) =>
  `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;

const progressClass = (v) => (v >= 75 ? "is-high" : v >= 50 ? "is-mid" : "is-low");

function renderRow(row) {
  const avatars = row.team
    .map((i) => `<span class="avatar avatar-row ${AVATARS[i] || "av-slate"}">${i}</span>`)
    .join("");

  return `
    <tr data-search="${(row.name + " " + row.desc + " " + row.role.label).toLowerCase()}">
      <td class="col-check"><input type="checkbox" aria-label="Select ${row.name}" /></td>
      <td class="task-name">${row.name}</td>
      <td class="task-desc">${row.desc}</td>
      <td class="task-date">${row.est}</td>
      <td><span class="tag ${row.role.cls}">${row.role.label}</span></td>
      <td><span class="stack">${avatars}</span></td>
      <td>
        <span class="progress-cell">
          <span class="progress-track"><span class="progress-fill ${progressClass(row.progress)}" style="width:${row.progress}%"></span></span>
          <span class="progress-value">${row.progress}%</span>
        </span>
      </td>
      <td><span class="pill pill-${row.priority.toLowerCase()}">${row.priority}</span></td>
      <td class="col-add">
        <button class="row-more" aria-label="Row actions">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><circle cx="6" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="18" cy="12" r="1.5"/></svg>
        </button>
      </td>
    </tr>`;
}

function renderGroup(group) {
  const headCells = COLUMNS.map(
    (c) => `<th><span class="th-inner">${icon(c.icon, 13)}${c.label}</span></th>`
  ).join("");

  return `
    <section class="group">
      <div class="group-head">
        <button class="group-toggle" aria-label="Toggle ${group.title}">
          ${icon('<path d="m6 9 6 6 6-6"/>', 15)}
        </button>
        <span class="group-title">${group.title}</span>
        <span class="group-count">${group.rows.length}</span>
        <button class="group-add" aria-label="Add task to ${group.title}">
          ${icon('<path d="M12 5.5v13M5.5 12h13"/>', 15)}
        </button>
      </div>
      <div class="table-wrap">
        <table class="tasks">
          <thead>
            <tr>
              <th class="col-check"><input type="checkbox" aria-label="Select all in ${group.title}" data-select-all /></th>
              ${headCells}
              <th class="col-add">${icon('<rect x="3.5" y="3.5" width="17" height="17" rx="4"/><path d="M12 8.5v7M8.5 12h7"/>', 14)}</th>
            </tr>
          </thead>
          <tbody>${group.rows.map(renderRow).join("")}</tbody>
        </table>
        <p class="empty-note" hidden>No tasks match your search.</p>
      </div>
    </section>`;
}

const board = document.getElementById("board");
board.innerHTML = GROUPS.map(renderGroup).join("");

board.addEventListener("click", (e) => {
  const toggle = e.target.closest(".group-toggle");
  if (toggle) toggle.closest(".group").classList.toggle("is-closed");
});

board.addEventListener("change", (e) => {
  const box = e.target;
  if (box.type !== "checkbox") return;

  if (box.hasAttribute("data-select-all")) {
    const rows = box.closest("table").querySelectorAll("tbody tr");
    rows.forEach((row) => {
      if (row.hidden) return;
      row.querySelector('input[type="checkbox"]').checked = box.checked;
      row.classList.toggle("is-checked", box.checked);
    });
    return;
  }

  box.closest("tr").classList.toggle("is-checked", box.checked);
});

document.querySelectorAll("[data-group-toggle]").forEach((btn) => {
  btn.addEventListener("click", () => btn.closest("[data-group]").classList.toggle("is-open"));
});

document.querySelectorAll(".tabs .tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tabs .tab").forEach((t) => {
      t.classList.remove("is-active");
      t.removeAttribute("aria-selected");
    });
    tab.classList.add("is-active");
    tab.setAttribute("aria-selected", "true");
  });
});

const CRUMBS = {
  tasks: ["Administrator", "Tasks"],
  users: ["Administrator", "Users"],
  promotions: ["Administrator", "Promotions"],
  notifications: ["Administrator", "Notifications"],
  transactions: ["Payments", "Transactions"],
};

const crumbs = document.getElementById("crumbs");

function setCrumbs(parts, actionHtml = "") {
  crumbs.innerHTML =
    parts
      .map((part, i) =>
        i === parts.length - 1 ? `<span class="current">${part}</span>` : `<a href="#">${part}</a>`
      )
      .join('<span class="sep">/</span>') + actionHtml;
}

const CRUMB_ACTIONS = {
  promotions: `<button class="crumb-add" id="createPromotion" title="Create promotion" aria-label="Create promotion">
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5.5v13M5.5 12h13"/></svg>
  </button>`,
  notifications: `<button class="crumb-add" id="createNotification" title="Create notification" aria-label="Create notification">
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5.5v13M5.5 12h13"/></svg>
  </button>`,
};

crumbs.addEventListener("click", (e) => {
  if (e.target.closest("#createPromotion")) window.openPromotion?.();
  if (e.target.closest("#createNotification")) window.openNotification?.();
});

function showView(name, options = {}) {
  document.querySelectorAll(".view").forEach((view) => {
    view.hidden = view.dataset.view !== name;
  });

  const navName = options.navView || name;
  document.querySelectorAll(".nav-item[data-view]").forEach((item) => {
    item.classList.toggle("is-active", item.dataset.view === navName);
  });

  document.querySelectorAll(".nav-parent").forEach((parent) => {
    const group = parent.closest("[data-group]");
    const childActive = group?.querySelector(`.nav-item[data-view="${navName}"]`);
    parent.classList.toggle("is-active", Boolean(childActive));
    if (childActive) group.classList.add("is-open");
  });

  setCrumbs(options.crumbs || CRUMBS[name], CRUMB_ACTIONS[navName] || "");
  window.scrollTo({ top: 0 });
}

document.querySelectorAll(".nav-item").forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    const view = item.dataset.view;
    if (!view) return;
    showView(view);
    history.replaceState(null, "", `#${view}`);
  });
});

window.addEventListener("hashchange", () => {
  const name = location.hash.slice(1);
  if (CRUMBS[name]) showView(name);
});

showView(CRUMBS[location.hash.slice(1)] ? location.hash.slice(1) : "users");

const search = document.getElementById("searchInput");
search.addEventListener("input", () => {
  const q = search.value.trim().toLowerCase();

  board.querySelectorAll(".group").forEach((group) => {
    const rows = group.querySelectorAll("tbody tr");
    let visible = 0;

    rows.forEach((row) => {
      const match = !q || row.dataset.search.includes(q);
      row.hidden = !match;
      if (match) visible += 1;
    });

    group.querySelector(".group-count").textContent = visible;
    group.querySelector(".empty-note").hidden = visible !== 0;
  });
});

const media = window.matchMedia("(prefers-color-scheme: dark)");

function applyTheme(choice) {
  const resolved = choice === "system" ? (media.matches ? "dark" : "light") : choice;
  document.documentElement.dataset.theme = resolved;
}

document.querySelectorAll(".theme-opt").forEach((opt) => {
  opt.addEventListener("click", () => {
    document.querySelectorAll(".theme-opt").forEach((o) => {
      o.classList.remove("is-active");
      o.removeAttribute("aria-selected");
    });
    opt.classList.add("is-active");
    opt.setAttribute("aria-selected", "true");
    applyTheme(opt.dataset.theme);
  });
});

media.addEventListener("change", () => {
  const active = document.querySelector(".theme-opt.is-active");
  if (active?.dataset.theme === "system") applyTheme("system");
});
