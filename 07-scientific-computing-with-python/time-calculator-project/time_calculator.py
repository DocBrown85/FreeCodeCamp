import math


class TimeAdder:

    _DAYS_OF_WEEK = (
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thrusday",
        "friday",
        "saturday",
    )
    _SECONDS_FOR_MINUTES = 60
    _SECONDS_FOR_HOUR = _SECONDS_FOR_MINUTES * 60
    _SECONDS_FOR_DAY = _SECONDS_FOR_HOUR * 24

    def __init__(self, startTimeLabel, startDayOfWeek=None):
        startTime, startTimeMeridien = startTimeLabel.split(" ")
        self._startTimeInSeconds = self._getSecondsFromTime(startTime)
        self._startTimeMeridien = startTimeMeridien
        self._startDayOfWeek = startDayOfWeek

    def add(self, duration):
        durationInSeconds = self._getSecondsFromTime(duration)
        endTimeInSeconds = self._startTimeInSeconds + durationInSeconds

        endTimeHours, endTimeMinutes = self._getTimeFromSeconds(endTimeInSeconds)

        elapsedMeridienPeriods = self._getElapsedMeridienPeriods(endTimeInSeconds)

        endTimeMeridien = self._getEndTimeMeridien(elapsedMeridienPeriods)

        elapsedTimeLabel = self._getElapsedTimeLabel(elapsedMeridienPeriods)

        if not self._startDayOfWeek:
            endDayOfWeek = ""
        else:
            endDayOfWeek = self._getEndDayOfWeek(elapsedMeridienPeriods)

        endTimeLabel = self._formatEndTimeLabel(
            endTimeHours,
            endTimeMinutes,
            endTimeMeridien,
            endDayOfWeek,
            elapsedTimeLabel,
        )

        return endTimeLabel

    def _getSecondsFromTime(self, time):
        hours, minutes = time.split(":")
        timeInSeconds = (
            int(hours) * self._SECONDS_FOR_HOUR
            + int(minutes) * self._SECONDS_FOR_MINUTES
        )

        return timeInSeconds

    def _getTimeFromSeconds(self, seconds):
        minutes, seconds = divmod(seconds, 60)
        hours, minutes = divmod(minutes, 60)
        hours %= 12
        if hours == 0:
            hours = 12

        return hours, minutes

    def _getElapsedMeridienPeriods(self, endTimeInseconds):
        elapsedHours = endTimeInseconds / self._SECONDS_FOR_HOUR
        if self._startTimeMeridien == "AM":
            elapsedMeridienPeriods = 0
        else:
            elapsedMeridienPeriods = 1

        elapsedMeridienPeriods += math.floor(elapsedHours / 12)

        return elapsedMeridienPeriods

    def _getEndTimeMeridien(self, elapsedMeridienPeriods):
        if elapsedMeridienPeriods % 2 == 0:
            endTimeMeridien = "AM"
        else:
            endTimeMeridien = "PM"

        return endTimeMeridien

    def _getElapsedTimeLabel(self, elapsedMeridienPeriods):
        elapsedDays = elapsedMeridienPeriods / 2
        if elapsedDays >= 0 and elapsedDays < 1:
            elapsedTimeLabel = ""
        elif elapsedDays >= 1 and elapsedDays < 2:
            elapsedTimeLabel = "(next day)"
        else:
            elapsedTimeLabel = "({} days later)".format(math.ceil(elapsedDays))

        return elapsedTimeLabel

    def _getEndDayOfWeek(self, elapsedMeridienPeriods):
        elapsedDays = elapsedMeridienPeriods / 2
        endDayOfWeek = self._DAYS_OF_WEEK[
            (
                self._DAYS_OF_WEEK.index(self._startDayOfWeek.lower())
                + math.floor(elapsedDays)
            )
            % 7
        ]

        return endDayOfWeek.capitalize()

    def _formatEndTimeLabel(
        self,
        endTimeHours,
        endTimeMinutes,
        endTimeMeridien,
        endDayOfWeek,
        elapsedTimeLabel,
    ):

        endTimeMinutes = str(endTimeMinutes).rjust(2, "0")

        if endDayOfWeek != "":
            endDayOfWeek = ", " + endDayOfWeek

        if elapsedTimeLabel != "":
            elapsedTimeLabel = " " + elapsedTimeLabel

        endTimeLabel = "{}:{} {}{}{}".format(
            endTimeHours,
            endTimeMinutes,
            endTimeMeridien,
            endDayOfWeek,
            elapsedTimeLabel,
        )

        return endTimeLabel


def add_time(start, duration, startDayOfWeek=None):
    timeAdder = TimeAdder(start, startDayOfWeek=startDayOfWeek)
    return timeAdder.add(duration)
