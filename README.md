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
