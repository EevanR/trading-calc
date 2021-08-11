 // let trades = props.savedTrades.map(item => 
    //   [
    //     item.Symbol, 
    //     item["Net Proceeds"], 
    //     item["T/D"], 
    //   ]
    // )
    // setTrades(trades)
    
 // let setups = []
  // let setupGains = []
  // let setupLosses = []
  // let setupCount = []
  // if (trades !== []) {
  //   for (let i=0; i<trades.length; i++) {
  //     if (!setups.includes(trades[i][3])) {
  //       setups.push(trades[i][3])
  //     }
  //   }

  //   let gain = 0
  //   let losses = 0
  //   let count = 0
  //   setups.map(item => {
  //     for (let i=0; i<trades.length; i++) {
  //       if (trades[i][3] === item) {
  //         trades[i][1] > 0 ? gain += 1 : losses += 1
  //         count += 1
  //       }
  //     }
  //     setupGains.push(gain)
  //     setupLosses.push(losses)
  //     setupCount.push(count)
  //     gain = 0
  //     losses = 0
  //     count = 0
  //   })
  // } 
 
 // const barData = {
  //   labels: setups,
  //   datasets: [
  //     {
  //       label: 'Successes',
  //       fill: true,
  //       backgroundColor: 'rgba(75,192,192,0.4)',
  //       borderColor: 'rgba(75,192,192,1)',
  //       hoverBackgroundColor: 'rgba(75,192,192)',
  //       data: setupGains
  //     },
  //     {
  //       label: 'Failures',
  //       data: setupLosses,
  //       fill: false,
  //       backgroundColor: 'rgba(233, 133, 93, 0.719)',
  //       borderColor: '#71B37C',
  //       hoverBackgroundColor: 'rgba(233, 133, 93)',
  //       hoverBorderColor: '#71B37C'
  //     }
  //   ]
  // };

  // const pieData = {
  //   labels: setups,
  //   datasets: [
  //     {
  //       label: 'Successes',
  //       fill: true,
  //       backgroundColor: [
  //         'rgba(75,192,192,0.4)',
  //         'rgba(255, 015, 0, 0.8)',
  //         'rgba(233, 133, 93, 0.719)',
  //         'rgba(100, 133, 93, 0.719)',
  //         'rgba(150, 133, 143, 0.7)',
  //         'rgba(170, 133, 53, 0.9)',
  //         'rgba(210, 133, 93, 0.6)',
  //         'rgba(310, 373, 193, 0.6)'
  //       ],
  //       borderColor: 'rgba(75,192,192,1)',
  //       hoverBackgroundColor: 'rgba(75,192,192)',
  //       data: setupCount
  //     }
  //   ]
  // };