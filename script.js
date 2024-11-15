const alertButton = document.getElementById("alertButton")
let alertaAtivo = false
const somAlerta = new Audio("sound/alarme.mp3")

function ativarAlerta() {
    somAlerta.loop = true
    somAlerta.play()
    alertaAtivo = true
    ligarLed()
    alertButton.src = "img/botao_ativo.jpg" // Altera a imagem para o estado ativo
}

function desativarAlerta() {
    somAlerta.pause()
    somAlerta.currentTime = 0
    alertaAtivo = false
    desligarLed()
    alertButton.src = "img/botao_inicial.png" // Retorna a imagem ao estado inativo
}

alertButton.addEventListener("mousedown", (event) => {
    event.preventDefault()
    if (!alertaAtivo) ativarAlerta()
})

alertButton.addEventListener("mouseup", (event) => {
    event.preventDefault()
    if (alertaAtivo) desativarAlerta()
})

alertButton.addEventListener("touchstart", (event) => {
    event.preventDefault()
    if (!alertaAtivo) ativarAlerta()
})

alertButton.addEventListener("touchend", (event) => {
    event.preventDefault()
    if (alertaAtivo) desativarAlerta()
})

async function inicializarLed() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" }
        })
        track = stream.getVideoTracks()[0]
        const capabilities = track.getCapabilities()
        if (!capabilities.torch) {
            console.log("LED não suportado no dispositivo.")
            return
        }
    } catch (error) {
        console.error(`Erro ao inicializar o LED: ${error}`)
    }
}

async function ligarLed() {
    if (track) {
        try {
            await track.applyConstraints({ advanced: [{ torch: true }] })
        } catch (error) {
            console.error(`Erro ao ligar o LED: ${error}`)
        }
    }
}

async function desligarLed() {
    if (track) {
        try {
            await track.applyConstraints({ advanced: [{ torch: false }] })
        } catch (error) {
            console.error(`Erro ao desligar o LED: ${error}`)
        }
    }
}

inicializarLed()
