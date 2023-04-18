import { timetable } from "./timetable.js";

const add_btn = document.getElementById("add-btn");
const save_btn = document.getElementById("save-btn");
const add_form = document.getElementById("add-form");
const add_modal = document.getElementById("add-modal");

add_form.onsubmit = (e) => {
  e.preventDefault();
  add_modal.style.display = "none";
  const form_data = new FormData(add_form);
  console.log(form_data.entries());
};

const getGapInTiming = (modules) => {
  let schedule = [];
  for (let module of modules) {
    schedule.push(module.start);
    for (let i = module.start + 1; i < module.start + module.duration; i++) {
      schedule.push(i);
    }
  }

  let gap = [];
  for (let i = 8; i < 18; i++) {
    if (!schedule.includes(i)) {
      gap.push(i);
    }
  }

  // [{start: 11, duration: 2}]
  let res = [];
  let final = [];
  for (let i = 0; i <= gap.length; i++) {
    if (Math.abs(gap[i] - gap[i + 1]) != 1) {
      res.push(gap.slice(0, i + 1));
      gap = gap.slice(i + 1);
      i = 0;
    }
  }

  for (let i of res) {
    final.push({ start: i[0], duration: i.length });
  }

  return final;
};

for (const day in timetable) {
  let modules = timetable[day];
  const day_div = document.getElementById(day);
  const gap = getGapInTiming(modules);
  modules = [...modules, ...gap];
  modules = modules.sort((a, b) => a.start - b.start);
  modules.reverse();
  for (let module of modules) {
    // module = {name: ..., start: ..., duration: ...}
    const module_div = document.createElement("div");
    module_div.classList.add("square");
    module_div.classList.add("span-" + module.duration);
    module_div.innerText = module.name || "";
    if (!module.name) {
      module_div.classList.add("empty");
    } else {
      module_div.classList.add("full");
    }
    module_div.dataset.location = module.location;
    day_div.parentNode.insertBefore(module_div, day_div.nextSibling);
  }
}

const squares = document.querySelectorAll(".square");
squares.forEach((square) => {
  square.classList.forEach((cls) => {
    if (cls.includes("span-")) {
      let span = parseFloat(cls.split("-")[1]);
      square.style.gridColumn = "span " + span * 2;
    }
  });
});

const fulls = document.querySelectorAll(".full");
fulls.forEach((full) => {
  full.contentEditable = "true";

  full.spellcheck = false;
  full.focus();
  full.blur();

  full.draggable = "true";
  const location = full.dataset.location;
  const location_span = document.createElement("span");
  location_span.innerText = location;
  location_span.contentEditable = "true";
  location_span.classList.add("location");
  full.appendChild(location_span);
});

add_btn.onclick = () => {
  add_modal.style.display = "grid";
};
