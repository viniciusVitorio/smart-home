import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { ControleSala } from './controleSala';
import { ControleCozinha } from './controleCozinha';
import { ControleQuarto } from './controleQuarto';

const socket = io('http://localhost:4000');

export interface EstadoDispositivos {
    salaDeEstar: {
        luzes: boolean;
        tv: {
            ligada: boolean;
            canal: number;
        };
        arCondicionado: {
            ligado: boolean;
            temperatura: number;
        };
    };
    cozinha: {
        luzes: boolean;
        geladeira: {
            temperatura: number;
            alerta: boolean;
        };
        fogao: {
            ligado: boolean;
            potencia: number;
        };
    };
    quarto: {
        luzes: boolean;
        ventilador: {
            ligado: boolean;
            velocidade: number;
        };
        cortinas: string;
    };
}

export const PlantaBaixa = () => {
    const [dispositivos, setDispositivos] = useState<EstadoDispositivos | null>(null);
    const [comodo, setComodo] = useState<number>(1); // 1 = Sala de Estar, 2 = Cozinha, 3 = Quarto

    useEffect(() => {
        // Recebe o estado inicial dos dispositivos ao conectar
        socket.on('estadoInicial', (estadoInicial: EstadoDispositivos) => {
            setDispositivos(estadoInicial);
        });

        // Atualiza o estado dos dispositivos quando houver uma mudança
        socket.on('atualizarEstado', (novoEstado: EstadoDispositivos) => {
            setDispositivos(novoEstado);
        });

        return () => {
            socket.off('estadoInicial');
            socket.off('atualizarEstado');
        };
    }, []);

    return dispositivos ? (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-950 gap-8">
            <div className="grid grid-rows-2 grid-cols-2 gap-4 w-full max-w-4xl p-4 bg-gray-900 shadow-lg rounded-lg">
                {/* Sala de Estar */}
                <div className="row-span-2 col-span-2 bg-gray-800 p-4 flex flex-col justify-between text-white rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-xl font-semibold text-center">Sala de Estar</p>
                        <button
                            onClick={() => setComodo(1)}
                            className={`bg-blue-500 hover:bg-blue-600 transition-colors py-1 px-2 rounded-md text-xs font-semibold ${comodo === 1 && 'bg-green-600 hover:bg-green-600'}`}
                        >
                            {comodo === 1 ? 'Controle aberto' : 'Acessar controle'}
                        </button>
                    </div>

                    {/* Dispositivos da Sala de Estar */}
                    <div className="grid grid-cols-3 gap-4">
                        {/* Luz */}
                        <div className="bg-gray-700 p-2 rounded-md shadow-md flex flex-col items-center justify-center">
                            <p>Luz</p>
                            {dispositivos.salaDeEstar.luzes ? (
                                <img src="/luzLigada.svg" alt="Luz" className="w-12 h-12 mt-2" />
                            ) : (
                                <img src="/luzDesligada.svg" alt="Luz" className="w-12 h-12 mt-2" />
                            )}
                        </div>

                        {/* TV */}
                        <div className="bg-gray-700 p-2 rounded-md shadow-md flex flex-col items-center justify-center">
                            <p>TV</p>
                            {dispositivos.salaDeEstar.tv.ligada ? (
                                <img src="/TvLigada.svg" alt="TV" className="w-12 h-12 mt-2" />
                            ) : (
                                <img src="/TvDesligada.svg" alt="TV" className="w-12 h-12 mt-2" />
                            )}
                            <span className="block text-sm" style={!dispositivos.salaDeEstar.tv.ligada ? { visibility: 'hidden' } : {}}>
                                Canal: {dispositivos.salaDeEstar.tv.canal}
                            </span>
                        </div>

                        {/* Ar-condicionado */}
                        <div className="bg-gray-700 p-2 rounded-md shadow-md flex flex-col items-center justify-center">
                            <p>Ar-Condicionado</p>
                            {dispositivos.salaDeEstar.arCondicionado.ligado ? (
                                <img src="/arCondicionado.svg" alt="Ar-Condicionado" className="w-12 h-12 mt-2" />
                            ) : (
                                <img src="/arCondicionadoDesligado.svg" alt="Ar-Condicionado" className="w-12 h-12 mt-2" />
                            )}
                            <p className="mt-2" style={!dispositivos.salaDeEstar.arCondicionado.ligado ? { visibility: 'hidden' } : {}}>
                                {dispositivos.salaDeEstar.arCondicionado.temperatura}°C
                            </p>
                        </div>
                    </div>
                </div>

                {/* Cozinha */}
                <div className="row-span-1 col-span-1 bg-gray-800 p-4 flex flex-col justify-between text-white rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-xl font-semibold text-center">Cozinha</p>
                        <button
                            onClick={() => setComodo(2)}
                            className={`bg-blue-500 hover:bg-blue-600 transition-colors py-1 px-2 rounded-md text-xs font-semibold ${comodo === 2 && 'bg-green-600 hover:bg-green-600'}`}
                        >
                            {comodo === 2 ? 'Controle aberto' : 'Acessar controle'}
                        </button>
                    </div>

                    {/* Dispositivos da Cozinha */}
                    <div className="grid grid-cols-3 gap-4">
                        {/* Luzes */}
                        <div className="bg-gray-700 p-2 rounded-md shadow-md flex flex-col items-center justify-center">
                            <p>Luz</p>
                            {dispositivos.cozinha.luzes ? (
                                <img src="/luzLigada.svg" alt="Luz" className="w-12 h-12 mt-2" />
                            ) : (
                                <img src="/luzDesligada.svg" alt="Luz" className="w-12 h-12 mt-2" />
                            )}
                        </div>

                        {/* Geladeira */}
                        <div className="bg-gray-700 p-2 rounded-md shadow-md flex flex-col items-center justify-center">
                            <p>Geladeira</p>
                            <img src="/geladeira.svg" alt="Geladeira" className="w-12 h-12 mt-2" />
                            <span className={`${dispositivos.cozinha.geladeira.alerta && 'text-red-500'}`}>Temp: {dispositivos.cozinha.geladeira.temperatura}°C</span>
                        </div>

                        {/* Fogão */}
                        <div className="bg-gray-700 p-2 rounded-md shadow-md flex flex-col items-center justify-center">
                            <p>Fogão</p>
                            {dispositivos.cozinha.fogao.ligado ? (
                                <img src="/fogaoLigado.svg" alt="Fogão" className="w-12 h-12 mt-2" />
                            ) : (
                                <img src="/fogaoDesligado.svg" alt="Fogão" className="w-12 h-12 mt-2" />
                            )}
                            <p className="mt-2" style={!dispositivos.cozinha.fogao.ligado ? { visibility: 'hidden' } : {}}>Potência: {dispositivos.cozinha.fogao.potencia}</p>
                        </div>
                    </div>
                </div>

                {/* Quarto */}
                <div className="row-span-1 col-span-1 bg-gray-800 p-4 flex flex-col justify-center items-center text-white rounded-lg">
                    <div className='flex items-center justify-between w-full'>
                        <p className="text-xl font-semibold">Quarto</p>
                        <button
                            onClick={() => setComodo(3)}
                            className={`bg-blue-500 hover:bg-blue-600 transition-colors py-1 px-2 rounded-md text-xs font-semibold ${comodo === 3 && 'bg-green-600 hover:bg-green-600'}`}
                        >
                            {comodo === 3 ? 'Controle aberto' : 'Acessar controle'}
                        </button>
                    </div>

                    {/* Dispositivos do Quarto */}
                    <div className="grid grid-cols-3 gap-4 mt-4 w-full">
                        {/* Luzes */}
                        <div className="bg-gray-700 p-2 rounded-md shadow-md flex flex-col items-center justify-center">
                            <p>Luzes</p>
                            {dispositivos.quarto.luzes ? (
                                <img src="/luzLigada.svg" alt="Luz" className="w-12 h-12 mt-2" />
                            ) : (
                                <img src="/luzDesligada.svg" alt="Luz" className="w-12 h-12 mt-2" />
                            )}
                        </div>

                        {/* Ventilador */}
                        <div className="bg-gray-700 p-2 rounded-md shadow-md flex flex-col items-center justify-center">
                            <p>Ventilador</p>
                            <img src="/ventilador.svg" alt="Ventilador" className="w-12 h-12 mt-2" />
                            <p className="mt-2">{dispositivos.quarto.ventilador.ligado ? 'Velocidade: ' + dispositivos.quarto.ventilador.velocidade : 'Desligado'}</p>
                        </div>

                        {/* Cortinas */}
                        <div className="bg-gray-700 p-2 rounded-md shadow-md flex flex-col items-center justify-center">
                            <p>Cortinas</p>
                            <img
                                src={dispositivos.quarto.cortinas === 'fechadas' ? '/cortinaFechada.svg' : '/cortinaAberta.svg'}
                                alt="Cortinas"
                                className="w-12 h-12 mt-2"
                            />
                            <p className="mt-2">{dispositivos.quarto.cortinas}</p>
                        </div>
                    </div>
                </div>
            </div>

            {comodo === 1 ? (
                <ControleSala dispositivos={dispositivos} setDispositivos={setDispositivos} socket={socket} />
            ) : comodo === 2 ? (
                <ControleCozinha dispositivos={dispositivos} setDispositivos={setDispositivos} socket={socket} />
            ) : comodo === 3 ? (
                <ControleQuarto dispositivos={dispositivos} setDispositivos={setDispositivos} socket={socket} />
            ) : (
                <span>Nenhum cômodo selecionado</span>
            )}
        </div>
    ) : (
        <p className="text-center text-xl font-bold">Carregando...</p>
    );
};
