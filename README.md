# Motorcycle_Hub

<br>

# Quick Compo

<br>

## Description

This is an app for motorcycle riders. For them to share their learnings connect with other riders and buy and sell products and services.

## User Stories

-  **404:** As a user I get to see a 404 page with a feedback message if I try to reach a page that does not exist so that I know it's my fault.
-  **Signup:** As an anonymous user I can sign up on the platform so  and create a user account.
-  **Login:** As a user I can login to the platform so that I can access my profile and search the app content.
-  **Logout:** As a logged in user I can logout from the platform so no one else can use it.
-  **Profile Page**: As a logged in user I can visit my profile page so that I can access the edit page and my motorcycles, my Marketplace offers and requests and my trips.
-  **Add Motorcycle:** As a logged in user I can access the add motorcycle page so that I can create a new motorcycle.
-  **Edit Motorcycles Details:** As a logged in user I can access the edit motorcycle details page so that I can edit the motorcycle details received from the API (stock specs).
-  **Add Products/Services:** As a user I can add products or services to the marketplace and will see them in my user page.
-  **Edit Products/Services:** As a user I can see my products and services offered and requested in my user page and edit them.
-  **View Motorcycles List:** As a user I can see the List of motorcycle makers and respective models.




## Backlog
- Maketplace card categories (parts/equipment/tech/etc...)
- Events Page
- Plan your Trip section
- Loading effects
- Add geolocation to events when creating them


<br>


# Client / Frontend

## React Router Routes (React App)

| Path                         | Component/Page       | Permissions                | Behavior                                                  |
| ---------------------------- | -------------------- | -------------------------- | --------------------------------------------------------- |
| `/login`                     | LoginPage            | anon only `<AnonRoute>`    | Login form, navigates to home page after login.           |
| `/signup`                    | SignupPage           | anon only  `<AnonRoute>`   | Signup form, navigates to home page after signup.         |
| `/`                          | HomePage             | public `<Route>`           | Home page.                                                |
| `/user-profile`              | ProfilePage          | user only `<PrivateRoute>` | User and player profile for the current user.             |
| `/user-profile/edit`         | EditProfilePage      | user only `<PrivateRoute>` | Edit user profile form.                                   |
| `/motorcycle/add`            | CreateTournamentPage | user only `<PrivateRoute>` | Create new motorcycle form.                               |
| `/brands`                    | MotorcycleMakersList | public `<Route>`           | Tournaments list.                                         |
| `/:brandName`                | MotorcycleMakersList | public `<Route>`           | Tournaments list.                                         |
| `/:brandName/:modelName`     | MotorcycleMakersList | public `<Route>`           | Tournaments list.                                         |
| `/marketplace`               | MarketPlaceList      | public `<Route>`           | Tournament details. Shows players list and other details. |
| `/marketplace/:cardId`       | MaketplaceCardDetails| user only `<PrivateRoute>` | Tournament details. Shows players list and other details. |
| `/marketplace/create`        | AddProduct/Service   | user only `<PrivateRoute>` | Tournament details. Shows players list and other details. |




## Components

Pages:

- LoginPage

- SignupPage

- HomePage

- ProfilePage

- EditProfilePage

- AddMotorcycle

- EditMotorcycle

- MotorcycleDetails

- MotorcycleMakersList

- MotorcycleModelDetails

- AddProduct/Service

- EditProduct/Service

- MarketPlaceList

- MaketplaceCardDetails

  

Components:

- Navbar
- MotorcycleCard
- MakerCard
- ProductCard
- Service Card


## Services

- **Auth Service**

  - `authService` :
    - `.login(user)`
    - `.signup(user)`
    - `.logout()`
    - `.validate()`

- **User Service**

  - `userService` :
    - `.updateCurrentUser(id, userData)`
    - `.getCurrentUser()`

- **Motorcycle Service**

  - `motorcycleService` :
    - `.addMotorcycle(motorcycleData)`
    - `.getMakers()`
    - `.getOneMotorcycle(id)`
    - `.deleteMotorcycle(id)`

- **Marketplace Service**

  - `MarketplaceService` :
    - `.createCard(id)`
    - `.getCardDetails(id)`
    - `.editCardDetails(id)`
    - `.deleteCardDetails(id)`

  



<br>


# Server / Backend


## Models

**User model**

```javascript
{
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String,required: true};
  bio: { type: String}
  profileImg: { type:String}
}
```


**Motorcycle Brand model**

```javascript
 {
   name: { type: String, required: true },
   url: { type: String, required: true},
   img: { type: String, required: true },
   motorcycleModels: [ { type: Schema.Types.ObjectId, ref:'Models' } ],
 }
```



**Motorcycle Models model**

```javascript
{
  name: { type: String, required: true },
  brand: { type: String, required: true },
  img: { type: String },
  details:{details list}
  
}
```
**Users Motorcycle model**

```javascript
{

  nickname: { type: String, required: true },
  modelName: { type: String, required: true },
  brand: { type: String, required: true },
  img: { type: String },
  owner:{type: Schema.Types.ObjectId, ref:'User' }
  details:{details list}
  
}
```

**Card model**

```javascript
{
  cardType: { type: String, required: true },
  contentType: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  priceMin:{type: Number},
  priceMax:{type: Number}
  img: { type: String },
  owner:{type: Schema.Types.ObjectId, ref:'User' }
  url:{type: String}
  
}
```




<br>


## API Endpoints (backend routes)

| HTTP Method | URL                    | Request Body                 | Success status | Error Status | Description                                                  |
| ----------- | ---------------------- | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/auth/profile    `    | Saved session                | 200            | 404          | Check if user is logged in and return profile page           |
| POST        | `/auth/signup`         | {name, email, password}      | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`          | {username, password}         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | `/auth/logout`         |                              | 204            | 400          | Logs out the user                                            |
| GET         | `/api/motorcycle`      |                              |                | 400          | Show all motorcycle                                         |
| GET         | `/api/motorcycle/:id`  |                              |                |              | Show specific tournament                                     |
| POST        | `/api/motorcycle`      | { name, img, players }       | 201            | 400          | Create and save a new tournament                             |
| PUT         | `/api/motorcycle/:id`  | { name, img, players }       | 200            | 400          | edit tournament                                              |
| DELETE      | `/api/motorcycle/:id`  |                              | 201            | 400          | delete tournament                                            |
| GET         | `/api/cards/:id`       |                              |                |              | show specific player                                         |
| POST        | `/api/cards`           | { name, img, tournamentId }  | 200            | 404          | add player                                                   |
| PUT         | `/api/cards/:id`       | { name, img }                | 201            | 400          | edit player                                                  |
| DELETE      | `/api/cards/:id`       |                              | 200            | 400          | delete player                                                |
| GET         | `/api/games`           |                              | 201            | 400          | show games                                                   |
| GET         | `/api/games/:id`       |                              |                |              | show specific game                                           |
| POST        | `/api/games`           | {player1,player2,winner,img} |                |              | add game                                                     |
| PUT         | `/api/games/:id`       | {winner,score}               |                |              | edit game                                                    |


<br>

## API's

<br>

## Packages
Axios

Material UI
<br>


## Links


### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/FranciscoCrespo91/Motorcycle_Hub_Client)

[Server repository Link](https://github.com/jodmadeira/Motorcycle_Hub_Server)

[Deployed App Link] TBD

### Slides

TBD

### Contributors

Francisco Crespo - github/FranciscoCrespo91 - linkedin/francisco-crespo-m1991

João Madeira - github/jodmadeira - linkedin/joaoddmadeira