package bachelor.met.awstl.service

import bachelor.met.awstl.dto.TerskelverdiDto
import bachelor.met.awstl.exception.TerskelverdiNotFoundException
import bachelor.met.awstl.model.Terskelverdi
import bachelor.met.awstl.repo.ITerskelverdiRepo
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import java.util.Base64
import java.util.UUID

@Service
class TerskelverdiService(val repo: ITerskelverdiRepo, val service: FlyplassService) {

    val logger: Logger = LoggerFactory.getLogger(TerskelverdiService::class.java)

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
        terskel.flyplass = service.getFlyplass(terskeDto.flyplass!!.icao)

        repo.save(terskel)

        return Base64.getEncoder().encodeToString(random.encodeToByteArray())

    }

    fun getTerskelverdi(base: String): TerskelverdiDto {

        val id = String(Base64.getDecoder().decode(base))

        logger.info("Trying to get for id: $id")
        val terskel = getTerskelById(id)

        return TerskelverdiDto(terskel)

    }

    fun updateTerskelverdi(base: String, dto: TerskelverdiDto) {
        val id = String(Base64.getDecoder().decode(base))

        val obj = getTerskelById(id)

        obj.update(dto)
        obj.flyplass = service.getFlyplass(dto.flyplass!!.icao)

        repo.save(obj)

        logger.info("$id is updated")

    }

    fun getAll(): List<Terskelverdi> {
        return repo.findAll()
    }

    private fun getTerskelById(id: String): Terskelverdi {
        return repo.findById(id).orElseThrow{ TerskelverdiNotFoundException("$id is not a valid id for terskelverdi") }

    }

    fun deleteById(id: String) {
        val teskel = getTerskelById(id)

        repo.delete(teskel)
    }
}


