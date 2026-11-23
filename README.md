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
  - clone the repository.
  - confirm Node.js and npm are installed
  - run the following in the devcontainer terminal:
    - `cp .env.example .env`
    - `dc-up mongo`
    - `npm install`
    - `node server.js`
  - visit http://localhost:3000 to confirm the homepage
  - click the "Register" button to open the user registration page
  - input "test@test.com" for the email with the password "123pass" to see if registration works, expect "Registration successful!" with an account ID.
  - submit the same "test@test.com" / "123pass" again, expect "Email already registered".
  - submit with the email, the password, or both left blank. Expect "Email and password required" (remove the `required` attribute in the browser dev tools to send a blank field).
  - click the "back to login" button
  - input "test5@test.com" for the email and "123pass", expect "Email not registered".
  - input "test@test.com" for the email and "111", expect "Invalid password".
  - input "test@test.com" for the email and "123pass" for the password to test for a valid log in, should redirect to the account page
  - you have now registered an account and logged in successfully
  - stop the server (Ctrl+C), start it again with `node server.js`, and log in with "test@test.com" / "123pass" again, it should still work
  - go back to the account page
  - attempt to enter a new name for the account, expect it to work and save to the name field
  - in the browser DevTools, go under the form that says `action="/account/..."` and change the user ID to something else. Then attempt to change the name again. This time it should reject with "Account not found"
  - now go and register another user account and save that id
  - login back into your first account and this time in DevTools change the `action="/account/..."` ID to the actual ID of the second account you just made. Now it should reject with "You cannot edit another person's account".

## System Diagram

```

Browser
|
v
server.js
|-- static --> public/style.css
|-- GET / --> redirect to /home
|-- GET /home --> views/home.ejs
|
|-- routes/auth.js
|   |-- GET /login --> views/login.ejs
|   |-- GET /register --> views/register.ejs
|   |-- POST /login
|   |-- POST /register
|       |
|       v
|   controller/auth.js
|   (loginUser, registerUser)
|       |-- registerUser
|       |   --> views/partials/register-message.ejs
|       v
|   service/auth.js <--> bcrypt
|   (login, register)
|       |
|       v
|   repository/user.js
|
|-- routes/account.js
    |-- GET /account --> showAccount
    |-- POST /account/:id/name --> updateAccName
        |
        v
    controller/account.js
    (showAccount, updateAccName)
        |
        v
    service/account.js
    |-- getAccount --> user.findById
    |-- updateName --> user.updateById
        |
        v
    repository/user.js

repository/user.js
(findUser, findById, getAll, create,
 updateById, removeById)
|
v
Mongoose User model
(email: String, passwordHash: String required, role: {member: String, admin: String})
|
v
MongoDB "users" collection

__tests__/auth.test.js (Jest)
|-- tests --> service/auth.js
|-- mocks --> repository/user.js
|-- mocks --> bcrypt

```

### Design Decisions

Sprint 2

- Dylan
  - I chose to implement the authentication routes in a separate file under the routes folder. The other acceptable method would have been to add them to the server file, but I chose to refrain from this in order to promote long-term readability and modularity practices. As our application grows, it will become extremely important that we separate behavior into multiple files, so that they become easier to find and the file navigation is more intuitive. This also supports the structure of a layered architecture, as each layer is meant to handle different responsibilities without interfering or having knowledge of the others.

- Jackson
- One decision I made was to add the login feature onto the same layers as our registration feature which kept things easier to navigate and grouped them by responsibility. An alternative would have been to use separate folders for each feature, which would have been a perfectly valid approach. But for the scope and current state of the project (only login and registration features implemented), grouping the features together right now makes more sense for ease of use for our team. Although we can switch to the alternative in the future if the scope expands significantly further for those features. I also chose to add another check to the login feature in our service folder that checks if the password is correct or not rather than using the (!savedUser) function. A credible alternative would have been to use that "if (!savedUser)" function to check both, but this would have made it impossible for the end user to tell whether it was the password being wrong or the email not being valid. This helps the end user understand that first whether the email is valid or not, then checks if the password is correct as well so an end user can only see the incorrect password if their email was valid.

- Artemisia
  - I choose to use fetch() for the login and registration page. Since if I use the HTML form to display, our backend returns JSON and users will see the raw JSON which is not good looking and lack of feedback for them. Using fetch() will allow them to stay at the same page while get useful and clear responce of success or error messages.

- Ray
  - One design decision I made was to store our data in MongoDB rather than a local file. MongoDB handles concurrent writes safely, lets us query and update individual documents without loading everything, and keeps the data persistent independent of the app server. The alternative was a local .json file that we read and write with fs. That would be simpler, since it needs no database setup and the data is easy to inspect and reset, but it doesn’t handle simultaneous writes well and doesn’t scale past a small dataset which is why I ultimately went with MongoDB.

## Sprint 3

- Ray's changes
  - Switched the user repository from the MongoDB driver to Mongoose
  - Added a User schema with email and passwordHash marked required: true and email set to unique
  - Repository exports findUser, findById, getAll, create, updateById and removeById, all are calling Mongoose model method

  - How to test
    - npm install
    - npm test
    - start the app and register a new user, this will save and show a success message, same email will reject
    - login with that created user and it will load your info.

- changes
  - the registration submission now uses HTMX, allowing the submission messages to be returned by the server as an HTML fragment and swapped into #message, replacing the hand-written fetch() and DOM update.
  - added jest tests for every business rule in the service layer.
  - added MongoDB operations for user data. POST /register creates users, POST /login and GET /account read user data, and POST /account/:id/name updates user names.
  - updated home, login, register, and account pages with Tailwind CSS for different screen sizes. Use browser DevTools to check mobile and desktop views. Run npm run build:css to rebuild the CSS.

