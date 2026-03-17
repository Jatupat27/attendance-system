"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function PageContent() {
  const searchParams = useSearchParams();

  // ตัวอย่างการดึงค่า query เช่น ?id=123
  const id = searchParams.get("id");

  return (
    <div style={{ padding: "20px" }}>
      <h1>Home Page</h1>
      <p>Query ID: {id}</p>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
}