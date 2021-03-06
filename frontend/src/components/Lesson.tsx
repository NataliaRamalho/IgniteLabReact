import { format, isPast } from 'date-fns';
import ptBR from 'date-fns/esm/locale/pt-BR/index.js';
import {CheckCircle, Lock} from 'phosphor-react'
import { Link, useParams } from 'react-router-dom';
import classNamesLib from 'classnames';
import { MenuStatusContext} from "../context/MenuStatusContext";
import { useContext } from 'react';

interface LessonProps {
    title: string;
    slug: string;
    availableAt: Date;
    type: 'live' | 'class';
}

export function Lesson(props: LessonProps){
    const {slug} = useParams<{slug:string}>()
    const isLessonAvailable = isPast(props.availableAt);
    const isActiveLesson = slug === props.slug;
    const {isMenuOpen, handleIsMenuOpen} = useContext(MenuStatusContext)

    const availableDateFormatted = format(props.availableAt, "EEEE '  •  'd' de 'MMMM' • ' k'h'mm", {
        locale: ptBR
    }); 
    return (
        <Link 
            to={isLessonAvailable ? `/event/lesson/${props.slug}`: '#'} 
            className={classNamesLib('',{
                    "cursor-not-allowed": !isLessonAvailable,
                    "group": isLessonAvailable
                })} 
            onClick={()=> isMenuOpen && handleIsMenuOpen(false)}
            >
                <span className="text-gray-300">
                    {availableDateFormatted}
                </span>

                <div className={classNamesLib('rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500',
                    {'bg-green-500': isActiveLesson}
                )}>

                    <header className="flex items-center justify-between">
                        {isLessonAvailable ? 
                            (
                                <span className={classNamesLib('text-sm text-blue-500 font-medium flex items-center gap-2', {
                                    'text-white': isActiveLesson,
                                    'text-blue-500': !isActiveLesson,
                                })}>
                                        <CheckCircle size={20}/>
                                        Conteúdo liberado
                                </span>
                            ) : 
                            (
                                <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
                                    <Lock size={20}/>
                                    Em breve
                                </span>
                            )
                        }
                        <span className={classNamesLib('text-xs rounded py-[0.125rem] px-2 text-white border  font-bold',{
                            'border-white': isActiveLesson,
                            'border-green-300': !isActiveLesson
                        })}>
                            {props.type === 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
                        </span>
                    </header>

                    <strong className={classNamesLib('mt-5 block', {
                        'text-white': isActiveLesson,
                        'text-gray-200 ': !isActiveLesson,
                    })}>
                        {props.title}
                    </strong>
                </div>
        </Link>
    )
}