import { Route, Routes } from "react-router-dom";
import { SpaceText } from "../spaceText/SpaceText";

export const ApplicationViews = () => {

	return (
		<Routes>
			<Route path="/" element={ <SpaceText /> } />
		</Routes>
	)
}