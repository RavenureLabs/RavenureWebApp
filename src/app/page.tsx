import { Metadata } from "next";
import HomePageComponent from "../components/pages/home.page";

export const metadata: Metadata = {
  title: "Ravenure | Home Page",
  description: "Ravenure",
};


export default function Home() {
  return(
    <HomePageComponent />
  )
}
