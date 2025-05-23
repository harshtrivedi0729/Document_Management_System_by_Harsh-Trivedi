import { useState } from "react";
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:4000', 
});

const useMutation = ({url, method = "POST"}) => {
    const [state, setState] = useState({
        isLoading: false,
        error: '',
    });

    const fn = async (data) => {
        setState(prev => ({
            ...prev, isLoading: true,
        }));
    
        axiosClient({
          url,
          method,
          data,
          headers: {
            'x-user-id': 'harsh-123', 
            'Content-Type': 'multipart/form-data',
          },
        }).then(() => {
            setState({ isLoading: false, error: ''});
        }).catch((error) => {
            setState({isLoading: false, error: error.message});
        });
    };
    return {mutate: fn, ...state};
};

export default useMutation;