

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
# Sub todos

In your Mongoose schema definition:

```js
mongoose.Schema({
  title,
  completed,
  createdBy,
  subTodos: [{
    type: ObjectId,
    ref: "subtodo"
  }]
})
```

### ✅ What does `subTodos` contain?

The `subTodos` field is defined as an **array of ObjectIds** that **reference** documents in the `"subtodo"` collection. So:

> **By default**, `subTodos` will contain only the **ObjectId references**, not the actual subtodo documents.

Example of what `subTodos` might look like **in the database**:

```js
{
  title: "Main Task",
  completed: false,
  createdBy: ObjectId("..."),
  subTodos: [
    ObjectId("64f21cde1234567890abcd01"),
    ObjectId("64f21cde1234567890abcd02")
  ]
}
```

---

### 🧠 How to get actual subtodo documents?

If you want Mongoose to **replace those ObjectIds with the actual subtodo documents**, you need to use `.populate()` in your query. For example:

```js
Todo.findById(todoId).populate('subTodos').exec((err, todo) => {
  console.log(todo.subTodos); // Now this will contain full subtodo objects
});
```

---

### 🔁 Summary

| Feature               | Behavior                                              |
| --------------------- | ----------------------------------------------------- |
| `subTodos` definition | Array of ObjectId references to `"subtodo"` documents |
| Default content       | Just the ObjectIds                                    |
| To get full objects   | Use `.populate('subTodos')` in your query             |

---
# adding sub totos in main todo

Great question! Here's how **subTodos** can be added to a Mongoose document (e.g., a "Todo" document) depending on whether you're creating a new todo or updating an existing one.

---

## ✅ 1. **Assumptions**

Let’s assume you have these Mongoose models:

```js
const mongoose = require('mongoose');
const { Schema } = mongoose;

// SubTodo Schema
const SubTodoSchema = new Schema({
  title: String,
  completed: Boolean,
});
const SubTodo = mongoose.model('subtodo', SubTodoSchema);

// Main Todo Schema
const TodoSchema = new Schema({
  title: String,
  completed: Boolean,
  createdBy: mongoose.Schema.Types.ObjectId,
  subTodos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'subtodo' }],
});
const Todo = mongoose.model('todo', TodoSchema);
```

---

## ✍️ 2. **Add subTodos when creating a new Todo**

```js
const createTodoWithSubTodos = async () => {
  // Step 1: Create some subtodos
  const sub1 = await SubTodo.create({ title: 'Subtask 1', completed: false });
  const sub2 = await SubTodo.create({ title: 'Subtask 2', completed: false });

  // Step 2: Create the main todo and include subTodo references
  const todo = await Todo.create({
    title: 'Main Task',
    completed: false,
    createdBy: someUserId,
    subTodos: [sub1._id, sub2._id], // just their ObjectIds
  });

  console.log('Todo created:', todo);
};
```

---

## 🔄 3. **Add subTodos to an existing Todo**

```js
const addSubTodoToExisting = async (todoId) => {
  // Step 1: Create a new subTodo
  const newSub = await SubTodo.create({ title: 'Another Subtask', completed: false });

  // Step 2: Push its ObjectId into the Todo's subTodos array
  await Todo.findByIdAndUpdate(
    todoId,
    { $push: { subTodos: newSub._id } },
    { new: true }
  );
};
```

---

## 👀 4. **Populate subTodos when retrieving the main Todo**

```js
const todoWithSubTodos = await Todo.findById(todoId).populate('subTodos');
console.log(todoWithSubTodos.subTodos); // Full subtodo objects
```

---

## 🧠 Summary

| Action                        | Code                                                             |
| ----------------------------- | ---------------------------------------------------------------- |
| Create subtodo                | `const sub = await SubTodo.create({...})`                        |
| Link to todo (create)         | Include `sub._id` in `subTodos` when creating the todo           |
| Link to todo (update)         | Use `$push` to add `sub._id` to existing todo's `subTodos` array |
| Get actual subTodos in result | Use `.populate('subTodos')` when querying the todo               |

