import {
  IconGauge,
  IconLock,
} from "@tabler/icons-react";
import { INavbarItem } from "../model/Navbar.model";

export const mockdata: INavbarItem[] = [
  { label: "Home", icon: IconGauge, link: "/home" },
  { label: "Tableros", icon: IconGauge, link: "/tableros" },
];

export const SingleNavbarItem: INavbarItem = {
  label: "Otros",
  icon: IconLock,
  links: [
    { label: "Enable 2FA", link: "/" },
    { label: "Change password", link: "/" },
    { label: "Recovery codes", link: "/" },
  ],
};
