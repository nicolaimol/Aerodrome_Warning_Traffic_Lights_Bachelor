package bachelor.met.awstl.service

import bachelor.met.awstl.dto.TerskelverdiDto
import bachelor.met.awstl.model.Terskelverdi
import bachelor.met.awstl.repo.ITerskelverdiRepo
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import java.util.Base64
import java.util.UUID

@Service
class TerskelverdiService(val repo: ITerskelverdiRepo) {

    val logger = LoggerFactory.getLogger(TerskelverdiService::class.java)

    fun addTerskelverdi(terskeDto: TerskelverdiDto): String {
        var random: String? = null

        while (random == null) {
            random = UUID.randomUUID().toString()
            if (repo.findById(random).isPresent) {
                random = null
            }
        }
        logger.info("New id: $random")
        val terskel = Terskelverdi(random, terskeDto)

        repo.save(terskel)

        return Base64.getEncoder().encodeToString(random.encodeToByteArray())

    }

    fun getTerskelverdi(base: String): TerskelverdiDto {

        val id = Base64.getDecoder().decode(base)

        val terskel = repo.findById(String(id))

        if (terskel.isPresent) {
            val entity = terskel.get()
            return TerskelverdiDto(entity)
        } else {
            logger.error("Trying to get for id: $id")
            throw Exception("No valid id")
        }

    }

    fun updateTerskelverdi(base: String, dto: TerskelverdiDto) {
        val id = Base64.getDecoder().decode(base)

        val prev = repo.findById(String(id))
        if (prev.isPresent) {
            val obj = prev.get()

            obj.update(dto)
            repo.save(obj)
            logger.info("$id is updated")
        }

        else {
            logger.error("$id is not found i db")
            throw Exception("Could not find")
        }
    }

    fun getAll(): List<Terskelverdi> {
        return repo.findAll()
    }
}


