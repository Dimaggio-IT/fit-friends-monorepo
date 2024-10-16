import { PropsWithChildren } from 'react';

function AthleteBoard({ children }: PropsWithChildren): JSX.Element {
  //  const userDailyCaloriesCount = user?.client?.caloryLosingPlanDaily ?? 0;
  //  const planForWeekCaloriesCount =
  //    userDailyCaloriesCount * DAYS_IN_A_WEEK ?? 0;
  return (
    <div className="personal-account-user">
      <div className="personal-account-user__schedule">
        <form action="#" method="get">
          <div className="personal-account-user__form">
            <div className="personal-account-user__input">
              <label>
                <span className="personal-account-user__label">
                  План на день, ккал
                </span>
                <input type="text" name="schedule-for-the-day" value="3 300" />
              </label>
            </div>
            <div className="personal-account-user__input">
              <label>
                <span className="personal-account-user__label">
                  План на неделю, ккал
                </span>
                <input
                  type="text"
                  name="schedule-for-the-week"
                  value="23 100"
                />
              </label>
            </div>
          </div>
        </form>
      </div>
      <div className="personal-account-user__additional-info">
        {children}
      </div>
    </div>
  );
}

export { AthleteBoard };
