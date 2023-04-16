import { Route, Routes } from "react-router-dom";
import { View1 } from "../textViews/View1";
import { View2 } from "../textViews/View2";
import { View3 } from "../textViews/View3";

export const ApplicationViews = () => {

	return (
		<Routes>
			<Route path="1" element={ <View1 /> } />
			<Route path="2" element={ <View2 /> } />
			<Route path="3" element={ <View3 /> } />
		</Routes>
	)
}