const express = require("express");

const db = require("../data/dbConfig");

const router = express.Router();

router.get("/", (req, res) => {
  db.select("*")
    .from("accounts")
    .then(results => {
      res.status(200).json(results);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "Error getting accounts" });
    });
});

router.get("/:id", (req, res) => {
  db.select("*")
    .from("accounts")
    .where({ id: req.params.id })
    .first()
    .then(account => {
      res.status(200).json(account);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "Error getting the account" });
    });
});

router.post("/", (req, res) => {
  const account = req.body;
  db("accounts")
    .insert(account, "id")
    .then(ids => {
      const id = ids[0];
      return db("accounts")
        .select("name", "budget")
        .where({ id })
        .first()
        .then(post => {
          res.status(201).json(post);
        })
        .catch(error => {
          console.log(error);
          res.status(500).json({ errorMessage: "Error adding the account" });
        });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db("accounts")
    .where({ id })
    .update(changes)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: `${count} record(s) updated` });
      } else {
        res.status(404).json({ errorMessage: "Post not found" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "Error updating the post" });
    });
});

router.delete("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      res.status(200).json({ message: `${count} record(s) removed` });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "Error removing the accout" });
    });
});

module.exports = router;
