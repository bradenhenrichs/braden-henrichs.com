(() => {
  "use strict";

  document.getElementById("year").textContent = new Date().getFullYear();

  /* ------------------------------------------------------------------
     Timeline case-study cards: toggle expand/collapse.
     Native <button> + aria-expanded/aria-controls keeps this keyboard
     and screen-reader friendly without any extra ARIA choreography.
     ------------------------------------------------------------------ */
  const toggles = document.querySelectorAll(".case-toggle");

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
    });
  });

  /* ------------------------------------------------------------------
     Skills filter: single-select category filter with an "all" reset.
     Clicking the already-active category returns to "all".
     ------------------------------------------------------------------ */
  const filterGroup = document.getElementById("skills-filter");
  const filterButtons = filterGroup
    ? Array.from(filterGroup.querySelectorAll(".filter-btn"))
    : [];
  const skillPills = Array.from(document.querySelectorAll(".skill-pill"));
  const emptyState = document.getElementById("skills-empty");

  function applyFilter(category) {
    let visibleCount = 0;

    skillPills.forEach((pill) => {
      const matches = category === "all" || pill.dataset.category === category;
      pill.hidden = !matches;
      if (matches) visibleCount += 1;
    });

    if (emptyState) {
      emptyState.hidden = visibleCount !== 0;
    }
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const isActive = button.getAttribute("aria-pressed") === "true";
      const nextFilter = isActive ? "all" : button.dataset.filter;

      filterButtons.forEach((btn) => {
        btn.setAttribute("aria-pressed", String(btn.dataset.filter === nextFilter));
      });

      applyFilter(nextFilter);
    });
  });
})();
