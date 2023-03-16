import React, { useState } from "react";
import type { RootState, AppDispatch } from "../../../store";
import { useSelector, useDispatch } from "react-redux";

export default function Organization() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);

  return (
    <>
      <div>
        <h1>Organization</h1>
      </div>
    </>
  );
}
