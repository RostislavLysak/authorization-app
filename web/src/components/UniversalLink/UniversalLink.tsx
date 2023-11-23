// // import { Link, type LinkProps } from "@mui/joy";
// import { Link as RouterLink } from "react-router-dom";
// import { Link, type LinkProps } from "@mui/joy";

// interface UniversalLinkProps extends LinkProps {
//   to: string;
//   children: string;
//   textColor?: string;
//   hoverUnderline?: "none" | "underline";
//   underlineColor?: string;
//   // variant?: 'outline' | 'plain' | 'solid' | 'soft'
// }

// const variantProp: any = {
//   outlined: {
//     backgroundColor:
//       "var(--joy-palette-neutral-outlinedBorder, var(--joy-palette-neutral-300, #CDD7E1))",
//     backgroundHover:
//       "var(--joy-palette-neutral-outlinedHoverBg, var(--joy-palette-neutral-100, #EAEEF6))",
//     backgroundActive:
//       "var(--joy-palette-neutral-outlinedBorder, var(--joy-palette-neutral-300, #CDD7E1))",
//     borderColor:
//       "var(--joy-palette-neutral-outlinedBorder, var(--joy-palette-neutral-300, #CDD7E1))",
//     borderRadius: "border-radius: var(--joy-radius-md)",
//     borderWidth: "var(--variant-borderWidth)",
//     borderStyle: "solid",
//   },
//   undefined: {
//     backgroundColor: "transparent",
//     backgroundHover: "transparent",
//     backgroundActive: "transparent",
//     borderColor: "transparent",
//     borderRadius: 0,
//     borderWidth: 0,
//     borderStyle: "none",
//   },
// };

// const UniversalLink = ({
//   sx,
//   to,
//   textColor = "text.primary",
//   variant,
//   underline = "none",
//   underlineColor = "rgba(var(--joy-palette-primary-mainChannel) / var(--Link-underlineOpacity, 0.72))",
//   children,
// }: UniversalLinkProps) => {
//   return (
//     <Link
//       variant={variant}
//       component={RouterLink}
//       to={to}
//       textColor={textColor}
//       underline={underline}
//       sx={{
//         borderRadius: variantProp[`${variant}`].borderRadius,
//         borderColor: variantProp[`${variant}`].borderColor,
//         borderWidth: variantProp[`${variant}`].borderWidth,
//         borderStyle: variantProp[`${variant}`].borderStyle,

//         // textDecoration: variantProp.textDecoration,
//         "&:hover": {
//           backgroundColor: variantProp[`${variant}`].backgroundHover,

//           textDecoration: underline === "hover" ? "underline" : "none",
//           textDecorationColor:
//             // "rgba(var(--joy-palette-neutral-mainChannel), var(--Link-underlineOpacity, 0.72))" ??
//             underlineColor,
//         },
//         "&:active": {
//           backgroundColor: variantProp[`${variant}`].backgroundActive,
//         },
//         ...sx,
//       }}
//     >
//       {children}
//     </Link>
//   );
// };

// export default UniversalLink;

// import { Link, type LinkProps } from "@mui/joy";
import { useMemo, forwardRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link, type LinkProps, buttonClasses } from "@mui/joy";

interface UniversalLinkProps extends LinkProps {
  href: string;
  textColor?: string;
  hoverUnderline?: "none" | "underline";
  underlineColor?: string;
  // variant?: 'outline' | 'plain' | 'solid' | 'soft'
}

const variantProp: any = {
  outlined: {
    backgroundColor:
      "var(--joy-palette-neutral-outlinedBorder, var(--joy-palette-neutral-300, #CDD7E1))",
    backgroundHover:
      "var(--joy-palette-neutral-outlinedHoverBg, var(--joy-palette-neutral-100, #EAEEF6))",
    backgroundActive:
      "var(--joy-palette-neutral-outlinedBorder, var(--joy-palette-neutral-300, #CDD7E1))",
    borderColor:
      "var(--joy-palette-neutral-outlinedBorder, var(--joy-palette-neutral-300, #CDD7E1))",
    borderRadius: "border-radius: var(--joy-radius-md)",
    borderWidth: "var(--variant-borderWidth)",
    borderStyle: "solid",
  },
  plain: {
    backgroundColor: "transparent",
    backgroundHover: "transparent",
    backgroundActive: "transparent",
    borderColor: "transparent",
    borderRadius: 0,
    borderWidth: 0,
    borderStyle: "none",
  },
};

const isLocal = (href: string) => {
  return href.startsWith("/");
};

const isExternal = (href: string) => {
  return href.indexOf("http://") == 0 || href.indexOf("https://") == 0;
};

const UniversalLink = (
  {
    // sx,
    href,
    // textColor = "text.primary",
    // variant = "plain",
    // underline = "none",
    // underlineColor = "rgba(var(--joy-palette-primary-mainChannel) / var(--Link-underlineOpacity, 0.72))",
    ...props
  }: UniversalLinkProps,
  ref: any,
) => {
  const _props = useMemo(() => {
    if (isExternal(href)) {
      return {
        href,
        target: "_blank",
      };
    }

    if (isLocal(href)) {
      return {
        component: RouterLink,
        to: href,
      };
    }

    return {
      href,
    };
  }, [href]);

  // const defaultSx = {
  //   borderRadius: variantProp[variant].borderRadius,
  //   borderColor: variantProp[variant].borderColor,
  //   borderWidth: variantProp[variant].borderWidth,
  //   borderStyle: variantProp[variant].borderStyle,

  //   // textDecoration: variantProp.textDecoration,
  //   "&:hover": {
  //     backgroundColor: variantProp[variant].backgroundHover,

  //     textDecoration: underline === "hover" ? "underline" : "none",
  //     textDecorationColor:
  //       // "rgba(var(--joy-palette-neutral-mainChannel), var(--Link-underlineOpacity, 0.72))" ??
  //       underlineColor,
  //   },
  //   "&:active": {
  //     backgroundColor: variantProp[variant].backgroundActive,
  //   },
  // };

  return (
    <Link
      ref={ref}
      {...props}
      {..._props}
      // variant={variant}
      // textColor={textColor}
      // underline={underline}
      // sx={Array.isArray(sx) ? [...sx, defaultSx] : [defaultSx, sx]}
    />
  );
};

export default forwardRef(UniversalLink);
