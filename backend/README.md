# TheLens Backend

Node.js/Express API with MySQL for TheLens frontend.

## Setup

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Setup MySQL database:**
   ```bash
   # Create DB (update .env first)
   mysql -u root -p -e "CREATE DATABASE thelens_db;"
   
   # Run schema
   mysql -u root -p thelens_db < schema.sql
   ```

3. **Configure .env** (edit placeholders):
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=yourpassword
   DB_NAME=thelens_db
   ```

4. **Run server:**
   ```bash
   npm run dev  # Development with nodemon
   # or
   npm start    # Production
   ```

## API Endpoints

- `GET /health` - Health check
- `GET /api/articles` - List articles (?category=Technology&search=AI&sort=newest&limit=12&page=1&featured=true)
- `GET /api/articles/:id` - Single article
- `GET /api/topics` - All topics with counts
- `GET /api/topics/technology/articles` - Articles by topic
- `GET /api/authors` - All authors with stats
- `GET /api/authors/:id` - Single author with recent articles

**Base URL:** http://localhost:5000

## Frontend Integration

Add to `frontend/vite.config.js` proxy:
```js
server: {
  proxy: {
    '/api': 'http://localhost:5000'
  }
}
```

## Seed Data

Sample authors/topics in schema.sql. Add articles:
```sql
INSERT INTO articles (...) VALUES (...);
```

## Testing

```bash
curl http://localhost:5000/health
curl http://localhost:5000/api/articles
```

**Note:** Update .env DB credentials before starting!
