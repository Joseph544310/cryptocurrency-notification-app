import React, {useEffect, useState} from 'react';
import Cookies from 'js-cookie'
import Axios from 'axios';

export function getCookie(name: string) {
    var cookieValue = undefined;
    console.log(document.cookie)
    console.log(Cookies.get('csrftoken'))
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].toString().replace(/^([\s]*)|([\s]*)$/g, "");
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const CSRFToken = () => {
    const [csrftoken, setCsrftoken] = useState<string|undefined>('')
    useEffect(() => {
        Axios({
            method:'GET',
            withCredentials:true,
            url:'http://localhost:8000/api/csrf/'
        }).then(res=>{
            console.log(res.data)
            setCsrftoken(getCookie('csrftoken'))
        }).catch(err=>console.log(err))
    }, [])
    return (
        <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
    );
};
export default CSRFToken;
