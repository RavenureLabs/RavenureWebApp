import { Metadata } from "next";
import HomePageComponent from "../pages/home";

export const metadata: Metadata = {
  title: "Ravenure | Home Page",
  description: "Ravenure",
};


export default function Home() {
  return(
    <HomePageComponent />
  )
}
