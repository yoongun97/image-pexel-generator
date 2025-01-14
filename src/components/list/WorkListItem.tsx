import { WorkItem } from "@/utils/types";
import React from "react";

function WorkListItem({ item }: { item: WorkItem }) {
  return (
    <div className="items-center p-2 border border-slate-400 rounded flex justify-between">
      <p>{item.index}</p>
      <p>{item.name}</p>
      <div>
        <span>{item.width}</span>
        <span>x</span>
        <span>{item.height}</span>
      </div>
      <p>{item.colorNum}</p>
      <p>{item.date}</p>
      <button className="hover:bg-slate-400 hover:border-slate-200 border border-slate-950 rounded px-3 py-1 ">
        Show
      </button>
      <button className="hover:bg-slate-400 hover:border-slate-200 border border-slate-950 rounded px-3 py-1 ">
        DownLoad
      </button>
      <button className="hover:bg-slate-400 hover:border-slate-200 bg-red-600 text-slate-100 rounded px-3 py-1 ">
        Delete
      </button>
    </div>
  );
}

export default WorkListItem;
