# F1 Stats
This is a Formula 1 statistics React web app.

[live version](https://f1-stats-react.netlify.app)

*The design is based on the official F1 website.

### What does it do?
You can view schedule for the upcoming F1 races as well the results of the previous ones, standings, fastest laps, view current teams, drivers and their info.

### Structure
The website consists of the following pages:
- Home
- Schedule
- Race Details
- Drivers
- Driver Details
- Teams
- Team Details
- Archive
- Error

Each page contains a navbar and a footer.
The content is dynamic and is being fetched from:
- [Ergast API](http://ergast.com/mrd/terms/);
- [API-FORMULA-1](https://api-sports.io/documentation/formula-1/v1);

## Home
The page has news section (not clickable, it's just for stylization) and 3 tabs displaying driver standings, constructor standings and last race results. Each name is a link to the respective page.

## Schedule
The page displays the list of all the races in the season and a section for the upcoming race. Each grand prix card is a link to the respective page.

## Race Details
The page displays the race's circuit and spoilers for qualification and race results in form of tables. If grand prix has sprint there'll also be sprint spoiler. For races that have already passed there's a podium section displaying 3 winners of a race. If grand prix is yet to come the timer will be displayed counting down days, hours, minutes,seconds to the start.

## Drivers
The page contains a grid of all the drivers in the current season. Each driver card is a link to a respective page.

## Driver Details 
The page contains details on each driver along with bio section.

## Teams 
The page contains a grid of all the teams in the current season. Each team card is a link to a respective page.

## Team Details 
The page contains details on each team. There're also links to the team drivers.

## Archive
The page contains info about the past F1 events and related topics. 3 select inputs allow to display the following queries from year 2004:
1. All races results in a particular year;
2. Results to a particular race in a particular year;
3. All the active drivers in a particular year;
4. A particular driver info in a particular year;
5. All the active team in a particular year;
6. A particular team results in a given year;
7. The fastest lap of each race in a particular year;

All results are displayed as tables.

## Error
The page is accessed when invalid url is being submitted. Contains a button to go back to the home page.

## Responsive features
The website is fully responsive. On small screens navbbar turns into a dropdown menu; after scrolling down long enough the "Scroll to top" button appears.

## Libraries
- React Router
- React Icons