//variables here
let game = document.getElementById("game");
let board = document.getElementById("board");
let speedcontroller = document.getElementById("speedcontroller");
let minsp = document.getElementById("minsp");
let maxsp = document.getElementById("maxsp");
minsp.value = "0";
maxsp.value = "100";
speedcontroller.value = minsp.value;
let gridstyle = window.getComputedStyle(game);
let columns = gridstyle
  .getPropertyValue("grid-template-columns")
  .split(" ").length;
let rows = gridstyle.getPropertyValue("grid-template-rows").split(" ").length;
let snakevelocity = { x: 0, y: 0 };
const food = new Audio(
  "data:audio/wav;base64,UklGRowxAABXQVZFZm10IBAAAAABAAEARKwAAAAAAAABAAgAZGF0YWgxAACJnKSlpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSko6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojn3tfWVlaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbYoihpqWkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKOjo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6OLZ1pZWltbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcY4mhpqWkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSji2daWVpbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXGaNo6alpaSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKOGZVpaW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1xcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXXqbpqalpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSMaFtaW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXG+VpaelpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKB8YVpaW1xcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcZ46jp6alpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWkpKSkpKSkpKSkpKSkpKSMaFtaW1xcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxwlqWnpqWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlkWtcWltcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxccJalp6alpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaB8YVpbXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXF1dXV1dXV1dXV1dXV1dXV1dXV1dXV1eepymp6alpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWjgmNbW1xcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXF1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dZ46jp6ampaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWeeGBaW1xcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1da5Klp6ampaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWSbFxbXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxdXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXXCWpqempqWmpqampqampqampqampqWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWll3BdW1xcXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXXWZpqempqampqampqampqampqampqampqampqampqampqampqampqampqampqampqalpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpZdwXVtcXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXWuTpainpqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWkiGZcW1xdXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1ee5ynp6ampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqaml3BeW1xdXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dZIqjqKempqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqaliGZcW1xdXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXXGWpqinpqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqajgmRbXF1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1xl6aop6ampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqamn3lgW1xdXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXWiPpKinpqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqafeWBbXF1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1oj6Sop6ampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqamon5iW1xdXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1ki6Oop6ampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampo1pXVxdXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1eXl5eXl5sk6Wop6ampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampphwXltcXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5xl6aop6ampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqSDZFxcXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5oj6Sop6ampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqakg2RcXF1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eaI+kqKenpqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqJ+YlxcXV1eXV1dXV1dXV1dXV1dXV5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5oj6Sop6empqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqJ+Y1xcXV5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5ihqGoqKempqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqaliGdcXF1eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXmWLo6iop6ampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqamjmpdXF1eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5xl6eop6empqenp6enp6empqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqaOal1cXV5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXmCBoKiop6enp6enp6enp6enp6enp6enp6enp6empqampqampqampqampqampqampqampqampqampqampqamjmpdXF1eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eYoaiqKinp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6ampqampqampqampqampqampqammHFfXF1eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl98naiop6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6empqampqamk21eXF1eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5ggaCoqKenp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6eifmNcXV5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eaJClqainp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6aJZ11cXV5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eX3ydqKinp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp5NtXlxdXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXmiQpamop6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6ennHVgXF1eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl53m6eop6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6emiWddXF5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5ffJ2oqKenp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6eifmNcXV5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXnGXp6mop6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6emiWddXV5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5ffJ2oqKenp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enoHphXF1eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5tlKapqKenp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6eOal1cXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5pkKWpqKenp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp5RuXlxdXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5ebZSmqainp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp5RuXlxdXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl93m6ipqKenp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6eOal1dXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXmOHoqmop6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enpoloXV1eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5tlKapqKenp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6eno39jXV1eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eX3ebqKmop6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6N/Y11dXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eX3ebqKmop6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enpoloXV1eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5ymKepqKenp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp5lxX1xeXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXmWMpKmop6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6emiWhdXV5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5tlKapqKenp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enj2teXV5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXmmQpamop6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6B6Yl1dXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl93m6ipqKenp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6B6Yl1dXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5fX19fX19fX3KYp6mop6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enj2teXV5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl9fX19fX19fX19fX19fX2GCoKmpqKenp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enj2teXV5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5fX19fX19fX19fX19fX19fX19fX19fX3ebqKmop6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6N/Y11dXl5fXl5eXl5eXl5eXl5eXl5fX19fX19fX19fX19fX19fX19fX19fX19fX19fX2B8nqipqKenp6enp6enp6enp6enp6enp6enp6enp6enp6enp6ePa15dXl5fX15eXl5eXl9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX2mQpKinpqampqampqampqampqampqampqampaWlpaWlpaWlpY5sYF9gYGBgYGBhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFiYmJiYmJmhp+lpaSjo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6OjoqKiop9/Z2FiYmNjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjZGRkZGRkZGRkZGRkZGRkZGRohp2ioqGhoaGgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoJBxZWRkZWVlZWVlZWVlZWVlZWVlZWZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZm6MnZ+fnp6enp6enp6enp6enZ2dnZ2dnZ2dnZ2dnZ2dnZ2VeGlmZ2dnZ2dnZ2doaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaWl6k5ycnJubm5ubm5ubm5ubm5ubm5ubm5ubmpqampqampqWfGxoaWlqampqampqampqampqampqampqampqampqampqampqamtra2tra2tra2+Hl5qZmZiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJV/b2trbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxtbW1tbW1tbW1tbW1tbW1ufpGXl5aWlpaWlpaWlpaWlpWVlZWVlZWVlZWVlZWVlZWRfXBtbW5ubm5ubm5ubm5ubm5ubm5ubm5ub29vb29vb29vb29vb29vb29vb29veYyTlJSTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5KSkpKNe3FvcHBwcHBwcHBwcHBwcHBwcHFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXF2h5CSkZGRkZGRkZGQkJCQkJCQkJCQkJCQkJCQkJCQkIh4cnFycnJycnJycnJycnJzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3NzdYKMj4+Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo2NjY2NjY2FeHR0dHR0dHR0dHR1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dn+JjIyMjIyMjIyLi4uLi4uLi4uLi4uLi4uLi4uLi4qBeHZ2dnZ2dnZ2d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3fIaJiomJiYmJiYmJiYmJiYmJiYmJiYmJiYmIiIiIiIF6eHh4eHh4eHl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXuDhoeHh4eHh4eHh4eGhoaGhoaGhoaGhoaGhoaGhoV/e3p6enp6enp7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3yAhIWFhISEhISEhISEhISEhISEhISEhISEhISEhIN/fXx8fHx8fHx8fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX6BgoKCgoKCgoKCgoKCgoKCgoKBgYGBgYGBgYGBgX9+fn5+fn5+fn5+fn9/f39/f39/f39/f39/f39/f39/f39/f39/f39/f4CAgICAgIA="
);
const gameover = new Audio(
  "https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-61905/zapsplat_multimedia_game_sound_kids_fun_negative_tone_66210.mp3?_=8"
);
const move = new Audio(
  "data:audio/wav;base64,UklGRuwkAABXQVZFZm10IBAAAAABAAEARKwAAAAAAAABAAgAZGF0YcgkAACAgICAgICAgYGBgYGBgYGBgICAf39+fn19fHx8fHx8fHx8fX1+f4CBgoKDhIWFhoaGhoaFhYSDgoGAfn18e3p5eHd3dnZ3d3h5ent9foCBg4WGh4mKiouLi4uKiYiGhYOBf317eXd2dHNycXFxcnJ0dXd4e31/goSGiYuMjo+QkJGQj46Ni4mGhIF+e3l2dHFvbm1sbGxsbW9xc3V4e36BhYiLjZCSlJWWlpaVlJKQjYuIhIF9eXZzcG1raWdnZmZnaGpsb3J1eX2AhIiMj5OVmJqbnJybmpiWk5CNiYWBfHh0cGxpZmRiYWBgYWJkZ2ptcXV5foOHjJCUmJuen6GhoaGfnZuXlI+LhoF8d3JuamZiX11cW1pbXF5hZGhscHV6f4WKj5SYnaCjpaenp6elo6CcmJSOiYN+eHNtaGRgXFlXVVRVVVdZXGBkaW50eX+Fi5GXnKCkqKqsra6trKmmo56ZlI6Ignt1b2lkXlpWU1FPTk5PUVNXW19kanB3fYOKkZedoqerr7GztLSzsa+rp6Kdl5CKg3x1bmdhXFdSTktJSEhISkxPU1hdY2lwd36GjZSboaessbS3ubq6uri1sq2oopyVjod/eHBpYlxWUEtIRUNBQUJDRklNU1heZWx0e4OLk5qhqK6zuLy/wMHBwL67t7KtpqCYkYmAeHFoYVpTTUhDQD07Ojo8PkFESU9VW2Nrc3uDjJScpKuyuL3BxMfIzMvJxsK9uLGqopqRiH92bWVdVU5HQj05NjQzMzQ2OT1BR01VW2RsdX2Gj5egp6+1u8HFyMrMzMzKx8S/urStpp6WjoV8c2tjW1RNR0E9OTY0MzM0NTg8QEVLUVlfaHB3gImRmaGpsLa8wcXIyszMzMrIxcC8trCpoZqSioJ5cWhhWVJMRkE8OTY0MzMzNTc7P0RIT1VcY2t0e4OMlJyjqrG3vMHFyMrMzMzLyMbCvbiyrKWelo+HfndvZ19YUktGQT05NjQzMzM1Njk9QUZMUlhfZm11fYWNlZykq7G3vMHEx8rLzMzLycfEwLu2sKqjnJSNhX12bmdgWVJMR0I+Ojc1NDMzNDU4Oz5CR0xTWV9mbnV8hIyTm6Kor7S6vsLGyMrMzMzLycbDwLu2sKuknZaPh4B5cWpjXFZQSkVBPTo3NTQzMzQ1Nzo9QUZLUFZdY2pxeH+HjpWco6mvtbq+wsXIysvMzMvKyMXBvbm0rqminJWOh4B5cWtkXVdRTEdCPjs4NjQzMzM0Njg7PkJGS1BWXGJob3V8hIuSmJ+lq7G2u7/DxsjKy8zMy8rIxsO/u7axq6agmZOMhX94cWpkXVhSTUhDPzw5NzU0MzM0NTY5Oz5CRktQVVthZ210eoGIjpWboqitsre8wMPGyMrLzMzLysnGxMC9uLSvqaSemJKLhH54cWtlXllTTkpFQT47ODY1NDMzNDU3OTs+QkZKT1RZX2VqcXZ9g4qQlpyiqK2yt7u/wsXIycvMzMzLysjGw7+8uLOvqaSemZONhoB6dG5oYlxXUk1JRUE+Ozg2NTQzMzQ0Njg6PEBDR0tQVVpfZWpwdnuCiI6Ump+lqq+0uLzAw8XIycvMzMzLysjGxMG+urayraijnpiTjYeBe3VvamRfWlRQS0dEQD06ODY1NDMzMzQ1Nzk7PkFFSUxRVlpgZGpwdXuAhoyRl52ip6yxtbm9wMPFyMnLy8zMy8rJyMXDwL25tbGtqKOemZOOiIN9eHJtZ2JdWFNPS0dEQD07ODc1NDQzMzQ1Njg5PD5CRUhMUFVZXmNobXJ4fIKIjZOYnaKnrLC0uLy/wsTGyMrLzMzMy8rJx8XDwL26t7OvqqahnJeSjYiCfXhzbWhjXlpVUU1JRkI/PTo4NzU0NDMzNDQ1Nzk7PUBCRklNUFVZXWJnbHB1en+Fio+UmZ6jp6ywtLe7vsHDxsfJysvMzMzLysnHxsPBvru4tLGtqKSgm5aRjYeDfXl0b2plYVxYVFBMSUVCPz07OTc2NTQzMzM0NTY3OTs9P0JFSExPU1dbX2RobXF2en+EiY6TmJyhpamtsbW4u77Bw8XHycrLy8zMy8vKycfFw8G+u7i1sa6qpqKemZWQi4eCfXl0cGtnYl5aVlJPS0hFQj89Ozk3NjU0NDMzNDQ1Njg5Oz0/QkVHS05RVVlcYWRpbXF1eX6DiIyRlZqeoqaqrrG1uLu+wMPFxsjJysvLzMzLy8rJx8bEwr+9ure0sa2qpqKempaRjYmFgHx3c29rZmJeW1dTUExKRkRBPz07OTg2NTQ0NDM0NDU1Njg5Oz0/QURGSUxQU1ZaXWFlaWxxdHl9gYWKjpKWm5+ipqqtsbS3ury/wcPFx8jJysvLzMzLy8rJyMfFw8G/vbq4tbKuq6ikoJ2ZlZGNiYWBfXl1cW1pZWFeWldTUE1KR0VCQD48Ojk3NjU1NDQ0NDQ0NTY3ODk7PT9BQ0ZIS05RVFdaXWFkaGxvc3d7foKGi46SlpqeoaWorK+ytbi6vb/Bw8XGyMnKysvLzMvLy8rJyMfGxMLAvry6t7SyrquopaKem5eUkIyIhYF9eXZybmtnZGBdWlZTUE5LSEZDQT89PDo5ODY2NTQ0NDQ0NDU1Njc4OTs8PkBCREZJS05RVFZZXF9jZmltcHN3en6ChomNkZSYm5+ipairrrG0t7m7vsDCw8XGx8nJysvLy8vLy8vKycjHxsTDwb+9u7m3tLKvrKmmo6CdmpaTkIyJhYJ+e3h0cW1qZ2RgXVpXVVJPTUpIRkRBQD48Ozo4NzY1NTQ0NDQ0NDQ1NTY3ODk7PD4/QUNFR0lMTlBTVlhbXmFkZ2ptcHN2eXx/g4aKjZCUl5qdoaSmqayvsbS2ubu9v8DCxMXGx8jJysvLy8vLy8vKysnIx8bFxMLBv727ube1srCtq6iloqCdmpeUkY6Kh4SBfnt4dXFua2hlY2BdWlhVUlBOS0lHRUNBQD49Ozo5ODc2NTU0NDQ0NDQ0NTU2Njc4OTo8PT5AQkNFR0lLTU9SVFZZW15hY2Zpa25xdHd5fH+ChYiMj5KVmJudoKOmqKutsLK0tri6vL7AwcPExcbHyMnKysvLy8vLy8vKysnJyMfGxcPCwL+9u7q4trSyr62rqKajoZ6cmZaTkY6LiIWDgH16d3Vyb2xqZ2RiX11aWFZTUU9NS0lHRURCQD8+PDs6OTg3NjY1NTQ0NDQ0NDQ1NTU2Nzc4OTo7PD4/QUJERUdJSkxOUFJUV1lbXWBiZGdpbG5xc3V4e32AgoWIi46Qk5aYm52goqWnqqyusLK0tri6vL2/wMLDxMXGx8jJycrKy8vLy8vLy8vKysnIyMfGxcTDwsC/vby6uLe1s7Gvraupp6WioJ6bmZaUko+NioiFg4B+e3l2dHFvbGpoZWNhXlxaWFZUUlBOTEpJR0ZEQ0FAPz08Ozo5ODg3NjY1NTU0NDQ0NDQ0NTU1NjY3ODk5Ojs8PT5AQUJERUZISUtNTlBSVFZYWlxeYGJkZmhqbG9xc3V3eXx+gIKFh4qMj5GUlpibnZ+hpKaoqqyusLKztbe4uru9vsDBwsPExcbHyMjJycrKy8vLy8vLy8vKysrJycjHx8bFxMPCwcC+vby6ube2tLKxr62rqaimpKKgnpyZl5WTkY+MioiGhIF/fXt5d3RycG5samhmZGJgXlxaWFZUU1FPTkxLSUhGRURCQUA/Pj08Ozo5OTg3NzY2NTU1NTQ0NDQ0NDU1NTU2Njc3ODg5Ojs7PD0+P0BBQkRFRkdJSkxNTlBRU1VWWFlbXV9gYmRmaGprbW9xc3V2eHp8foCChIeJi42PkZOVl5mbnZ+ho6WnqaqsrrCxs7S2t7m6u72+v8DBwsPExcbGx8jIycnKysrLy8vLy8vLy8vKysrJycjIx8bGxcTDwsHAv769vLu6uLe2tLOysK+tq6qop6WjoaCenJqZl5WTkY+OjIqIhoSCgH99e3l3dXNxcG5samlnZWNiYF5dW1lYVlVTUlBPTkxLSkhHRkVEQ0JBQD8+PTw8Ozo5OTg4Nzc2NjY1NTU1NTQ0NDQ0NTU1NTU2NjY3Nzg4OTk6Ozs8PT4+P0BBQkNERUZHSEpLTE1OT1FSU1VWV1laXF1fYGFjZGZnaWtsbm9xcnR1d3l6fH1/gYKEhoiKjI2PkZOVlpianJ2foaKkpaeoqqutrrCxsrS1tre5uru8vb6/wMHCw8PExcXGx8fIyMnJycrKysrLy8vLy8vLy8rKysrJycnIyMfHxsbFxMTDwsLBwL++vby7urm4t7a1s7KxsK6trKupqKelpKKhn56cm5qYlpWTkpCPjYyKiIeFhIKBf358e3l3dnRzcXBubWtqaGdlZGNhYF5dXFpZWFdVVFNSUU9OTUxLSklIR0ZFRENCQkFAPz4+PTw8Ozs6OTk5ODg3Nzc2NjY1NTU1NTU1NTU1NTU1NTU1NTY2NjY3Nzg4ODk5Ojo7Ozw8PT4+P0BAQUJDQ0RFRkdISUpKS0xNTk9QUVJTVVZXWFlaW1xdX2BhYmNlZmdoaWtsbW5wcXJzdXZ3eHp7fH1/gIGDhIaHiYqMjY+QkpOVlpiZm5ydn6Cho6Slp6ipqqytrq+wsbKztba3uLm5uru8vb6/v8DBwsLDxMTFxcbGx8fIyMjJycnKysrKysrLy8vLy8vLy8rKysrKysnJycjIyMfHxsbFxcTEw8PCwcHAv7++vby8u7q5uLe3trW0s7KxsK+urayrqqmopqWko6KhoJ6dnJuamJeWlZSSkZCPjoyLiomHhoWEgoGAf318e3p5d3Z1dHJxcG9ubWtqaWhnZmRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTU1MS0pJSUhHRkZFRENDQkFBQEA/Pj49PTw8Ozs7Ojo5OTk4ODg3Nzc3NjY2NjY1NTU1NTU1NTU1NTU1NTU1NTU2NjY2Njc3Nzc3ODg4OTk5Ojo6Ozs8PD09Pj4/P0BAQUFCQkNEREVFRkdHSElJSktLTE1OTk9QUVFSU1RVVVZXWFlaWltcXV5fYGBhYmNkZWZnaGhpamtsbW5vcHFyc3N0dXZ3eHl6e3x9fn5/gIGDhIWGh4mKi4yNj5CRkpOUlZeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKys7S1tra3uLm5uru7vL29vr+/wMDBwcLDw8PExMXFxsbGx8fHyMjIycnJycnKysrKysrKysrLy8vLy8rKysrKysrKysrJycnJycjIyMfHx8fGxsXFxcTEw8PDwsLBwcDAv7++vb28vLu6urm5uLe3trW1tLOysrGwsK+uraysq6qpqKinpqWkpKOioaCfnp6dnJuamZiXl5aVlJOSkZCPjo6NjIuKiYiHhoWEhIOCgYB/fn18e3p6eXh3dnV0c3NycXBvbm1tbGtqaWhnZ2ZlZGNjYmFgX19eXVxcW1pZWVhXV1ZVVVRTU1JRUVBPT05NTUxMS0pKSUlISEdHRkZFRUREQ0NCQkFBQEBAPz8+Pj49PT08PDw7Ozs6Ojo6OTk5OTg4ODg4Nzc3Nzc3NjY2NjY2NjY2NjY1NTU1NTU1NTU1NTU1NjY2NjY2NjY2NjY2Nzc3Nzc3ODg4ODg4OTk5OTo6Ojo7Ozs7PDw8PD09PT4+Pj8/P0BAQEFBQkJCQ0NDRERFRUVGRkdHSEhJSUlKSktLTExNTU5OT09QUFFRUlJTU1RUVVVWVldXWFhZWVpbW1xcXV1eXl9gYGFhYmJjY2RlZWZmZ2hoaWlqamtsbG1tbm5vcHBxcXJzc3R0dXV2d3d4eHl5ent7fHx9fX5/f4CAgYKDhIWGhoeIiYqLi4yNjo+QkJGSk5SUlZaXmJiZmpubnJ2en5+goaGio6Skpaamp6ioqaqqq6ysra6ur7CwsbGys7O0tLW1tra3t7i4ubm6uru7vLy9vb6+vr+/wMDAwcHCwsLDw8PExMTExcXFxsbGxsfHx8fHyMjIyMjJycnJycnJycrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrJycnJycnJycjIyMjIyMfHx8fHxsbGxsXFxcXExMTEw8PDwsLCwsHBwcDAwL+/v76+vb29vLy8u7u6urq5ubi4t7e3tra1tbS0s7OzsrKxsbCwr6+urq2trKyrq6qqqamoqKenpqalpaSko6OioaGgoJ+fnp6dnZybm5qamZmYmJeWlpWVlJSTk5KRkZCQj4+OjY2MjIuLioqJiIiHh4aGhYWEg4OCgoGBgIB/fn59fXx8e3t6enl4eHd3dnZ1dXR0c3NycnFwcG9vbm5tbWxsa2tqamlpaGhnZ2ZmZWVlZGRjY2JiYWFgYF9fXl5eXV1cXFtbW1paWVlYWFhXV1ZWVlVVVFRUU1NSUlJRUVFQUE9PT05OTk1NTUxMTEtLS0pKSklJSUhISEhHR0dGRkZGRUVFRURERENDQ0NCQkJCQUFBQUFAQEBAPz8/Pz8+Pj4+Pj09PT09PTw8PDw8PDs7Ozs7Ozo6Ojo6Ojo6OTk5OTk5OTk5ODg4ODg4ODg4ODg3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzg4ODg4ODg4ODg4ODk5OTk5OTk5OTk5Ojo6Ojo6Ojo6Ozs7Ozs7Ozs8PDw8PDw8PD09PT09PT0+Pj4+Pj4+Pz8/Pz8/P0BAQEBAQEFBQUFBQUJCQkJCQkNDQ0NDQ0RERERERUVFRUVFRkZGRkZHR0dHR0hISEhISElJSUlJSkpKSkpLS0tLS0xMTExMTU1NTU1OTk5OTk9PT09PUFBQUFFRUVFRUlJSUlJTU1NTU1RUVFRVVVVVVVZWVlZXV1dXV1hYWFhYWVlZWVpaWlpaW1tbW1tcXFxcXV1dXV1eXl5eXl9fX19gYGBgYGFhYWFhYmJiYmNjY2NjZGRkZGVlZWVlZmZmZmZnZ2dnZ2hoaGhpaWlpaWpqampqa2tra2tsbGxsbG1tbW1tbm5ubm5vb29vcHBwcHBxcXFxcXJycnJycnNzc3NzdHR0dHR1dXV1dXZ2dnZ2d3d3d3d3eHh4eHh5eXl5eXp6enp6ent7e3t7fHx8fHx8fX19fX19fn5+fn5/f39/f3+AgICAgICBgYGBgYGCgoODg4SEhYWGhoeHh4iIiYmKioqLi4yMjY2Ojo6Pj5CQkZGRkpKTk5OUlJWVlpaWl5eYmJiZmZqampubnJycnZ2dnp6fn5+goKChoaKioqOjo6SkpKWlpqamp6enqKioqampqqqqq6urrKysra2tra6urq+vr7CwsLCxsbGysrKys7OztLS0tLW1tbW2tra3t7e3uLi4uLm5ubm5urq6uru7u7u8vLy8vL29vb29vr6+vr6/v7+/v8DAwMDAwMHBwcHBwcLCwsLCwsPDw8PDw8PExMTExMTExcXFxcXFxcXGxsbGxsbGxsbHx8fHx8fHx8fHx8jIyMjIyMjIyMjIyMjJycnJycnJycnJycnJycnJycnJysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKycnJycnJycnJycnJycnJycnJycnJyMjIyMjIyMjIyMjIyMjIx8fHx8fHx8fHx8fHx8bGxsbGxsbGxsbGxcXFxcXFxcXFxcXExMTExMTExMTDw8PDw8PDw8PCwsLCwsLCwsLBwcHBwcHBwcDAwMDAwMDAv7+/v7+/v7++vr6+vr6+vb29vb29vb28vLy8vLy8u7u7u7u7u7q6urq6urq5ubm5ubm4uLi4uLi4t7e3t7e3t7a2tra2trW1tbW1tbS0tLS0tLSzs7Ozs7OysrKysrKxsbGxsbGxsLCwsLCwr6+vr6+vrq6urq6ura2tra2trKysrKysq6urq6urqqqqqqqqqqmpqampqaioqKioqKenp6enp6ampqampqWlpaWlpaSkpKSkpKOjo6Ojo6KioqKioqGhoaGhoaCgoKCgoJ+fn5+fn56enp6enp6dnZ2dnZ2cnJycnJybm5ubm5uampqampqamZmZmZmZmJiYmJiYl5eXl5eXl5aWlpaWlpWVlZWVlZWUlJSUlJSTk5OTk5OTkpKSkpKSkZGRkZGRkZCQkJCQkJCPj4+Pj4+Pjo6Ojo6OjY2NjY2NjYyMjIyMjIyLi4uLi4uLi4qKioqKioqJiYmJiYmJiIiIiIiIiIeHh4eHh4eHhoaGhoaGhoWFhYWFhYWFhISEhISEhISDg4ODg4ODg4KCgoKCgoKCgYGBgYGBgYGAgICAgICAgH9/f39/f39/fn5+fn5+fn5+fX19fX19fX19fHx8fHx8fHx8e3t7e3t7e3t7enp6enp6enp6eXl5eXl5eXl5eHh4eHh4eHh4eHd3d3d3d3d3d3d2dnZ2dnZ2dnZ2dXV1dXV1dXV1dXR0dHR0dHR0dHR0c3Nzc3Nzc3Nzc3NycnJycnJycnJycnFxcXFxcXFxcXFxcXBwcHBwcHBwcHBwcG9vb29vb29vb29vb25ubm5ubm5ubm5ubm5tbW1tbW1tbW1tbW1tbGxsbGxsbGxsbGxsbGxra2tra2tra2tra2tra2pqampqampqampqampqamlpaWlpaWlpaWlpaWlpaWloaGhoaGhoaGhoaGhoaGhoZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZmZmZmZmZmZmZmZmZmZmZmZmZmVlZWVlZWVlZWVlZWVlZWVlZWVkZGRkZGRkZGRkZGRkZGRkZGRkZGRkY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYF9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX15eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1cXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2RkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2hoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWpqampqampqampqampqampqampqampqampra2tra2tra2tra2tra2tra2tra2tra2tsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxtbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ub29vb29vb29vb29vb29vb29vb29vb29wcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHFxcXFxcXFxcXFxcXFxcXFxcXFxcXFycnJycnJycnJycnJycnJycnJycnJyc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3R0dHR0dHR0dHR0dHR0dHR0dHR0dHR1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2d3d3d3d3d3d3d3d3d3d3d3d3d3d3eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHl5eXl5eXl5eXl5eXl5eXl5eXl5eXp6enp6enp6enp6enp6enp6enp6ent7e3t7e3t7e3t7e3t7e3t7e3t7e3x8fHx8fHx8fHx8fHx8fHx8fHx8fH19fX19fX19fX19fX19fX19fX19fX1+fn5+fn5+fn5+fn5+fn5+fn5+fn5/f39/f39/f39/f39/f39/f39/f3+AgICAgICAgICAgICAgICAgICAgICBgYGBgYGBgYGBgYGBgYGBgYGBgYGCgoKCgoKCgoKCgoKCgoKCgoKCgoKCg4ODg4ODg4ODg4ODg4ODg4ODg4ODhISEhISEhISEhISEhISEhISEhISEhIWFhYWFhYWFhYWFhYWFhYWFhYWFhYaGhoaGhoaGhoaGhoaGhoaGhoaGhoaHh4eHh4eHh4eHh4eHh4eHh4eHh4eHiIiIiIiIiIiIiIiIiIiIiIiIiIiIiImJiYmJiYmJiYmJiYmJiYmJiYmJiYmKioqKioqKioqKioqKioqKioqKioqKiouLi4uLi4uLi4uLi4uLi4uLi4uLi4uMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Oj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+PkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5SUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpeXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmampqampqampqampqampqampqampqampqampqampqam5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ucnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+foKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKio6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6SkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqanp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enpw=="
);
const startsound = new Audio(
  "https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-61905/zapsplat_multimedia_game_sound_kids_fun_positive_mallet_003_66214.mp3?_=7"
);
let lastscene = 0;
let score = 0;
let speed = 500 - 5 * speedcontroller.value;
let snake = [{ x: columns - 6, y: rows - 6 }];
let foodshow = { x: columns - 6, y: rows - 10 };

