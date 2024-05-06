import React, { useState, useEffect } from "react";
import "./Weather.scss";
import Daily from "./Daily.jsx";
import Forecast from "./Forecast.jsx";
import Hourly from "./Hourly.jsx";
import Minutely from "./Minutely.jsx";
import EightDay from "./EightDay.jsx";
import {
  selectIsAuthenticated,
  selectLoading,
} from "../../../Redux/adminSlice";
import { getOneCallWeather } from "../../../Redux/weatherSlice";

import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Weather = () => {
  const dispatch = useDispatch();
  const [layout, toggleLayout] = useState();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(getOneCallWeather());
  }, []);

  if (!isAuthenticated && !loading) {
    return <Navigate to="/admin-login" />;
  }

  return (
    <div className="Weather">
      <div className="Nav">
        <div className="Btn" onClick={() => toggleLayout(0)}>
          Daily
        </div>
        <div className="Btn" onClick={() => toggleLayout(1)}>
          5 Day
        </div>
        <div className="Btn" onClick={() => toggleLayout(4)}>
          8 Day
        </div>
        <div className="Btn" onClick={() => toggleLayout(2)}>
          Hourly
        </div>
        <div className="Btn" onClick={() => toggleLayout(3)}>
          Minutely
        </div>
      </div>
      {layout === 0 && <Daily />}
      {layout === 1 && <Forecast />}
      {layout === 2 && <Hourly />}
      {layout === 3 && <Minutely />}
      {layout === 4 && <EightDay />}
    </div>
  );
};

export default Weather;
