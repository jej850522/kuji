import React, { useEffect, useState } from 'react';

import './styles.css';


const prizes = [
    { name: '超大吉', sort: 1, character: ['01', '02'] },
    { name: '大吉', sort: 2, character: ['01', '02', '03', '04', '05'] },
    { name: '吉', sort: 3, character: ['01', '02', '03', '04', '05'] },
    { name: '中吉', sort: 4, character: ['01', '02', '03', '04', '05', '06'] },
    { name: '小吉', sort: 5, character: ['01', '02', '03', '04', '05'] },
    { name: '末吉', sort: 6, character: ['01', '02', '03', '04', '05'] },
];

function compare(a, b) {
    if (a.sort < b.sort ){
        return -1;
    }
    if ( a.sort > b.sort ){
        return 1;
    }
    return 0;
}

function drawLottery(count) {
    const probabilities = [5, 8, 12, 20, 25, 30];
  
    const results = [];
    for (let i = 0; i < count; i++) {
      const randomNumber = Math.random() * 100;
      let cumulativeProbability = 0;
  
      for (let j = 0; j < probabilities.length; j++) {
        cumulativeProbability += probabilities[j];
  
        if (randomNumber < cumulativeProbability) {
            const selectedPrize = prizes[j];
    
            const randomCharacter = selectedPrize.character[Math.floor(Math.random() * selectedPrize.character.length)];
    
            results.push({ name: selectedPrize.name, sort: selectedPrize.sort, character: randomCharacter });
          break;
        }
      }
    }

    results.sort((a, b) => compare(a, b) || a.character - b.character);
  
    return results;
}

const Index = () => {
	const [count, setCount] = useState(1);
	const [result, setResult] = useState([]);

    const countArray = [];
    for (let i = 1; i <= 20; i++) {
        countArray.push(i);
    }
	const countOption = countArray.map((num) => {
		return (
			<option key={num} value={num}>
				{num}
                個
			</option>
		);
	});

    
	const onHiku = evt => {
		evt.preventDefault();

        const results = drawLottery(count);
        setResult(results);
    }

	return (
		<div className="container">
            <p className="title">這是一個天獄抽抽模擬器</p>
            <div className="flex">
                <p>個数:</p>
                <select name="lastProject" value={count} onChange={evt => setCount(evt.target.value)} className="dropdown">
                    {countOption}
                </select>
                <button　className="button" onClick={onHiku}>
                    くじを引く
                </button>
            </div>
            {result.map(r => <p>{r.name}{r.character}</p>)}
		</div>
	);
};

export default Index;
