import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    
const apikey = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJzdWIiOjEsImlhdCI6MTY2ODA1MDQyMSwiZXhwIjoxNjY4MDUwNDgxfQ.IemcMjWz_YfarOWlGosaErUoVLT9uar9RXv9EvubqCU'

  const response = await fetch(process.env.REACT_APP_API+`/api/v1/nodes/`, {
      method: 'GET',
      headers: new Headers({
        //   'Authorization': 'Bearer ' + localStorage.getItem('Bearer')?.replace(/"/g, ''),
          'Authorization': apikey,
          'Accept': 'application/json'
      })
  })

  try {
    const data = await response.json();
    if (response.ok) res.status(200).json(data); return ''
    throw data.errors

  } catch (e:any) {
      res.status(403).json(e)
      throw e
  }
}


