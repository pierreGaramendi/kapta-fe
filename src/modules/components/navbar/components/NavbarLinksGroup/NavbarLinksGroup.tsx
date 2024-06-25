import { useState } from "react";
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  UnstyledButton,
  rem,
} from "@mantine/core";
import classes from "./NavbarLinksGroup.module.css";
import { IconChevronRight } from "@tabler/icons-react";
import { INavbarItem } from "../../model/Navbar.model";
import { NavLink, useNavigate } from "react-router-dom";

export function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  links,
  link = "/",
}: INavbarItem) {
  const navigate = useNavigate();
  const hasSubLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const evaluateNavbarItem = () => {
    if (hasSubLinks) {
      setOpened((o) => !o);
    } else {
      navigate(link);
    }
  };
  const composeSubItems = (hasSubLinks ? links : []).map((link) => (
    <NavLink key={link.label} to={link.link} className={classes.link}>
      <span>{link.label}</span>
    </NavLink>
  ));

  return (
    <>
      <UnstyledButton onClick={evaluateNavbarItem} className={classes.control}>
        <Group justify="space-between" gap={0}>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <ThemeIcon color="violet" size={30}>
              <Icon style={{ width: rem(18), height: rem(18) }} />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
          {hasSubLinks && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              style={{
                width: rem(16),
                height: rem(16),
                transform: opened ? "rotate(-90deg)" : "none",
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasSubLinks ? (
        <Collapse id="xxxxxxxxxxxx" in={opened}>
          {composeSubItems}
        </Collapse>
      ) : null}
    </>
  );
}
