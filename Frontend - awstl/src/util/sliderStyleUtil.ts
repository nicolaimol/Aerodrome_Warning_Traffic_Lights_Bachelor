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

function generateStyle(value: number, max: number, min: number, revers: boolean, disabled: boolean) {

    //const resten = revers ? partRevers : part

    const prosent = ((value - min)*100)/(max-min)

    let styles = null
    if (!revers) {

       styles = makeStyles((theme:any) => ({
            ...part,
            rail: {
                opacity: 0.6,
                background: `linear-gradient(to right, red, red ${prosent}%
                , green ${prosent}%, green);`
            }
        }));
    } else {
       styles = makeStyles((theme:any) => ({
            ...partRevers,
            rail: {
                opacity: 0.6,
                background: `linear-gradient(to right, green, green ${prosent}%
                , red ${prosent}%, red);`
            }
        }));
    }

    const classes = styles()

    return !disabled ? {} : {
        thumb: classes.thumb,
        rail: classes.rail,
        track: classes.track,
        valueLabel: classes.valueLabel,
        mark: classes.mark,
        markLabel: classes.markLabel
    }

}

function generateSimpleStyle(){
    const styles = makeStyles((theme:any) => ({
        thumb: {
            background: "#0090a8"
        },
        track: {
            background: "#0494ac",
            opacity: 1,
            border: "none"
        },
        rail: {
            opacity: 1,
            background: "#dff2f6"
        }
    }));

    const classes = styles()

    return {
        thumb: classes.thumb,
        rail: classes.rail,
        track: classes.track
    }

}

export { generateStyle, generateSimpleStyle }