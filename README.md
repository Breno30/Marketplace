# Marketplace - Sell and Buy
[Access here](https://breno30.github.io/Marketplace/frontend/pages/home-page/home-page.html)
<br>

# Stacks
#### Database 
- Mongodb ![](https://github.com/mongodb/mongo/blob/master/docs/leaf.svg)  
#### Back end   
- NodeJS ![](https://avatars.githubusercontent.com/u/9950313?s=35)


# How to run

1. Clone this repository

```
git clone https://github.com/Breno30/Marketplace.git
```

2. Open the backend folder and install dependencies 

```
Marketplace/backend> npm install
```

2. Create database "Marketplace" with Collection "Posts"
<img src="https://user-images.githubusercontent.com/59184811/165992493-b6a55b5b-dd98-4970-b053-b5339fb2dc87.png" height="470">

3. Import posts from the json file
```
Marketplace/backend> mongoimport --db Marketplace --collection Posts --file auto_generated_posts.json --jsonArray
```

4. In the same folder, run the following command
```
Marketplace/backend> npm run dev
``` 

5. Open `Marketplace/frontend/pages/home-page/home-page.html`
