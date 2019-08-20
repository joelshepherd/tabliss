export const gameQuery = (date: string) => `query {
  schedule(date: "${date}") {
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
}`;
