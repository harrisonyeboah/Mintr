# Mintr Server Setup

## MongoDB Connection Setup

### 1. Create a `.env` file
Create a `.env` file in the Server directory with the following content:

```env
# MongoDB Connection String
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Secret (for authentication)
JWT_SECRET=your_jwt_secret_key_here

# Other Configuration
CORS_ORIGIN=http://localhost:3000
```

### 2. Get Your MongoDB Atlas Connection String

1. **Go to [MongoDB Atlas](https://cloud.mongodb.com/)**
2. **Sign in to your account**
3. **Click on your cluster**
4. **Click "Connect"**
5. **Choose "Connect your application"**
6. **Copy the connection string**

### 3. Replace the Placeholders

In your `.env` file, replace:
- `<username>` with your MongoDB Atlas username
- `<password>` with your MongoDB Atlas password
- `<cluster>` with your cluster name
- `<database>` with your database name

### 4. Example Connection String

```env
MONGO_URI=mongodb+srv://john_doe:mypassword123@cluster0.abc123.mongodb.net/mintr_db?retryWrites=true&w=majority
```

### 5. Common Issues & Solutions

#### Authentication Failed (Error 8000)
- ✅ Check username and password are correct
- ✅ Make sure you're using the right database user
- ✅ Verify the user has the correct permissions

#### Network Issues
- ✅ Check your internet connection
- ✅ Verify the cluster URL is correct
- ✅ Check firewall settings

#### Connection Timeout
- ✅ Increase timeout values in db.js if needed
- ✅ Check network stability

### 6. Test the Connection

After setting up your `.env` file:

```bash
cd Server
node Server.js
```

You should see:
```
🔌 Attempting to connect to MongoDB...
✅ Connected to MongoDB successfully!
🏓 MongoDB ping successful!
Server running on port 5000
```

### 7. Security Notes

- ⚠️ Never commit your `.env` file to version control
- ⚠️ Keep your MongoDB credentials secure
- ⚠️ Use environment variables in production
- ⚠️ Regularly rotate your database passwords

## Project Structure

```
Server/
├── .env                 # Environment variables (create this)
├── .env.example        # Example environment file
├── Server.js           # Main server file
├── db.js              # Database connection
├── routes/            # API routes
├── controllers/       # Route controllers
├── models/            # Database models
├── middleware/        # Custom middleware
├── config/            # Configuration files
└── utils/             # Utility functions
```

