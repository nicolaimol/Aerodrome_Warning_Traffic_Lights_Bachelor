import { makeStyles } from "@material-ui/styles";

const part = {
    thumb: {
        background: "red",
        "&~&": {
            background: "green"
        }
    },
    mark: {
        background: "#0494ac"
    },
    markLabel: {
        color: "#0090a8"
    },
    track: {
        background: "yellow",
        opacity: 1,
        border: "none"
    },

    valueLabel: {
        background: "#0494ac",
        width: "10px",
        height: "20px",
        borderRadius: '50%'
    }
}

const partRevers = {
    thumb: {
        background: "green",
        "&~&": {
            background: "red"
        }
    },
    mark: {
        background: "#0494ac",
    },
    markLabel: {
        color: "#0090a8"
    },
    track: {
        background: "yellow",
        border: "none"
    },
    valueLabel: {
        background: "#0494ac",
        width: "10px",
        height: "20px",
        borderRadius: '50%'
    }
}


export function generateStyle(value: number, max: number, min: number, revers: boolean) {

    const now = Date.now()

    const resten = revers ? partRevers : part
    let styles = null
    if (!revers) {
       styles = makeStyles((theme:any) => ({
            ...resten,
            rail: {
                opacity: 0.6,
                background: `linear-gradient(to right, red, red ${((value + (min < 0 ? - min : 0))*100)/(max-min)}%, green ${((value + (min < 0 ? - min : 0))*100)/(max-min)}%, green);`
            }
        }));
    } else {
       styles = makeStyles((theme:any) => ({
            ...resten,
            rail: {
                opacity: 0.6,
                background: `linear-gradient(to right, green, green ${((value + (min < 0 ? - min : 0))*100)/(max-min)}%, red ${((value + (min < 0 ? - min : 0))*100)/(max-min)}%, red);`
            }
        }));
    }



    const classes = styles()

    const diff = Date.now() - now
    console.log("Diff:", diff)
    return {
        thumb: classes.thumb,
        rail: classes.rail,
        track: classes.track,
        valueLabel: classes.valueLabel,
        mark: classes.mark,
        markLabel: classes.markLabel
    }

}