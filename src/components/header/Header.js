// router
import { Link as RouterLink } from "react-router-dom";

// UI
import { LoginIcon, LogoutIcon, UserAddIcon } from "@heroicons/react/outline";

// Icon
import { AppBar, Button, IconButton, Toolbar } from "@material-ui/core";

function Header() {
	// Button props
	const btnProps = (color, icon, to, component = RouterLink) => ({
		color,
		component,
		startIcon: icon,
		to,
	});

	return (
		<AppBar color="inherit" variant="outlined" position="relative">
			<Toolbar variant="dense">
				{/* Login state (If there is no a user) */}
				<div className="flex flex-1 items-center space-x-2">
					<Button {...btnProps("primary", <LoginIcon className="h-6" />, "/signin")}>
						<span className="text-gray-600">Login</span>
					</Button>
					<Button {...btnProps("primary", <UserAddIcon className="h-5" />, "/register")}>
						<span className="text-gray-600">Register</span>
					</Button>
				</div>

				{/* logout state (If there is a user) */}
				{/* <div className="flex flex-1 items-center justify-between">
					<h3 className="font-semibold">Sajid Sulaiman</h3>
					<IconButton color="secondary">
						<LogoutIcon className="h-6" />
					</IconButton>
				</div> */}
			</Toolbar>
		</AppBar>
	);
}

export default Header;
