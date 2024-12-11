'use client';

import Image from 'next/image';
import React from 'react';

export default function Terminal() {

    const totalTime = 14400;

    const [timeLeft, setTimeLeft] = React.useState(totalTime);
    const [finished, setFinished] = React.useState(false);
    const [lines, setLines] = React.useState(new Set<string>());

    function addLine(line: string) {
        lines.add(line);
        if (lines.size > 33) {
            lines.delete(Array.from(lines)[0]);
        }
    }

    setInterval(() => {
        setTimeLeft(timeLeft - 1);
        if (timeLeft < 0) return;
        if (timeLeft === 0) {
            addLine('Time is up!');
            setFinished(true);
        } else {
            const total = timeLeft;
            const hour = Math.floor(total / 3600);
            const minute = Math.floor((total % 3600) / 60);
            const second = total % 60;

            addLine(`Time remaining: 0${hour} hours ${minute < 10 ? '0' : ''}${minute} minutes ${second < 10 ? '0' : ''}${second} seconds (total: ${total} seconds)`);
        }
    }, 1000);

    return (
        <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg flex flex-col justify-end w-4/5 h-3/4">
            <div
                className='absolute top-56 right-80 flex flex-row'
            >
                <div>
                    <Image
                        src="/images/Firdanieuw.png"
                        alt="firda"
                        width={500}
                        height={100}
                    />
                </div>
                <div>
                    <Image
                        src="/images/skills.png"
                        alt="firda"
                        width={120}
                        height={100}
                    />
                </div>
            </div>
            {finished && (
                <div className='finish-anim'>
                    <span className="text-red-500">Time is up!</span>
                    <audio src="/audio/finish2.mp3" autoPlay></audio>
                </div>
            )}
            <div className="flex flex-col items-start justify-end mb-2 text-transparent bg-clip-text bg-gradient-to-t from-slate-300 lines h-full overflow-hidden">
                <span className="flex items-center justify-start">
                    <span>
                        Welcome to the countdown terminal!
                        <br />
                        Type "help" for a list of commands
                        <br />
                        <br />
                    </span>
                </span>
                {Array.from(lines).map((line, index) => (
                    <div
                        className="flex items-center justify-start"
                        key={index}
                    >
                        <span>{line}</span>
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-start mb-2">
                <span>
                    <span className="text-green-500">➜</span>
                    {' '}
                    <span className="text-blue-500">~</span>
                    {' '}
                    <span className="input">bash timer.sh -t 14400</span>
                    <span className="input-cursor">▯</span>
                </span>
            </div>
        </div >
    )
}
