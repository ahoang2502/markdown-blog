import {
	DiscordLogoIcon,
	GitHubLogoIcon,
	LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import React from "react";

const Footer = () => {
	return (
		<footer className="border-t py-10">
			<div className="max-w-7xl py-10 px-5 md:p-0 space-y-5 mx-auto flex justify-between md:items-end flex-col md:flex-row">
				<div className="space-y-10">
					<div className="space-y-2 w-full sm:w-96">
						<h1 className="text-3xl font-bold ">DailyBlog</h1>
						<p>
							Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi
							corrupti consequatur dolores, fugit pariatur ad vero mollitia
							reiciendis laboriosam in?
						</p>
					</div>

					<div className="flex items-center gap-2 ">
						<GitHubLogoIcon className="h-5 w-5" />
						<LinkedInLogoIcon className="h-5 w-5" />
						<DiscordLogoIcon className="h-5 w-5" />
					</div>
				</div>

				<h1>&copy: 2023 Fishta-oh. All rights reserved.</h1>
			</div>
		</footer>
	);
};

export default Footer;
