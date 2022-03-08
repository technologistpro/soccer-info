// Get date based on user/client timezone
let UTCDate = new Date();
const offset = UTCDate.getTimezoneOffset();
let TZDate = new Date(UTCDate.getTime() - offset * 60 * 1000);
var today = TZDate.toISOString().split("T")[0];

// API with filter for Today's data only
var api_url = `https://api.football-data.org/v2/matches?dateFrom=${today}&dateTo=${today}`;
var api_competitions = "https://api.football-data.org/v2/competitions";

// Call the API
function callAPI(api_url) {
  const result = fetch(api_url, {
    headers: { "X-Auth-Token": "a2498628ef65414b9592af00821eb243" },
  });
  return result;
}

// Generate the matches data
function generateMatches(matches) {
  var looped = matches
    .map(
      (match) => `
        <div class="status">${match.status}</div>
        <div class="h-team">${match.homeTeam.name}</div>
        <div class="h-score">${
          match.score.fullTime.homeTeam == null
            ? "-"
            : match.score.fullTime.homeTeam
        }</div>
        <div class="a-team">${match.awayTeam.name}</div>
        <div class="a-score">${
          match.score.fullTime.awayTeam == null
            ? "-"
            : match.score.fullTime.awayTeam
        }</div>
        <div class="separator"></div>
        `
    )
    .join("");

  //   return looped;
  document.querySelector(".matches").innerHTML = looped;
}

if (document.querySelector(".matches")) {
  callAPI(api_url)
    .then((res) => res.json())
    .then((data) => generateMatches(data.matches));
}

// Generate the competitions data
function generateCompetitions(competitions) {
  var looped2 = competitions
    .map(
      (competition) => `
          <div class="area">${competition.area.name}</div>
          <div class="competition">${competition.name}</div>
          <div class="separator"></div>
          `
    )
    .join("");

  //   return looped;
  document.querySelector(".competitions").innerHTML = looped2;
}

if (document.querySelector(".competitions")) {
  callAPI(api_competitions)
    .then((res2) => res2.json())
    .then((data2) => generateCompetitions(data2.competitions));
}
// Pop-over
var modalOuter = document.querySelector(".modal-outer");
var modalInner = document.querySelector(".modal");

var comingSoon = `
<h3>Comming Soon</h3>
<p>2022 World Cup coverage!<p>
<a class="closer" href="#0">✖︎</a>
`;

function showPopover(event) {
  if (event.target.matches(".beta")) {
    modalInner.innerHTML = comingSoon;
    modalOuter.classList.add("open");
  } else if (event.target.matches(".closer, .modal-outer")) {
    modalOuter.classList.remove("open");
  } else return;
  event.preventDefault();
}

document.addEventListener("click", showPopover);
