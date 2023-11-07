import Link, { LinkProps } from "next/link";

function CustomLink({
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps) {
  return <Link {...props}>{children}</Link>;
}
export default CustomLink;
