import api from '@/utils/api';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';


export default function useQuery<T>(url:string) {

    const [data, setData] = useState<T>();

    const fetchData = useCallback(
      async () => {
        const res = await api.get<T>(url);
      setData((res).data)
      },
      [url],
    )
    
    useEffect(() => {
      fetchData()
      
    }, [fetchData])
    
  return data
}

export function useGetQueryParams<T>(){
  const [params, setParams] = useState<Record<string,string>>({})
  const querySearch = useSearchParams()
  const fetchParams = useCallback(()=>{
    const entries = Array.from(querySearch.entries());
    const paramObj: Record<string, string> = {};
    entries.forEach(([key, value]) => {
      try {
        paramObj[key] = JSON.parse(value);
      } catch {
        paramObj[key] = value;
      }

    });
    setParams(paramObj)
  },[querySearch])

  useEffect(()=>{
    fetchParams()
  },[fetchParams])

  return params as T
}