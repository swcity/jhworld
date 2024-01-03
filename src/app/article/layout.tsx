import { Control } from "./Control";

export default function Layout({ children }: any) {
  return (
    <>
      {children}
      <Control />
    </>
  );
}
