
import { createContext , useState } from "react"


export let CounterContext = createContext()



export default function CounterContextProvider(props)
{

    let [counter, setcount] = useState(0);
    const [username, setusername] = useState("Ahmed")


  return <CounterContext.Provider value={{counter , username  }}>
    {props.children}
  </CounterContext.Provider>
} 