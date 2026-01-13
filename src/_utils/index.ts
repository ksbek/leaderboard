export const groupBy = (items: any, key: string) =>
    items.reduce(
        (result: any, item: any) => ({
            ...result,
            [item[key]]: [...(result[item[key]] || []), item]
        }),
        {}
    )

export const convertTimestamp = (timestamp: string | number | Date) => {
    // Create a new Date object using the provided timestamp
    const date = new Date(timestamp)

    // Extract date components
    const day = date.getUTCDate()
    const month = date.getUTCMonth() + 1 // Months are zero-based
    const year = date.getUTCFullYear()

    // Format the date as DD.MM.YYYY
    const formattedDate = `${day < 10 ? '0' : ''}${day}.${month < 10 ? '0' : ''
        }${month}.${year}`

    return formattedDate
}

export const secondsToDhms = (seconds: number) => {
    seconds = Number(seconds)
    const d = Math.floor(seconds / (3600 * 24))
    const h = Math.floor((seconds % (3600 * 24)) / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = Math.floor(seconds % 60)

    const dDisplay = d > 0 ? d + '<span>d&nbsp</span>' : ''
    const hDisplay = h > 0 ? h + '<span>h&nbsp</span>' : ''
    const mDisplay = m > 0 ? m + '<span>m&nbsp</span>' : ''
    const sDisplay = s > 0 ? s + '<span>s&nbsp</span>' : ''
    return dDisplay + hDisplay + mDisplay + sDisplay
}