- why:
  - HTMX fits the registration behavior well and is more manageable than the hand-written fetch()
  - test everybusiness rule in the service layer without a live database connection

verify:

- Jest tests
  - install dependencies with 'npm install'
  - run 'npm test' in the terminal with an expected result of 1 passing suite and 9 passing tests
  - in the devcontainer's terminal, verify the tests also pass with database URL variables unset with 'env -u MONGO_URL -u MONGODB_URI npm test'

### Design Decisions

- Dylan
  - I chose to convert the registration submission to HTMX rather than the login submission. Registration fits HTMX's pattern better as the result is just a success or error message swapped into the same page. This means the server can return a small HTML fragment and the hand-written fetch() and DOM update can be removed, and so there is less code to maintain and fewer places for bugs. I chose registration over login because its result is just a message swapped into the same page, while a successful login redirects to /account and would need extra handling such as an HX-Redirect header.

- Jackson
  - One design decision I made was to mock the bcrypt and hashing test to remain consistent with the other tests as well as focusing on the service business rule. We also mock it because we can control the password comparison resullt and test our logion logic directly. A reasonable alternative that could be taken would be to use real bcrypt to test by generating a hash for a known password, use the mock repository, and attempt a login with a different password because the mock doesn't explicitly prove that bcyrpt is actually comparing the passwords correctly. The reason for mocking the bcrypt is because it is faster than actually testing a real bcrypt which is purposefully slower.

- Ray
  - This sprint I switched our user repository from the plain MongoDB driver to Mongoose. We could have kept the driver, since it already worked. I picked Mongoose because the schema checks that every user has an email and a password hash before it gets saved. The driver saved anything we gave it. Mongoose blocks records like that, and making email unique stops two accounts from using the same email. Keeping the driver would have meant doing all those checks by hand in the service. The cost was one more package, and Mongoose quietly drops fields that aren’t in the schema.

- Artemisia
  - I choose to use Tailwind css to style four pages, home, login, register, account. An alternative could be the traditional CSS. Tailwind allows me to use responsive utility classes directly in the EJS files, so these four pages can adjust to different screen sizes without writing separate media queries for each page. However, it will make the ejs files harder to read since it adds a lot of long class attributes. If I choose to use the traditional CSS, I need to write more CSS rules to keep the styling consistent for all four pages.

## Sprint-4

- How to make an admin account
  - follow the steps for making a user
  - go to admin page
  - enter admin password
  - click submit
  - will change account to have admin capabilities as well as maintain member
    capabilities

- Ray's changes
- Added role field to the User model, this field is an Object that contains
  two fields, member: String and admin: String

- Dylan's changes
  - Updating names in the account page now checks for the proper owner and also utilizes the roles to give admins special permission to also change the field
  - When the user attempts to update the name using a valid user id that is not the account owner or an admin it rejects with 403
  - When the user attempts to update the name using an invalid user id it rejects with 404

- Artemisia's changes
- Change the color for error and success message
- Added role="alert" to the error message and updated the error styling to use the message error class.
- Added tabindex="-1" to the result message and an HTMX event listener to move focus to the message after a submission.

## Accessibility Audit

- I tested the accessibility for Home, Login, Register and Account page. I first checked the keyboard only navigation. All buttons, links and input fields can be accessed with Tab, Enter also works well.
  For the second part, I improved the accessibility by letting the focus land to the input field when there’s an input error. For example, if the user enters “aaa” in the Email input field and pressed Login, the focus will back to the input field of Email and an error message will occur since this is not a valid email address.
  Every input has a real label. Yes, there’re labels for the input fields for all the pages.
  I checked the color for the four pages using WebAIM Contrast Checker and changed some color, so all tested colors meet the WCAG AA 4.5:1 requirement for normal text.
  Login/Register button – 6.83:1
  Login/Register button hover - 8.82:1
  Success message – 5.79:1
  Error message – 7.49:1
  Body text – 11.78:1
  Account button – 12.63:1
  To check the accessibility, run the webpage and navigate through the pages using only keyboard. Submit the Register form using incorrect email and press Register to check whether the focus moves back to the Email input field. Also use WebAIM to check the color of button and text.

### Design Decisions

- Ray
- I was tasked with making a change to the User model, the design decision was
  to add a role field to User and include member and admin in that field. One
  alternative to that was to add more roles to the role. This would add a
  broader selection of types of users, and allow for different capabilities a
  user can do based on their separate roles. I chose to keep it simple to just
  two roles. I felt that with the scope of our project, only 2 roles was
  necessary.

- Dylan
  - I chose to make changing a user's name on the account page reject with a 404 instead of a 403 when using an account that does not actually exist. Previously this was the method used to test the behavior and we rejected with a 403 which is an easy to use and straightforward alternative to test if the inputs on the website actually reach the service layer checks, but now with the proper role management and authorization checks implemented I went with this to distinguish between rejecting a nonexistent account (404) and rejecting an existing account without permission (403). This is not a 401 because a session must have been created and the user must be authenticated to reach the account page. When they try to update the name using an invalid id the client requests and does not receive the resource from the server and so it rejects with 404.

- Artemisia
- I decided to add a consistent focus visible outline to interactive elements through src/input.css. A possible alternative would be adding individual Tailwind focus classes to each button, link, and input field. However, the shared CSS rule is easier to maintain because our application has multiple pages using the same styles. The alternative would require editing each page separately and could lead to inconsistent focus indicators if some elements were missed.
