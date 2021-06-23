// router
import { Link as RouterLink } from "react-router-dom";

// UI
import { AppBar, Avatar, Button, IconButton, makeStyles, Toolbar } from "@material-ui/core";

// Icon
import { LoginIcon, LogoutIcon, UserAddIcon } from "@heroicons/react/outline";

// Util
import IF from "../../common-components/util/IF";

// Contexts
import { AuthedUser } from "../../contexts/UserContext";

// Components
import Store from "../../back-ends/Store";

// Styles
const useStyles = makeStyles((theme) => ({
	userAvatar: {
		width: 32,
		height: 32,
	},
}));

function Header() {
	const classes = useStyles();
	const loggedUser = AuthedUser();

	// Import Store component to handle Logout
	const { handleSignOut } = Store();

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
				<IF condition={loggedUser == "no user"}>
					<div className="flex flex-1 items-center space-x-2">
						<Button {...btnProps("primary", <LoginIcon className="h-6" />, "/signin")}>
							<span className="text-gray-600">Login</span>
						</Button>
						<Button {...btnProps("primary", <UserAddIcon className="h-5" />, "/register")}>
							<span className="text-gray-600">Register</span>
						</Button>
					</div>
				</IF>

				{/* logout state (If there is a user) */}
				{loggedUser != "no user" && (
					<div className="flex flex-1 items-center justify-between">
						{/* User name and avatar */}
						<div className="flex items-center">
							<Avatar className={classes.userAvatar} src={loggedUser.avatar}>
								{loggedUser.fullName[0]}
							</Avatar>
							<h3 className="font-semibold ml-2">{loggedUser.fullName}</h3>
						</div>
						<IconButton color="secondary" onClick={handleSignOut}>
							<LogoutIcon className="h-6" />
						</IconButton>
					</div>
				)}
			</Toolbar>
		</AppBar>
	);
}

export default Header;
