import React, { useState, useEffect } from "react";
import "./Weather.scss";
import Current from "./Current.jsx";
import Minutely from "./Minutely.jsx";
import Hourly from "./Hourly.jsx";
import EightDay from "./EightDay.jsx";
import {
  selectIsAuthenticated,
  selectLoading,
} from "../../../Redux/adminSlice";

import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Weather = () => {
  const dispatch = useDispatch();
  const [layout, toggleLayout] = useState('current');
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectLoading);

  if (!isAuthenticated && !loading) {
    return <Navigate to="/admin-login" />;
  }

  return (
    <div className="Weather">
      <div className="Nav">
        <div className="Btn" onClick={() => toggleLayout('current')}>
          Current
        </div>
        <div className="Btn" onClick={() => toggleLayout('minute')}>
          Minute
        </div>
        <div className="Btn" onClick={() => toggleLayout('hourly')}>
          Hourly
        </div>
        <div className="Btn" onClick={() => toggleLayout('day')}>
          7 Day
        </div>
      </div>
      {layout === 'current' && <Current />}
      {layout === 'minute' && <Minutely />}
      {layout === 'hourly' && <Hourly />}
      {layout === 'day' && <EightDay />}
    </div>
  );
};

export default Weather;
