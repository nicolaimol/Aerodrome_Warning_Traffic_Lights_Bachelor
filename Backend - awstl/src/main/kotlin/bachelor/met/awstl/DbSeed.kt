package bachelor.met.awstl

import bachelor.met.awstl.repo.IFlyplassRepo
import javax.annotation.PostConstruct
import bachelor.met.awstl.model.Flyplass
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Component
import java.io.BufferedReader
import java.io.FileReader
import java.lang.Exception
import java.util.ArrayList

@Component
class DbSeed(private val repo: IFlyplassRepo) {
    var logger = LoggerFactory.getLogger(DbSeed::class.java)
    @PostConstruct
    fun run() {
        if (repo.count() > 0) return
        val list: MutableList<Flyplass> = ArrayList()
        var line: String? = ""
        var index = 0
        try {
            BufferedReader(FileReader("src/main/resources/static/flyplasser_norge_csv.csv")).use { reader ->
                while (reader.readLine().also { line = it } != null) {
                    if (index == 0) {
                        index++
                        continue
                    }
                    val item = line!!.split("[;]".toRegex()).toTypedArray()
                    val flyplass = Flyplass(
                        item[1],
                        item[0],
                        item[2],
                        item[3],
                        String.format("%.3f", item[6].split("[,]".toRegex()).toTypedArray()[0].toDouble())
                            .replace(",", "."),
                        String.format(
                            "%.3f",
                            item[6].split("[,]".toRegex()).toTypedArray()[1].trim { it <= ' ' }.toDouble()
                        ).replace(",", "."),
                        item[5]
                    )
                    list.add(flyplass)
                    logger.info(flyplass.toString())

                }
            }
        } catch (e: Exception) {
            e.printStackTrace()
            logger.error(e.message)
            logger.error("FATAL ERROR IN DbSeed")
            list.clear()
        }

        //repo.saveAll(list);
    }
}