//functions are here
function main(ctime) {
  window.requestAnimationFrame(main);
  if (!(ctime - lastscene < speed)) {
    lastscene = ctime;
    gameengine();
  } else {
    return;
  }
}

function snakecollide(sarr) {
  for (let i = 1; i < sarr.length; i++) {
    if (sarr[i].x == sarr[0].x && sarr[i].y == sarr[0].y) {
      return true;
    }
  }
  if (
    sarr[0].x < 0 ||
    sarr[0].x > columns ||
    sarr[0].y < 0 ||
    sarr[0].y > rows
  ) {
    return true;
  } else {
    return false;
  }
}

function gameengine() {
  //displaying the snake array
  game.innerHTML = "";
  snake.forEach((e, index) => {
    snakeele = document.createElement("div");
    snakeele.style.gridRowStart = e.y;
    snakeele.style.gridColumnStart = e.x;
    if (index == 0) {
      snakeele.classList.add("head");
    } else if (index == snake.length - 1) {
      snakeele.classList.add("tail");
    } else {
      snakeele.classList.add("body");
    }
    game.appendChild(snakeele);
  });

  //food display
  foodele = document.createElement("div");
  foodele.style.gridRowStart = foodshow.y;
  foodele.style.gridColumnStart = foodshow.x;
  foodele.classList.add("food");
  game.appendChild(foodele);

  //updation of snake
  if (snakecollide(snake)) {
    gameover.play();
    snakevelocity = { x: 0, y: 0 };
    alert(`Game over! press 'ok' to play again`);
    snake = [{ x: columns - 6, y: rows - 6 }];
    foodshow = { x: columns - 6, y: rows - 10 };
    score = 0;
    speedcontroller.value = minsp.value;
    speed = 500 - 5 * speedcontroller.value;
  }

  // if you have eaten the food them regenerate it, increament the score;
  if (snake[0].x == foodshow.x && snake[0].y == foodshow.y) {
    food.play();
    score += 1;
    document.getElementById("score").innerHTML = "Score: " + score;
    snake.unshift({
      x: snake[0].x + snakevelocity.x,
      y: snake[0].y + snakevelocity.y,
    });
    xrandom = Math.round(columns * Math.random());
    yrandom = Math.round(5 + (rows - 5) * Math.random());
    foodshow.y = yrandom;
    foodshow.x = xrandom;
  }

  //updation of snake
  for (let i = snake.length - 2; i >= 0; i--) {
    snake[i + 1] = { ...snake[i] };
  }
  snake[0].x += snakevelocity.x;
  snake[0].y += snakevelocity.y;
}

