import React from 'react';

const Excel = () => {

  const readExcel = (file) => {
    
  }

  return (
    <>
      <div>
        <input 
          type="file" 
          onChange={(e) => {
            const file = e.target.files[0]
            readExcel(file)
          }}
        />
      </div>
    </>
  )
}

export default Excel