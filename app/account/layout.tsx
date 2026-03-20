import AccountShell from "./account-shell";
import {Suspense} from "react";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense><AccountShell>{children}</AccountShell></Suspense>;
}

