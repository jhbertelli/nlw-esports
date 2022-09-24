// 18:00 -> split: ["10", "80"] -> map: [10, 80]

export function hourStrToMinute(hourString: string) {
    const [hours, minutes] = hourString.split(':').map(Number)
    const totalMinutes = (hours * 60) + minutes

    return totalMinutes
}