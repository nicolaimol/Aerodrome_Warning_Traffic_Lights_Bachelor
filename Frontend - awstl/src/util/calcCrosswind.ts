export const crosswind = (rwy: string, windDirection: number, windSpeed: number) => {

    const windDir = windDirection > 0 ?
        windDirection :
        360 + windDirection

    const rwyDiff1 = Math.abs(10*Number(rwy?.split("/")[0]) - windDir)
    const rwyDiff2 = Math.abs(10*Number(rwy?.split("/")[1]) - windDir)

    const cw = windSpeed * Math.sin
    (   (Math.min(
        rwyDiff1 ,
        rwyDiff2
    ) / 360) * 2 * Math.PI
    )

    return cw

}