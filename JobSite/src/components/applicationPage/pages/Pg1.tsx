import React from 'react'

interface Pg1Props{
    test: number;
}
const Pg1:React.FC<Pg1Props> = ({test}) => {
    test += 1
  return (
    <div>
      {test}
    </div>
  )
}

export default Pg1
