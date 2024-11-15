// Seleciona o botão de imagem pelo ID
const panicButton = document.getElementById('panicButton')

// Carrega o som do alarme
const alarmSound = new Audio('alarme.mp3')

// Variável para o controle da lanterna
let track = null

// Função para ativar o alarme e o LED
async function activateAlarm() {
    // Reproduz o som do alarme
    alarmSound.play()

    // Troca a imagem para indicar que o alarme está ativo
    panicButton.src = 'botao_ativo.jpg'

    try {
        // Solicita o acesso à câmera
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        
        // Obtém a primeira trilha de vídeo da câmera
        track = stream.getVideoTracks()[0]
        
        // Cria um objeto ImageCapture para controlar o LED
        const capabilities = track.getCapabilities()
        if (capabilities.torch) {
            // Ativa a lanterna
            track.applyConstraints({ advanced: [{ torch: true }] })
        }
    } catch (error) {
        console.error("Erro ao tentar ativar a lanterna:", error)
    }
}

// Função para desativar o alarme e o LED
function deactivateAlarm() {
    // Pausa e reinicia o som do alarme
    alarmSound.pause()
    alarmSound.currentTime = 0

    // Restaura a imagem original do botão
    panicButton.src = 'botao_inicial.png'

    // Desativa o LED e para o uso da câmera, caso tenha sido ativado
    if (track) {
        track.stop() // Desliga a câmera e o LED
        track = null // Limpa a variável de controle do LED
    }
}

// Eventos para desktop e mobile
panicButton.addEventListener('mousedown', activateAlarm)
panicButton.addEventListener('mouseup', deactivateAlarm)
panicButton.addEventListener('touchstart', activateAlarm)
panicButton.addEventListener('touchend', deactivateAlarm)
