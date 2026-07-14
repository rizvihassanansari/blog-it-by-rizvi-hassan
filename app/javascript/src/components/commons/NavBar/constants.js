import { Book, Edit, Folder } from "@bigbinary/neeto-icons";
import routes from "routes";

export const LINKS = [
  { to: routes.root, icon: Book },
  { to: routes.posts.create, icon: Edit },
  { to: routes.posts.myPosts, icon: Folder },
];
