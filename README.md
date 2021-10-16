# CMatches - A Case Study

## Problem Statement

Cricket is one of international sport and it is widely popular in India.
 
This case study is about showing current and old cricket matches played around the world. Also the details about each match including score and other statistics has to be displayed.

Build a system to find current cricket matches and add matches to favourite list.

## Requirements

- The application needs to fetch cricket matches from the following API.
  
  1. https://www.cricapi.com/

Refer the following URLs to explore more on the cricket match APIs.
  1. https://www.cricapi.com/how-to-use.aspx
  2. https://www.cricapi.com/how-to-use/next-matches-api.aspx
  3. https://www.cricapi.com/how-to-use/match-api.aspx
  4. https://www.cricapi.com/how-to-use/scores-api.aspx

- A frontend where the user can register/login to the application, find current or old cricket matches and add interested matches to favourite list.
  - On launching the application the user should get the login page. The login page should have a link for registration using which the user should be able to register. On successful registration the user should be taken to the login page. Upon login, the user should be taken to the home page.
  - Proper navigation links for all the pages should be available within pages.
  - Error handling should be implemented across pages. Appropriate messages should be    displayed for the same. Success messages should be displayed for the User Registration.
  - Logout feature should be implemented.

- The upcoming cricket schedule can be displayed on the home page as a calendar as a quick view to the user. This can be viewed after successful login into the application.
- The complete match statistics can be displayed for a selected cricket match.
- User can add a match to favourite list and should be able to view favourite matches.

## Modules

### UI (User interface) -  should be able to
  - View cricket calendar
  - View current matches
  - Add a match to favourite list
  - should be able to see favourite matches
  - UI should be responsive which can run smoothly on various devices 
  - UI should be appealing and user friendly.

### UserService
  - should be able to manage user accounts.
### FavouriteService
  - should be able to store all the favourite matches for a user

## Tech Stack

- Spring Boot
- MySQL
- Mongo
- REACT
- CI (Gitlab Runner)
- Docker, Docker Compose

## Flow of Modules

### Building frontend : 
  1. Building responsive views:
    - Register/Login
    - Cricket Matches - populating from external API
    - Build a view to show favourite matches
  2. Using Services to populate these data in views
  3. Making the UI Responsive
  4. Tests should be created for the functional flow


### Note: FrontEnd and all the backend services should be dockerized and run through docker-compose

### Building the UserService
  1. Creating a server in Spring Boot to facilitate user registration and login with MySQL as backend. Upon login, JWT token has to be generated. It has to be used in the Filters set in other services.
  2. Writing swagger documentation
  3. Unit Testing of the entire code which involves the positive and negative scenarios
  4. Implement continuous Integration CI ( use .gitlab-ci.yml)
  5. Dockerize the UserService (create dockerfile, docker-compose.yml and get it executed through docker compose)

### Building the Favourite Service
  1. Building a server in Spring Boot to facilitate CRUD operation over favourite matches stored in Mongo.JWT Filter should be applied for all the API calls of the favourite service. JWT token should be used to authorize the user access to all the resources.
  2. Writing Swagger Documentation
  3. Write Unit Test Cases and get it executed.
  4. Implement CI - continuous Integration ( use .gitlab-ci.yml)
  5. Dockerize the Favourite Service(create dockerfile and update the docker-compose.yml)

### Demonstrate the entire application
    1. Make sure all the functionalities are implemented
    2. Make sure both the UI (Component and Services) and server side (For all layers) codes are tested(unit and E2E). 
    3. All the Services are up and running using docker (Dockercompose should be used for running them)
    4. CI pipeline should be implemented
    5. Application is completely responsive in nature
    6. Use Eureka Service Registry
