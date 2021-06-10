import React, { useContext, useState, useEffect } from "react";
import { auth } from "../back-ends/database";

const AuthedUserContext = React.createContext();

// custom hook to access the user
export function AuthedUser() {
	const context = useContext(AuthedUserContext);
	if (context === null || context === undefined)
		throw new Error("AuthedUser must be used within a AuthedUserProvider");

	return context;
}

export function AuthedUserProvider({ children }) {
	const [authUser, setAuthUser] = useState(null);

	useEffect(() => {
		auth.onAuthStateChanged((authedUser) => {
			if (authedUser) {
				const { displayName, email, uid, photoURL } = authedUser;
				const user = {
					fullName: displayName,
					email,
					id: uid,
					avatar: photoURL,
				};
				setAuthUser(user);
			} else {
				// if the user has logged out -> remove them
				setAuthUser("no user");
			}
		});
	}, []);

	if (authUser == null || authUser == undefined) return null;
	return <AuthedUserContext.Provider value={authUser}>{children}</AuthedUserContext.Provider>;
}
