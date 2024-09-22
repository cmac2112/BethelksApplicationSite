# BethelksApplicationSite

replacement site for https://www-archive.bethelks.edu/about/who-we-are/career-opportunities/current-position-openings


notes
on docker compose down, need to repopulate database

# To Start
Frontend: navigate to /JobSite/ 
-
npm run dev

Server: navigate to /BethelksApplicationSite/ 
-
npm run server - runs the index.js \
npm run hard-start - drops and recreates the dummy database and then runs the server \
npm run database-reset - drops and recreates the database with dummy data

# Docker
- naviate to /BethelksApplicationSite/
- docker compose up --build
