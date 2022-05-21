import React from "react";
import Navbar from "./Navbar";
import styles from "../styles/Layout.module.css";
import { Container, Box } from "@chakra-ui/react";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container maxW={"100%"}>
        <Box paddingTop={"4em"}>{children}</Box>
      </Container>
    </>
  );
};

export default Layout;
