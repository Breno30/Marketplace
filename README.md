# Marketplace - Sell and Buy
[Access here](https://breno30.github.io/Marketplace/frontend/pages/home-page/home-page.html)
<br>

# Stacks
#### Database 
- Mongodb ![](https://github.com/mongodb/mongo/blob/master/docs/leaf.svg)  
#### Back end   
- NodeJS ![](https://avatars.githubusercontent.com/u/9950313?s=35)


# How to run
1. Set the following environment variables:
    - <b>Marketplace_jwtPrivateKey</b>: random string
    - <b>Marketplace_db</b>: mongodb://127.0.0.1/Marketplace
    
2. Clone this repository

```
git clone https://github.com/Breno30/Marketplace.git
```
<br>

3. Open the backend folder and install dependencies 

> <b>Marketplace/backend></b> `npm install`
<br>

4. Create database "Marketplace" with Collection "Products"
<img src="https://user-images.githubusercontent.com/59184811/165992493-b6a55b5b-dd98-4970-b053-b5339fb2dc87.png" height="470">
<br>

5. Import products from the json file
> <b>Marketplace/backend></b> `mongoimport --db Marketplace --collection Products --file auto_generated_posts.json --jsonArray`
<br>

6. In the same folder, run the following command
> <b>Marketplace/backend></b> `npm run dev` 
<br>

7. Open `Marketplace/frontend/pages/home-page/home-page.html`
<br>
