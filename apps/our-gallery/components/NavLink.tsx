import React, { Children } from "react";
import { useRouter } from "next/router";
import cx from "classnames";
import Link, { LinkProps } from "next/link";

type NavLinkProps = React.PropsWithChildren<LinkProps> & {
  // eslint-disable-next-line react/require-default-props
  activeClassName?: string;
};

export const NavLink = ({ children, activeClassName = "active", ...props }: NavLinkProps) => {
  const { asPath } = useRouter();
  const child = Children.only(children) as React.ReactElement;
  const childClassName = child.props.className || "";

  const isActive = asPath === props.href || asPath === props.as;
  const pathName = `${asPath}`.split("/")[1];
  const activePath = pathName === "" ? "index" : pathName;

  const className = cx(childClassName, activePath, { [activeClassName]: isActive });

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <Link {...props} legacyBehavior>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  );
};
