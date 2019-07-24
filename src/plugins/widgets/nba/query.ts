import { gql } from 'apollo-boost';

export const gameQuery = gql`query getSchedule($date: String!) {
  schedule(date: $date) {
    gameId
    clock
    isGameActivated
    startDateEastern
    startTimeUTC
    nugget
    period {
      current
      isEndOfPeriod
      isHalftime
      maxRegular
    }
    hTeam {
      triCode
      score
      win
      loss
      city
      fullName
      confName
      divName
      logo
    }
    vTeam {
      triCode
      score
      win
      loss
      city
      fullName
      confName
      divName
      logo
    }
  }
}`
