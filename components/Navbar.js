import Link from "next/link";
import React from "react";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <Link href={"/races"}>Races</Link>
        </li>
        <li>
          <Link href={"/faq"}>FAQ</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
