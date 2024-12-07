import { useContext, useEffect, useState } from "react";
import { ContexteUser } from "../../contexts/contexteUser";
import { useNavigate } from "react-router-dom";
import { URLS } from "../../constants/urls";
import { NA } from "../../constants/na";
import { PiSword } from "react-icons/pi";
import { LuScrollText } from "react-icons/lu";
import { MdOutlineLiveTv } from "react-icons/md";
import { BsBroadcast } from "react-icons/bs";

function BigBattleCard({ battle }) {
    const navigate = useNavigate();
    const { user } = useContext(ContexteUser);
    const [ isPlayer, setIsPlayer ] = useState(false);

    const isPlaying = (user) => {
        const isSomePlayer = user.Characters.some(character =>
            character.Participations.some(participation =>
                participation.battle_id === battle.id));
        setIsPlayer(isSomePlayer);
    };

    useEffect(() => {
        if (user && battle) isPlaying(user);
    }, []);

    return (
        <div className='big-battle-card'>
            {battle ? (
                <>
                        <h1 className="title">{battle.title}</h1>

                        <div className="versus">
                            <div className="team teamA">
                                {battle.Participations.filter(p => p.team === 1).map(p =>
                                    <div key={p.id}>
                                        <img
                                            className="portrait"
                                            src={p.Character.portrait? `${URLS.BACK_URL}/${p.Character.portrait}` : `${NA.PORTRAIT}`} 
                                            alt={p.Character.firstname}
                                            title={p.Character.firstname}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="vs">
                                <div className="live">
                                    <BsBroadcast />
                                    <div>En direct</div>
                                </div>                                
                                <span className='display'>VS</span>
                            </div>

                            <div className="team teamB">
                                {battle.Participations.filter(p => p.team === 2).map(p =>
                                    <div key={p.id}>
                                        <img
                                            className="portrait"
                                            src={p.Character.portrait? `${URLS.BACK_URL}/${p.Character.portrait}` : `${NA.PORTRAIT}`} 
                                            alt={p.Character.firstname}
                                            title={p.Character.firstname}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <dl className="infos card">
                            <div>
                                <dt>Statut</dt>
                                <dd>{battle.status}</dd>
                            </div>
                            <div>
                                <dt>Round</dt>
                                <dd>{battle.current_round}</dd>
                            </div>
                            <div>
                                <dt>Tour</dt>
                                <dd>{battle.CurrentTurn?.firstname}</dd>
                            </div>
                            <div>
                                <dt>Participants</dt>
                                <dd>{battle.Participations.length}</dd>
                            </div>
                        </dl>
                    
                    <div className="buttons-zone">

                        {user && user.Characters && user.Characters.length > 0 && battle.status != 'finished' ? (
                                <>
                                    {isPlayer || user.role === 'gamemaster' ? (
                                            <button className="btn-primary btn-large" onClick={() => navigate('/combat' + '/' + battle.id)}>
                                                <PiSword />
                                                <span>Jouer</span>
                                            </button>
                                        ) : (
                                            <button className="btn-primary btn-large blue" onClick={() => navigate('/combat' + '/' + battle.id)}>
                                                <MdOutlineLiveTv />
                                                <span>Regarder</span>
                                            </button>
                                        )
                                    }
                                </>
                            ) : (
                                <button className="btn-primary btn-large blue" onClick={() => navigate('/combat' + '/' + battle.id)}>
                                    <MdOutlineLiveTv />
                                    Regarder
                                </button>
                            )
                        }

                        {user && user.role === 'gamemaster' &&
                            <button className="btn-secondary btn-medium" onClick={() => navigate('/mj/combat/modifier' + '/' + battle.id)}>
                                <LuScrollText />
                                <span>Modifier combat</span>
                            </button>}
                    </div>
                </>
            ) : (
                <>
                    <h3 className="card-title">Aucun combat actif !</h3>
                    {user && user.role === 'gamemaster' && <button className="btn-primary btn-large">Créer un combat</button>}
                </>
            )}
        </div>
    );
}

export default BigBattleCard;