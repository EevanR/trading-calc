import React from 'react';

const HowTo = () => {

  return (
    <>
      <div className="panes bg-dark">
        <div>
          <a href="/"><img src="/TradeLogs.png"  alt="TradeLogs Logo"/></a>
        </div>
      </div>
      <section className='container terms'>
        <h1>How To</h1>
        <h3>Get Started</h3>
        <p>Register account and log in</p>

        <h3>Dashboard</h3>
        <p>Welcome to TradeLogs! Once logged in, familiarize yourself with the dashboard and the various section tabs.</p>
        <p>Clicking the TradeLogs Logo at the top left of the page will take you back to the Home page, logging you out.</p>

        <h3>Upload Trades</h3>
        <p>Currently Supported Brokers: TradeZero </p>
        <p>1. Log in to your TradeZero account</p>
        <p>2. Head over to Account Overview</p>
        <img src="../images/TZAcountOverview.png" alt="Acount Overview" />
        <br />
        <p>3. Scroll down and select the heading "Trades".</p>
        <img src="../images/TZTrades.png" alt="Trades overview" />
        <br />
        <p>4. Select the desired date range.</p>
        <img src="../images/TZDates.png" alt="dates Overview" />
        <br />
        <p>5. Click the Excel symbol to download the file.</p>
        <img src="../images/TZDownload.png" alt="Download example" />
        <br />
        <p>6. Open the file, select the file dropdown and select 'Save as'.</p>
        <img src="../images/ExcelSaveAs.png" alt="File Save As" />
        <br />
        <p>7. Select "Save as" and re-save as "Excel Workbook (.xlsx)".</p>
        <img src="../images/ExcelXlsx.png" alt="File Save As .xlsx" />
        <br />
        <p>8. Return to www.trade-logs.com, Sign in, and upload the newly saved .xlsx file.</p>
        <img src="../images/Uploadfile.png" alt="Tradelogs upload" />
        <br />
        <h3>Upload Software and Locate Fees</h3>
        <p>Repeat steps for Upload Trades. Except go to your "Cash Journal" tab instead of your "Trades" tab.</p>
        <img src="../images/TZCashJournal.png" alt="Cash Journal" />
      </section>
      <section className="section-6 bg-dark">
        <div className="container-wide">
          <div className="split">
            <div>
              <img id="logo" src="/TradeLogs.png"  alt="TradeLogs Logo"/>
            </div>
            <div>
            </div>
            <div>
              <h4>ABOUT US</h4>
              <a href='/terms'><p>TERMS OF SERVICE</p></a>
              <p>FAQ</p>
              <p>PRIVACY POLICY</p>
            </div>
            <div>
              <h4>QUICK LINKS</h4>
              <a href='/howto'><p>HOW TO</p></a>
            </div>
            <div>
              <h4>CONNECT</h4>
              <p>CONTACT US</p>
            </div>
          </div>
          <div id="copyright">
            <i className="envelope outline icon"></i>
            <p >Copyright © TradeLogs 2022. All rights reserved.</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default HowTo;