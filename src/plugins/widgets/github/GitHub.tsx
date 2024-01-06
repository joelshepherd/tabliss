import React, { FC, useEffect } from "react";
import GitHubCalendar from 'react-github-calendar';
import { Props, defaultData } from "./types";

// TODO: Inherit size and colour

const GitHubCalendarWidget: FC<Props> = ({ data = defaultData, loader }) => {
  // useEffect(() => {
  //   loader.push();
  //   GitHubCalendar(".GitHubCalendar", data.username, {
  //     responsive: false,
  //     global_stats: data.showSummary,
  //   }).finally(() => {
  //     loader.pop();
  //   });
  // }, [data.username, data.showSummary]);

  return (
    <div className="GitHub">
      {/* <section
        // href={"https://github.com/" + data.username}
        // rel="noopener noreferrer"
        className="GitHubCalendar"
      /> */}
      <GitHubCalendar
        username={data.username}
      // colorScheme="dark"
      />
    </div>
  );
};

export default GitHubCalendarWidget;
