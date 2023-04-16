import { Route, Routes } from "react-router-dom";
import { ApplicationViews } from "./views/ApplicationViews";

export const PersonalWebiste = () => {
  return (
    <Routes>

      <Route
        path="*"
        element={
          <ApplicationViews />
        }
      />
    </Routes>
  );
};
