"use client";

import Link from "next/link";
import React from "react";

import LoginForm from "./LoginForm";
import { useUser } from "@/lib/store/user";
import ProfileButton from "./ProfileButton";

const Navbar = () => {
	const user = useUser((state) => state.user);

	return (
		<nav className=" flex items-center justify-between">
			<div className="group ">
				<Link href="/" className="text-2xl font-bold">
					DailyBlog
				</Link>
				<div className="h-1 w-0 group-hover:w-full transition-all bg-lime-500" />
			</div>

			{user ? <ProfileButton /> : <LoginForm />}
		</nav>
	);
};

export default Navbar;
