import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { Button, TextField } from "@material-ui/core/";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../utils/firebase";
import { BudgetContext } from "../context/budgetContext";
import { useNavigate } from "react-router-dom";

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

const NewBudgetForm = ({ handleClose }) => {
  const classes = useStyles();
  // create state variables for each input
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const { budgetList, setBudgetList, setCurrentBudget } = useContext(
    BudgetContext
  );
  const navigate = useNavigate();

  const createBudget = async () => {
    await setDoc(doc(db, "budgets", title), { title: title, amount: amount });
    setBudgetList([...budgetList, { title: title, amount: amount }]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createBudget();
    setCurrentBudget({ title: title, amount: amount });
    navigate("/budget");
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
      <TextField
        label="Amount"
        variant="filled"
        required
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <div>
        <Button variant="contained" onClick={handleClose}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          add Budget
        </Button>
      </div>
    </form>
  );
};

export default NewBudgetForm;
