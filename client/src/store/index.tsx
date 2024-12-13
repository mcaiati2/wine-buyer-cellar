import { 
  useState, 
  useEffect, 
  useContext, 
  createContext, 
  ReactNode, 
  Dispatch, 
  SetStateAction 
} from 'react';
import axios from 'axios';

import { User } from '../interfaces';

export interface State {
  user: User | null;
  loading: boolean;
}

// Interfaces in Typescript are used to describe an object (ie. {name: 'JD', age: 44} - {name: string; age: number;})
interface StoreContextType {
  state: State;
  setState: Dispatch<SetStateAction<State>>;
}

// The createContext takes an initial value, but you must describe the initial value/argument and what the context object will look like later
// So, StoreContextType describes the object that I'm passing in on line 67 through the value prop
const StoreContext = createContext<StoreContextType | undefined>(undefined);

const initialState: State = {
  user: null,
  loading: true
};


export function StoreProvider(props: {children: ReactNode}) {
  const [state, setState] = useState(initialState);
  
  useEffect(() => {
    // The cookie that is store to the browser is automatically sent with this request
    // This request is being sent to the Express server on 3333
    axios.get('/auth/user')
      .then(res => {
        setState({
          ...state,
          user: res.data.user,
          loading: false
        });
      });
  }, [])

  return (
    <StoreContext.Provider value={{
      state: state,
      setState: setState
    }}>
      {props.children}
    </StoreContext.Provider>
  )
}

export const useStore = () => useContext(StoreContext);

