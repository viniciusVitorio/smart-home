import { Socket } from 'socket.io-client';
import { EstadoDispositivos } from './plantaBaixa';

interface ControleDispositivosProps {
    dispositivos: EstadoDispositivos;
    setDispositivos: React.Dispatch<React.SetStateAction<EstadoDispositivos | null>>;
    socket: Socket;
}

export const ControleSala: React.FC<ControleDispositivosProps> = ({ dispositivos, setDispositivos, socket }) => {
    const alternarLuzSala = () => {
        if (dispositivos) {
            const novoEstado = {
                ...dispositivos,
                salaDeEstar: {
                    ...dispositivos.salaDeEstar,
                    luzes: !dispositivos.salaDeEstar.luzes,
                },
            };
            setDispositivos(novoEstado);
            socket.emit('mudancaEstadoDispositivo', novoEstado);
        }
    };

    const alternarTVSala = () => {
        if (dispositivos) {
            const novoEstado = {
                ...dispositivos,
                salaDeEstar: {
                    ...dispositivos.salaDeEstar,
                    tv: {
                        ...dispositivos.salaDeEstar.tv,
                        ligada: !dispositivos.salaDeEstar.tv.ligada,
                    },
                },
            };
            setDispositivos(novoEstado);
            socket.emit('mudancaEstadoDispositivo', novoEstado);
        }
    };

    const ajustarTemperaturaAr = (novaTemperatura: number) => {
        if (dispositivos) {
            const novoEstado = {
                ...dispositivos,
                salaDeEstar: {
                    ...dispositivos.salaDeEstar,
                    arCondicionado: {
                        ...dispositivos.salaDeEstar.arCondicionado,
                        temperatura: novaTemperatura,
                    },
                },
            };
            setDispositivos(novoEstado);
            socket.emit('mudancaEstadoDispositivo', novoEstado);
        }
    };

    const alternarArCondicionado = () => {
        if (dispositivos) {
            const novoEstado = {
                ...dispositivos,
                salaDeEstar: {
                    ...dispositivos.salaDeEstar,
                    arCondicionado: {
                        ...dispositivos.salaDeEstar.arCondicionado,
                        ligado: !dispositivos.salaDeEstar.arCondicionado.ligado,
                    },
                },
            };
            setDispositivos(novoEstado);
            socket.emit('mudancaEstadoDispositivo', novoEstado);
        }
    };

    const mudarCanalTV = (novoCanal: number) => {
        if (dispositivos) {
            const novoEstado = {
                ...dispositivos,
                salaDeEstar: {
                    ...dispositivos.salaDeEstar,
                    tv: {
                        ...dispositivos.salaDeEstar.tv,
                        canal: novoCanal,
                    },
                },
            };
            setDispositivos(novoEstado);
            socket.emit('mudancaEstadoDispositivo', novoEstado);
        }
    };

    return (
        <div className='bg-gray-900 text-white p-6 rounded-lg max-w-4xl w-full'>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Controle de Dispositivos - Sala de Estar</h1>
            </div>

            {/* Controles de Dispositivos */}
            <div className="flex justify-between gap-4">
                {/* Controle da Luz */}
                <div className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center size-60">
                    <img src={dispositivos.salaDeEstar.luzes ? '/luzLigada.svg' : '/luzDesligada.svg'} alt="Luz" className="w-12 h-12 mb-4" />
                    <p>Luzes</p>
                    <button
                        onClick={alternarLuzSala}
                        className={`px-4 py-2 mt-4 rounded-md shadow w-full ${dispositivos.salaDeEstar.luzes ? 'bg-sky-800' : 'bg-gray-600'}`}
                    >
                        {dispositivos.salaDeEstar.luzes ? 'Desligar' : 'Ligar'}
                    </button>
                </div>

                {/* Controle da TV */}
                <div className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center size-60">
                    <img src={dispositivos.salaDeEstar.tv.ligada ? '/TvLigada.svg' : '/TvDesligada.svg'} alt="TV" className="w-12 h-12 mb-4" />
                    <p>TV</p>
                    <button
                        onClick={alternarTVSala}
                        className={`px-4 py-2 mt-4 rounded-md shadow w-full ${dispositivos.salaDeEstar.tv.ligada ? 'bg-sky-800' : 'bg-gray-600'}`}
                    >
                        {dispositivos.salaDeEstar.tv.ligada ? 'Desligar' : 'Ligar'}
                    </button>

                    <div className="mt-4 w-full">
                        <input
                            type="number"
                            min={1}
                            max={15}
                            value={dispositivos.salaDeEstar.tv.canal}
                            onChange={(e) => mudarCanalTV(Number(e.target.value))}
                            className="mt-2 p-2 w-full bg-gray-700 rounded"
                        />
                    </div>
                </div>

                {/* Controle do Ar-condicionado */}
                <div className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center size-60">
                    <img src="/arCondicionado.svg" alt="Ar-Condicionado" className="w-12 h-12 mb-4" />
                    <p>Ar-Condicionado</p>
                    <button
                        onClick={alternarArCondicionado}
                        className={`px-4 py-2 mt-4 rounded-md shadow w-full ${dispositivos.salaDeEstar.arCondicionado.ligado ? 'bg-sky-800' : 'bg-gray-600'}`}
                    >
                        {dispositivos.salaDeEstar.arCondicionado.ligado ? 'Desligar' : 'Ligar'}
                    </button>

                    <input
                        type="range"
                        min="16"
                        max="30"
                        value={dispositivos.salaDeEstar.arCondicionado.temperatura}
                        onChange={(e) => ajustarTemperaturaAr(Number(e.target.value))}
                        className="slider w-full mt-4"
                    />
                </div>
            </div>
        </div>
    );
};
