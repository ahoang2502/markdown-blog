"use client";

import React from "react";
import { PersonIcon, ReaderIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";

const NavLinks = () => {
	const pathname = usePathname();

	const links = [
		{
			href: "/dashboard",
			text: "dashboard",
			Icon: ReaderIcon,
		},
		{
			href: "/dashboard/user",
			text: "user",
			Icon: PersonIcon,
		},
	];
	return (
		<div className="flex items-center gap-5 border-b pb-2">
			{links.map(({ href, text, Icon }, index) => (
				<Link
					href={href}
					key={index}
					className={cn("flex items-center gap-1 hover:underline transition", {
						"text-lime-500 underline": pathname === href,
					})}
				>
					<Icon />/{text}
				</Link>
			))}
		</div>
	);
};

export default NavLinks;
