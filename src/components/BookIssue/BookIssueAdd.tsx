import React from "react";
import { useAppSelector } from "../../redux/hooks";
import { api } from "../../utils/api";
import IssueForm from "./IssueForm";

export default function BookIssueAdd() {
  const [addIssue, setAddIssue] = React.useState(false);
  const [issueData, setIssueData] = React.useState({
    request_id: "",
  });

  const handleForm = async () => {
    setAddIssue((prev) => !prev);
  };

  const token = useAppSelector(state => state.auth.token)

  const addBookIssueData = async () => {
    try {
      const data = await api.post('/book-issued/add', issueData, token ? token : '')
      setIssueData(data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" box-border! w-full! flex justify-between font-[Poppins]! items-center ">
      <div>
        <h1 className="text-2xl">
          <span className="text-red-500">Book Issue</span> Inventory
        </h1>
        <p className="text-[15px]">Manage your books inventory</p>
      </div>
      {addIssue && (
        <IssueForm addBookIssueData={addBookIssueData} issueData={issueData.request_id} handleForm={handleForm} addIssue={addIssue} setIssueData={setIssueData} />
      )}
      <button
        className="flex text-amber-50 w-fit items-center p-5 bg-green-500 font-semibold hover:bg-green-600 h-10 rounded"
        onClick={handleForm}
      >
        Approve Issue
      </button>
    </div>
  );
}