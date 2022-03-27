import { useState, useContext, useEffect } from "react";
import { BudgetContext } from "../context/budgetContext";
import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../utils/firebase";
import NewItemForm from "./newItem";
import NewSectionForm from "../components/newSection";

const SectionList = () => {
  const { sectionList, setSectionList, currentBudget } = useContext(
    BudgetContext
  );

  useEffect(() => {
    const getAllSections = async () => {
      if (currentBudget) {
        const snapshot = await getDocs(
          collection(db, "budgets", `${currentBudget.title}`, "sections")
        );
        const result = snapshot.docs.map((doc) => doc.data());
        return setSectionList(result);
      }
    };
    getAllSections();
  }, [currentBudget]);
  const List = () => {
    const sections = sectionList.map((section) => {
      return (
        <div>
          <h3>{section.title}</h3>
          <NewItemForm section={section} />
        </div>
      );
    });

    return <div>{sections}</div>;
  };
  return (
    <div>
      <NewSectionForm />
      <List />
    </div>
  );
};

export default SectionList;
