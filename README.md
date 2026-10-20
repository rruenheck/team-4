# team-4

|---------|--------------|-----------|----------------|----------------|
| Name | Ray Ruenheck | Dylan Liu | Artemisia Li | Jackson Seely |
|---------|--------------|-----------|----------------|----------------|
| Github | rruenheck | T5auce | Artemisia1223 | jacksonSeely |
|---------|--------------|-----------|----------------|----------------|

- Working Agreement
  - communication will be done on discord
  - done means that it passes a review from atleast one teammate
  - disagreements will be put to a vote and then a coinflip if the vote is a tie

- project
  - We are going to make a game
  - it is interesting becaues it is visual and interactive
  - it serves the purpose of entertainment

## Sprint 1 Update

- project
  - This project is a game that will have pets who are able to be customized and leveled up by feeding them.

- changes
  - Initialized server file and Express.
  - Added views folder, account page, and a homepage route.
  - Updated README

- why
  - Gives visitors an updated “Welcome” to the homepage and allows visitors to view their account page.

- verify
  - Clone the repository.
  - Confirm that you have installed the project's dependencies, including Express in “pachage.json” file with “npm install”.
  - Then, start the server with node server.js and visit http://localhost:3000 to confirm the homepage and then visit http://localhost:3000/account.
  - The homepage and account page should load with no console errors.

## Sprint 2 Update

Update (to do)

Diagram (to do)

### Design Decisions

- Dylan
  - I chose to render the login and registration pages with EJS through Express GET routes, and submitted the forms through POST requests. A credible alternative was to render the pages with client-side JavaScript and submit the credentials using fetch(), but this adds additional complexity and the only thing it really resolves is fixing errors without reloading the pages. Additionally, the standard form works now without extra Javascript, which can be added later if needed to work with the form.

- Artemisia
  - I choose to use fetch() for the login and registration page. Since if I use the HTML form to display, our backend returns JSON and users will see the raw JSON which is not good looking and lack of feedback for them. Using fetch() will allow them to stay at the same page while get useful and clear responce of success or error messages. 