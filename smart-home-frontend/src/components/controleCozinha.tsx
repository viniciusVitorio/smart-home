import { Socket } from 'socket.io-client';
import { EstadoDispositivos } from './plantaBaixa';

interface ControleCozinhaProps {
    dispositivos: EstadoDispositivos;
    setDispositivos: React.Dispatch<React.SetStateAction<EstadoDispositivos | null>>;
    socket: Socket;
}

export const ControleCozinha: React.FC<ControleCozinhaProps> = ({ dispositivos, setDispositivos, socket }) => {
    const alternarLuzCozinha = () => {
        const novoEstado = {
            ...dispositivos,
            cozinha: {
                ...dispositivos.cozinha,
                luzes: !dispositivos.cozinha.luzes,
            },
        };
        setDispositivos(novoEstado);
        socket.emit('mudancaEstadoDispositivo', novoEstado);
    };

    const ajustarTemperaturaGeladeira = (novaTemperatura: number) => {
        const novoEstado = {
            ...dispositivos,
            cozinha: {
                ...dispositivos.cozinha,
                geladeira: {
                    ...dispositivos.cozinha.geladeira,
                    temperatura: novaTemperatura,
                    alerta: novaTemperatura > 5, // Ativa o alerta se a temperatura for maior que 5, caso contrário desativa
                },
            },
        };
        setDispositivos(novoEstado);
        socket.emit('mudancaEstadoDispositivo', novoEstado);
    };
    

    const alternarFogao = () => {
        const novoEstado = {
            ...dispositivos,
            cozinha: {
                ...dispositivos.cozinha,
                fogao: {
                    ...dispositivos.cozinha.fogao,
                    ligado: !dispositivos.cozinha.fogao.ligado,
                },
            },
        };
        setDispositivos(novoEstado);
        socket.emit('mudancaEstadoDispositivo', novoEstado);
    };

    const ajustarPotenciaFogao = (novaPotencia: number) => {
        const novoEstado = {
            ...dispositivos,
            cozinha: {
                ...dispositivos.cozinha,
                fogao: {
                    ...dispositivos.cozinha.fogao,
                    potencia: novaPotencia,
                },
            },
        };
        setDispositivos(novoEstado);
        socket.emit('mudancaEstadoDispositivo', novoEstado);
    };

    return (
        <div className="bg-gray-900 text-white p-6 rounded-lg max-w-4xl w-full">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Controle de Dispositivos - Cozinha</h1>
            </div>

            <div className="flex justify-between gap-4">
                {/* Controle da Luz */}
                <div className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center size-60">
                    <img src={dispositivos.cozinha.luzes ? '/luzLigada.svg' : '/luzDesligada.svg'} alt="Luz" className="w-12 h-12 mb-4" />
                    <p>Luzes</p>
                    <button
                        onClick={alternarLuzCozinha}
                        className={`px-4 py-2 mt-4 rounded-md shadow w-full ${dispositivos.cozinha.luzes ? 'bg-sky-800' : 'bg-gray-600'}`}
                    >
                        {dispositivos.cozinha.luzes ? 'Desligar' : 'Ligar'}
                    </button>
                </div>

                {/* Controle da Geladeira */}
                <div className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center size-60">
                    <img src="/geladeira.svg" alt="Geladeira" className="w-12 h-12 mb-4" />
                    <p>Geladeira</p>
                    <input
                        type="range"
                        min="-5"
                        max="10"
                        defaultValue={3}
                        value={dispositivos.cozinha.geladeira.temperatura}
                        onChange={(e) => ajustarTemperaturaGeladeira(Number(e.target.value))}
                        className="slider w-full mt-4"
                    />
                    <p className="mt-2">Temperatura: {dispositivos.cozinha.geladeira.temperatura}°C</p>
                    <p className="text-red-500" style={dispositivos.cozinha.geladeira.alerta ? {visibility: 'visible'} : {visibility: 'hidden'}}>Alerta: Temperatura Alta!</p>
                </div>

                {/* Controle do Fogão */}
                <div className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center size-60">
                    <img src={dispositivos.cozinha.fogao.ligado ? '/fogaoLigado.svg' : '/fogaoDesligado.svg'} alt="Fogão" className="w-12 h-12 mb-4" />
                    <p>Fogão</p>
                    <button
                        onClick={alternarFogao}
                        className={`px-4 py-2 mt-4 rounded-md shadow w-full ${dispositivos.cozinha.fogao.ligado ? 'bg-sky-800' : 'bg-gray-600'}`}
                    >
                        {dispositivos.cozinha.fogao.ligado ? 'Desligar' : 'Ligar'}
                    </button>
                    <input
                        type="range"
                        min="1"
                        max="10"
                        value={dispositivos.cozinha.fogao.potencia}
                        onChange={(e) => ajustarPotenciaFogao(Number(e.target.value))}
                        className="slider w-full mt-4"
                    />
                    <p className="mt-2">Potência: {dispositivos.cozinha.fogao.potencia}</p>
                </div>
            </div>
        </div>
    );
};
