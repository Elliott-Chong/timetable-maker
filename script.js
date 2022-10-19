const squares = document.querySelectorAll(".square");
squares.forEach((square) => {
  square.classList.forEach((cls) => {
    if (cls.includes("span-")) {
      let span = cls.split("-")[1];
      square.style.gridColumn = "span " + span;
    }
  });
});

const fulls = document.querySelectorAll(".full");
fulls.forEach((full) => {
  full.contentEditable = "true";
  full.draggable = "true";
  const location = full.dataset.location;
  const location_span = document.createElement("span");
  location_span.innerText = location;
  location_span.contentEditable = "true";
  location_span.classList.add("location");
  full.appendChild(location_span);
});
