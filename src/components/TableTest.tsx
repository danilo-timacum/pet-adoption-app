import { TaskBar } from "./TaskBar";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import * as React from "react";

export function TableTest() {
  return (
    <div>
      <TaskBar />
      <div className="tableFixedRow">
        <p>id</p>
        <p>name</p>
        <p>age</p>
        <p>species</p>
        <p>vacced</p>
        <p>date</p>
        <p>Action</p>
      </div>
    </div>
  );
}
export default TableTest;
