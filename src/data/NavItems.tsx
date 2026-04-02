import { FaBook, FaHome, FaUser } from "react-icons/fa";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { MdLibraryBooks } from "react-icons/md";
import { CiLogin } from "react-icons/ci";
import { JSX } from "react";

interface ItemData {
  id:number,
  name: string;
  logo: JSX.Element;
  text: string;
  route: string;
}

export const mainNavItems:ItemData[] = [
  {
    id: 0,
    name: "Home",
    logo: <FaHome />,
    text: "Home",
    route: "/admin-home",
  },
  {
    id: 1,
    name: "Books",
    logo: <FaBook />,
    text: "Books",
    route: "/books",
  },
  {
    id: 2,
    name: "Purchase",
    logo: <BiSolidPurchaseTag />,
    text: "Purchase",
    route: "/purchase",
  },

  {
    id: 3,
    name: "BookRequests",
    logo: <MdOutlineLibraryAdd />,
    text: "Book Requests",
    route: "/book-requests",
  },
  {
    id: 4,
    name: "Issued Books",
    logo: <MdLibraryBooks />,
    text: "Issued Books",
    route: "/book-issue",
  },
  {
     id: 5,
    name: "Users",
    logo: <FaUser/>,
    text: "Users",
    route: "/user",
  }
];

export const AccountItems = [
  {
    id: 0,
    name: "Log In",
    logo: <CiLogin />,
    text: "Log In",
    route: "/",
  },
 
]
