import { Edit, Folder, List } from "@bigbinary/neeto-icons";
import routes from "routes";

export const LINKS = [
  { to: routes.root, icon: List },
  { to: routes.posts.create, icon: Edit },
  { to: routes.posts.myPosts, icon: Folder },
];
