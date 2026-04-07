import { FaBook, FaLayerGroup, FaBookOpen, FaInbox, FaShoppingCart, FaUser } from "react-icons/fa";

export const dashboardItems = [
  {
    iconColor: "#E66239",
    bgColor: "#FCEFEB",
    icon: <FaBook />,
    text: "Total Books",
    name: "Total Books",
    number: 0,
    trend: "Unique titles in library",
  },
  {
    iconColor: "#00C951",
    bgColor: "#E5F9ED",
    icon: <FaLayerGroup />,
    text: "Books Quantity",
    name: "Books Quantity",
    number: 0,
    trend: "Total copies across all books",
  },
  {
    iconColor: "#00B8DB",
    bgColor: "#E5F8FB",
    icon: <FaBookOpen />,
    text: "Books Issued",
    name: "Books Issued",
    number: 0,
    trend: "Currently with members",
  },
  {
    iconColor: "#F0B100",
    bgColor: "#FDF7E5",
    icon: <FaInbox />,
    text: "Books Requested",
    name: "Books Requested",
    number: 0,
    trend: "Pending member requests",
  },
  {
    iconColor: "#8B5CF6",
    bgColor: "#F3EFFE",
    icon: <FaShoppingCart />,
    text: "Books Purchased",
    name: "Books Purchased",
    number: 0,
    trend: "Completed purchases",
  },
  {
    iconColor: "#8B5CF6",
    bgColor: "#F3EFFE",
    icon: <FaUser />,
    text: "Total Users",
    name: "Total Users",
    number: 0,
    trend: "Users Available",
  }
];

export const BookItems = [
 {
    iconColor: "#E66239",
    bgColor: "#FCEFEB",
    icon: <FaBook />,
    text: "Total Books",
    name: "Total Books",
    number: 0,
    trend: "Unique titles in library",
  },
  {
    iconColor: "#00C951",
    bgColor: "#E5F9ED",
    icon: <FaLayerGroup />,
    text: "Books Quantity",
    name: "Books Quantity",
    number: 0,
    trend: "Total copies across all books",
  }
]

export const BookIssuedItems = [
  {
    iconColor: "#00B8DB",
    bgColor: "#E5F8FB",
    icon: <FaBookOpen />,
    text: "Books Issued",
    name: "Books Issued",
    number: 0,
    trend: "Currently with members",
  },
  {
    iconColor: "#F0B100",
    bgColor: "#FDF7E5",
    icon: <FaInbox />,
    text: "Books Requested",
    name: "Books Requested",
    number: 0,
    trend: "Pending member requests",
  }
] 

export const BookRequestedItems = [
  {
    iconColor: "#F0B100",
    bgColor: "#FDF7E5",
    icon: <FaInbox />,
    text: "Books Requested",
    name: "Books Requested",
    number: 0,
    trend: "Pending member requests",
  }
]

export const BookPurchasedItems = [
 {
    iconColor: "#8B5CF6",
    bgColor: "#F3EFFE",
    icon: <FaShoppingCart />,
    text: "Books Purchased",
    name: "Books Purchased",
    number: 0,
    trend: "Completed purchases",
  }
]


export const UsersItems = [
 {
    iconColor: "#8B5CF6",
    bgColor: "#F3EFFE",
    icon: <FaUser />,
    text: "Total Users",
    name: "Total Users",
    number: 0,
    trend: "Users Available",
  }
]