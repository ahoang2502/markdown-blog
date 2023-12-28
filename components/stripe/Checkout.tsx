"use client";

import { usePathname } from "next/navigation";
import React, { ChangeEvent, useTransition } from "react";
import { loadStripe } from "@stripe/stripe-js";

import { Button } from "../ui/button";
import { LightningBoltIcon } from "@radix-ui/react-icons";
import { useUser } from "@/lib/store/user";
import LoginForm from "../nav/LoginForm";
import { checkout } from "@/lib/actions/stripe";
import { cn } from "@/lib/utils";

const Checkout = () => {
	const user = useUser((state) => state.user);

	const [isPending, startTransition] = useTransition();

	const pathname = usePathname();

	const handleCheckout = (e: ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();

		startTransition(async () => {
			const data = JSON.parse(
				await checkout(user?.email!, location.origin + pathname)
			);

			const stripe = await loadStripe(
				`${process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}`
			);
			await stripe?.redirectToCheckout({ sessionId: data.id });
		});
	};

	if (!user)
		return (
			<div className="flex items-center h-48 w-full justify-center gap-2">
				<LoginForm /> to read.
			</div>
		);

	return (
		<form
			className={cn("h-56 w-full flex items-center justify-center", {
				"animate-pulse": isPending,
			})}
			onSubmit={handleCheckout}
		>
			<Button className="bg-gradient-to-r from-blue-300 to-pink-400 flex flex-col py-10 px-6 gap-2 ring-2 hover:bg-gradient-to-r hover:from-blue-300/90 hover:to-pink-400/90">
				<h1 className="flex flex-row items-center gap-2 text-2xl font-bold text-black ">
					<LightningBoltIcon
						className={cn(
							"w-5 h-5 animate-bounce",
							!isPending ? "animate-bounce" : "animate-spin"
						)}
					/>
					Upgrade to Premium
				</h1>
				<p className="text-sm">Unblock all blog contents</p>
			</Button>
		</form>
	);
};

export default Checkout;
