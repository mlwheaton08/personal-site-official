import { Route, Routes } from "react-router-dom";
import { TextView } from "../textViews/TextView";
import { views } from "../functions/views.js"

export const ApplicationViews = () => {

	return (
		<Routes>
			<Route path="/" element={
				<TextView
					viewNum={views[0].viewNum}
					viewsCount={views.length}
					text={views[0].text}
					starCount={views[0].starCount}
				/> }
			/>
			<Route path="/2" element={
				<TextView
					viewNum={views[1].viewNum}
					viewsCount={views.length}
					text={views[1].text}
					starCount={views[1].starCount}
				/> }
			/>
			<Route path="/3" element={
				<TextView
					viewNum={views[2].viewNum}
					viewsCount={views.length}
					text={views[2].text}
					starCount={views[2].starCount}
				/> }
			/>
			<Route path="/4" element={
				<TextView
					viewNum={views[3].viewNum}
					viewsCount={views.length}
					text={views[3].text}
					starCount={views[3].starCount}
				/> }
			/>
			<Route path="/5" element={
				<TextView
					viewNum={views[4].viewNum}
					viewsCount={views.length}
					text={views[4].text}
					starCount={views[4].starCount}
				/> }
			/>
		</Routes>
	)
}