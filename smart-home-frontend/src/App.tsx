import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:4000')

interface EstadoDispositivos {
  salaDeEstar: {
    luzes: boolean
    tv: { 
      ligada: boolean 
      canal: number 
    }
    arCondicionado: { 
      ligado: boolean 
      temperatura: number 
    }
  }
  cozinha: {
    luzes: boolean
    geladeira: { 
      temperatura: number 
      alerta: boolean 
    }
    fogao: { 
      ligado: boolean 
      potencia: number 
    }
  }
  quarto: {
    luzes: boolean
    ventilador: { 
      ligado: boolean 
      velocidade: number 
    }
    cortinas: string
  }
}

export const App: React.FC = () => {
  const [dispositivos, setDispositivos] = useState<EstadoDispositivos | null>(null)

  useEffect(() => {
    // Recebe o estado inicial dos dispositivos ao conectar
    socket.on('estadoInicial', (estadoInicial: EstadoDispositivos) => {
      setDispositivos(estadoInicial)
    });

    // Atualiza o estado dos dispositivos quando houver uma mudança
    socket.on('atualizarEstado', (novoEstado: EstadoDispositivos) => {
      setDispositivos(novoEstado)
    });

    return () => {
      socket.off('estadoInicial')
      socket.off('atualizarEstado')
    }
  }, [])

  const alternarLuz = (comodo: keyof EstadoDispositivos) => {
    if (dispositivos) {
      const dispositivosAtualizados = {
        ...dispositivos,
        [comodo]: { ...dispositivos[comodo], luzes: !dispositivos[comodo].luzes },
      }
      setDispositivos(dispositivosAtualizados)
      socket.emit('mudancaEstadoDispositivo', dispositivosAtualizados)
    }
  }

  return dispositivos ? (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="grid grid-cols-3 gap-4 p-2 bg-white shadow-lg">
        {/* Sala */}
        <div className="bg-gray-200 p-5 relative">
          <h2 className="text-xl font-bold mb-2">Sala de Estar</h2>
          <p>Luzes: {dispositivos.salaDeEstar.luzes ? 'Ligadas' : 'Desligadas'}</p>
          <button
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => alternarLuz('salaDeEstar')}
          >
            Alternar Luzes
          </button>
        </div>

        {/* Cozinha */}
        <div className="bg-gray-200 p-5 rounded-lg relative">
          <h2 className="text-xl font-bold mb-2">Cozinha</h2>
          <p>Luzes: {dispositivos.cozinha.luzes ? 'Ligadas' : 'Desligadas'}</p>
          <button
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => alternarLuz('cozinha')}
          >
            Alternar Luzes
          </button>
        </div>

        {/* Quarto */}
        <div className="bg-gray-200 p-5 rounded-lg relative">
          <h2 className="text-xl font-bold mb-2">Quarto</h2>
          <p>Luzes: {dispositivos.quarto.luzes ? 'Ligadas' : 'Desligadas'}</p>
          <button
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => alternarLuz('quarto')}
          >
            Alternar Luzes
          </button>
        </div>
      </div>
    </div>
  ) : (
    <p className="text-center text-xl font-bold">Carregando...</p>
  )
}