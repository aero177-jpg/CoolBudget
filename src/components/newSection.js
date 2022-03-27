import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { Button, TextField } from "@material-ui/core/";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../utils/firebase";
import { BudgetContext } from "../context/budgetContext";

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

const NewSectionForm = ({ handleClose }) => {
  const classes = useStyles();
  // create state variables for each input
  const [title, setTitle] = useState("");
  const { sectionList, setSectionList, currentBudget } = useContext(
    BudgetContext
  );
  const createSection = async () => {
    await setDoc(
      doc(db, "budgets", `${currentBudget.title}`, "sections", `${title}`),
      {
        title: title,
        items: []
      }
    );
    setSectionList([...sectionList, { title: title, items: [] }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createSection();
    // handleClose();
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <TextField
        label="Title"
        variant="filled"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div>
        <Button variant="contained" onClick={handleClose}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          add section
        </Button>
      </div>
    </form>
  );
};

export default NewSectionForm;
