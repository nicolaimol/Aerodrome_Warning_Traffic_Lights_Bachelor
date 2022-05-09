export const crosswind = (rwy: string, windDirection: number, windSpeed: number): number => {

    if (rwy.split(",").length > 1){

        return Math.max(...rwy.split(",").map((it: any) => {
            return crosswind(it, windDirection, windSpeed)
        }))
        /*return Math.min(
            crosswind(rwy.split(",")[0], windDirection, windSpeed),
            crosswind(rwy.split(",")[1], windDirection, windSpeed)
        )*/
    } else {
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
}