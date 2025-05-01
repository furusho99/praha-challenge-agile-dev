import type { FC, ReactNode } from "react";

type HeadingProps = {
	children: ReactNode;
	as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
	size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl" | "9xl";
	center?: boolean;
};

export const Heading: FC<HeadingProps> = ({
	as: Heading = "h1",
	children,
	size = "3xl",
	center = false,
}) => {
	return <Heading className={
		`text-${size} ${center ? "text-center" : ""}`
	}>{children}</Heading>;
};
