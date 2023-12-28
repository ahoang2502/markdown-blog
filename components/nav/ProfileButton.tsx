import Image from "next/image";
import React from "react";
import Link from "next/link";
import { createBrowserClient } from "@supabase/ssr";
import { DashboardIcon, LockClosedIcon } from "@radix-ui/react-icons";

import { useUser } from "@/lib/store/user";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import ManageBilling from "../stripe/ManageBilling";

const ProfileButton = () => {
	const user = useUser((state) => state.user);
	const setUser = useUser((state) => state.setUser);

	const supabase = createBrowserClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
	);

	const handleLogout = async () => {
		await supabase.auth.signOut();

		setUser(null);
	};

	const isAdmin = user?.role === "admin";
	const isSubscribed = user?.description_status;

	return (
		<Popover>
			<PopoverTrigger>
				<Image
					src={user?.image_url || ""}
					alt={user?.display_name || ""}
					width={50}
					height={50}
					className="rounded-full ring-2 ring-lime-500"
				/>
			</PopoverTrigger>

			<PopoverContent className="px-2 pt-4 pb-2 divide-y">
				<div className="px-4 text-sm mb-4">
					<p className="">{user?.display_name}</p>
					<p className="text-gray-500">{user?.email}</p>
				</div>

				{isAdmin && (
					<Link href="/dashboard" className="block">
						<Button
							variant="ghost"
							className="w-full flex items-center justify-between"
						>
							Dashboard
							<DashboardIcon />
						</Button>
					</Link>
				)}

				{isSubscribed && <ManageBilling />}

				<Button
					variant="ghost"
					className="w-full flex items-center justify-between"
					onClick={handleLogout}
				>
					Logout
					<LockClosedIcon />
				</Button>
			</PopoverContent>
		</Popover>
	);
};

export default ProfileButton;