//logic of the game
let c = 0;
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  if (c == 0) {
    startsound.play();
    let spcon = setInterval(() => {
      speedcontroller.value = 1 + parseInt(speedcontroller.value);
      speed = 500 - speedcontroller.value * 5;
      if (speedcontroller.value == maxsp.value) {
        clearInterval(spcon);
      }
    }, 5000);
    c += 1;
  }
  snakevelocity = { x: 0, y: 1 };
  switch (e.key) {
    case "ArrowUp":
      snakevelocity.x = 0;
      snakevelocity.y = -1;
      move.play();
      break;
    case "ArrowDown":
      snakevelocity.x = 0;
      snakevelocity.y = 1;
      move.play();
      break;
    case "ArrowLeft":
      snakevelocity.x = -1;
      snakevelocity.y = 0;
      move.play();
      break;
    case "ArrowRight":
      snakevelocity.x = 1;
      snakevelocity.y = 0;
      move.play();
      break;
  }
});
window.addEventListener("click", () => {
  if (c == 0) {
    startsound.play();
    let spcon = setInterval(() => {
      speedcontroller.value = 1 + parseInt(speedcontroller.value);
      speed = 500 - speedcontroller.value * 5;
      if (speedcontroller.value == maxsp.value) {
        clearInterval(spcon);
      }
    }, 5000);
    c += 1;
  }
});
function directioncontrol(ids) {
  if (ids == "u") {
    snakevelocity.x = 0;
    snakevelocity.y = -1;
    move.play();
  } else if (ids == "d") {
    snakevelocity.x = 0;
    snakevelocity.y = 1;
    move.play();
  } else if (ids == "l") {
    snakevelocity.x = -1;
    snakevelocity.y = 0;
    move.play();
  } else if (ids == "r") {
    snakevelocity.x = 1;
    snakevelocity.y = 0;
    move.play();
  }
}

function showmenu() {
  let menuicon = document.getElementsByClassName("menu_icon");
  menuicon[0].classList.toggle("open");
  let menu = document.getElementsByClassName("menu");
  menu[0].classList.toggle("menuopen");
}
