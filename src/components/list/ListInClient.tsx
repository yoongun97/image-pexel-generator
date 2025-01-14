"use client";
import WorkListItem from "@/components/list/WorkListItem";
import { PATH } from "@/utils/constants";
import { WorkItem } from "@/utils/types";
import { useRouter } from "next/navigation";
import React from "react";

export default function WorkListInClient({
  worklist,
}: {
  worklist: WorkItem[];
}) {
  const router = useRouter();

  return (
    <div className="p-5">
      <div className="flex justify-between p-2">
        <button
          onClick={() => {
            router.push(PATH.HOME);
          }}
        >
          Home
        </button>
        <div className="flex gap-x-2">
          <p>total number :</p>
          <p>{worklist.length}</p>
        </div>
      </div>
      {/* 검색 */}
      <div className="flex justify-between items-center p-2 pr-[380px] border border-slate-400 rounded">
        <p>index</p>
        <p>name</p>
        <p>size</p>
        <p>colorNum</p>
        <p>date</p>
      </div>
      <div className="overflow-auto p-2 flex flex-col gap-y-2 border border-slate-400 rounded h-[calc(100vh-130px)]">
        {worklist.map((item) => {
          return (
            <div key={item.id}>
              <WorkListItem item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
