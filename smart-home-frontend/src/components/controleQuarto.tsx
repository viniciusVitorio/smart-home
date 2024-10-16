import { Socket } from 'socket.io-client';
import { EstadoDispositivos } from './plantaBaixa';

interface ControleQuartoProps {
    dispositivos: EstadoDispositivos;
    setDispositivos: React.Dispatch<React.SetStateAction<EstadoDispositivos | null>>;
    socket: Socket;
}

export const ControleQuarto: React.FC<ControleQuartoProps> = ({ dispositivos, setDispositivos, socket }) => {
    const alternarLuzQuarto = () => {
        const novoEstado = {
            ...dispositivos,
            quarto: {
                ...dispositivos.quarto,
                luzes: !dispositivos.quarto.luzes,
            },
        };
        setDispositivos(novoEstado);
        socket.emit('mudancaEstadoDispositivo', novoEstado);
    };

    const alternarVentilador = () => {
        const novoEstado = {
            ...dispositivos,
            quarto: {
                ...dispositivos.quarto,
                ventilador: {
                    ...dispositivos.quarto.ventilador,
                    ligado: !dispositivos.quarto.ventilador.ligado,
                },
            },
        };
        setDispositivos(novoEstado);
        socket.emit('mudancaEstadoDispositivo', novoEstado);
    };

    const ajustarVelocidadeVentilador = (novaVelocidade: number) => {
        const novoEstado = {
            ...dispositivos,
            quarto: {
                ...dispositivos.quarto,
                ventilador: {
                    ...dispositivos.quarto.ventilador,
                    velocidade: novaVelocidade,
                },
            },
        };
        setDispositivos(novoEstado);
        socket.emit('mudancaEstadoDispositivo', novoEstado);
    };

    const alternarCortinas = () => {
        const novoEstado = {
            ...dispositivos,
            quarto: {
                ...dispositivos.quarto,
                cortinas: dispositivos.quarto.cortinas === 'fechadas' ? 'abertas' : 'fechadas',
            },
        };
        setDispositivos(novoEstado);
        socket.emit('mudancaEstadoDispositivo', novoEstado);
    };

    return (
        <div className="bg-gray-900 text-white p-6 rounded-lg max-w-4xl w-full">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Controle de Dispositivos - Quarto</h1>
            </div>

            <div className="flex justify-between gap-4">
                {/* Controle da Luz */}
                <div className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center size-60">
                    <img src={dispositivos.quarto.luzes ? '/luzLigada.svg' : '/luzDesligada.svg'} alt="Luz" className="w-12 h-12 mb-4" />
                    <p>Luzes</p>
                    <button
                        onClick={alternarLuzQuarto}
                        className={`px-4 py-2 mt-4 rounded-md shadow w-full ${dispositivos.quarto.luzes ? 'bg-sky-800' : 'bg-gray-600'}`}
                    >
                        {dispositivos.quarto.luzes ? 'Desligar' : 'Ligar'}
                    </button>
                </div>

                {/* Controle do Ventilador */}
                <div className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center size-60">
                    <img src='/ventilador.svg' alt="Ventilador" className="w-12 h-12 mb-4" />
                    <p>Ventilador</p>
                    <button
                        onClick={alternarVentilador}
                        className={`px-4 py-2 mt-4 rounded-md shadow w-full ${dispositivos.quarto.ventilador.ligado ? 'bg-sky-800' : 'bg-gray-600'}`}
                    >
                        {dispositivos.quarto.ventilador.ligado ? 'Desligar' : 'Ligar'}
                    </button>
                    <input
                        type="range"
                        min="1"
                        max="5"
                        value={dispositivos.quarto.ventilador.velocidade}
                        onChange={(e) => ajustarVelocidadeVentilador(Number(e.target.value))}
                        className="slider w-full mt-4"
                    />
                    <p className="mt-2">Velocidade: {dispositivos.quarto.ventilador.velocidade}</p>
                </div>

                {/* Controle das Cortinas */}
                <div className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center size-60">
                    <img
                        src={dispositivos.quarto.cortinas === 'fechadas' ? '/cortinaFechada.svg' : '/cortinaAberta.svg'}
                        alt="Cortinas"
                        className="w-12 h-12 mb-4"
                    />
                    <p>Cortinas</p>
                    <button
                        onClick={alternarCortinas}
                        className={`px-4 py-2 mt-4 rounded-md shadow w-full ${dispositivos.quarto.cortinas === 'abertas' ? 'bg-sky-800' : 'bg-gray-600'}`}
                    >
                        {dispositivos.quarto.cortinas === 'fechadas' ? 'Abrir' : 'Fechar'}
                    </button>
                </div>
            </div>
        </div>
    );
};
