import { createBrowserRouter } from "react-router";
import RootLayout, { AuthGuard } from "./layouts/RootLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Notes from "./pages/Notes";
import Databases from "./pages/Databases";
import Wiki from "./pages/Wiki";
import Settings from "./pages/Settings";
import Inbox from "./pages/Inbox";
import Favorites from "./pages/Favorites";
import Recent from "./pages/Recent";
import Tags from "./pages/Tags";
import Trash from "./pages/Trash";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Changelog from "./pages/Changelog";
import Docs from "./pages/Docs";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Roadmap from "./pages/Roadmap";
import Status from "./pages/Status";
import ApiReference from "./pages/ApiReference";
import Templates from "./pages/Templates";
import Community from "./pages/Community";
import Blog from "./pages/Blog";
import Careers from "./pages/Careers";
import PressKit from "./pages/PressKit";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import CookiePolicy from "./pages/CookiePolicy";
import Security from "./pages/Security";
import Developer from "./pages/Developer";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Landing },
      { path: "login", Component: Login },
      { path: "signup", Component: Signup },
      { path: "features", Component: Features },
      { path: "pricing", Component: Pricing },
      { path: "changelog", Component: Changelog },
      { path: "docs", Component: Docs },
      { path: "about", Component: About },
      { path: "developer", Component: Developer },
      { path: "roadmap", Component: Roadmap },
      { path: "status", Component: Status },
      { path: "api-reference", Component: ApiReference },
      { path: "templates", Component: Templates },
      { path: "community", Component: Community },
      { path: "blog", Component: Blog },
      { path: "careers", Component: Careers },
      { path: "press-kit", Component: PressKit },
      { path: "privacy", Component: Privacy },
      { path: "terms", Component: Terms },
      { path: "cookie-policy", Component: CookiePolicy },
      { path: "security", Component: Security },
      {
        path: "dashboard",
        element: <AuthGuard><DashboardLayout /></AuthGuard>,
        children: [
          { index: true, Component: Dashboard },
          { path: "notes", Component: Notes },
          { path: "databases", Component: Databases },
          { path: "wiki", Component: Wiki },
          { path: "inbox", Component: Inbox },
          { path: "favorites", Component: Favorites },
          { path: "recent", Component: Recent },
          { path: "tags", Component: Tags },
          { path: "trash", Component: Trash },
          { path: "settings", Component: Settings },
        ],
      },
      { path: "*", Component: NotFound },
    ],
  },
]);
