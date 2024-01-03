import React from "react";
import Link from "next/link";
import { Button } from "@mui/material";

const Header = () => {
  return (
    <header className="left-0 top-0 w-full h-10 bg-yellow-100 fixed flex">
      <div className="w-11/12 h-full max-w-full mx-auto my-0 items-center justify-between flex ">
        <div>
          <Link href={"/"}>JSworld</Link>{" "}
        </div>
        <nav>
          <ul className="list-none flex">
            <Button>
              <Link href={"/stock"}>stock</Link>
            </Button>
            <Button>
              <Link href={"/expenses"}>expenses</Link>
            </Button>
            <Button>
              <Link href={"/article"}>article</Link>
            </Button>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
