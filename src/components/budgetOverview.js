import { useState, useContext, useEffect } from "react";
import { BudgetContext } from "../context/budgetContext";
import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../utils/firebase";
import NewBudgetForm from "../components/newBudget";
import { useNavigate } from "react-router-dom";

const BudgetOverview = () => {
  const { budgetList, setBudgetList, setCurrentBudget } = useContext(
    BudgetContext
  );
  const navigate = useNavigate();

  useEffect(() => {
    const getAllBudgets = async () => {
      const snapshot = await getDocs(collection(db, "budgets"));
      const budgetList = snapshot.docs.map((doc) => doc.data());
      return setBudgetList(budgetList);
    };
    getAllBudgets();
  }, []);

  const handleOnClick = (item) => {
    setCurrentBudget(item);
    navigate("/budget");
  };
  const List = () => {
    const items = budgetList.map((item) => {
      return <button onClick={() => handleOnClick(item)}>{item.title}</button>;
    });

    return <div>{items}</div>;
  };
  return (
    <div>
      <NewBudgetForm />
      <List />
    </div>
  );
};

export default BudgetOverview;
