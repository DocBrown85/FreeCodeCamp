import math

def add_time(start, duration, startingDayOfWeek=None):
    daysOfWeek = ("sunday", "monday", "tuesday", "wednesday", "thrusday", "friday", "saturday")
    secondsForMinute = 60
    secondsForHour = secondsForMinute * 60
    secondsForDay = secondsForHour * 24

    startTime, startMeridien = start.split(" ")

    startHours, startMinutes = startTime.split(":")
    startInSeconds = int(startHours) * secondsForHour + int(startMinutes) * secondsForMinute

    durationHours, durationMinutes = duration.split(":")
    durationInSeconds = int(durationHours) * secondsForHour + int(durationMinutes) * secondsForMinute
    
    endInSeconds = startInSeconds + durationInSeconds
    elapsedHours = endInSeconds / secondsForHour

    endMinutes, endSeconds = divmod(endInSeconds, 60)
    endHours, endMinutes = divmod(endMinutes, 60)
    endHours %= 12
    if endHours == 0:
      endHours = 12

    if startMeridien == "AM":
      elapsedPeriods = 0
    else:
      elapsedPeriods = 1

    elapsedPeriods += math.floor(elapsedHours / 12)
    if elapsedPeriods % 2 == 0:
      endMeridien = "AM"
    else:
      endMeridien = "PM"

    elapsedDays = elapsedPeriods / 2
    if (elapsedDays >= 0 and elapsedDays < 1):
      durationDescription = ""
    elif (elapsedDays >= 1 and elapsedDays < 2):
      durationDescription = " (next day)"
    else:
      durationDescription = " ({} days later)".format(math.ceil(elapsedDays))

    if startingDayOfWeek:
      endingDayOfWeek = daysOfWeek[(daysOfWeek.index(startingDayOfWeek.lower()) + math.floor(elapsedDays)) % 7]
      endingDayOfWeekDescription = ", " + endingDayOfWeek.capitalize()
    else:
      endingDayOfWeekDescription = ""

    endTime = str(endHours) + ":" + str(endMinutes).rjust(2, "0") + " " + endMeridien + endingDayOfWeekDescription + durationDescription

    return endTime