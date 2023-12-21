import React from "react";
import NavLinks from "./_components/NavLinks";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="space-y-5">
			<NavLinks />
			{children}
		</div>
	);
};

export default DashboardLayout;
