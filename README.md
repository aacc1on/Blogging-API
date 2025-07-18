````markdown
# 📝 Simple Blogging Platform API

A backend REST API for a simple blogging system with the following features:

- 🔐 User registration and login (JWT-based)
- ✍️ Post creation with categories and tags
- 💬 Nested comments (replies to comments)
- 👍 Like / 👎 Dislike functionality
- 🔎 Filter posts by category or tag
- 🧾 MongoDB used for flexible document structure

---

## 🚀 Technologies Used

- Node.js + Express
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- dotenv for config
- bcrypt for password hashing

---

## 📦 Installation

1. **Clone the repository**  
   ```bash
   git clone https://github.com/your-username/blogging-api.git
   cd blogging-api
````

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create `.env` file**
   Example `.env` file:

   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/blogDB
   JWT_SECRET=your_jwt_secret
   ```

4. **Start the server**

   ```bash
   npm start
   ```

---

## 🧪 API Endpoints

### Auth

| Method | Endpoint             | Description                 |
| ------ | -------------------- | --------------------------- |
| POST   | `/api/auth/register` | Register a new user         |
| POST   | `/api/auth/login`    | Login user and return token |

### Posts

| Method | Endpoint                 | Description                             |
| ------ | ------------------------ | --------------------------------------- |
| POST   | `/api/posts`             | Create new post (auth)                  |
| GET    | `/api/posts`             | Get all posts (filtering)               |
| GET    | `/api/posts/:id`         | Get single post with like/dislike count |
| POST   | `/api/posts/:id/like`    | Like a post (auth)                      |
| POST   | `/api/posts/:id/dislike` | Dislike a post (auth)                   |

#### Filter Example:

```
GET /api/posts?category=tech&tag=ai
```

### Comments

| Method | Endpoint                  | Description                      |
| ------ | ------------------------- | -------------------------------- |
| POST   | `/api/posts/:id/comments` | Add a comment or reply (auth)    |
| GET    | `/api/posts/:id/comments` | Get all nested comments for post |

---

## 📁 Project Structure

```
blogging-api/
├── models/          # Mongoose models (User, Post, Comment)
├── routes/          # Express routes (auth, posts)
├── middleware/      # Auth middleware
├── index.js         # Entry point
├── .env             # Environment variables
```

---

## ✅ Bonus Features

* Aggregated like/dislike count returned with each post
* Nested comment structure returned as a tree
* User password hashed before saving
* JWT token-based auth for protected endpoints

---

## 📌 To Do

* [ ] Admin panel support
* [ ] Pagination on post & comment fetch
* [ ] Markdown support for post content
* [ ] Dockerization for deployment

---

## 🛡️ License

# Blogging-API
