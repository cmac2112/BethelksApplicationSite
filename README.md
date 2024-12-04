# BethelksApplicationSite

todo: change everything to jobid instead of title

replacement site for https://www-archive.bethelks.edu/about/who-we-are/career-opportunities/current-position-openings

# build and host static files

navigate to /jobsite/

`npm run build` to build the react application

index.js serves the built application from port 3000

# To Start development
Frontend: navigate to /JobSite/ 
-
npm run dev

Server: navigate to /BethelksApplicationSite/ 
-
npm run server - runs the index.js (or node index.js)\
npm run hard-start - drops and recreates the dummy database and then runs the server \
npm run database-reset - drops and recreates the database with dummy data

# Docker
- naviate to /BethelksApplicationSite/
- docker compose up --build

Iteniary 
2. Application viewer 2nd
3. Edit job posts 3rd
4. form session storage(store items entered in the input to come back to later feature)
5. form pagination (separate it into pages)
6. figure out posting jobs to database along with resumes and files



Authentication flow

1. user logs in
2.  google returns user identification info
3. compare recieved email from google to database emails
4. if email exists in database allow the user to log in 

from there validate token middleware will take over on all other operations (dont store the sub from google)

Adding job authorization to do
1. logged in user creates new job post
2. sends info to server
3. server runs validate token middleware to get user idenfication from google
4. check gotten user info from google against authorized email in database
5. if it exists allow user to create new job

validate token middleware will be the same throughout and will prevent users from outside bethelks domain and users not added to the authenticated user table from editing and looking at things they should not

Protected file system
1. user requests to see file
2. route is protected with validate token middleware
3. validate token middleware runs, if true allow user to see, if not, return error

This prevents users from naviagting manually through url to see items stored in the file system without having proper authentication. Doing it through google allows for offloading security to them easier.
