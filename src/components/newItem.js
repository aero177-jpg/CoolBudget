import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { Button, TextField } from "@material-ui/core/";
import { doc, updateDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../utils/firebase";
import { BudgetContext } from "../context/budgetContext";
import ShortUniqueId from "short-unique-id";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),

    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "300px"
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(2)
    }
  }
}));

const NewItemForm = (props) => {
  const { section } = props;
  const classes = useStyles();
  // create state variables for each input
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const { sectionList, setSectionList, currentBudget } = useContext(
    BudgetContext
  );
  const updateSection = async () => {
    await updateDoc(
      doc(
        db,
        "budgets",
        `${currentBudget.title}`,
        "sections",
        `${section.title}`
      ),
      section
    );
  };
  const items = section.items.map((item) => {
    return (
      <>
        <p>{item.title}</p>
      </>
    );
  });
  const handleSubmit = (e) => {
    const uid = new ShortUniqueId();
    e.preventDefault();
    section.items.push({
      title: title,
      amount: amount,
      id: uid()
    });
    let stateCopy = [...sectionList];
    const index = stateCopy.findIndex((el) => el.title === section.title);
    stateCopy[index] = section;
    setSectionList(stateCopy);
    updateSection();
  };

  return (
    <>
      <form className={classes.root} onSubmit={handleSubmit}>
        <TextField
          label="Title"
          variant="filled"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Amount"
          variant="filled"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <div>
          <Button variant="contained">Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            new Item
          </Button>
        </div>
      </form>
      <div>{items}</div>
    </>
  );
};

export default NewItemForm;
