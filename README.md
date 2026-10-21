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

- project
  - This project is a game that will have pets who are able to be customized and leveled up by feeding them.

- changes
  - added controller, public, repository, routes, and service folders;
    - added auth.js within each of those folders. 
  - Added db.js. 
  - added login.ejs and register.ejs to views folder.
    - updated home.ejs in views folder.
  - Updated AI disclosures and README, server.js, package.json, package-lock.json amd style.css (in public).
  - added user "Log in" and "Registration" features split into 4 layers: routes, controller, service, and repository. 
  - connect to MongoDB
  - added login page and register page.
  - updated css style for html page views.

- why
  - additions made to implement the added user "Log in" and "Registration" features.
  - also added views and css so end user can see a page to interact with for the home, log in, and registration.
  - User "Log in" and "Registration" added for end users to either sign into an existing account or register a new account.

- verify
  - Clone the repository.
  - Comfirm Node.js and npm are installed. 
  - Confirm that you have installed the project's dependencies, including Express in “pachage.json” file with “npm install”.
  - join team 4's MongoDB project 0
    - authorize IP on MongoDB
    - create new databse user with password on MongoDB
  - create .env file
  - get a connection string from MongoDB's "Connect" on the project overview
  - add "MONGODB_URI="your-connection-string"", replacing the username and password placeholders with your newly created database user and password.
  - save your updated .env file
  - Then, start the server with node server.js and visit http://localhost:3000 to confirm the homepage and then visit http://localhost:3000/account.
  - The homepage and account page should load with no console errors.


Diagram (to do)  


### Design Decisions

- Dylan
  - I chose to render the login and registration pages with EJS through Express GET routes, and submitted the forms through POST requests. A credible alternative was to render the pages with client-side JavaScript and submit the credentials using fetch(), but this adds additional complexity and the only thing it really resolves is fixing errors without reloading the pages. Additionally, the standard form works now without extra Javascript, which can be added later if needed to work with the form.

- Jackson
 - One decision I made was to add the login feature onto the same layers as our registration feature which kept things easier to navigate and grouped them by responsibility. An alternative would have been to use separate folders for each feature, which would have been a perfectly valid approach. But for the scope and current state of the project (only login and registration features implemented), grouping the features together right now makes more sense for ease of use for our team. Although we can switch to the alternative in the future if the scope expands significantly further for those features. I also chose to add another check to the login feature in our service folder that checks if the password is correct or not rather than using the (!savedUser) function. A credible alternative would have been to use that "if (!savedUser)" function to check both, but this would have made it impossible for the end user to tell whether it was the password being wrong or the email not being valid. This helps the end user understand that first whether the email is valid or not, then checks if the password is correct as well so an end user can only see the incorrect password if their email was valid. 