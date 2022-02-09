package bachelor.met.awstl.model

import javax.persistence.Entity
import javax.persistence.Id


@Entity
class Input() {

    constructor(id: String, input1: String, input2: String, input3: String) : this() {
        this.id = id
        this.input1 = input1
        this.input2 = input2
        this.input3 = input3
    }

    @Id
    lateinit var id: String

    lateinit var input1: String
    lateinit var input2: String
    lateinit var input3: String



}
