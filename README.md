# TradeLogs

TradeLogs is web service that breaks down a user's broker statement into insightful visual statistics. The data is presented through various graphs and stats, hoping to highlight overall performance, strengths, and weaknesses within the users trading habits. Other tools are available on the web application that aim to provide aid to an equities trader. Such tools are, the position calculator, the ability to save and edit strategies, and the Stock History Gap Scanner, which allows users to scan the history of a stock whose price has increased 20% or more overnight, presenting probablities for the days outcome based on what the stock has done in the past.  

## Disclaimer
TradeLogs provides only general information and educational services, and does not provide investment advisory services. The information and services provided by TradeLogs are not intended, and shall not constitute or be construed as, advice or any recommendation to purchase or sell securities, nor any offer, or solicitation of an offer, to purchase or sell securities, nor an attempt to influence the purchase or sale of any security. The purchase and sale of securities involves a high degree of risk, and a number of factors could materially and adversely affect the results and lead to a substantial or complete loss of investment. Purchasing and selling securities is speculative and suitable only for persons who have substantial financial resources, who understand and accept the risks involves, who have independently reviewed, determined and accepted those risks and consequences thereof, and who are able to bear the risk of substantial or complete loss of investment.

## Deployed Site
https://www.trade-logs.com

## Dependencies
- React 16.13.0
- Feature/Unit tests with Cypress
- chart.js
- Axios
- React Redux
- xlsx
- papaparse
- React Twitter Widgets

## To run setup
#### Clone repository
```
$ git clone https://github.com/EevanR/trading-calc.git
$ cd trading-calc
```

#### Install dependencies
Install Cypress and dependencies
```
$ yarn
```
Install Cypress Testing
```
$ yarn add cypress --dev
```

## Run testing frameworks
In console:
Initiate and Run Cypress 
```
$ yarn cy:open
```
Select any of the test files in newly opened window to run through automated testing scenarios

## Actions available to the user

Head to the deployed address listed above and have a look around.

Demo account login details are available;

## Updates/Improvement plans
- Stripe payment implimentation for subscriptions
- "How To" instructional page
- Levels of access to subscription classes
- Automatic language translation

## License
Created under the <a href="https://en.wikipedia.org/wiki/MIT_License">MIT License</a>.
