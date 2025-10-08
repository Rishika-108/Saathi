import React from "react";
import JournalBook from "../../components/JournalingComponents/JournalBook";
import Greeting from "../../components/JournalingComponents/Greeting";

const Journal = () => {
  return (
    <div>
      <Greeting userName="Omkar" />
      <JournalBook />
    </div>
  );
};

export default Journal;
