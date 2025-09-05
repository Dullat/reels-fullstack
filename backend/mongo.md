

# 🧠 **MongoDB Cheatsheet (Using `mongosh`)**

---

## 🗂️ **Database Commands**

| Task                  | Command          |
| --------------------- | ---------------- |
| Show all databases    | `show dbs`       |
| Switch to a database  | `use myDatabase` |
| Show current database | `db`             |

---

## 📁 **Collection Commands**

| Task                       | Command                        |
| -------------------------- | ------------------------------ |
| Show all collections in DB | `show collections`             |
| Create collection manually | `db.createCollection("users")` |
| Drop a collection          | `db.users.drop()`              |

---

## 📄 **CRUD Operations**

### ➕ Insert Data

```js
db.users.insertOne({ name: "Dullat", email: "dullat@example.com" })
db.users.insertMany([
  { name: "John", age: 25 },
  { name: "Jane", age: 30 }
])
```

---

### 🔍 Read Data

```js
db.users.find()                     // All documents
db.users.find().pretty()           // Pretty-print
db.users.find({ age: 25 })         // Filter by field
db.users.findOne({ name: "John" }) // Return one match
```

---

### ✏️ Update Data

```js
// Update one document
db.users.updateOne(
  { name: "John" },
  { $set: { age: 26 } }
)

// Update multiple documents
db.users.updateMany(
  { age: { $gt: 25 } },
  { $set: { active: true } }
)
```

---

### ❌ Delete Data

```js
db.users.deleteOne({ name: "Jane" })    // Delete one
db.users.deleteMany({ active: false })  // Delete many
```

---

## 🔧 Other Useful Commands

| Task                          | Command                             |
| ----------------------------- | ----------------------------------- |
| Count documents in collection | `db.users.countDocuments()`         |
| Sort results                  | `db.users.find().sort({ age: -1 })` |
| Limit results                 | `db.users.find().limit(5)`          |
| Drop the entire database ⚠️   | `db.dropDatabase()`                 |

---

## 🧪 Aggregation (Basic Example)

```js
db.users.aggregate([
  { $match: { age: { $gte: 25 } } },
  { $group: { _id: "$age", count: { $sum: 1 } } }
])
```

---

## 🖥️ System Commands

| Task                   | Command              |
| ---------------------- | -------------------- |
| Exit `mongosh`         | `exit` or `Ctrl + C` |
| Check Mongo version    | `mongod --version`   |
| Connect to Mongo shell | `mongosh`            |

---

## 🔐 Security Warning You Saw

```txt
Access control is not enabled...
```

This means:

* MongoDB is running **without authentication**.
* Anyone on the system can read/write data.
* Safe for dev, **not safe for production**.

To enable auth, you'd need to create an admin user and start Mongo with `--auth`, but you don’t need that for local dev unless you're testing auth.

---

## ✅ Quick Start Flow

```bash
mongod              # Start MongoDB server
mongosh             # Open shell
show dbs            # View databases
use myApp           # Create/select DB
show collections    # See collections
db.users.insertOne(...)  # Add data
db.users.find()     # View data
```

---
