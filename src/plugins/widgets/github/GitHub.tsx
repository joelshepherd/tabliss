import React, { FC, useEffect } from "react";
import GitHubCalendar from "github-calendar";
import { Props, defaultData } from "./types";

import "github-calendar/dist/github-calendar.css";
import "./github-calendar.css";

// TODO: Inherit size and colour

const GitHubCalendarWidget: FC<Props> = ({ data = defaultData, loader }) => {
  useEffect(() => {
    loader.push();
    GitHubCalendar(".GitHubCalendar", data.username, {
      responsive: false,
      global_stats: data.showSummary,
    }).finally(() => {
      loader.pop();
    });
  }, [data.username, data.showSummary]);

  return (
    <div className="GitHub">
      <a
        href={`https://github.com/${data.linkToUser ? data.username : ""}`}
        rel="noopener noreferrer"
        className="GitHubCalendar"
      />
    </div>
  );
};

export default GitHubCalendarWidget;
